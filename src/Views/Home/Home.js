import React, { useState} from "react";
import {
  Container,
} from "react-bootstrap";

import "./Home.css";

import HomeCards from "./Home.Cards";

import HomeCoins from "./Home.coins";

import CustomNavbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const [annoucements, setAnnoucements] = useState({});


  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <CustomNavbar />
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
    </>
  );
};

export default Home;
