import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import { restaurant1, restaurant2, restaurant3 } from "../assets";

export default () => (
  <div className="content-container">
    <SubpageHeader />

    <h2>Unser Gasthaus</h2>
    <div className="subpage-content">
      <div className="image">
        <img src={restaurant1} />
        <img src={restaurant2} />
        <img src={restaurant3} />
      </div>
      <div className="text">
        <p>
          In unserem Gasthaus Lamm erbaut 1809 heißt Sie die Chefin Helene
          Müller gerne persönlich Willkommen. Wir laden Sie ein, hier eine
          kleine Pause vom hektischen Alltag zu nehmen. Bekannt ist unser Haus
          für gutbürgerliche Küche, Wildgerichte aus eigener Jagd und
          sympathischen Service.<br />
          Zahlreiche Wanderwege durch die malerische Landschaft führen häufig
          Wandergruppen zu uns. Die Gaststube mit angrenzendem Nebenzimmer
          bietet Platz für über 50 Gäste. An sonnigen Tagen lädt unser schöner
          Innenhof zum Rasten ein.<br />
          Wir würden uns freuen auch Ihnen eine erholsame Einkehr zu bereiten
          oder den passenden Rahmen für Ihre Veranstaltung und Festlichkeiten zu
          bieten.
          <br />
          <br />
          Mittwoch Ruhetag - Im Januar Betriebsferien<br />
          Samstag/Sonntag durchgehend warme Küche
          <br />
          <br />
          Unter der Woche bieten wir eine kleinere Speisenauswahl an.<br />
          Schön gelegen an der Brettach bieten wir Stellplätze für Ihr
          Wohnmobil.
        </p>
      </div>
    </div>
  </div>
);
