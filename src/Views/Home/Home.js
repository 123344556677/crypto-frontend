import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Carousel, Form, FormControl, Modal } from 'react-bootstrap';

import "./Home.css"

import HomeCards from "./Home.Cards";

import HomeCoins from "./Home.coins";

import { GET } from "../../apicontroller/ApiController"


const Home = () => {

    const [showModal, setShowModal] = useState(false);

    const [annoucements, setAnnoucements] = useState({});

    // useEffect(() => {
        
    //     GET(`announcements`).then((result) => {
    //         setAnnoucements(result)
    //     })

    //     setShowModal(true); 


    // }, []);

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container>

            <HomeCards />

            <div className="mt-5 mb-5">
                <HomeCoins />
            </div>

            
            {/* Modal */}
            {
            // <Modal show={showModal} onHide={handleCloseModal}>
            //     <Modal.Header closeButton>
            //         <Modal.Title className="text-center"> Annoucement </Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body>
            //         {/* Modal content */}
            //         <p>
            //             {annoucements.announcement}
            //         </p>
            //     </Modal.Body>
            // </Modal>
            }

        </Container>
    )
}

export default Home