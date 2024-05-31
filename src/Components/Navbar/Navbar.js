import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./Navbar.css";
import { logOut, refreshPage } from "../../Common";
import { getUser } from "../../Api/Api";

const CustomNavbar = () => {
  const id = localStorage.getItem('id');
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUser(id);
        setUserData(response?.data?.user);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <Navbar color="light" light expand="md">
      {
        // <NavbarBrand href="/">Your Logo</NavbarBrand>
      }
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink>
            <h3>{userData?.fname} {userData?.lname}</h3>

          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink>
          <div className="d-flex mt-2">
            <h5 className="mr-2">${userData?.balance}</h5>
            <Button variant="primary" size="sm" onClick={refreshPage}>
              Refresh
            </Button>
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={logOut}>
            <Button variant="dark" size="lg">
              Logout
            </Button>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
