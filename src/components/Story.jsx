import { STORY } from "../content";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section className="story" id="our-story">
      <div className="tint tint--story">
        <img className="bg-media" src="/assets/img/story-bg.jpg" alt="" />
      </div>
      <div className="tint tint--story-glow" />
      <div className="grain" />
      <div className="story-inner">
        <Reveal className="story-left">
          <p className="story-date story-date--start">3.23.26</p>
          <div className="story-polaroid">
            <p className="script-sub">karalyn + jack</p>
            <img src="/assets/img/story-photo.jpg" alt="Karalyn and Jack embracing on a hillside" loading="lazy" />
          </div>
          <p className="story-date story-date--end">6.9.27</p>
        </Reveal>
        <Reveal className="story-copy">
          {STORY.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
