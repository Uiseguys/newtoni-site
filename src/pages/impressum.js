import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import { restaurant1, restaurant2, restaurant3 } from "../assets";

export default () => (
  <div className="content-container">
    <SubpageHeader />

    <h2>Impressum</h2>
    <div className="subpage-content meta-info">
      <div className="text">
        <p>
          Verantwortlich für die Inhalte unter www.weingut-schneckenhof.de:<br />
          <br />
          <span className="centered">
            Schneckenhof - Weingut Müller<br />
            Alexandra Siller<br />
            <br />
            Untere Brettachtalstraße 7<br />
            74626 Bretzfeld-Geddelsbach
            <br />
            <br />
            Telefon: 07945-2292
            <br />
            Fax: 07945-8503
            <br />
            E-Mail:{" "}
            <a href="mailto:info@weingut-schneckenhof.de">
              info@weingut-schneckenhof.de
            </a>
            <br />
            <br />
            USt-IdNr.: DE 30687128
          </span>
        </p>

        <h4>Haftungsausschluss</h4>

        <h5>Haftung für Inhalte</h5>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1{" "}
          <span className="caps">TMG</span> für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10{" "}
          <span className="caps">TMG</span> sind wir als Diensteanbieter jedoch
          nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
          oder Sperrung der Nutzung von Informationen nach den allgemeinen
          Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
          jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
          Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <h5>Haftung für Links</h5>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>

        <h5>Urheberrecht</h5>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
        </p>

        <h5>Hinweis zu Streitbeilegungsverfahren</h5>
        <p>
          Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle sind wir nicht verpflichtet und
          grundsätzlich nicht bereit.
        </p>
      </div>
    </div>
  </div>
);
