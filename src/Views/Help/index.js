import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
const Help = () => {
  const navigate = useNavigate();
  return (
    <div className="main-div">
      <br />
      <span className="back-icon" onClick={() => navigate("/Home")}>
        <IoMdArrowBack />
      </span>
      <Container>
        <Row className="mt-5">
          <Col xl={6}>
            <h1 className="text-center"> Online Service </h1>

            <div style={{ fontSize: "20px" }}>
              If you have any problem and need help Please contact online
              Support Service
            </div>
          </Col>

          <Col xl={6}>
            <img
              src="/service_top_right.png"
              alt="service-img"
              className="img-fluid"
            />
          </Col>
        </Row>

        <div>
          <a href="https://wa.me/447521609944?text=can you guide me?">
            <Card style={{ marginTop: "5rem", marginBottom: "3rem" }}>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col>
                      <img
                        style={{ marginLeft: "5rem" }}
                        src="/service.png"
                        alt="Service"
                      />
                    </Col>

                    <Col className="mt-2">
                      <div style={{ fontSize: "50px" }}>Gracie Hill</div>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </a>
        </div>
        <div>
          <a href="https://wa.me/447417485083?text=can you guide me?">
            <Card style={{ marginTop: "5rem", marginBottom: "3rem" }}>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col>
                      <img
                        style={{ marginLeft: "5rem" }}
                        src="/service.png"
                        alt="Service"
                      />
                    </Col>

                    <Col className="mt-2">
                      <div style={{ fontSize: "50px" }}>Islaa</div>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </a>
        </div>
        <br />
      </Container>
    </div>
  );
};

export default Help;
