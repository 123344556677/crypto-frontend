import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import { Col, Row } from "reactstrap";
import { cashDeposit, checkWallet } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import { IoMdArrowBack } from "react-icons/io";
import './Withrawal.css'

const Withdrawal = () => {
  const navigate = useNavigate();

  const [walletAdress, setWalletAdress] = useState();
  const [fundingPass, setFundingPass] = useState();
  const [checkCondition, setCheckCondition] = useState("verify")
  const [formData, setFormData] = useState({
    transactionNumber: null,
    TransactionImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (checkCondition === "verify") {
        try{
            const values={
                walletAddress:walletAdress,
                fundPassword:fundingPass
            }
            const response = await checkWallet(values);
            console.log(response,"wallet check response----->")
      setCheckCondition("withdraw");
    }
    catch(err){
        console.log(err)
        errorAlert(err?.response?.data?.err);
    
}
}

    try {
      if (checkCondition === "withdraw") {
        const { transactionNumber, TransactionImage } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append("transactionNumber", transactionNumber);
        // formDataToSend.append("amount", depositAmount);
        formDataToSend.append("TransactionImage", TransactionImage);
        const response = await cashDeposit(formDataToSend);
        console.log(response, "cash reposne");
        if (response?.status === 201) {
          successAlert(response?.data?.message);
          navigate("/home");
        }
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  return (
    <div className="main-div">
    <span className="back-icon" onClick={()=>navigate('/Home')}><IoMdArrowBack/></span>
      <Row className="w-100 justify-content-center mt-5">
        <Col xl={4}>
          <Card className="auth-cards p-3">
            {checkCondition === "verify" && (
              <>
                <Row className="mt-3">
                  <Col className="">withdraw Type</Col>

                  <Col className="">USTD-TRC20</Col>
                </Row>

                <Form onSubmit={submit}>
                  <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>
                      <h5>Wallet Adress</h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="wallet adress"
                      className="login-inputs"
                      onChange={(e) => setWalletAdress(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>
                      <h5>Funding Password</h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter funding password"
                      className="login-inputs"
                      onChange={(e) => setFundingPass(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button className="w-100 auth-button mt-3" type="submit">
                    Tap to proceed
                  </Button>
                </Form>
              </>
            )}
            {checkCondition === "withdraw" && (
              <>
                <Row className="mt-3">
                  <Col className="">Current Balance</Col>

                  <Col className="">$20</Col>
                </Row>
                <Row className="mt-3">
                  <Col className="">withdraw Adress</Col>

                  <Col className="">{walletAdress}</Col>
                </Row>
                <Row className="mt-3">
                  <Col className="">withdraw Type</Col>

                  <Col className="">TRC20</Col>
                </Row>
                <Form onSubmit={submit}>
                  <Form.Group className="mt-4" controlId="formBasicEmail">
                    <Form.Label>
                      <h5>Withdrawal Amount</h5>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Withdrawal amount"
                      name="twithdrawalAmount"
                      className="login-inputs"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-4" controlId="formBasicEmail">
                    <Form.Label>
                      <h5>Funding Password</h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter funding password"
                      className="login-inputs"
                      onChange={(e) => setFundingPass(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    onClick={submit}
                    // onClick={handleChange}
                    className="w-100 auth-button mt-4 mb-4"
                    type="submit"
                  >
                    Withdraw Amount
                  </Button>
                </Form>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Withdrawal;
