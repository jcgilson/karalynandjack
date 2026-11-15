import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to #section anchors (including across routes) and to the top on page changes.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Wait a frame so a newly rendered page has its sections in the DOM.
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
