import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import "./index.css";
import { getReferalCode } from "../../Api/Api";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { FaCopy } from "react-icons/fa";
import { copyText } from "../../Common";

const Invite = () => {
  const [referralCode, setReferalCode] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReferalCode = async () => {
      try {
        const response = await getReferalCode();
        setReferalCode(response?.data?.referralLink);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchReferalCode();
  }, []);

  return (
    <div className="main-div">
    <br/>
      <span className="back-icon" onClick={() => navigate("/Home")}>
        <IoMdArrowBack />
      </span>
      <div className="ml-3">
      <Row className="w-100 justify-content-center mt-5 no-gutters">
        <Col xl={12} md={12} sm={12}>
          <div className="d-flex justify-content-center">
            <img
              className="logo mt-3"
              src="/Family Loan Insurance Logo.png"
              alt="Logo"
            />
          </div>
          <h2 className="text-center text-white mt-2"> Referral</h2>
          <p className="login-text mt-2 text-center">
            Share Your Code with Others
          </p>
          <hr />
          <Row className="mt-5 mb-2">
            <Col className="">
              <h3 className="">Your Referral Link</h3>
            </Col>
            <Col className="">
              <h3
                className="text-right"
                style={{ color: "rgb(176, 159, 65)" }}
              >
                {referralCode}
                <span className="ml-3" onClick={()=>copyText(referralCode)}><FaCopy style={{cursor:"pointer"}}/></span>
              </h3>
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
    </div>
  );
};

export default Invite;
