import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST } from "../../apicontroller/ApiController";

const AddWallet = () => {

    const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
 
    const agreementRef = useRef();
    const wallet_addressRef = useRef();

    const navigate = useNavigate();

    // State variable to track whether data has been submitted
    const [dataSubmitted, setDataSubmitted] = useState(false);

    useEffect(() => {
        // Check if data has been submitted for this user ID
        const userData = localStorage.getItem(`submittedData_${user.authId}`);
        if (userData) {
            setDataSubmitted(true);
        }
    }, [user.authId]);

    const submit = async (event) => { 
        event.preventDefault();
        const formData = {
            agreement: agreementRef.current.value,
            wallet_address: wallet_addressRef.current.value,
            authId: user.authId,
        };
        POST("addwallet", formData).then((result) => {
            toast("Your Wallet Added");


            setDataSubmitted(true);

            // Save the submission status in local storage
            localStorage.setItem(`submittedData_${user.authId}`, true);

            navigate("/profile")
        });
    };

    const handleChange =()=>{
        navigate("/home")
    }
 
    return (
        <Container>
            <Row>
                <Col className="mt-5 text-center" style={{fontSize:'40px', fontWeight:'bold'}}>
                    Dear {user.name}
                </Col>
            </Row>

            <Row className="mt-5">
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Agreement Type </Form.Label>
                        <Form.Control type="text" placeholder="Enter amount" ref={agreementRef} />
                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Virtual Currency Address </Form.Label>
                        <Form.Control type="text" placeholder="Enter,.kj amount" ref={wallet_addressRef} />
                    </Form.Group>
                </Col>

                    <Button
                        onClick={submit}
                        variant="primary" type="submit">
                        Submit
                    </Button>
            </Row>
        </Container>
    );
};

export default AddWallet;
