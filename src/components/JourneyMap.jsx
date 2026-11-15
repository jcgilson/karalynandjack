import { useEffect, useRef } from "react";
import { smoothPathXY, STAR } from "../lib/map";
import { STATIONS, LEGS, COASTLINE, PO_RIVER, TICINO_RIVER, LAKE_MAGGIORE, BOOKING, project } from "../data/journey";

const smoothPath = (points) => smoothPathXY(points.map(project));

const SEA = `${smoothPath(COASTLINE)} L600,900 L0,900 Z`;
const LEG_PATHS = LEGS.map((leg) => smoothPath(leg.stops.map((id) => STATIONS[id].coord)));

// Little mountain glyphs for the Ligurian Apennines.
const MOUNTAINS = [
  [44.62, 8.55], [44.66, 8.7], [44.58, 8.75], [44.55, 9.05], [44.6, 9.15], [44.52, 9.25],
  [44.56, 9.38], [44.48, 9.45], [44.52, 9.58], [44.45, 9.65], [44.68, 9.3], [44.7, 9.5],
].map(project);


// Zoomed inset of the Golfo del Tigullio so the coastal stops are legible.
const INSET = { x: 370, y: 190, w: 215, h: 156, src: [280, 740, 110, 80] };
const INSET_SCALE = INSET.w / INSET.src[2];
const INSET_LEGS = [1, 2];
const INSET_LABELS = [
  ["recco", "Recco", [0, -9, "middle"]],
  ["camogli", "Camogli", [-7, 4, "end"]],
  ["smargherita", "S. Margherita", [-4, 18, "end"]],
  ["rapallo", "Rapallo", [0, -9, "middle"]],
  ["zoagli", "Zoagli", [-2, 24, "start"]],
];

function CoastInset({ activeLeg, onSelectLeg }) {
  const [sx, sy, sw, sh] = INSET.src;
  const k = INSET_SCALE;
  const legState = (i) => (activeLeg === null ? "" : activeLeg === i ? " is-active" : " is-dim");
  const insetStops = [...new Set(INSET_LEGS.flatMap((i) => LEGS[i].stops))];
  return (
    <g className="jmap-inset">
      {/* Footprint on the main map + connector */}
      <rect x={sx} y={sy} width={sw} height={sh} className="jmap-inset-footprint" />
      <path d={`M${sx + sw},${sy} L${INSET.x},${INSET.y + INSET.h}`} className="jmap-inset-connector" />
      <g transform={`translate(${INSET.x} ${INSET.y})`}>
        <clipPath id="jmap-inset-clip">
          <rect width={INSET.w} height={INSET.h} />
        </clipPath>
        <rect width={INSET.w} height={INSET.h} className="jmap-inset-bg" />
        <g clipPath="url(#jmap-inset-clip)">
          <g transform={`scale(${k}) translate(${-sx} ${-sy})`}>
            <path d={SEA} className="jmap-sea" />
            <path d={smoothPath(COASTLINE)} className="jmap-coast" style={{ strokeWidth: 1.2 / k }} />
            {INSET_LEGS.map((i) => (
              <g key={i} className={`jmap-leg${legState(i)}`} style={{ "--leg": LEGS[i].color }}>
                <path d={LEG_PATHS[i]} className="jmap-leg-casing" style={{ strokeWidth: 8 / k }} />
                <path d={LEG_PATHS[i]} className="jmap-leg-line jmap-leg-line--inset" />
                <path d={LEG_PATHS[i]} className="jmap-leg-hit" style={{ strokeWidth: 24 / k }} onClick={() => onSelectLeg(i)} />
              </g>
            ))}
            {insetStops.map((id) => {
              const [x, y] = project(STATIONS[id].coord);
              return <circle key={id} cx={x} cy={y} r={id === "zoagli" ? 0 : (id === "smargherita" ? 4.5 : 2.6) / k} className="jmap-stop" style={{ strokeWidth: 1.2 / k }} />;
            })}
          </g>
          {INSET_LABELS.map(([id, label, [dx, dy, anchor]]) => {
            const [x, y] = project(STATIONS[id].coord);
            const px = (x - sx) * k;
            const py = (y - sy) * k;
            return (
              <g key={id}>
                {id === "zoagli" && <path d={STAR} transform={`translate(${px} ${py})`} className="jmap-star" />}
                <text x={px + dx} y={py + dy} textAnchor={anchor} className={`jmap-inset-label${id === "zoagli" ? " is-dest" : ""}`}>
                  {label}
                </text>
              </g>
            );
          })}
          {(() => {
            const [x, y] = project([44.303, 9.209]);
            return <text x={(x - sx) * k} y={(y - sy) * k + 12} textAnchor="middle" className="jmap-inset-town">Portofino</text>;
          })()}
          <text x="8" y={INSET.h - 8} className="jmap-inset-sea">Mar Ligure</text>
        </g>
        <rect width={INSET.w} height={INSET.h} className="jmap-inset-frame" />
        <text x="8" y="-7" className="jmap-inset-title">Golfo del Tigullio</text>
      </g>
    </g>
  );
}

