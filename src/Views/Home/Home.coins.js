import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Row, Col} from "react-bootstrap"

import "./Home.css"; // Import your CSS file for styling

const HomeCoins = () => {
    return (
        <div className="tabs-container">
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="custom-tabs">
                <Tab eventKey="home" title="Home">
                    <div className="bg-image">
                        <Row>
                            <Col>
                                <div className="d-flex mt-4 ms-3">
                                    <img style={{width:"30px", height:'30px'}} src="/bitcoin.png" />
                                    <span style={{color:'white', marginLeft:'1rem'}}>
                                        BCH/USDT
                                    </span>

                                </div>
                            </Col>

                            <Col>
                            
                            </Col>

                            <Col>
                            
                            </Col>
                        </Row>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="messages" title="Messages">
                    Tab content for Messages
                </Tab>
                <Tab eventKey="settings" title="Settings">
                    Tab content for Settings
                </Tab>
            </Tabs>
        </div>
    )
}

export default HomeCoins;
