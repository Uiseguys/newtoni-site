import React from "react";
import Link from "gatsby-link";
import { Trans, withI18n } from "@lingui/react";

import logo from "../assets/images/logo.svg";
import isabella_imre from "../assets/images/isabella_imre.jpg";
import ueber_die_gefahren_beim_beamen from "../assets/images/ueber_die_gefahren_beim_beamen.jpg";
import eroeffnung_beamen_2 from "../assets/images/eroeffnung_beamen_2.jpg";
import eroeffnung_beamen_3 from "../assets/images/eroeffnung_beamen_3.jpg";
import eroeffnung_beamen_6 from "../assets/images/eroeffnung_beamen_6.jpg";
import malte_lochstedt_e_ers from "../assets/images/malte_lochstedt_e_ers.jpg";
import linda_reif from "../assets/images/linda_reif.jpg";

import config from "./index.json";

const Teaser = props => (
  <div className="teaser">
    <div className="icon">
      <span className={"icon-i_" + props.data.icon} />
    </div>
    <h2>{props.data.title}</h2>
    <h3>{props.data.subtitle}</h3>
    <p>{props.data.text} </p>
  </div>
);

const IndexPage = ({ i18n }) => (
  <div  className="content-container" style={{ backgroundColor: "white" }}>
    <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <img src={logo} />
      <br />
    </div>
    <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <br /><br /><br />
      <img src={isabella_imre} style={{ maxWidth: '100vw' }} />
    </div>

    <div style={{ width: '683px', margin: '0 auto', fontSize: '18px' }}>

      <div style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: '18px' }}>
        <strong>Room to Move</strong>
        <br /><br />
        by Isabella Kohlhuber, Imre Nagy<br />
        <br />
        Freitag, 15. Dezember 2017, 19 Uhr<br />
        <br />
        Salon für Kunstbuch 21er Haus<br />
        Arsenalstraße 1, 1030 Wien<br />
        <br /><br />
        <a href="http://www.salon-fuer-kunstbuch.at" target={"_blank"}>www.salon-fuer-kunstbuch.at</a>
        <br /><br />
      </div>
    </div>
    <div style={{ width: '683px', margin: '0 auto', fontSize: '18px' }}>
      <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <br /> <br /> <br />
        <img src={linda_reif} />
      </div >
      <div style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: '18px' }}>
        <br /> <br /> <br />
        <strong>MILITARY BOAT DISAPPEARING IN DARKNESS</strong>
        <br /> <br />
        by Linda Reif
  <br /> <br />
        Freitag, 15. Dezember 2017, 18 Uhr
  < br /> <br />
        Lazy Life < br />
        Burggasse 44 < br />
        1070 Wien < br /> <br />
        <a href="http://www.lazylife.at" target="_blank">www.lazylife.at</a>
        <br /> <br />
      </div >
    </div >

    <div style={{ width: '683px', margin: '0 auto', fontSize: '18px' }}>
      <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <br /> <br /> <br />
        <img src={ueber_die_gefahren_beim_beamen} />
      </div >

      <div>

        <div>
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <strong>über die Gefahren beim Beamen</strong>
            <br />
            Steffi Alte, Eva Seiler, Nikolaus Ruchnewitz &amp; Verlag Danny Grassow
            <br />
            <strong>Samstag, 30. September</strong>
            <br />
            18-21 Uhr
            <br />
            <strong>@ </strong>
            <br />
            <a href="http://www.nousmoules.net" target="_blank">N O U S M O U L E S</a>
            <br />
            <a href="http://www.artfoundation.at" target="_blank">℅ KUNSTBUERO</a>
            <br />
            <br />
            <a href="http://www.nousmoules.net" target="_blank" style={{ backgroundColor: 'red', color: 'blue' }}>www.nousmoules.net</a>
            <br />
            <a style={{ backgroundColor: 'red', color: 'blue' }}
              href="https://maps.google.com/?q=Schadekgasse+6,+1060+Wien,+Österreich" target="_blank">
              Schadekgasse 6-8
          /1060 Wien</a>
            <br />
            <a style={{ backgroundColor: 'red', color: 'blue' }}
              href="mailto: mail@nousmoules.net" target="_blank">
              mail@nousmoules.net</a>
            <br /> <br />
          </div>
          <div style={{ marginTop: '0.0px', marginBottom: '0.0px', textAlign: 'left' }}>
            S: ja<br />
            aber<br />
            also<br />
            ich mein aber eigentlich muss man ja dann fragen <br />
            gibt es überhaupt eine seele<br />
            also bevor man fragt<br />
            kann man überhaupt beamen<br />
            muss man eigentlich<br />
            und dann ist man so bei religion<br />
            und so gott<br />
            und also eben mit den transkriptionsfehlern<br />
            also und der fliege<br />
            und<br />
            ähm<br />
            wenn sich das dann vermischt<br />
            und dann hat man ja aber nicht mehr die eigenen erinnerungen sondern die erinnerungen der fliege
              dann...<br />
            E: ja<br />
            S:...aber das ist ja dann interessant...<br />
            E: ob man die dann überhaupt unterscheiden kann,<br />
            also<br />
            ob man das dann selber auch interessant findet
              <br /><br /><br /><br />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p>
              < strong > über die Gefahren beim Beamen</strong>
              <br />
              Ausgehend von den&nbsp;Überresten der&nbsp;beiden&nbsp;Performances:&nbsp;<i>&nbsp;</i>
              <br /><br />
              <i>über die Gefahren&nbsp;beim&nbsp;Beamen&nbsp;(2010)&nbsp;</i>und&nbsp;<i>es ist Zeit wir müssen
        den Präsidenten&nbsp;anrufen (2011)</i>
              <br /><br />
              eine Edition von Steffi Alte, Eva Seiler und Nikolaus Ruchnewitz.
        <br />
              <br />
              <a href="http://www.danny-grassow.com" target="_blank"
                data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.danny-grassow.com&amp;source=gmail&amp;ust=1506444511013000&amp;usg=AFQjCNFtyEIEw0mo0y6g5SgENKqSrgUXSw">www.danny-grassow.com</a>
            </p>

          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <br /> <br />
        <img width="683" src={eroeffnung_beamen_2} />
        <img width="683" src={eroeffnung_beamen_3} />
        <img width="683" src={eroeffnung_beamen_6} />
        <br /> <br /> <br />
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        <br /><br /> <br /> <br /> <br />
      </div >

      <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <img src={malte_lochstedt_e_ers} />
      </div>
      <div>
        <p>
          <br /><br />
          <b>e ers</b><br /><br />
          In the pedestrian zone I only entered the closed Sinn Le er department store for a short time. Stagnant
          moving stairways, empty product displays, old brand banners, sockets
          without use. Architecture and objects stick out. Best of the rest. Everything left over became
          fetishized,
          standing for something else. Outside I strolled around the building.
          All signs and logos were altered, now meaning literally empty sense. All shop windows were decorated
          with
          left over stuff, someone seemed to still feel responsible. In a close
          by drugstore I bought two single-use cameras, came back and took these pictures.
  </p>
      </div>
      <div style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: '18px' }}>
        <br /> <br /> <br />
        <br />
        Malte Lochstedt & Verlag Danny Grassow<br />
        & <a href="http://www.mnm-ltd.com/" target="_blank">SHOP MIXX Release MNM Ltd.</a><br /><br />

        Donnerstag, 15. Dezember 2016<br />
        18-21 Uhr<br /><br />
        @<a href="http://www.mottodistribution.com/" target="_blank">MOTTO BERLIN</a><br />
        Skalitzer Str. 68<br />
        im Hinterhof<br />
        10997 Berlin<br />
        U1 Schlesisches Tor<br />

      </div>




      <div style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: '18px' }}>



        <br /> <br /> <br /> <br />
        Alle Publikationen können per E-Mail bestellt werden.<br /> <br />
        <a href="mailto:kontakt@danny-grassow.com">kontakt@danny-grassow.com</a>
        <br /> <br /> <br />
      </div >
    </div >

  </div >
);

export default withI18n()(IndexPage);
