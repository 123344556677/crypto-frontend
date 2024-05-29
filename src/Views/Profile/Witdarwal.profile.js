import React, { useState, useEffect } from "react";

import { GET } from "../../apicontroller/ApiController"

import Table from 'react-bootstrap/Table';

const PWitdarwal = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    const [witdarwal, setWitdarwal] = useState([]);


    const fetchData = async () => {
        GET(`witdawarl/${user.authId}`).then((result) => {
            setWitdarwal(result)
        })
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id="witdarwal_cards">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Witdarwal Amount </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td> {witdarwal.id} </td>
                        <td> {witdarwal.witdarwal_amount} </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default PWitdarwal