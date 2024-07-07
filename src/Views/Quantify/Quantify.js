import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Table } from "reactstrap";
import "./Quantify.css";
import {
  getCryptoRates,
  getQuantizationData,
  getUser,
  getUserClicks,
  getUserLevel,
} from "../../Api/Api";
import { errorAlert } from "../../Components/Alerts/Alerts";
import { roundToOneDecimal } from "../../Common";

const Quantify = () => {
  const [cryptoGainers, setCryptoGainers] = useState();
  const [cryptoLosers, setCryptoLosers] = useState();
  const [cryptoView, setCryptoView] = useState("gainers");
  const [userClicks, setUserClicks] = useState();
  const [maxClicks, setMaxClicks] = useState();
  const [balance, setUserBalance] = useState();
   const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLevel = async () => {
      try {
        const response = await getUserLevel();
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchQuantizationData = async () => {
      try {
        const response = await getQuantizationData();
        setUserClicks(response?.data?.quantization?.clicks);
        setMaxClicks(response?.data?.quantization?.maxClicks);
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
    const fetchUserInfo = async () => {
      try {
        const response = await getUser(id);
        setUserBalance(response?.data?.user?.balance);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    fetchUserLevel();
    fetchQuantizationData();
    fetchCryptoRates();
    fetchUserInfo();
  }, []);

  const handleQuantify = async () => {
    try {
      const response = await getUserClicks();
      setUserClicks(response?.data?.clicks);
      setUserBalance(response?.data?.balance)
    } catch (error) {
      console.error("Error fetching approved cash deposits:", error);
      errorAlert(error?.response?.data?.err);
    }
  };
  return (
    <div className="main-div">
      <br />
      <span className="back-icon" onClick={() => navigate("/Home")}>
        <IoMdArrowBack />
      </span>
      <div className="ml-3">
        <Row className="w-100 no-gutters justify-content-center mt-5">
          <Col xl={12} sm={12} md={12}>
            <div className="d-flex justify-content-center">
              <img
                className="logo mt-3"
                src="/logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="text-center text-white mt-2">Quantify</h2>
            <p className="login-text mt-2 text-center">
              Tap to gain your balance and increase your level!
            </p>
            <hr />
            <h3 className="mr-2 text-right mb-3" style={{ color: "rgb(176, 159, 65)" }}>
                ${roundToOneDecimal(balance)}
              </h3>
            <Card className="custom-card">
              <div className="lottie-background">
                <iframe
                  title="loading"
                  src="https://lottie.host/embed/86e6c5aa-2e54-4b45-a397-fe79356124c2/E49Ll5Yevl.json"
                  className="lottie-iframe"
                ></iframe>
              </div>
              <div className="card-content mt-3">
                <h3 className="text-left">Single Start Quantization</h3>
                <div style={{ float: "right" }} className="mt-3 mb-3">
                  <h5 className="text-center">
                    ({userClicks} {maxClicks>0 && `/ ${maxClicks}`})
                  </h5>
                  <button
                    className="gradient-button mt-2"
                    onClick={handleQuantify}
                  >
                    Click to Quantify
                  </button>
                </div>
              </div>
            </Card>
            <h6 className="mt-1" style={{ color: "grey" }}>
              Note: Please check your balance once you completed your daily
              clicks!
            </h6>
            <hr />
            <div className="d-flex">
              <h3
                className="coins-button"
                onClick={() => setCryptoView("gainers")}
                style={{
                  borderBottom: cryptoView === "gainers" && "2px solid white",
                }}
              >
                Gainers
              </h3>
              <h3
                className="coins-button ml-3"
                onClick={() => setCryptoView("losers")}
                style={{
                  borderBottom: cryptoView === "losers" && "2px solid white",
                }}
              >
                Losers
              </h3>
            </div>
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
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Quantify;
