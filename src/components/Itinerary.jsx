import { useId, useState } from "react";
import { EVENTS } from "../content";
import Reveal from "./Reveal";

export default function Itinerary() {
  return (
    <section className="itinerary" id="itinerary">
      <div className="tint tint--itinerary">
        <img className="bg-media" src="/assets/img/itinerary-bg.jpg" alt="" />
      </div>
      <div className="grain" />
      <div className="itinerary-inner">
        <Reveal as="header" className="section-title">
          <h2 className="title-caps">Itinerary</h2>
          <p className="script-sub">timeline of events</p>
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
              {event.note && <p className="event-note">{event.note}</p>}
              {event.links && (
                <ul className="event-links">
                  {event.links.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {event.details && <EventDetails details={event.details} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventDetails({ details }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <button type="button" className="hotel-toggle event-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {open ? "Show less" : "Show more"}
      </button>
      <div id={id} hidden={!open}>
        <p className="event-details-title">{details.title}</p>
        <ol className="event-sights">
          {details.items.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong> {item.text}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
