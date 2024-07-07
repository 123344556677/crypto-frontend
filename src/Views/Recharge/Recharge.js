import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { cashDeposit, getAdminWallet, getUser } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import "./Recharge.css";
import { IoMdArrowBack } from "react-icons/io";
import {
  WaitingAnimation,
  toBase64,
  uploadImageToFirebase,
} from "../../Common";

const Recharge = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [depositAmount, setDepositAmount] = useState();
  const [userData, setUserData] = useState();
  const [adminWallet, setAdminWallet] = useState();
  const [checkCondition, setCheckCondition] = useState("recharge");
  const [checkAnimation, setCheckAnimation] = useState(false);
  const [formData, setFormData] = useState({
    transactionNumber: null,
    TransactionImage: null,
  });
  const [selectedFiles, setSelectedFiles] = useState({
    TransactionImage: "",
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
    const fetchAdminWallet = async () => {
      try {
        const response = await getAdminWallet(id);
        setAdminWallet(response?.data?.adminWalletAddress);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchUserInfo();
    fetchAdminWallet();
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const base64 = await toBase64(file);
      setSelectedFiles({ ...selectedFiles, [name]: file.name });
      setFormData({ ...formData, [name]: base64 });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // const submit = async (event) => {
  //   event.preventDefault();
  //   if (checkCondition === "recharge") {
  //     setCheckCondition("wallet");
  //   }
  //   try {
  //     if (checkCondition === "wallet") {
  //       const { transactionNumber, TransactionImage } = formData;
  //       const amount = parseFloat(depositAmount) + 1;
  //       const formDataToSend = new FormData();
  //       formDataToSend.append("transactionNumber", transactionNumber);
  //       formDataToSend.append("amount", amount);
  //       formDataToSend.append("TransactionImage", TransactionImage);
  //       const response = await cashDeposit(formDataToSend);
  //       if (response?.status === 201) {
  //         successAlert(response?.data?.message);
  //         navigate("/home");
  //       }
  //     }
  //   } catch (err) {
  //     errorAlert(err?.response?.data?.err);
  //   }
  // };
  const submit = async (event) => {
    event.preventDefault();
    if (checkCondition === "recharge") {
      setCheckCondition("wallet");
    }
    try {
      if (checkCondition === "wallet") {
        setCheckAnimation(true);
        const { transactionNumber, TransactionImage } = formData;
        const amount = parseFloat(depositAmount) + 1;
        const transactionUrl = await uploadImageToFirebase(TransactionImage);
        const values = {
          transactionNumber: transactionNumber,
          amount: amount,
          image: transactionUrl,
        };
        const response = await cashDeposit(values);
        if (response?.status === 201) {
          successAlert(response?.data?.message);
          navigate("/home");
        }
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      setCheckAnimation(false);
    }
  };

  return (
    <div className="main-div">
      <br />
      {checkAnimation ? (
        WaitingAnimation()
      ) : (
        <>
          <span className="back-icon" onClick={() => navigate("/Home")}>
            <IoMdArrowBack />
          </span>
          <div className="ml-3">
            <Row className="w-100 no-gutters justify-content-center mt-5">
              <Col xl={12} sm={12} md={12}>
                <div className="d-flex justify-content-center">
                  <img
                    className="logo mt-3"
                    src="/logo.png"
                    alt="Logo"
                  />
                </div>
                <h2 className="text-center text-white mt-2"> Recharge</h2>
                <p className="login-text mt-2 text-center">
                  Add balance to your account!
                </p>
                {checkCondition === "recharge" && (
                  <>
                    <Row className="mt-5 mb-2 w-100">
                      <Col className="">
                        <h3>Current Balance</h3>
                      </Col>
                      <Col
                        className="text-right"
                        style={{ color: "rgb(176, 159, 65)" }}
                      >
                        <h3>${userData?.balance}</h3>
                      </Col>
                      <hr />
                    </Row>

                    <Form onSubmit={submit}>
                      <Form.Group className="" controlId="formBasicEmail">
                        <h5>Recharge</h5>
                        <Form.Control
                          type="number"
                          placeholder="Enter amount for recharge"
                          className="login-inputs mt-3 mb-2"
                          onChange={(e) => setDepositAmount(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Row className="mt-4 mb-2 w-100">
                        <Col className="">
                          <h3>Recharge Type</h3>
                        </Col>
                        <Col
                          className="text-right"
                          style={{ color: "rgb(176, 159, 65)" }}
                        >
                          <h3>USDT</h3>
                        </Col>
                        <hr />
                      </Row>
                      <Button className="w-100 auth-button mt-3" type="submit">
                        Tap to proceed
                      </Button>
                    </Form>
                  </>
                )}
                {checkCondition === "wallet" && (
                  <>
                    <Row className="mt-4 w-100">
                      <Col className="">
                        <h5>Wallet Adress</h5>
                      </Col>

                      <Col className="text-right">
                        <h5>{adminWallet}</h5>
                      </Col>
                      <hr />
                    </Row>
                    <Form onSubmit={submit}>
                      <Form.Group className="mt-2" controlId="formBasicEmail">
                        <h5>Transaction Number</h5>
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
                        <h5>Transaction Screenshot</h5>
                        <div className="upload-box">
                          <input
                            accept="image/*"
                            type="file"
                            className="fs-6 form-control-file"
                            name="TransactionImage"
                            onChange={handleChange}
                            required
                          />

                          <label className="upload-label">
                            {selectedFiles.TransactionImage
                              ? selectedFiles.TransactionImage
                              : "Upload Image"}
                            {selectedFiles.TransactionImage &&
                              " (Change Image)"}
                          </label>
                        </div>
                      </Form.Group>

                      <h6 className="mt-3" style={{ color: "grey" }}>
                        Note: $1 will be additional price for transaction
                      </h6>
                      <h4 className="mt-3">
                        Total: {parseFloat(depositAmount) + 1}
                      </h4>

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
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default Recharge;
