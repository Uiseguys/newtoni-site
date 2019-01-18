import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import { restaurant1, restaurant2, restaurant3 } from "../assets";

export default () => (
  <div className="content-container">
    <SubpageHeader />

    <h2>Aktuelles</h2>

    <div className="subpage-content news">
      <div style={{ padding: "1rem 2rem" }}>
        <span style={{ textTransform: "uppercase" }}>
          Der Blog vom Schneckenhof!
        </span>{" "}
        Begleiten Sie uns durch das Jahr im Weinberg und Keller, auf
        Weinfestesten und Veranstaltungen. Auf unserem Blog informieren wir Sie
        immer wieder was es Neues im Schneckenhof gibt:
        <a href="http://www.weingut-schneckenhof.blogspot.com/" target="_blank">
          www.weingut-schneckenhof.blogspot.com
        </a>
        <br />
        <br />
        <br />
        <br />
      </div>

      <h2 className="aktuelles">Vorschau und Termine 2018:</h2>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="day">
              28<span className="separator">+</span>29
            </span>
            <br />
            <span className="month">April</span>
          </div>

          <div className="description">
            <h4>Tag der offenen Weingüter - 360 Grad Württemberg </h4>

            <h6>Samstag 28. April und Sonntag 29. April ab 11 Uhr </h6>
            <br />
            <br />
            <p>
              Wir begrüßen Sie auf dem Schneckenhof anlässlich des "Tag der
              offenen Weingüter - 360° Württemberg" Zahlreiche Betriebe quer
              durch das ganze Anbaugebiet laden zum Besuch ein! Lernen Sie die
              Weinmacher persönlich kennen<br /> <br />
              Am Samstag und Sonntag ab 11 Uhr öffnen wir unsere Türen zum
              Weinkeller und sie bekommen einen Einblick wie unsere Weine
              hergestellt werden. Eine Auswahl unsere Weine können Sie bei einer
              Selbstverkostung in einer besonderen Lichtatmosphäre im Keller
              zwischen Fässer, Filter und Pumpen probieren.
              <br /> <br />
              Spazieren Sie doch mit uns durch die wunderschönen Weinberge und
              erfahren sie direkt vor Ort alles rund um die Sorten, die Lage,
              den Boden und den Anbau. Weinbergsführungen finden an beiden Tagen
              um 11.45 Uhr und 14.45 Uhr statt.
              <br /> <br />
              Am Sonntag spielen für Sie ab 11.30 Uhr die Weissacher
              Dorfmuskikanten . Es gibt feines aus der Küche und unsere Weine
              können sie am Weinstand im Hof probieren.
              <br /> <br />
              Mit einem kostenlosen Shuttelbus der die verschiedene Weingüter
              der Selbstvermarktenden Weingüter Brezfeld e.V. anfährt, kommen
              sie Samstag und Sonntag zwischen 11 und 19 Uhr stündlich nach
              Geddelsbach und auch wieder weiter. Der Bus fährt immer in dieser
              Runde die Weingüter an : Geddelsbach - Unterheimbach - Adolzfurt -
              Bretzfeld - Dimbach - Schwabbach - Siebeneich - Adolzfurt -
              Geddelsbach.
              <br /> <br />
              Wir freuen uns auf Ihren Besuch!
            </p>
          </div>
        </div>
      </div>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="month">28.Juni -</span>
            <span className="month">2.Juli</span>
          </div>

          <div className="description">
            <h4>Hohenloher Weindorf in Öhringen </h4>

            <h6>Donnerstag 28. Juni 2018 bis Montag 2. Juli 2018</h6>
            <br />
            <p>
              Genießen Sie unsere Weine vom Schneckenhof in malerischer Kulisse
              des Marktplatzes in Öhringen auf dem wohl schönsten Weindorf
              Deutschlands. Sie finden uns direkt am Brunnen am Stand der
              Selbstvermarktenden Weingüter.
              <br /> <br />
              Bei der feierlichen Eröffnung am Donnerstag wird traditionell der
              Weinschlüssel an einen prominenten Preisträger überreicht und die
              Weinhoheiten aus dem Hohenloher Land begrüßt. Auch der begehrte
              Weißweinpreis wird bei der Eröffnung überreicht, dessen Gewinner
              im Vorfeld durch eine Experten-Jury ermittelt werden.
              <br /> <br />
            </p>
          </div>
        </div>
      </div>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="day">6-8</span>
            <br />
            <span className="month">Juli</span>
          </div>

          <div className="description">
            <h4>Weinbrunnenfest in Vellberg</h4>
            <h6>Freitag 6. Juli bis Sonntag 8. Juli 2018</h6>
            <br />
            <br />
            <p>
              In Vellberg laden die Edelleut wieder zum Feste! Genießen sie ein
              buntes Programm mit historischem Umzug und Feuerwerk in Vellbergs
              mittelalterlichem Städtchen. Kommen Sie an unseren Stand und
              genießen Sie entspannt den spritzigen Sekt und die feinen Weine
              vom Schneckenhof !
            </p>
          </div>
        </div>
      </div>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="day">21</span>
            <br />
            <span className="month">Jul</span>
          </div>

          <div className="description">
            <h4> WEIN - ROCK - NACHT</h4>
            <h6>Samstag 21. Juli ab 19 Uhr</h6>
            <br />

            <p>
              Die erste Wein-Rock-Nacht im vergangenen Sommer war ein voller
              Erfolg! Bei tollem Wetter und super Stimmung wurde gerockt und
              gefeiert. Zusammen mit dem Weingut Birkert präsentieren wir nun
              die 2. WEIN-ROCK-NACHT. Karten gibt es für 6 € im Vorverkauf bei
              uns oder dem Weingut Birkert, der Reiffeisenbank Bretzfeld und bei
              Kober Getränkevertrieb Neuenstein. <br />
              Restkarten gibt es an der Abendkasse für 10€
              <br /> <br />
            </p>
          </div>
        </div>
      </div>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="day">25</span>
            <br />
            <span className="month">Jul</span>
          </div>

          <div className="description">
            <h4>Annâweech, die MundArt-Band aus Hohenlohe </h4>
            <h6>Mittwoch 25. Juli 2018 </h6>
            <br />
            <p>
              Zusammen mit dem Weingut Birkert präsentieren wir die Kultband aus
              dem Kochertal zu Gast im Schneckenhof! Hohenloher Lebensgefühl,
              ausgedrückt in launigen, fröhlichen, aber auch
              nachdenklich-ironischen Mundarttexten.Das ganze verpackt in
              verschiedenen Musikrichtungen von Ballade, Blues, Rock bis hin zum
              Volkslied.
              <br /> <br />
              Außer Musik gibt es Deftiges und Leichtees aus der Küche und
              natürlich die feinen Tröpfchen der beiden Weingüter
              <br /> <br />
              Karten gibt es für 12 € im Vorverkauf bei uns oder dem Weingut
              Birkert, Abendkasse für 15€.
              <br /> <br />
            </p>
          </div>
        </div>
      </div>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="day">3</span>
            <br />
            <span className="month">Okt</span>
          </div>

          <div className="description">
            <h4>Neuer Wein – Party </h4>
            <p>
              Neuer Wein und Zwiebelkuchen
              <br /> <br />
            </p>
          </div>
        </div>
      </div>

      <div className="c-news">
        <div className="item">
          <div className="date">
            <span className="day">
              1<span className="separator">+</span>2
            </span>
            <br />
            <span className="month">Dez</span>
          </div>

          <div className="description">
            <h4>Geddelsbacher Adventszauber</h4>
            <h6>
              am 1. Adventwochenende <br />
              Samstag 1. Dez. ab 15.00 Uhr, Sonntag 2. Dez. ab 11.00 Uhr{" "}
            </h6>
            <br />
            <p>
              Es hat sich herumgesprochen, dass in Geddelsbach ein kleiner aber
              feiner Weihnachtsmarkt stattfindet... Rund um den großen
              Weihnachtsbaum auf unserem Weingut bieten Ihnen die Geddelsbacher
              Bürger und Vereine Hausgemachtes. Die Landfrauen verwöhnen unsere
              Gäste mit Kaffee &amp; Kuchen und bieten selbstgemachte Marmelade
              zum Kauf an. Die Freiwillige Feuerwehr kümmert sich am Grill um
              das leibliche Wohl. Getränke aller Art findet man am Ständle des
              MGV und natürlich bieten wir an unserem Weinstand Weine und Sekt
              vom Schneckenhof. Auch der Glühwein, der natürlich nicht fehlen
              darf, kommt aus eigener Produktion vom Weingut Müller.
              <br /> <br />
              Mit dabei ist auch der Geddelsbacher Bienenhof, die heimischen
              Jäger mit Wildwurst, die Geddelsbacher Jungscharler backen
              Waffeln, der Nikolaus kommt zu Besuch mit Geschenken für unsere
              kleinen Gäste, die Posaunen werden erklingen und die Kinder des
              Geddelsbacher Kinderchors Pipsgöckel singen Weihnachtslieder. Es
              gibt allerlei Ständ und die Kreative aus unserer Region bieten
              Gebasteltes, Gestricktes und Genähtes an.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
