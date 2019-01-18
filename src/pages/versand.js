import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import { restaurant1, restaurant2, restaurant3 } from "../assets";

export default () => (
  <div className="content-container">
    <SubpageHeader />

    <h2>Liefer- &amp; Versandbedingungen</h2>
    <div className="subpage-content meta-info">
      <div className="text">
        <h4>Innerhalb Deutschlands</h4>
        <p>
          Bei Bestellungen bis 12 Flaschen fallen Versandkosten in Höhe von
          5,50€ an.<br />
          Ab 12 Flaschen <strong>versandkostenfrei</strong>.
        </p>
        <p>
          Bei Neukunden behalten wir uns vor die Ware erst nach Eingang des
          Kaufbetrags auf unserem Konto zu verschicken.
        </p>
        <p>
          Wir liefern in Gebinden von 6, 12 oder 18 Flaschen. Bitte
          berücksichtigen Sie das bei der Bestellung.
        </p>
        <p>
          Wir versenden die Ware in der Regel innerhalb von 5 Werktagen nach
          Eingang der Bestellung. Wir versenden Grundsätzlich mit DHL, ab 60
          Flaschen per DHL Spedition.
          <br />
          <br />
        </p>
      </div>
    </div>
  </div>
);
