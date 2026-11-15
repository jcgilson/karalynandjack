import { useState } from "react";
import { Link } from "react-router-dom";
import BoatMap from "../components/BoatMap";
import Reveal from "../components/Reveal";
import { EVENTS } from "../content";
import { SIGHTS, BOARDING, LINKS, googleMapsUrl } from "../data/welcomeDinner";

export default function ItineraryPage() {
  const [activeSight, setActiveSight] = useState(null);

  return (
    <main className="itinerary-page">
      <header className="itin-hero">
        <div className="tint tint--itinerary">
          <img className="bg-media" src="/assets/img/itinerary-bg.jpg" alt="" />
        </div>
        <div className="grain" />
        <Link to="/" className="back-link">
          ← Karalyn &amp; Jack
        </Link>
        <Reveal className="travel-hero-inner">
          <h1 className="title-caps">Itinerary</h1>
          <p className="script-sub">timeline of events</p>
          <p className="travel-hero-meta">June 8 &amp; 9, 2027 · Rapallo, Portofino &amp; Zoagli</p>
        </Reveal>
      </header>

      {/* Welcome dinner */}
      <section className="welcome" id="welcome-dinner">
        <div className="welcome-inner">
          <Reveal as="header" className="day-head">
            <p className="day-date">Tuesday, June 8</p>
            <h2 className="heading">Welcome Dinner</h2>
            <p className="script-sub">an evening on the water</p>
          </Reveal>

          <div className="welcome-grid">
            <Reveal className="welcome-copy">
              <dl className="welcome-facts">
                <div><dt>When</dt><dd>6 – 9 PM</dd></div>
                <div>
                  <dt>Boarding</dt>
                  <dd>
                    {BOARDING.name}, Lungomare Vittorio Veneto ·{" "}
                    <a href={googleMapsUrl()} target="_blank" rel="noopener noreferrer">
                      Google Maps
                    </a>
                  </dd>
                </div>
                <div><dt>Food</dt><dd>Pizza, pasta &amp; wine</dd></div>
              </dl>
              <p>
                We’ll kick off the celebration on the water with a boat ride from Bruno di Lorenzi. We board at the ferry pier in the middle
                of Rapallo’s seafront promenade and cruise the Golfo del Tigullio, taking in Santa Margherita Ligure and Portofino from the
                water along the route of the{" "}
                <a href={LINKS.line1} target="_blank" rel="noopener noreferrer">
                  Line 1 ferry
                </a>
                . We’ll stay aboard the whole evening.
              </p>
              <p>We’ll provide some food — pizza, pasta, and wine — so come hungry.</p>
              <p className="welcome-note">
                Boats run in favorable weather and sea conditions. Rapallo is one stop from Zoagli by train. See the{" "}
                <a href={LINKS.boardingPoint} target="_blank" rel="noopener noreferrer">
                  boarding point details
                </a>
                .
              </p>

              <h3 className="sights-title">Sights along the route</h3>
              <ol className="sights">
                {SIGHTS.map((s, i) => (
                  <li
                    key={s.name}
                    className={activeSight === i ? "is-active" : ""}
                    onMouseEnter={() => setActiveSight(i)}
                    onMouseLeave={() => setActiveSight(null)}
                  >
                    <span className="sight-num">{i + 1}</span>
                    <div>
                      <p className="sight-name">
                        {s.name} <span>{s.where}</span>
                      </p>
                      <p className="sight-text">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="welcome-map">
              <BoatMap activeSight={activeSight} onSelectSight={setActiveSight} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Wedding day */}
      <section className="itinerary" id="wedding-day">
        <div className="tint tint--itinerary">
          <img className="bg-media" src="/assets/img/itinerary-bg.jpg" alt="" />
        </div>
        <div className="grain" />
        <div className="itinerary-inner">
          <Reveal as="header" className="section-title">
            <p className="day-date day-date--light">Wednesday, June 9</p>
            <h2 className="title-caps">The Wedding Day</h2>
            <p className="script-sub">castello canevaro, zoagli</p>
          </Reveal>
          <div className="events">
            {EVENTS.map((event) => (
              <Reveal as="article" className="event" key={event.title}>
                <div className="event-bar">
                  <span>{event.date}</span>
                  <span>{event.title}</span>
                  <span>{event.time}</span>
                </div>
                <p>{event.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
