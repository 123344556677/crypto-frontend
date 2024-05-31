import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
  cashWithdrawal,
  checkWallet,
  getUser,
} from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import { IoMdArrowBack } from "react-icons/io";
import "./Withrawal.css";

const Withdrawal = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [walletAdress, setWalletAdress] = useState();
  const [userData, setUserData] = useState();
  const [fundingPass, setFundingPass] = useState();
  const [WithdrawAmount, setWithdraAmount] = useState();
  const [checkCondition, setCheckCondition] = useState("verify");

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

  const submit = async (event) => {
    event.preventDefault();
    if (checkCondition === "verify") {
      console.log(walletAdress, "wallet adress");
      try {
        const values = {
          walletAddress: walletAdress,
          fundPassword: fundingPass,
        };
        const response = await checkWallet(values);
        successAlert(response?.data?.message);
        setCheckCondition("withdraw");
      } catch (err) {
        console.log(err);
        errorAlert(err?.response?.data?.err);
      }
    } else {
      try {
        const values = {
          walletAddress: walletAdress,
          fundPassword: fundingPass,
          amount: parseFloat(WithdrawAmount),
          type: "USDT-TRC20",
        };
        const response = await cashWithdrawal(values);
        successAlert(response?.data?.message);
        navigate("/Home");
      } catch (err) {
        console.log(err);
        errorAlert(err?.response?.data?.err);
      }
    }
  };

  return (
    <div className="main-div">
      <span className="back-icon" onClick={() => navigate("/Home")}>
        <IoMdArrowBack />
      </span>
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

                  <Col className="">${userData?.balance}</Col>
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
                      name="withdrawalAmount"
                      className="login-inputs"
                      onChange={(e) => setWithdraAmount(e.target.value)}
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
