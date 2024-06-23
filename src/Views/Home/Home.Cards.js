import React, { useEffect, useState } from "react";

import { Carousel } from "react-bootstrap";

import "./Home.css";

import { Link } from "react-router-dom";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { FaShareSquare } from "react-icons/fa";
import { getSliderImages } from "../../Api/Api";

const HomeCards = () => {
  const [sliderImages, setSliderImages] = useState();
  useEffect(() => {
    const fetchSliderImage = async () => {
      try {
        const response = await getSliderImages();
        setSliderImages(response?.data?.existingImage[0]?.images);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchSliderImage();
  }, []);

  return (
    <div>
      <div>
        <Carousel className="">
          {sliderImages?.map((data, index) => (
            <Carousel.Item key={index}>
              <img
                style={{ width: "100%", height: "400px" }}
                src={data?.image}
                alt="banner"
              />
            </Carousel.Item>
          ))}
          {
            // <Carousel.Item>
            //   <img
            //     style={{ width: "100%", height: "400px" }}
            //     src="/az-5.jpeg"
            //     alt="banner"
            //   />
            // </Carousel.Item>
            // <Carousel.Item>
            //   <img
            //     style={{ width: "100%", height: "400px" }}
            //     src="/az-6.jpeg"
            //     alt="banner"
            //   />
            // </Carousel.Item>
            // <Carousel.Item>
            //   <img
            //     style={{ width: "100%", height: "400px" }}
            //     src="/az-7.png"
            //     alt="banner"
            //   />
            // </Carousel.Item>
          }
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
