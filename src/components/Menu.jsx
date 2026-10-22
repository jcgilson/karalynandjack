import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../content";
import { REGISTRY_URL } from "../config";

function Sprig() {
  return (
    <svg className="menu-sprig" viewBox="0 0 60 34" aria-hidden="true">
      <path d="M2 4c10 2 18 8 26 18M28 22c6-10 14-16 28-18M28 22c-2 4-2 8 0 11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="22" cy="24" rx="2.6" ry="4.2" transform="rotate(-20 22 24)" fill="currentColor" />
      <ellipse cx="31" cy="27" rx="2.4" ry="3.8" transform="rotate(15 31 27)" fill="currentColor" />
      <path d="M12 9c2-4 6-5 8-4-2 3-5 4-8 4zM40 10c2-3 6-4 8-3-2 3-5 4-8 3z" fill="currentColor" />
    </svg>
  );
}

export default function Menu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;

    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={open ? "menu-open" : ""}>
      <button
        ref={toggleRef}
        className="menu-toggle"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className="menu-scrim" onClick={close} aria-hidden="true" />
      <nav className="menu" id="menu" aria-hidden={!open} inert={open ? undefined : ""}>
        <button ref={closeRef} className="menu-close" aria-label="Close menu" onClick={close}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        {REGISTRY_URL && (
          <a href={REGISTRY_URL} target="_blank" rel="noopener noreferrer" onClick={close}>
            Registry
          </a>
        )}
        <Sprig />
      </nav>
    </div>
  );
}
