import React, { useState, useEffect } from "react";

import { Table, Container } from "react-bootstrap";

import "./index.css";

import { GET } from "../../apicontroller/ApiController";

import ProfileWitdarwal from "./WallAddress.profile";
import PWitdarwal from "./Witdarwal.profile";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { getUser, updateUserInfo } from "../../Api/Api";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";

const Profile = () => {
  const id = localStorage.getItem("id");
  const [userData, setUserData] = useState();
  const [changedFields, setChangedFields] = useState({});
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    walletAddress: "",
    fundPassword:""
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUser(id);
        setUserData(response?.data?.user);
        console.log(response, "user reeposne----->");
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setChangedFields((prevChangedFields) => ({
      ...prevChangedFields,
      [name]: true,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const changedValues = {};
    Object.keys(changedFields).forEach((field) => {
      if (changedFields[field]) {
        changedValues[field] = formData[field];
      }
    });
    // Submit only the changed values
    try {
      const response = await updateUserInfo(changedValues);
      if (response?.status === 200) {
        successAlert("Profile updated");
        window.location.assign("/Home");
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      console?.log(err);
    }
  };
  return (
    <div className="main-div">
      <span className="back-icon" onClick={() => navigate("/Home")}>
        <IoMdArrowBack />
      </span>
      <Row className="justify-content-center">
        <Col xl={5} md={12} sm={12}>
          <div className="d-flex justify-content-center">
            <img
              className="logo mt-3"
              src="/Family Loan Insurance Logo.png"
              alt="Logo"
            />
          </div>
          <h2 className="text-center text-white mt-2">Profile</h2>
          <p className="login-text mt-2 text-center">
            Update Your Information!
          </p>
          <hr />
          <Form onSubmit={submit}>
            <Input
              type="text"
              name="fname"
              placeholder="first name"
              className="mt-3 login-inputs"
              defaultValue={formData.fname || userData?.fname}
                onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="lname"
              placeholder="last name"
              className="mt-3 login-inputs"
              defaultValue={formData.lname || userData?.lname}
                onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="mt-3 login-inputs"
              defaultValue={formData.email || userData?.email}
                onChange={handleChange}
              required
            />
            <Input
              defaultValue={formData.walletAddress || userData?.walletAddress}
              type="text"
              name="walletAddress"
              placeholder="wallet address"
              className="mt-3 login-inputs"
                onChange={handleChange}
              required
            />
            <Input
              defaultValue={formData.fundPassword}
              type="text"
              name="fundPassword"
              placeholder="fund password"
              className="mt-3 login-inputs"
            onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="border-0 w-100 mt-3 auth-button mb-5"
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      {
        // <Table striped bordered hover>
        //     <thead>
        //         <tr>
        //             <th>#</th>
        //             <th> Date </th>
        //             <th> Deposit Amount </th>
        //             <th> Total Amount </th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {recharge && recharge.map((recharges) => (
        //             <tr>
        //                 <td> {recharges.id} </td>
        //                 <td> {recharges.created_at.split(' ')[0]} </td>
        //                 <td> {recharges.deposit} </td>
        //                 <td> {recharges.total} </td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </Table>
      }
    </div>
  );
};
export default Profile;
