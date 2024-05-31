import React, { useEffect, useState} from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { cashDeposit, getUser } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";

const Recharge = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const [depositAmount, setDepositAmount] = useState();
  const [userData, setUserData] = useState();
  const [checkCondition, setCheckCondition] = useState("recharge");
  const [formData, setFormData] = useState({
    transactionNumber: null,
    TransactionImage: null,
  });
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUser(id);
        setUserData(response?.data?.user);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchUserInfo();
  }, []);

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
    if (checkCondition === "recharge") {
      setCheckCondition("wallet");
    }
    try {
      if (checkCondition === "wallet") {
        const { transactionNumber, TransactionImage } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append("transactionNumber", transactionNumber);
        formDataToSend.append("amount", depositAmount);
        formDataToSend.append("TransactionImage", TransactionImage);
        const response = await cashDeposit(formDataToSend);
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
      <Row className="w-100 justify-content-center mt-5">
        <Col xl={4}>
          <Card className="auth-cards p-3">
            {checkCondition === "recharge" && (
              <>
                <Row className="mt-3">
                  <Col className="">Current Balance</Col>

                  <Col className="">${userData?.balance}</Col>
                </Row>

                <Form onSubmit={submit}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control
                      type="number"
                      placeholder="Enter amount for recharge"
                      className="login-inputs mt-3"
                      onChange={(e) => setDepositAmount(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Row className="mt-3">
                    <Col className="">Recharge Type</Col>

                    <Col className="">USDT</Col>
                  </Row>

                  <Button className="w-100 auth-button mt-3" type="submit">
                    Tap to proceed
                  </Button>
                </Form>
              </>
            )}
            {checkCondition === "wallet" && (
              <>
                <Row className="mt-3">
                  <Col className="">Wallet Adress</Col>

                  <Col className="">eieriweiruiowerweioruiow</Col>
                </Row>
                <Form onSubmit={submit}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control
                      type="number"
                      placeholder="Transaction number"
                      name="transactionNumber"
                      className="login-inputs mt-3"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-4">
                    <h6>Transaction Screenshot</h6>
                    <input
                      accept="image/*"
                      type="file"
                      className="fs-6 form-control-file"
                      name="TransactionImage"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button
                    onClick={submit}
                    // onClick={handleChange}
                    className="w-100 auth-button mt-3"
                    type="submit"
                  >
                    Tap to recharge
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

export default Recharge;
