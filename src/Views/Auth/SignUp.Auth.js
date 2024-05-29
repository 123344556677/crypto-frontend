import React, { useState } from "react";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import "./auth.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import BottomBar from "../../Components/BottomBar/BottomBar";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralcode: "",
    fronId: null,
    backId: null,
    fundPassword:""
  });

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validatePassword = (password) => {
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;

    setValidations({
      length: lengthRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      number: numberRegex.test(password),
      special: specialRegex.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevData) => ({ ...prevData, password: newPassword }));
    validatePassword(newPassword);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData((prevData) => ({ ...prevData, email: newEmail }));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(newEmail));
  };

  const matchPass = (password, confirmPassword) => {
    setPassError(password !== confirmPassword);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (passError) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        referralcode,
        frontId,
        backId,
        fundPassword
      } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append("fname", firstname);
      formDataToSend.append("lname", lastname);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("referralcode", referralcode);
      formDataToSend.append("frontId", frontId);
      formDataToSend.append("backId", backId);
      formDataToSend.append("fundPassword", fundPassword);

      const response = await register(formDataToSend);
      if (response?.status === 201) {
        successAlert(response?.data?.message);
        navigate("/");
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  return (
    <div className="main-div">
      <Row className="justify-content-center">
        <Col xl={8}>
          <Card className="auth-cards p-3">
            <div className="d-flex justify-content-center">
              <img
                className="logo"
                src="/Family Loan Insurance Logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="text-center">SignUp</h2>
            <p className="login-text mt-2 text-center">
              SignUp to explore our services and make investments
            </p>

            <Form onSubmit={submit}>
              <Row className="mt-4">
                <Col sm={6}>
                  <Form.Group controlId="formBasicFirstName" className="mt-4">
                    <Form.Control
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="login-inputs"
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group controlId="formBasicLastName" className="mt-4">
                    <Form.Control
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="login-inputs"
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mt-4" controlId="formBasicEmail">
                    <Form.Control
                      name="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      className="login-inputs"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group
                    className="mt-4"
                    controlId="formBasicReferralCode"
                  >
                    <Form.Control
                      name="referralcode"
                      value={formData.referralcode}
                      onChange={handleChange}
                      className="login-inputs"
                      type="text"
                      placeholder="Referral Code"
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group
                    className="mb-3 mt-4"
                    controlId="formBasicPassword"
                  >
                    <Form.Control
                      name="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
                      className="login-inputs"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group
                    className="mb-3 mt-4"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Control
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        handleChange(e);
                        matchPass(formData.password, e.target.value);
                      }}
                      className="login-inputs"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                    {passError && (
                      <p style={{ color: "red" }}>Passwords do not match!</p>
                    )}
                  </Form.Group>
                </Col>
                <Row>
              <Col sm={12}>
                  <Form.Group
                    className="mb-3 mt-4"
                    controlId="formBasicPassword"
                  >
                    <Form.Control
                      name="fundPassword"
                      value={formData.fundPassword}
                      onChange={handleChange}
                      className="login-inputs"
                      type="password"
                      placeholder="Fund password"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

                <Col sm={6}>
                  <Form.Group className="mt-4">
                    <h6>Front ID Card</h6>
                    <input
                      accept="image/*"
                      type="file"
                      className="fs-6 form-control-file"
                      name="frontId"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mt-4">
                    <h6>Back ID Card</h6>
                    <input
                      accept="image/*"
                      type="file"
                      className="fs-6 form-control-file"
                      name="backId"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button
                  className="border-0 mt-5 auth-button w-75"
                  type="submit"
                >
                  Create Account
                </Button>
              </div>
              <p className="signup-text text-center mt-3">
                Already have an account?{" "}
                <Link to="/" className="signup-link" href="#">
                  Login
                </Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
      {
      //  <BottomBar/>
      }
    </div>
  );
};

export default Signup;
