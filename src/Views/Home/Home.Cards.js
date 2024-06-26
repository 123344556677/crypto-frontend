import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { FaShareSquare } from "react-icons/fa";
import { getAnnouncement, getSliderImages, getUnitedHealthStockRate} from "../../Api/Api";
import { Card, Col, Row } from "reactstrap";
import DynamicModal from "../../Components/Modals/Modal";

const HomeCards = () => {
  const [sliderImages, setSliderImages] = useState();
  const [stockInfo, setStockInfo] = useState();
  const [announcement, setAnnouncement] = useState();
   const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState("");
  const [modalValue, setModalValue] = useState(null);
  useEffect(() => {
    const fetchSliderImage = async () => {
      try {
        const response = await getSliderImages();
        setSliderImages(response?.data?.existingImage[0]?.images);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchUnitedHealth = async () => {
      try {
        const response = await getUnitedHealthStockRate();
        setStockInfo(response?.data?.currentRate);
        console.log(response,"stock response---->")
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchAnnouncement = async () => {
      try {
        const response = await getAnnouncement();
        setAnnouncement(response?.data?.announcements);
        setModalValue(response?.data?.announcements)
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const openModal = () => {
    setIsOpen(true);
    setCurrentView("Announcements");
    setModalValue(announcement);
    setDescription("Get to know about latest news!")
    setTitle("Announcement");
  };

    fetchSliderImage();
    fetchUnitedHealth()
    fetchAnnouncement()
    openModal()
  }, []);
  return (
    <div>
      <div>
        <Carousel className="">
          {sliderImages?.map((data, index) => (
            <Carousel.Item key={index}>
              <img
                style={{
          width: "100%",
          height: "400px",
        }}
                src={data?.image}
                alt="banner"
                className="image-fluid"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div
        className="text-center"
        style={{ marginBottom: "50px", marginTop: "50px" }}
      >
        <div className="home-container">
          <div className="home-card">
            <Link to="/recharge" style={{ textDecoration: "none" }}>
              <div className="card-content-home">
                <PiHandDepositFill className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Deposit</h5>
            </Link>
          </div>

          <div className="home-card">
            <Link to="/withdrawal" style={{ textDecoration: "none" }}>
              <div className="card-content-home">
                <PiHandWithdrawFill className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Withdraw</h5>
            </Link>
          </div>

          <div className="home-card">
            <Link to="/team" style={{ textDecoration: "none" }}>
              <div className="card-content-home">
                <RiTeamFill className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Team</h5>
            </Link>
          </div>

          <div className="home-card">
            <Link to="/invite" style={{ textDecoration: "none" }}>
              <div className="card-content-home">
                <FaShareSquare className="home-icons" />
              </div>
              <h5 className="text-white mt-1">Share</h5>
            </Link>
          </div>
        </div>
        <div className="ml-3">
        <Row className="w-100">
      <Col xl={12}>
      <Card className="custom-card">
      <div className="d-flex m-2">
      <img src="/unitedLogo.png" alt="logo" style={{height:"40px",width:"40px"}}/>
      <h2 className="text-left ml-1 text-white">{stockInfo?.symbol||"UNO"}</h2>
      </div>
      <h3 className="text-center text-white">{stockInfo?.price||0}</h3>
      <p className="text-center" style={{ color: stockInfo?.change < 0 ? 'red' : 'green' }}>
        {stockInfo?.change||0}
      </p>
      </Card>
      </Col>
      </Row>
      </div>
      </div>
      <DynamicModal
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
        view={currentView}
        title={title}
        description={description}
        value={modalValue}
      />
      
    </div>
  );
};

export default HomeCards;
