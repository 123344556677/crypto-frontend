import React from "react";
import { List, Modal, ModalBody } from "reactstrap";
import "./Modal.css";

const DynamicModal = ({ isOpen, toggle, view, title, description, value }) => {
  let content;

  switch (view) {
    case "Announcement":
      content = (
        <div>
          <List className="custom-list">
            {value?.map((data, index) => (
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
