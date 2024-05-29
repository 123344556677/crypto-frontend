import React, { useRef, useState } from "react"

import { Container, Row, Col } from "react-bootstrap"

import "./index.css"

import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { WhatsappShareButton, FacebookShareButton } from 'react-share';

const Invite = () => {

  const linkRef = useRef(null);

  const [buttonText, setButtonText] = useState("Copy Link");

  const handleCopy = () => {
    const linkInput = linkRef.current;
    linkInput.select();
    document.execCommand("copy");
    // Update button text after link is copied
    setButtonText("Link Copied");
    // Reset button text after a short delay
    setTimeout(() => {
      setButtonText("Copy Link");
    }, 2000); // Change back to "Copy Link" after 2 seconds
  };

  const linkToCopy = "https://uhcstock.com/uhcs/01"; // Your link to copy


  const [qrCodeUrl] = useState('/qr.jpg'); // URL of the QR code image

  const shareQRCode = () => {
    const shareText = 'Check out this QR code!'; // Text to accompany the shared QR code

    // Share on Facebook
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(qrCodeUrl)}`;
    // Share on Twitter
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(qrCodeUrl)}&text=${encodeURIComponent(shareText)}`;
    // Share on WhatsApp
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText + '\n' + qrCodeUrl)}`;

    // Open share links in new tabs
    window.open(facebookUrl, '_blank');
    window.open(twitterUrl, '_blank');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container> 
      <div className="mt-5">
        <span style={{ fontSize: '25px', fontWeight: "bold" }}>
          Invitation Link
        </span>

        <div className="copy-link-container">
          <input
            type="text"
            defaultValue={linkToCopy}
            readOnly
            ref={linkRef}
            className="link-input"
          />
          <button onClick={handleCopy} className="copy-button">{buttonText}</button>
        </div>


      </div>

      <div className="card mt-5 mb-5">
        <div className="card-content">
          <h2> Invitation QR Code </h2>
          <img src="/qr.jpg" alt="Card" className="card-img" />

          <button style={{backgroundColor:'#7209B7'}} className="oval-button" onClick={shareQRCode}>
            Share QR code
          </button>

        </div>
      </div>
    </Container>
  )
}

export default Invite