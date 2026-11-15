import { useId, useState } from "react";
import { HOTELS } from "../content";
import Reveal from "./Reveal";

export default function Travel() {
  return (
    <section className="travel" id="travel">
      <div className="tint tint--travel">
        <img className="bg-media" src="/assets/img/travel-bg.jpg" alt="" />
      </div>

      <div className="travel-row travel-row--venue">
        <Reveal className="copy">
          <h2 className="heading">Castello Canevaro</h2>
          <p className="script-sub">zoagli, italy</p>
          <p>
            Zoagli sits on the Ligurian coast, thirty kilometers southeast of Genoa. Two promenades from the 1930s run either side of the
            center, cut into the cliffs at the waterline and lit after dark. The beach below the railway arches sits between a pair of
            sixteenth-century Saracen towers, and the town’s silk mills, still weaving Genoa’s black velvet, remain open to visitors.
            Portofino is just across the water.
          </p>
          <p>
            The Venue – Castello Canevaro sits on a promontory at the center of town, with sea on three sides. It began as a watchtower in
            1550, which still stands, and became a castle three centuries later under Giuseppe Canevaro, first Duke of Zoagli. Three
            hectares of gardens descend to the water.
          </p>
        </Reveal>
        <Reveal as="figure" className="travel-photo">
          <img src="/assets/img/castello.jpg" alt="Castello Canevaro in Zoagli" loading="lazy" />
        </Reveal>
      </div>

      <div className="travel-row travel-row--stay">
        <Reveal as="figure" className="travel-flowers">
          <picture>
            <source media="(max-width: 809px)" srcSet="/assets/img/pressed-flowers-tall.png" />
            <img src="/assets/img/pressed-flowers.png" alt="Pressed flowers on handmade paper" loading="lazy" />
          </picture>
        </Reveal>
        <Reveal className="copy">
          <h2 className="heading">Where to Stay</h2>
          <p className="script-sub">in town + along the coast</p>
          {HOTELS.map((hotel) => (
            <Hotel key={hotel.name} hotel={hotel} />
          ))}
        </Reveal>
      </div>

      <div className="travel-row travel-row--explore">
        <Reveal className="copy">
          <h2 className="heading">Explore Italy</h2>
          <p className="script-sub">the ligurian coast</p>
          <p>
            Beyond the sidewalk: swim at Spiaggia del Duca, a quieter stretch east, or one of the pebble beach clubs along the promenade.
            Trails climb into the hills toward Portofino, and boat trips run from the coast to San Fruttuoso’s Benedictine abbey, tucked
            into its own hidden cove. The Piazzetta is the town’s hub, overlooked by San Martino church with its 1720s carved figures.
          </p>
          <p>
            Gaggioli and Cordani, two silk weaving workshops still producing Genoa’s famous velvet, take visitors by arrangement. The
            station sits on the Genoa–La Spezia line: minutes to Rapallo (its seafront castle) or Santa Margherita Ligure (gateway to
            Portofino), fifteen minutes to Chiavari for its daily market, an hour to Cinque Terre. No car needed.
          </p>
        </Reveal>
        <Reveal as="figure" className="travel-photo">
          <img src="/assets/img/liguria.jpg" alt="Boats in a harbor on the Ligurian coast" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

function Hotel({ hotel }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const { block, notes = [] } = hotel;
  const hasDetails = Boolean(block) || notes.length > 0;

  return (
    <div className="hotel">
      <p>
        <a href={hotel.url} target="_blank" rel="noopener noreferrer">
          {hotel.name}
        </a>{" "}
        {hotel.text}
      </p>
      {hasDetails && (
        <>
          <button type="button" className="hotel-toggle" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen((o) => !o)}>
            {open ? "Show less" : "Show more"}
          </button>
          <div className="hotel-details" id={detailsId} hidden={!open}>
            {block && (
              <div className="hotel-block">
                <p className="hotel-block-title">{block.title}</p>
                <ul className="hotel-rooms">
                  {block.rooms.map((room) => (
                    <li key={room.type}>
                      <span className="hotel-room-type">
                        {room.type} <span className="hotel-room-count">({room.count} available)</span>
                      </span>
                      <span className="hotel-room-price">{room.price}</span>
                      {room.extra && <span className="hotel-room-extra">{room.extra}</span>}
                    </li>
                  ))}
                </ul>
                {block.notes.map((n) => (
                  <p className="hotel-block-note" key={n}>
                    {n}
                  </p>
                ))}
              </div>
            )}
            {notes.map((n) => (
              <p className="hotel-note" key={n}>
                {n}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
