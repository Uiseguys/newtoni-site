import React from "react";

import vinyard1 from "../assets/images/vinyard1.jpg";
import vinyard2 from "../assets/images/vinyard2.jpg";
import vinyard3 from "../assets/images/vinyard3.jpg";
import SubpageHeader from "../components/SubpageHeader";

export default () => (
  <div className="content-container">
    <SubpageHeader />

    <h2>
      Die <em>DREI KATEGORIEN</em> unserer Weine
    </h2>
    <div className="subpage-content">
      <div className="image">
        <img src={vinyard1} />
        <img src={vinyard2} />
        <img src={vinyard3} />
      </div>
      <div className="text">
        <h4>Qualitätsweine</h4>
        <p>
          Zumeist in der Literflasche. Traditionell ausgebaut mit hohem
          Qualitätsanspruch.<br />
          Der Grundstein als solider Begleiter in jedem Moment.
        </p>

        <h4>Gutsweine</h4>
        <p>
          Das Kennzeichen dieser Weine sind Ertragsreduzierung und schonende
          Verarbeitung.<br />
          Daraus entstehen unsere vollmundigen, würzigen Weine.
        </p>

        <h4>Premiumweine</h4>
        <p>
          Diese Weine sind geprägt durch ihren An- und Ausbaustil, es sind sehr
          komplexe Weine mit Reifepotential. Die Weine unserer Premium Edition
          tragen die Namen von heimischen Greifvögeln, in Anlehnung an die Anmut
          und die Vollendung ihres Gleitfluges. Ganz wie die Vögel stehen auch
          unsere Weine im harmonischen Einklang mit der Natur.
        </p>

        <ul>
          <li>
            <em>MILAN</em> - kräftig trockener Rotwein
          </li>
          <li>
            <em>BUSSARD</em> - vollmundiger Rotwein mit milder Restsüße
          </li>
          <li>
            <em>FALKE</em> - trocken und kräftiger Weißwein
          </li>
          <li>
            <em>WEIHE</em> - Weißweinklassiker mit milder Süße
          </li>
          <li>
            <em>SPERBER</em> - Weißwein mit Bukett
          </li>
        </ul>
      </div>
    </div>
  </div>
);
