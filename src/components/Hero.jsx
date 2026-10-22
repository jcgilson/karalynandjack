import { useEffect, useState } from "react";
import { WEDDING_DATE } from "../config";
import Reveal from "./Reveal";

const daysUntil = () => Math.max(0, Math.ceil((WEDDING_DATE - Date.now()) / 86400000));

export default function Hero() {
  const [days, setDays] = useState(daysUntil);

  useEffect(() => {
    const id = setInterval(() => setDays(daysUntil()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-video">
        <video className="bg-media" src="/assets/video/hero.mp4" autoPlay muted loop playsInline />
      </div>
      <Reveal className="hero-inner">
        <p className="hero-kicker">To be Wed</p>
        <img className="hero-names" src="/assets/img/names.svg" alt="Karalyn Murphy & Jack Gilson" width="432" height="213" />
        <p className="hero-countdown">{days} days</p>
      </Reveal>
    </section>
  );
}
