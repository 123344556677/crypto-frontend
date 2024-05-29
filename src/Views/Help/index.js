import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
const Help = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center"> Online Service </h1>

          <div style={{ fontSize: "20px" }}>
            If you have any problem and need help Please contact online Support
            Service
          </div>
        </Col>

        <Col>
          <img src="/service_top_right.png" />
        </Col>
      </Row>

      <div>
        <a target="_blank" href="https://wa.link/65lqxr">
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
                    <div style={{ fontSize: "50px" }}>Online Service</div>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </a>
      </div>
    </Container>
  );
};

export default Help;
