import React from "react";
import logo from "../assets/images/logo_visual.svg";
const Footer = () => (
  <footer>
    <div className="branding">
      {/* <img src={logo} /> */}
      <p>&copy; 2017 Weingut Müller</p>
    </div>
    <nav className="footer-nav">
      <ul>
        <li className="menu-item menu-item-143">
          <a href="/">
            <span>Startseite</span>
          </a>
        </li>
        <li className="menu-item menu-item-147">
        <a href="/newsletter">
          
          <span >News Letter</span>
        </a>
      </li>
        <li className="menu-item menu-item-147">
          <a href="/artist-books">
            <span>Shop</span>
          </a>
        </li>
       
      </ul>
    </nav>
  </footer>
);
export default Footer;
