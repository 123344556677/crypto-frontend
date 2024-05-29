import React from "react"

import "./index.css"

import { Card, Container, Row, Col, Tabs, Tab, Table } from 'react-bootstrap';

const Team = () => {
    return (
        <Container id="team-card" className="mt-5">
            <div className="">
                <div className="row">
                    <div className="col-md-6">
                        0U <br /> Total Revene
                    </div>

                    <div className="col-md-6">
                        0U <br /> Earning Today
                    </div>
                </div>
            </div>

            <Tabs defaultActiveKey="team" id="uncontrolled-tab-example" className="custom-tabs mt-5">

                <Tab eventKey="team" title="Team People">

                    <div className="mt-5 mb-5">
                        <div className="row">
                            <div className="col-sm-6">
                                Recharge Today: <span> 0 </span>
                            </div>

                            <div className="col-sm-6">
                                Witdarwal Today: <span> 0 </span>
                            </div>

                            <div className="col-sm-6 mt-3">
                                Active People Today: <span> 0 </span>
                            </div>
                        </div>
                    </div>


                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Account </th>
                                <th>  Hirarchy </th>
                                <th> Registration Type </th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>

                            </tr>
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="contribution" title="Team Contribution">

                    <div className="mt-5 mb-5">
                        <div className="row">
                            <div className="col-sm-6">
                                Total Cummulative Income: <span> 0 </span>
                            </div>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> Account </th>
                                <th> Hirarchy </th>
                                <th> Time </th>
                                <th> Income </th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>

                            </tr>
                        </tbody>
                    </Table>
                </Tab>


            </Tabs>
        </Container>

    )
}

export default Team