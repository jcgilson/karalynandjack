import { useEffect, useState } from "react";
import { smoothPathXY, STAR } from "../lib/map";
import { BAY_COAST, BOAT_ROUTE, PORTS, SIGHTS, BAY_LABELS, VENUE, BOARDING, LINKS, appleMapsUrl, projectBay } from "../data/welcomeDinner";

const W = 600;
const H = 410;
const path = (points) => smoothPathXY(points.map(projectBay));
const COAST = path(BAY_COAST);
const SEA = `${COAST} L${W},${H} L0,${H} Z`;
const ROUTE = path(BOAT_ROUTE);
const KM = 4000 / 79.6; // 1 km at 44.3°N

export default function BoatMap({ activeSight, onSelectSight }) {
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(id);
  }, [copied]);

  // Copy the pier address, then let the link open Apple Maps as usual.
  const copyAddress = () => {
    navigator.clipboard?.writeText(BOARDING.address).then(() => setCopied(true), () => {});
  };

  const [vx, vy] = projectBay(VENUE.coord);

  return (
    <div className="jmap bmap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="bmap-title">
        <title id="bmap-title">Evening boat route from Rapallo along the coast past Santa Margherita Ligure and Portofino</title>
        <defs>
          <pattern id="bmap-waves" width="22" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 6 q5.5 -5 11 0 t11 0" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".35" />
          </pattern>
        </defs>

        <path d={SEA} className="jmap-sea" />
        <path d={SEA} fill="url(#bmap-waves)" className="jmap-waves" />
        <path d={COAST} className="jmap-coast" />

        {BAY_LABELS.map((l) => {
          const [x, y] = projectBay(l.coord);
          return (
            <text key={l.text} x={x} y={y} textAnchor={l.anchor || "middle"} className={`bmap-label bmap-label--${l.cls}`}>
              {l.text}
            </text>
          );
        })}

        {/* Venue */}
        <g className="jmap-station--destination">
          <path d={STAR} transform={`translate(${vx} ${vy})`} />
          <text x={vx - 2} y={vy - 14} textAnchor="end" className="bmap-label bmap-label--venue">Zoagli · {VENUE.name}</text>
        </g>

        {/* Boat route */}
        <path d={ROUTE} className="bmap-route-casing" />
        <path d={ROUTE} id="bmap-route" className={`bmap-route${animate ? " is-animated" : ""}`} />

        {/* Ports */}
        {PORTS.map((p) => {
          const [x, y] = projectBay(p.coord);
          const [dx, dy, anchor] = p.label;
          return (
            <g key={p.id} className={`bmap-port${p.id === "rapallo" ? " is-start" : ""}`}>
              {!p.passing && <circle cx={x} cy={y} r="6" />}
              <text x={x + dx} y={y + dy} textAnchor={anchor} className="jmap-label">
                {p.name}
              </text>
              {p.note && (
                <text x={x + dx} y={y + dy + 16} textAnchor={anchor} className="bmap-label bmap-label--note">
                  {p.note}
                </text>
              )}
            </g>
          );
        })}

        {/* Sights */}
        {SIGHTS.map((s, i) => {
          const [x, y] = projectBay(s.coord);
          return (
            <g
              key={s.name}
              className={`bmap-sight${activeSight === i ? " is-active" : ""}`}
              transform={`translate(${x} ${y})`}
              role="button"
              tabIndex={0}
              aria-label={s.name}
              onMouseEnter={() => onSelectSight(i)}
              onFocus={() => onSelectSight(i)}
              onClick={() => onSelectSight(i)}
            >
              <circle r="10" />
              <text y="4" textAnchor="middle">{i + 1}</text>
            </g>
          );
        })}

        {/* Boat */}
        {animate && (
          <g className="bmap-boat">
            <path d="M-8,-1 L8,-1 L5,4 L-5,4 Z M-1,-1 L-1,-11 L6,-3 Z" />
            <animateMotion dur="9s" repeatCount="indefinite" rotate="0" keyPoints="0;1;1" keyTimes="0;.85;1" calcMode="linear">
              <mpath href="#bmap-route" />
            </animateMotion>
          </g>
        )}

        <g transform={`translate(${W - 40} 40)`} className="jmap-compass">
          <circle r="18" />
          <path d="M0 -15 L4.5 0 L0 15 L-4.5 0 Z" />
          <path d="M0 -15 L4.5 0 L-4.5 0 Z" className="jmap-compass-n" />
          <text y="-23" textAnchor="middle">N</text>
        </g>
        <g transform={`translate(24 ${H - 18})`} className="jmap-scale">
          <path d={`M0 0 h${KM} M0 -4 v8 M${KM} -4 v8`} />
          <text x={KM + 8} y="4">1 km</text>
        </g>
      </svg>

      <div className="bmap-actions">
        <a className="bmap-apple" href={appleMapsUrl()} target="_blank" rel="noopener noreferrer" onClick={copyAddress}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" />
          </svg>
          <span>
            <strong>Open in Apple Maps</strong>
            <small>{copied ? "Address copied ✓" : BOARDING.address}</small>
          </span>
        </a>
        <a className="bmap-line" href={LINKS.line1} target="_blank" rel="noopener noreferrer">
          Boat line · Line 1 →
        </a>
      </div>
    </div>
  );
}
