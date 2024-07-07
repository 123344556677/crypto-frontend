import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./index.css";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getAbout } from "../../Api/Api";

const Aboutus = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState("");
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        setAbout(response?.data?.about?.content);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    fetchAbout();
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
                src="/logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="text-center text-white mt-2">About Us</h2>
            <p className="login-text mt-2 text-center">
              Get to know about our company!
            </p>
            <hr/>
            <h5 className="text-center">{about}</h5>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Aboutus;
