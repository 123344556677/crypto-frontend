import React, { useEffect, useState } from "react";

import "./index.css";

import { Container, Tabs, Tab, Table } from "react-bootstrap";
import { getTeamContribution, getTeamData, getTeamUsers } from "../../Api/Api";
import { roundToOneDecimal } from "../../Common";
import moment from "moment/moment";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";

const Team = () => {
  const [teamData, setTeamata] = useState();
  const [teamUsers, setTeamUsers] = useState();
  const [teamContribution, setTeamContribution] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await getTeamData();
        setTeamata(response?.data?.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    const fetchTeamUsers = async () => {
      try {
        const response = await getTeamUsers();
        setTeamUsers(response?.data?.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    const fetchTeamContribution = async () => {
      try {
        const response = await getTeamContribution();
        setTeamContribution(response?.data?.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeamInfo();
    fetchTeamUsers();
    fetchTeamContribution();
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
                src="/Family Loan Insurance Logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="text-center text-white mt-2"> Team</h2>
            <p className="login-text mt-2 text-center">
              Check Your Team Income and Contribution!
            </p>
            <hr />
            <div className="row">
              <div className="col-6">
                <h5>
                  {" "}
                  ${roundToOneDecimal(teamData?.totalRevenue)} <br /> Total
                  Revene
                </h5>
              </div>
              <div className="col-6 text-right">
                <h5 className="">
                  ${roundToOneDecimal(teamData?.earningsToday)} <br /> Earning
                  Today
                </h5>
              </div>
            </div>

            <Tabs
              defaultActiveKey="team"
              id="uncontrolled-tab-example"
              className="custom-tabs mt-5"
            >
              <Tab eventKey="team" title="Team People">
                <div className="mt-5 mb-5">
                  <div className="row">
                    <div className="col-6">
                      Total People: <span> ${teamData?.totalPeople}</span>
                    </div>

                    <div className="col-6 text-right">
                      New Users: <span> ${teamData?.newRegistrations} </span>
                    </div>

                    <div className="col-6 mt-3">
                      Recharge Today:{" "}
                      <span>
                        {" "}
                        ${roundToOneDecimal(teamData?.addedRecharge)}
                      </span>
                    </div>
                  </div>
                </div>

                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Account </th>
                      <th> Hirarchy </th>
                      <th> Registration Time </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamUsers?.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data?.email}</td>
                        <td>{data?.type}</td>
                        <td>
                          {moment(data?.registrationTime).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
              <Tab
                eventKey="contribution"
                title="Team Contribution"
                className="ml-3"
              >
                <div className="mt-5 mb-5">
                  <div className="row">
                    <div className="col-6">
                      Total People: <span> ${teamData?.totalPeople}</span>
                    </div>

                    <div className="col-6 text-right">
                      New Users: <span> ${teamData?.newRegistrations} </span>
                    </div>

                    <div className="col-6 mt-3">
                      Recharge Today:{" "}
                      <span>
                        {" "}
                        ${roundToOneDecimal(teamData?.addedRecharge)}
                      </span>
                    </div>
                  </div>
                </div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Account </th>
                      <th> Hirarchy </th>
                      <th> Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamContribution?.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data?.email}</td>
                        <td>{data?.type}</td>
                        <td>${data?.income} </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Team;
