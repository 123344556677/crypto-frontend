import React, { useEffect, useState } from "react";
import { List, Modal, ModalBody } from "reactstrap";
import "./Modal.css";
import { getAnnouncement } from "../../Api/Api";

const DynamicModal = ({ isOpen, toggle, view, title, description, value }) => {
  const [announcement, setAnnouncement] = useState();
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await getAnnouncement();
        console.log(response,"announce response=--->")
        setAnnouncement(response?.data?.announcements);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    fetchAnnouncement()
  }, []);
  let content;
  console.log(announcement,"announcement values--->")

  switch (view) {
    case "Announcements":
      content = (
        <div>
          <List className="custom-list">
            {announcement?.map((data, index) => (
              <li className="p-1" key={index}>
                {data?.announcement}
              </li>
            ))}
          </List>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="d-flex justify-content-center">
        <img
          className="logo mt-3"
          src="/Family Loan Insurance Logo.png"
          alt="Logo"
        />
      </div>
      <h2 className="text-center text-white mt-2">{title}</h2>
      <p className="login-text mt-2 text-center">{description}</p>
      <hr style={{ color: "grey", height: "2px" }} />
      <ModalBody>{content}</ModalBody>
    </Modal>
  );
};

export default DynamicModal;
