import { Link } from "react-router-dom";
import JourneyPlanner from "../components/JourneyPlanner";
import Travel from "../components/Travel";
import Reveal from "../components/Reveal";

export default function TravelPage() {
  return (
    <main className="travel-page">
      <header className="travel-hero">
        <div className="tint tint--travel">
          <img className="bg-media" src="/assets/img/travel-bg.jpg" alt="" />
        </div>
        <Link to="/" className="back-link">
          ← Karalyn &amp; Jack
        </Link>
        <Reveal className="travel-hero-inner">
          <h1 className="title-caps">Travel</h1>
          <p className="script-sub">getting to zoagli</p>
          <p className="travel-hero-meta">June 9th 2027 · Castello Canevaro · Zoagli, Italy</p>
        </Reveal>
      </header>
      <JourneyPlanner />
      <Travel />
    </main>
  );
}
