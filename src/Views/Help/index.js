import React, { useEffect, useState } from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { getNumber } from "../../Api/Api";
const Help = () => {
  const [numbers, setNumbers] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await getNumber();
        console.log(response, "number response");
        setNumbers(response?.data?.numbers);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    fetchNumber();
  }, []);
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
        {numbers &&
          numbers.map((data, index) => (
            <div key={index}>
              <a href={`https://wa.me/${data?.number}?text=can you guide me?`}>
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
                          <div style={{ fontSize: "50px" }}>{data?.name}</div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </div>
          ))}
        <div></div>
        <br />
      </Container>
    </div>
  );
};

export default Help;
