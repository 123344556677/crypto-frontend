import React from "react";

import { Container, Row, Col } from "react-bootstrap"

const Network = () => { 

    const header = { "x-access-token": localStorage.getItem("token") };

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <Container>

            {/* <h1 className="text-center"> {user.name} </h1>

            <h3 className="mt-5 text-center"> {user.email} </h3> */}
            <Row>
                <Col sm={6} className="mt-5">
                    Your Adress of your Wallet
                </Col>

                <Col sm={6} className="mt-5">
                    TZBu7qjaR3p6GDU9c8o3Vq3G5WZ4QCoAYB
                </Col>
            </Row>

            <Row className="mt-5">
                <Col sm={6}>
                    Against Network
                </Col>


                <Col sm={6}>
                    USDT TRC20
                </Col>
            </Row>

            <Row className="mt-5">

                <Col sm={6}>
                    Your QR Code
                </Col>

                <Col sm={6}>
                    <img src="/qr.jpg" style={{ width: '200px', height: '200px' }} />
                </Col>
            </Row>
        </Container>
    )
}

export default Network