import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./Navbar.css";
import { logOut, refreshPage, roundToOneDecimal } from "../../Common";
import { getUser } from "../../Api/Api";
import { IoIosRefresh,} from "react-icons/io";

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
    <Navbar color="dark" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink>
            <h3 className="text-white">{userData?.fname} {userData?.lname}</h3>
          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink>
          <div className="d-flex mt-2">
            <h4 className="mr-2" style={{color:"rgb(176, 159, 65)"}}>${roundToOneDecimal(userData?.balance)}</h4>
            <IoIosRefresh className="refresh-icon" onClick={refreshPage}/>
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={logOut}>
            <Button outline size="lg" className="">
              Logout
            </Button>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
