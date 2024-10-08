import React from "react";
import "./Footer.css";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/images/moviepassa-logo.svg";

const Footer = () => {
  // const navigate = useNavigate();
  // const toHome = () => {
  //   navigate("/");
  // };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-section-title">MoviePassa</h3>
          {/* <img src={logo} alt="Logo" className="nav-footer--icon" onClick={toHome}/> */}
          <ul className="footer-section-list">
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Terms of Use</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Contact</h3>
          <ul className="footer-section-list">
            <li>Email: info@moviepassa.com</li>
            <li>Phone: 555-555-5555</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Follow Us</h3>
          <ul className="footer-section-list">
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© Copyright MoviePassa 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
