import React, { useState, useEffect } from "react";

import { GET } from "../../apicontroller/ApiController"

import Table from 'react-bootstrap/Table';

const ProfileWitdarwal = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    const [witdarwal, setWitdarwal] = useState({});


    const fetchData = async () => {
        GET(`addwallet/${user.authId}`).then((result) => {
            setWitdarwal(result[0])
        })
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id="witdarwal_cards">
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Date </th>
                        <th> Witdarwal Amount </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td> {witdarwal.id} </td>
                        <td> {witdarwal.agreement} </td>
                        <td> {witdarwal.wallet_address} </td>
                    </tr>
                </tbody>
            </Table> */}

            <div className="row">
                <div className="d-flex form-group col-sm-6" style={{ fontSize: '20px', marginLeft: "15rem" }}>
                    <strong for="exampleInputEmail1">
                        Your Wallet Address
                        <span className="text-danger">*</span>
                    </strong>

                    <div className="d-flex"  style={{ marginLeft: '20rem' }}>
                        <strong>
                            Agreement: {witdarwal.agreement}
                        </strong>
                    </div>
                </div>

                <div className=""  style={{ marginLeft: '6rem', marginTop:'1rem', fontSize: '20px', }}>
                        <strong>
                            Wallet Address: {witdarwal.wallet_address}
                        </strong>
                    </div>
            </div>
        </div>
    )
}

export default ProfileWitdarwal