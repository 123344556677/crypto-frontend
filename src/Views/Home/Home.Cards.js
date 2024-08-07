import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { FaShareSquare } from "react-icons/fa";
import { getCryptoRates, getSliderImages, getUnitedHealthStockRate } from "../../Api/Api";
import { Card, Col, Row, Table } from "reactstrap";
import DynamicModal from "../../Components/Modals/Modal";

const HomeCards = () => {
  const [cryptoGainers, setCryptoGainers] = useState();
  const [cryptoLosers, setCryptoLosers] = useState();
  const [cryptoView, setCryptoView] = useState("gainers");
  const [sliderImages, setSliderImages] = useState();
  const [stockInfo, setStockInfo] = useState();
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
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchCryptoRates = async () => {
      try {
        const response = await getCryptoRates();
        setCryptoGainers(response?.data?.topGainers);
        setCryptoLosers(response?.data?.topLosers);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const openModal = () => {
      setIsOpen(true);
      setCurrentView("Announcements");
      // setModalValue(announcement);
      setDescription("Get to know about latest news!");
      setTitle("Announcement");
    };
    fetchCryptoRates();
    fetchSliderImage();
    fetchUnitedHealth();
    openModal();
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
        <hr />
        <div className="ml-3">
          <Row className="w-100">
            <Col xl={12}>
              <Card className="custom-card">
                <div className="d-flex m-2">
                  <img
                    src="/unitedLogo.png"
                    alt="logo"
                    style={{ height: "30px", width: "30px" }}
                  />
                  <h4 className="text-left ml-1 text-white">
                    {stockInfo?.symbol || "UNO"}
                  </h4>
                </div>
                <h3 className="text-center text-white">
                  {stockInfo?.price || 0}
                </h3>
                <p
                  className="text-center"
                  style={{ color: stockInfo?.change < 0 ? "red" : "green" }}
                >
                  {stockInfo?.change || 0}
                </p>
              </Card>
            </Col>
          </Row>
          <Table borderless className="coin-table" responsive>
              <tbody>
                {cryptoView === "gainers"
                  ? cryptoGainers?.map((data, index) => (
                      <tr key={index}>
                        <td> <h5>{index + 1}</h5></td>
                        <td><h5>{data?.name}</h5></td>
                        <td><h5>{data?.price}</h5></td>
                        <td
                          style={{
                            color:
                              data?.volume_change_24h < 0 ? "red" : "green",
                          }}
                        >
                          <h5>{data?.volume_change_24h}</h5>
                        </td>
                      </tr>
                    ))
                  : cryptoLosers?.map((data, index) => (
                      <tr key={index}>
                        <td><h5>{index + 1}</h5></td>
                        <td><h5>{data?.name}</h5></td>
                        <td><h5>{data?.price}</h5></td>
                        <td
                          style={{
                            color:
                              data?.volume_change_24h < 0 ? "red" : "green",
                          }}
                        >
                          <h5>{data?.volume_change_24h}</h5>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
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
