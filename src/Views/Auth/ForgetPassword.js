import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./auth.css";
import { Col, Row } from "reactstrap";
import { checkOTP, sendOTP, updatePassword } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkCondition, setCheckCondition] = useState("email");
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (checkCondition === "email") {
        const values = {
          email: email,
        };
        const response = await sendOTP(values);
        if (response?.status === 200) {
          setToken(response.data?.data?.token);
          successAlert(response?.data?.message);
          setCheckCondition("code");
        }
      }
      if (checkCondition === "code") {
        const values = {
          code: code,
        };
        const response = await checkOTP(values, token);
        if (response?.status === 200) {
          successAlert(response?.data?.message);
          setToken(response.data?.data?.token);
          setCheckCondition("password");
        }
      }
      if (checkCondition === "password") {
        if (password === confirmPassword) {
          const values = {
            password: password,
          };
          const response = await updatePassword(values, token);
          if (response?.status === 200) {
            successAlert(response?.data?.message);
            navigate("/");
          }
        } else {
          errorAlert("Password and Confirm Password does not match");
        }
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };
  return (
    <div className="main-div">
      <br />
      <span className="back-icon" onClick={() => navigate("/")}>
        <IoMdArrowBack />
      </span>
        <Row className="justify-content-center mt-5">
          <Col xl={12}>
            <div className="d-flex justify-content-center">
              <img
                className="logo"
                src="/Family Loan Insurance Logo.png"
                alt="Logo"
              />
            </div>
            <h3 className="text-center mt-2"> Forgot Password</h3>
            <p className="login-text mt-2 text-center">
              We will send code to your email!
            </p>
            <hr />
            <Form onSubmit={submit}>
              {checkCondition === "email" && (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="login-inputs"
                    required
                  />
                </Form.Group>
              )}
              {checkCondition === "code" && (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type=""
                    placeholder="Enter Code"
                    className="login-inputs"
                    required
                  />
                </Form.Group>
              )}
              {checkCondition === "password" && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      className="login-inputs"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      placeholder="Confirm Password"
                      className="login-inputs"
                      required
                    />
                  </Form.Group>
                </>
              )}
              <Button
                type="submit"
                className="border-0 w-100 mt-3 auth-button mb-5"
              >
                {checkCondition === "email"
                  ? "Send Code"
                  : checkCondition === "code"
                  ? "Verify Code"
                  : "Change Password"}
              </Button>
            </Form>
          </Col>
        </Row>
    </div>
  );
};

export default ForgetPassword;
