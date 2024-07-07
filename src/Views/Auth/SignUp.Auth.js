import React, { useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import "./auth.css";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate,} from "react-router-dom";
import { register } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import {
  MAX_FILE_SIZE,
  WaitingAnimation,
  toBase64,
  uploadImageToFirebase,
} from "../../Common";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkAnimation, setCheckAnimation] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFundPassword, setShowFundPassword] = useState(false);
  const referral = new URLSearchParams(location.search).get('referral');
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode:referral|| "",
    fronId: null,
    backId: null,
    fundPassword: "",
  });
  

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passError, setPassError] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    frontId: "",
    backId: "",
  });

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

  // const submit = async (event) => {
  //   event.preventDefault();
  //   setCheckAnimation(true);
  //   if (passError) {
  //     toast.error("Passwords do not match!");
  //     setCheckAnimation(false);
  //     return;
  //   }
  //   try {
  //     const {
  //       firstname,
  //       lastname,
  //       email,
  //       password,
  //       referralCode,
  //       frontId,
  //       backId,
  //       fundPassword,
  //     } = formData;

  //     if (frontId.size > MAX_FILE_SIZE || backId.size > MAX_FILE_SIZE) {
  //       setCheckAnimation(false);
  //       errorAlert("File size should be less than 100KB");
  //       return;
  //     }
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("fname", firstname);
  //     formDataToSend.append("lname", lastname);
  //     formDataToSend.append("email", email);
  //     formDataToSend.append("password", password);
  //     formDataToSend.append("referralCode", referralCode);
  //     formDataToSend.append("frontId", frontId);
  //     formDataToSend.append("backId", backId);
  //     formDataToSend.append("fundPassword", fundPassword);

  //     const response = await register(formDataToSend);
  //     if (response?.status === 201) {
  //       successAlert(response?.data?.message);
  //       setCheckAnimation(false);
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     setCheckAnimation(false);
  //     errorAlert(err?.response?.data?.err);
  //     console.log(err, "signup error-->");
  //   }
  // };

  const submit = async (event) => {
    event.preventDefault();
    setCheckAnimation(true);
    if (passError) {
      toast.error("Passwords do not match!");
      setCheckAnimation(false);
      return;
    }
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        referralCode,
        frontId,
        backId,
        fundPassword,
      } = formData;

      // Upload images to Firebase and get URLs
      const frontIdUrl = await uploadImageToFirebase(frontId);
      const backIdUrl = await uploadImageToFirebase(backId);

      const requestBody = {
        fname: firstname,
        lname: lastname,
        email: email,
        password: password,
        referralCode: referralCode,
        frontId: frontIdUrl,
        backId: backIdUrl,
        fundPassword: fundPassword,
      };

      const response = await register(requestBody);
      if (response?.status === 201) {
        successAlert(response?.data?.message);
        setCheckAnimation(false);
        navigate("/");
      }
    } catch (err) {
      setCheckAnimation(false);
      errorAlert(err?.response?.data?.err);
      console.log(err, "signup error-->");
    }
  };
    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleFundPasswordVisibility = () => {
    setShowFundPassword(!showFundPassword);
  };
  return (
    <div className="main-div">
    <br/>
      {checkAnimation ? (
        WaitingAnimation()
      ) : (
        <div className="ml-3">
        <Row className="justify-content-center no-gutters w-100">
          <Col xl={12} sm={12} md={12}>
            <div className="d-flex justify-content-center">
              <img
                className="logo"
                src="/logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="text-center text-white mt-2">SignUp</h2>
            <p className="login-text mt-2 text-center">
              SignUp to explore our services and make investments
            </p>
            <hr />
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
                      name="referralCode"
                      value={formData.referralCode}
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
                  <InputGroup className="">
                    <Form.Control
                      name="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
                      className="login-inputs"
                     type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                    />
                    <Button
                    variant=""
                    onClick={togglePasswordVisibility}
                    style={{ background: "white" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                   </Button>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group
                    className="mb-3 mt-4"
                    controlId="formBasicConfirmPassword"
                  >
                  <InputGroup>
                    <Form.Control
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        handleChange(e);
                        matchPass(formData.password, e.target.value);
                      }}
                      className="login-inputs"
                      onClick={toggleConfirmPasswordVisibility}
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                    />
                    <Button
              variant=""
              onClick={toggleConfirmPasswordVisibility}
              style={{ background: "white" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</Button>
              </InputGroup>
                    {passError && (
                      <p style={{ color: "red" }}>Passwords do not match!</p>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group
                    className="mb-3 mt-4"
                    controlId="formBasicPassword"
                  >
                  <InputGroup>
                    <Form.Control
                      name="fundPassword"
                      value={formData.fundPassword}
                      onChange={handleChange}
                      className="login-inputs"
                      type={showFundPassword ? "text" : "password"}
                      placeholder="Fund password"
                      required
                    />
                    <Button
              variant=""
              onClick={toggleFundPasswordVisibility}
              style={{ background: "white" }}
            >
              {showFundPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mt-4">
                    <h6 className="text-white">Front ID Card</h6>
                    <div className="upload-box">
                      <input
                        accept="image/*"
                        type="file"
                        className="fs-6 form-control-file"
                        name="frontId"
                        onChange={handleChange}
                        required
                      />
                      <label className="upload-label">
                        {selectedFiles.frontId
                          ? selectedFiles.frontId
                          : "Upload Image"}
                        {selectedFiles.frontId && " (Change Image)"}
                      </label>
                    </div>
                  </Form.Group>
                </Col>

                {/* Back ID Card Upload */}
                <Col sm={6}>
                  <Form.Group className="mt-4">
                    <h6 className="text-white">Back ID Card</h6>
                    <div className="upload-box">
                      <input
                        accept="image/*"
                        type="file"
                        className="fs-6 form-control-file"
                        name="backId"
                        onChange={handleChange}
                        required
                      />
                      <label className="upload-label">
                        {selectedFiles.backId
                          ? selectedFiles.backId
                          : "Upload Image"}
                        {selectedFiles.backId && " (Change Image)"}
                      </label>
                    </div>
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
          </Col>
        </Row>
        </div>
      )}
    </div>
  );
};

export default Signup;
