import React from "react"

import { Card, Container, Row, Col, Carousel, Form, FormControl, Modal } from 'react-bootstrap';

import "./Home.css"

import { Link } from "react-router-dom"

const HomeCards = () => {
    return (
        <div>
            <Row>
                <Col sm={6}>
                    <Carousel className="mt-2">
                        <Carousel.Item>
                            <img style={{ width: "100%", height: '300px' }} src="/image 1.jpg" />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img style={{ width: "100%", height: '300px' }} src="/image 2.jpg" />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img style={{ width: "100%", height: '300px' }} src="/image 3.jpg" />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col sm={6}>
                    <div className="circle">
                        <p>
                            Level 1
                        </p>

                        <p>
                            Free Member
                        </p>
                    </div>

                    {/* <div className="square">

                        <div className="content mb-3">
                            <p>
                                Referral URL
                            </p>
                        </div>

                        <div className="search">
                            <Form >
                                <FormControl className="custom-search" type="text" placeholder="Search" />
                            </Form>
                        </div>
                    </div> */}
                </Col>
            </Row>

            {/* ------------------- Cards ------------------------- */}
            <div className="text-center">
                <Row className="mt-5">

                    <Col sm={3}>
                        <Link to="/recharge" style={{ textDecoration: "none" }}>
                            <Card className='home-card' style={{ backgroundColor: '#808080', color: 'white' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <img style={{ width: '100px', height: '100px' }} src="/deposit.png" alt="Deposit Icon" />
                                    </Card.Title> <hr />
                                    <Card.Text>
                                        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                            Deposit
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col sm={3}>
                        <Link to="/witdarwal" style={{ textDecoration: "none" }}>
                            <Card className='home-card' style={{ backgroundColor: '#808080', color: 'white' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <img style={{ width: '100px', height: '100px' }} src="/deposit.png" alt="Deposit Icon" />
                                    </Card.Title> <hr />
                                    <Card.Text>
                                        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                            Witdarwal
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col sm={3}>
                        <Link to="/team" style={{ textDecoration: "none" }}>
                            <Card className='home-card' style={{ backgroundColor: '#808080', color: 'white' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <img style={{ width: '100px', height: '100px' }} src="/deposit.png" alt="Deposit Icon" />
                                    </Card.Title> <hr />
                                    <Card.Text>
                                        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                            Team
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col sm={3}>
                        <Link to="/invite" style={{ textDecoration: "none" }}>
                            <Card className='home-card' style={{ backgroundColor: '#808080', color: 'white' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <img style={{ width: '100px', height: '100px' }} src="/deposit.png" alt="Deposit Icon" />
                                    </Card.Title> <hr />
                                    <Card.Text>
                                        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                            Invite Friends
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomeCards