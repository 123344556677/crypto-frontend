import React, { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import "./Quantify.css";
import { getQuantizationData, getUserClicks, getUserLevel } from "../../Api/Api";

const Quantify = () => {
  const navigate = useNavigate();
   useEffect(() => {
    const fetchUserClicks = async () => {
      try {
        const response = await getUserClicks();
        // setUserData(response?.data?.user);
        console.log(response,"user response---->")
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchUserLevel = async () => {
      try {
        const response = await getUserLevel();
        // setUserLevel(response?.data?.level);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchQuantizationData = async () => {
      try {
        const response = await getQuantizationData();
        console.log(response,"quantization reposne---->")
        // setUserLevel(response?.data?.level);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    fetchUserLevel();
    fetchQuantizationData()
    fetchUserClicks();
    
  }, []);
  return (
    <div className="main-div">
      <br />
      <span className="back-icon" onClick={() => navigate("/Home")}>
        <IoMdArrowBack />
      </span>
      <div className="ml-3">
        <Row className="w-100 no-gutters justify-content-center mt-5">
          <Col xl={12} sm={12} md={12}>
            <div className="d-flex justify-content-center">
              <img
                className="logo mt-3"
                src="/Family Loan Insurance Logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="text-center text-white mt-2">Quantify</h2>
            <p className="login-text mt-2 text-center">
              Tap to gain your balance and increase your level!
            </p>
            <hr />
            <Card className="custom-card">
              <div className="lottie-background">
                <iframe
                  title="loading"
                  src="https://lottie.host/embed/86e6c5aa-2e54-4b45-a397-fe79356124c2/E49Ll5Yevl.json"
                  frameBorder="0"
                  className="lottie-iframe"
                ></iframe>
              </div>
              <div className="card-content mt-3">
                <h3 className="text-left">Single Start Quantization</h3>
                <div style={{ float: "right" }} className="mt-3 mb-3">
                  <h5 className="">(3/3)</h5>
                  <button className="gradient-button">Click to Quantify</button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Quantify;
