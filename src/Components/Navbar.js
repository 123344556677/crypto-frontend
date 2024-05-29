import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const CustomNavbar = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Your Logo</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">Your Name</NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">Logout</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
