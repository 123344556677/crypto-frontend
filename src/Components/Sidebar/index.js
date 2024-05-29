import React, { useState } from "react";
import { Link } from "react-router-dom";

import './index.css'

import { AiFillDashboard, AiOutlineUserAdd  } from 'react-icons/ai';

import { Auth } from "../../context/Auth.Context";

const SideBar = () => {


  const auth = Auth();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const [active, setActive] = useState(1);

  const [activebutton, setActiveButton] = useState();



  return (
    <div className="sidebar col-3">
      <img src="/Family Loan Insurance Logo.png" style={{ height: '150px', marginTop: '2rem', width: '150px', marginLeft: '2rem' }} />
      <ul className="list-unstyled user-menubar" style={{ paddingLeft: '1.5rem', paddingTop: '2rem' }}>

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/dashboard" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> Deposit </p>
            </span>
          </Link>
        </li>

            <div className='menu-item' style={{ fontSize: '12px', fontWeight: 'bold' }}>
              <div className='menu-content pt-8 pb-2'>
                <span className='menu-section text-muted text-uppercase fs-8 ls-1'> Widarwal </span>
              </div>
            </div>

      </ul>
    </div>
  );
};

export default SideBar;
