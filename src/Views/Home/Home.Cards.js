import React from "react";

import {
  Carousel,
} from "react-bootstrap";

import "./Home.css";

import { Link } from "react-router-dom";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { FaShareSquare } from "react-icons/fa";

const HomeCards = () => {
  return (
    <div>
      <div>
        <Carousel className="">
          <Carousel.Item>
            <img
              style={{ width: "100%", height: "400px" }}
              src="/image 2.png"
              alt="banner"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ width: "100%", height: "400px" }}
              src="/az-2.jpeg"
              alt="banner"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%", height: "400px" }}
              src="/az-3.jpeg"
              alt="banner"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div
        className="text-center"
        style={{ marginBottom: "150px", marginTop: "50px" }}
      >
        <div className="home-container">
          <div className="home-card">
            <Link to="/recharge" style={{ textDecoration: "none" }}>
              <div className="card-content">
                <PiHandDepositFill className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Deposit</h5>
            </Link>
          </div>

          <div className="home-card">
            <Link to="/withdrawal" style={{ textDecoration: "none" }}>
              <div className="card-content">
                <PiHandWithdrawFill className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Withdraw</h5>
            </Link>
          </div>

          <div className="home-card">
            <Link to="/team" style={{ textDecoration: "none" }}>
              <div className="card-content">
                <RiTeamFill className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Team</h5>
            </Link>
          </div>

          <div className="home-card">
            <Link to="/invite" style={{ textDecoration: "none" }}>
              <div className="card-content">
                <FaShareSquare className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Share</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
