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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
