import React from "react";
import "./BottomBar.css";
import { Container, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBarChart, MdOutlineSupportAgent } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";

const BottomBar = () => {
  return (
    <Navbar color="dark" dark fixed="bottom" className="bottom-bar">
      <NavItem>
        <NavLink href="#home" className="ml-3">
          <IoMdHome className="bottom-bar-icons" />
          <br />
          <span>Home</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#about">
          <FaChartPie className="bottom-bar-icons" />
          <br />
          <span>Home</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#about">
          <MdOutlineBarChart className="bottom-bar-icons" />
          <br />
          <span>Quantity</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#services">
          <MdOutlineSupportAgent className="bottom-bar-icons" />
          <br />
          <span>Customer Support</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#contact" className="mr-3">
          <CgProfile className="bottom-bar-icons" />
          <br />
          <span>Profile</span>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default BottomBar;