const LABEL_OFFSETS = {
  mxp: [-14, -16, "end"],
  milano: [14, -10, "start"],
  smargherita: [-12, 24, "end"],
  zoagli: [16, 22, "start"],
};

export default function JourneyMap({ activeLeg, onSelectLeg, playing, onPlayEnd, onProgressLeg }) {
  const pathRefs = useRef([]);
  const dotRef = useRef(null);

  // Animate a train dot along the three legs in sequence.
  useEffect(() => {
    if (!playing) return;
    const paths = pathRefs.current;
    const lengths = paths.map((p) => p.getTotalLength());
    const total = lengths.reduce((a, b) => a + b, 0);
    const duration = 7000;
    let start = 0;
    let frame = 0;
    let lastLeg = -1;

    const step = (now) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      let dist = eased * total;
      let leg = 0;
      while (leg < lengths.length - 1 && dist > lengths[leg]) dist -= lengths[leg++];
      const pt = paths[leg].getPointAtLength(Math.min(dist, lengths[leg]));
      dotRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (leg !== lastLeg) {
        lastLeg = leg;
        onProgressLeg(leg);
      }
      if (t < 1) frame = requestAnimationFrame(step);
      else onPlayEnd();
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, onPlayEnd, onProgressLeg]);

  const mxp = project(STATIONS.mxp.coord);
  const kmPer20 = 380 * (20 / 78.7); // 20 km at 45°N

  return (
    <div className="jmap">
      <svg viewBox="0 0 600 900" role="img" aria-labelledby="jmap-title jmap-desc">
        <title id="jmap-title">Train route from Milan Malpensa airport to Zoagli</title>
        <desc id="jmap-desc">
          Malpensa Express to Milano Centrale, then a direct Intercity to Santa Margherita Ligure–Portofino, then a short regional train
          to Zoagli.
        </desc>
        <defs>
          <pattern id="jmap-waves" width="22" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 6 q5.5 -5 11 0 t11 0" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".35" />
          </pattern>
        </defs>

        {/* Sea & water */}
        <path d={SEA} className="jmap-sea" />
        <path d={SEA} fill="url(#jmap-waves)" className="jmap-waves" />
        <path d={smoothPath(COASTLINE)} className="jmap-coast" />
        <path d={`${smoothPath(LAKE_MAGGIORE)} Z`} className="jmap-lake" />
        <path d={smoothPath(PO_RIVER)} className="jmap-river" />
        <path d={smoothPath(TICINO_RIVER)} className="jmap-river jmap-river--thin" />

        {/* Mountains */}
        {MOUNTAINS.map(([x, y], i) => (
          <path key={i} d={`M${x - 11},${y + 6} L${x},${y - 7} L${x + 11},${y + 6} M${x - 4},${y - 2} L${x},${y + 1} L${x + 3},${y - 3}`} className="jmap-mtn" />
        ))}

        {/* Region labels */}
        <text x="455" y="840" className="jmap-region">Mar Ligure</text>
        <text x="390" y="650" className="jmap-region jmap-region--small">Appennino Ligure</text>
        <text x="470" y="380" className="jmap-region jmap-region--small">fiume Po</text>
        <text x="58" y="20" className="jmap-region jmap-region--small">Lago Maggiore</text>
        <text x="160" y="250" className="jmap-region jmap-region--small">Lombardia</text>
        <text x="80" y="690" className="jmap-region jmap-region--small">Liguria</text>

        {/* Route legs */}
        {LEGS.map((leg, i) => {
          const state = activeLeg === null ? "" : activeLeg === i ? " is-active" : " is-dim";
          return (
            <g key={leg.id} className={`jmap-leg${state}`} style={{ "--leg": leg.color }}>
              <path d={LEG_PATHS[i]} className="jmap-leg-casing" />
              <path d={LEG_PATHS[i]} className="jmap-leg-line" ref={(el) => (pathRefs.current[i] = el)} />
              <path
                d={LEG_PATHS[i]}
                className="jmap-leg-hit"
                role="button"
                tabIndex={0}
                aria-label={`${leg.line}: ${leg.from} to ${leg.to}`}
                onClick={() => onSelectLeg(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelectLeg(i))}
              />
            </g>
          );
        })}

        {/* Stations */}
        {Object.entries(STATIONS).map(([id, s]) => {
          const [x, y] = project(s.coord);
          if (s.kind === "via") {
            return (
              <g key={id}>
                <circle cx={x} cy={y} r="3.4" className="jmap-stop" />
                <text x={x - 10} y={y - 10} textAnchor="end" className="jmap-label jmap-label--via">{s.name}</text>
              </g>
            );
          }
          if (s.kind === "stop") {
            return (
              <circle key={id} cx={x} cy={y} r="2.6" className="jmap-stop">
                <title>{s.name}</title>
              </circle>
            );
          }
          const [dx, dy, anchor] = LABEL_OFFSETS[id];
          return (
            <g key={id} className={`jmap-station jmap-station--${s.kind}`}>
              {s.kind === "destination" ? (
                <path d={STAR} transform={`translate(${x} ${y})`} />
              ) : (
                <circle cx={x} cy={y} r="6.5" />
              )}
              <text x={x + dx} y={y + dy} textAnchor={anchor} className="jmap-label">
                {s.name}
              </text>
            </g>
          );
        })}

        {/* Airport glyph */}
        <path
          transform={`translate(${mxp[0] - 3} ${mxp[1] + 10}) scale(.9)`}
          d="M8 0c.9 0 1.4.9 1.4 1.9v5.2l7.6 4.4v2.1l-7.6-2.3v4.6l2.3 1.7v1.6L8 18.1l-3.7 1.1v-1.6l2.3-1.7v-4.6L-1 13.6v-2.1l7.6-4.4V1.9C6.6.9 7.1 0 8 0z"
          className="jmap-plane"
        />

        {/* Other coastal towns for context */}
        {[].map(([name, c, [dx, dy, a]]) => {
          const [x, y] = project(c);
          return (
            <g key={name}>
              <circle cx={x} cy={y} r="2" className="jmap-town" />
              <text x={x + dx} y={y + dy} textAnchor={a} className="jmap-town-label">{name}</text>
            </g>
          );
        })}

        <CoastInset activeLeg={activeLeg} onSelectLeg={onSelectLeg} />

        {/* Moving train */}
        <g ref={dotRef} className={`jmap-train${playing ? " is-playing" : ""}`} transform={`translate(${mxp[0]} ${mxp[1]})`}>
          <circle r="9" className="jmap-train-halo" />
          <circle r="4.5" />
        </g>

        {/* Compass & scale */}
        <g transform="translate(548 70)" className="jmap-compass">
          <circle r="20" />
          <path d="M0 -17 L5 0 L0 17 L-5 0 Z" />
          <path d="M0 -17 L5 0 L-5 0 Z" className="jmap-compass-n" />
          <text y="-25" textAnchor="middle">N</text>
        </g>
        <g transform="translate(30 880)" className="jmap-scale">
          <path d={`M0 0 h${kmPer20} M0 -4 v8 M${kmPer20} -4 v8 M${kmPer20 / 2} -2.5 v5`} />
          <text x={kmPer20 + 8} y="4">20 km</text>
        </g>
      </svg>

      <a className="jmap-cta" href={BOOKING.trenitalia} target="_blank" rel="noopener noreferrer">
        <span className="jmap-cta-kicker">Ready to go?</span>
        <span className="jmap-cta-main">Begin booking →</span>
        <span className="jmap-cta-sub">Search Milano Centrale → S. Margherita Ligure–Portofino</span>
      </a>
    </div>
  );
}
