import React from "react";
import "./BottomBar.css";
import { Container, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBarChart, MdOutlineSupportAgent } from "react-icons/md";
import { FaChartPie, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  return (
    <Navbar color="dark" dark fixed="bottom" className="bottom-bar">
      <NavItem className="bottom-bar-item">
        <NavLink href="/home" className="ml-3 bottom-bar-link">
          <IoMdHome className="bottom-bar-icons" />
          <br />
          <span className="link-text">Home</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="/quantify" className="ml-3 bottom-bar-link">
          <MdOutlineBarChart className="bottom-bar-icons" />
          <br />
          <span className="link-text">Quantify</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="/help" className="bottom-bar-link">
          <MdOutlineSupportAgent className="bottom-bar-icons" />
          <br />
          <span className="link-text">Support</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="/aboutUs" className="bottom-bar-link">
          <FaInfoCircle className="bottom-bar-icons" />
          <br />
          <span className="link-text">About</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="/profile" className="mr-3 bottom-bar-link">
          <CgProfile className="bottom-bar-icons" />
          <br />
          <span className="link-text">Profile</span>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default BottomBar;
