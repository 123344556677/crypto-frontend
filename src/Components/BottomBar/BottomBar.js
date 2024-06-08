import React from "react";
import "./BottomBar.css";
import { Container, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBarChart, MdOutlineSupportAgent } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  return (
    <Navbar color="dark" dark fixed="bottom" className="bottom-bar">
      <NavItem className="bottom-bar-item">
        <NavLink href="/home" className="ml-3 bottom-bar-link" >
          <IoMdHome className="bottom-bar-icons" />
          <br />
          <span>Home</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="#about" className="bottom-bar-link">
          <FaChartPie className="bottom-bar-icons" />
          <br />
          <span>Quantity</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="#about" className="bottom-bar-link">
          <MdOutlineBarChart className="bottom-bar-icons" />
          <br />
          <span>Quantity</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="/help" className="bottom-bar-link">
          <MdOutlineSupportAgent className="bottom-bar-icons" />
          <br />
          <span>Customer Support</span>
        </NavLink>
      </NavItem>
      <NavItem className="bottom-bar-item">
        <NavLink href="#contact" className="mr-3 bottom-bar-link">
          <CgProfile className="bottom-bar-icons" />
          <br />
          <span>Profile</span>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default BottomBar;
