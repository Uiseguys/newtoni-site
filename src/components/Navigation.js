import React from "react";
import logo from "../assets/images/books.ico";
const Navigation = () => (
  <nav className="main-navigation">
    <ul>
      <li>
        <a href="/">
          <span className="icon-i_logo-05" />
          <span className="label">Startseite</span>
        </a>
      </li>

      <li className="active">
        <a href="/artist-books">
          <span className="">
            <img src={logo} style={{    width: "29px"}}/>
          </span>
          <span className="label">Shop</span>
        </a>
      </li>

      <li>
        <a href="/newsletter">
          <span className="icon-i_news" />
          <span className="label">News Letter</span>
        </a>
      </li>


    </ul>
  </nav>
);
export default Navigation;
