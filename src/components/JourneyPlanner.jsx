import { useCallback, useMemo, useState } from "react";
import { LEGS, ARRIVAL, BOOKING, TRAVEL_TIME, USD_PER_EUR } from "../data/journey";
import JourneyMap from "./JourneyMap";
import Reveal from "./Reveal";

const euro = (n) => `€${Math.round(n)}`;
const range = ([lo, hi]) => (lo === hi ? euro(lo) : `${euro(lo)}–${euro(hi)}`);
const dollar = (n) => `$${Math.round(n * USD_PER_EUR)}`;
const usdRange = ([lo, hi]) => `≈ ${lo === hi ? dollar(lo) : `${dollar(lo)}–${dollar(hi)}`}`;

export default function JourneyPlanner() {
  const [activeLeg, setActiveLeg] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [roundTrip, setRoundTrip] = useState(true);
  const [fareClass, setFareClass] = useState("standard");

  const selectLeg = (i) => {
    setPlaying(false);
    setActiveLeg((cur) => (cur === i ? null : i));
  };
  const onPlayEnd = useCallback(() => setPlaying(false), []);
  const onProgressLeg = useCallback((i) => setActiveLeg(i), []);

  const cost = useMemo(() => {
    const multiplier = travelers * (roundTrip ? 2 : 1);
    const perLeg = LEGS.map((leg) => leg.fares[fareClass]);
    const perPerson = perLeg.reduce(([lo, hi], [a, b]) => [lo + a, hi + b], [0, 0]);
    return { multiplier, perLeg, perPerson, total: perPerson.map((v) => v * multiplier) };
  }, [travelers, roundTrip, fareClass]);

  return (
    <section className="journey" id="getting-here">
      <div className="journey-inner">
        <Reveal as="header" className="journey-head">
          <h2 className="heading">Getting to Zoagli</h2>
          <p className="script-sub">milan to portofino, by train</p>
          <p className="journey-intro">
            From Milano Centrale it’s a direct Intercity down to the coast at Santa Margherita Ligure–Portofino, then a ten-minute hop to
            Zoagli — about two hours in all. No car needed. Tap a line on the map to see each leg, or play the journey.
          </p>
        </Reveal>

        <div className="journey-grid">
          <Reveal className="journey-map-wrap">
            <JourneyMap
              activeLeg={activeLeg}
              onSelectLeg={selectLeg}
              playing={playing}
              onPlayEnd={onPlayEnd}
              onProgressLeg={onProgressLeg}
            />
          </Reveal>

          <div className="journey-panel">
            <div className="journey-controls">
              <button
                className="journey-play"
                onClick={() => {
                  setActiveLeg(0);
                  setPlaying(true);
                }}
                disabled={playing}
              >
                <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                  <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
                </svg>
                {playing ? "Travelling…" : "Play the journey"}
              </button>
              <span className="journey-total-time">{TRAVEL_TIME}</span>
            </div>

            <ol className="legs">
              {LEGS.map((leg, i) => {
                const open = activeLeg === i;
                return (
                  <li key={leg.id} className={`leg${open ? " is-active" : ""}`} style={{ "--leg": leg.color }}>
                    <button className="leg-head" aria-expanded={open} onClick={() => selectLeg(i)}>
                      <span className="leg-num">{i + 1}</span>
                      <span className="leg-title">
                        <span className="leg-line">{leg.line}</span>
                        <span className="leg-route">
                          {leg.from} → {leg.to}
                        </span>
                      </span>
                      <span className="leg-fare">{range(leg.fares[fareClass])}</span>
                    </button>
                    <div className="leg-body">
                      <div className="leg-body-inner">
                        <dl className="leg-facts">
                          <div><dt>Operator</dt><dd>{leg.operator}</dd></div>
                          <div><dt>Journey</dt><dd>{leg.duration}</dd></div>
                          <div><dt>Runs</dt><dd>{leg.frequency}</dd></div>
                        </dl>
                        <p className="leg-tip">{leg.tip}</p>
                        <a className="leg-book" href={leg.book.url} target="_blank" rel="noopener noreferrer">
                          {leg.book.label} →
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="leg leg--arrival">
                <div className="leg-head leg-head--static">
                  <span className="leg-num">★</span>
                  <span className="leg-title">
                    <span className="leg-line">{ARRIVAL.title}</span>
                    <span className="leg-route">
                      {ARRIVAL.text}{" "}
                      <a href={ARRIVAL.mapUrl} target="_blank" rel="noopener noreferrer">
                        Google Maps
                      </a>
                    </span>
                  </span>
                </div>
              </li>
            </ol>

            <div className="cost">
              <div className="cost-head">
                <h3>Cost preview</h3>
                <p>Estimated train fares</p>
              </div>
              <div className="cost-options">
                <div className="stepper" role="group" aria-label="Number of travelers">
                  <button onClick={() => setTravelers((n) => Math.max(1, n - 1))} aria-label="Fewer travelers" disabled={travelers <= 1}>−</button>
                  <span>
                    {travelers} {travelers === 1 ? "traveler" : "travelers"}
                  </span>
                  <button onClick={() => setTravelers((n) => Math.min(12, n + 1))} aria-label="More travelers" disabled={travelers >= 12}>+</button>
                </div>
                <div className="segmented" role="group" aria-label="Trip type">
                  <button aria-pressed={!roundTrip} onClick={() => setRoundTrip(false)}>One way</button>
                  <button aria-pressed={roundTrip} onClick={() => setRoundTrip(true)}>Round trip</button>
                </div>
                <div className="segmented" role="group" aria-label="Fare class">
                  <button aria-pressed={fareClass === "standard"} onClick={() => setFareClass("standard")}>Standard</button>
                  <button aria-pressed={fareClass === "first"} onClick={() => setFareClass("first")}>First / Business</button>
                </div>
              </div>
              <table className="cost-table">
                <tbody>
                  {LEGS.map((leg, i) => (
                    <tr key={leg.id}>
                      <th scope="row">{leg.line.split(" · ")[0]}</th>
                      <td>{range(cost.perLeg[i])}</td>
                    </tr>
                  ))}
                  <tr className="cost-sub">
                    <th scope="row">Per person, one way</th>
                    <td>
                      {range(cost.perPerson)} <span className="cost-usd">{usdRange(cost.perPerson)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="cost-total">
                <span>
                  Estimated total
                  <small>
                    {travelers} × {roundTrip ? "round trip" : "one way"}
                  </small>
                </span>
                <strong>
                  {range(cost.total)}
                  <span className="cost-usd">{usdRange(cost.total)}</span>
                </strong>
              </div>
              <a className="cost-book" href={BOOKING.trenitalia} target="_blank" rel="noopener noreferrer">
                Begin booking on Trenitalia →
              </a>
              <p className="cost-note">
                Fares are estimates and change with demand — Intercity seats are cheapest booked weeks ahead. Dollar amounts are approximate, at about {`$${USD_PER_EUR.toFixed(2)}`} to €1. Buy the Malpensa Express
                separately at the airport or online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
