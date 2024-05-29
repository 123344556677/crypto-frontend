import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import { setLocalStorage } from "../../Common";
import { Col, Row } from "reactstrap";
import BottomBar from "../../Components/BottomBar/BottomBar";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  /* Submit Form */
  const submit = async (e) => {
    e.preventDefault();

    const values = {
      email,
      password,
    };

    try {
      const response = await login(values);
      console.log(response,"login reponse")
      if (response.status === 200) {
        successAlert(response?.data?.message);
        setLocalStorage("token", response.data?.data?.token);
        setLocalStorage("id", response.data?.data?._id);
        window.location.assign('/Home');
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  return (
    <div className="main-div">
      <Row className="w-100 justify-content-center mt-5">
        <Col xl={4}>
          <Card className="auth-cards">
            <Card.Title>
              <div className="d-flex justify-content-center">
                <img
                  className="logo"
                  src="/Family Loan Insurance Logo.png"
                  alt="Logo"
                />
              </div>
              <h2 className="text-center"> Login</h2>
              <p className="login-text mt-2 text-center">
                Welcome back sign in to your account
              </p>
            </Card.Title>
            <Card.Body>
              <Form onSubmit={submit}>
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="login-inputs"
                    required
                  />
                  <div
                    id="login-error-msg"
                    className="mt-3 text-danger font-weight-bold"
                  ></div>
                  <div className="text-right">
                    <Link to="/forgetPassword" className="forgot-text">
                      Forgot password?
                    </Link>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="border-0 w-100 mt-3 auth-button"
                >
                  Login
                </Button>
              </Form>
              <p className="signup-text text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link" href="#">
                  Sign up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
