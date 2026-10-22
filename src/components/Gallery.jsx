import { useEffect, useRef } from "react";
import { GALLERY } from "../content";

// A strip of photos that drifts sideways as the page scrolls past it.
export default function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sectionRef.current.style.overflowX = "auto";
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the strip enters the bottom of the viewport, 1 when it leaves the top.
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const maxShift = Math.max(0, track.scrollWidth - section.clientWidth);
      track.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="gallery" ref={sectionRef} aria-label="Photos of Karalyn and Jack">
      <div className="gallery-track" ref={trackRef}>
        {GALLERY.map((photo) => (
          <img key={photo.src} src={photo.src} alt="" style={{ "--w": photo.width }} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
