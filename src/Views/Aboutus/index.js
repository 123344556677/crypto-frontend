import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

const Aboutus = () => {
  return (
    <Container>
      <h2 className="mt-5">Affiliate Program</h2>

      <Row>
        <Col>
          <div className="affiliate-head">
            Do you know somebody that may benefit from using our dispatch service?
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-text">
            All referrals are paid $10/week for the lifetime of the referral. Just what you read!
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-head">
            How it works:
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-text">
            1: You send us a client and every week that they use our service, we send you $10. The $10’s keep coming for as long as the client uses our service. <br />
            2: Yes, you can refer as many clients as you want! There is no limit on the number of referrals. <br />
            3: Make sure you let us know or have your client tell us that you sent them so that we can send you your $10.
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-head">
            The Tiny Print (We like our tiny print huge!)
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-text">
            1: The client must generate $5,000 gross revenue in the billing cycle to be eligible <br />
            2: We must receive a W9 from you before we pay out <br />
            3: We pay out weekly, every Friday.
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-head">
            That’s all!
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="affiliate-text">
            Please sign our affiliate form and consider it a done deal!
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Aboutus;
