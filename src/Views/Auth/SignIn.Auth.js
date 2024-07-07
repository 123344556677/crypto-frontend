import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../../Api/Api";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";
import { setLocalStorage } from "../../Common";
import { Col, Row } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const values = {
      email,
      password,
    };

    try {
      const response = await login(values);
      console.log(response, "login reponse");
      if (response.status === 200) {
        successAlert(response?.data?.message);
        setLocalStorage("token", response.data?.data?.token);
        setLocalStorage("id", response.data?.data?._id);
        window.location.assign("/Home");
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-div">
      <br />
      <div className="ml-3">
        <Row className="w-100 justify-content-center  no-gutters mt-5">
          {
            // <Col xl={7} md={12} sm={12} className="">
            //   <img src="/az-4.jpg" alt="login-pic" className="login-img mt-4" />
            // </Col>
          }
          <Col xl={12} md={12} sm={12}>
            <div className="d-flex justify-content-center">
              <img className="logo mt-3" src="/logo.png" alt="Logo" />
            </div>
            <h2 className="text-center text-white"> Login</h2>
            <p className="login-text mt-2 text-center">
              Welcome back sign in to your account
            </p>
            <hr />
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
                <InputGroup className="">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="login-inputs"
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

              <Button type="submit" className="border-0 w-100 mt-3 auth-button">
                Login
              </Button>
            </Form>
            <p className="signup-text text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link" href="#">
                Sign up
              </Link>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Signin;
