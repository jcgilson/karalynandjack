import { useState } from "react";
import { RSVP_ENDPOINT } from "../config";
import Reveal from "./Reveal";

const EMPTY = { attending: "", name: "", guest: "", email: "", entree: "", dietary: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Rsvp() {
  const [values, setValues] = useState(EMPTY);
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setInvalid((i) => ({ ...i, [field]: false }));
  };

  // "Attending" / "Not Attending" look like checkboxes but behave like a radio pair.
  const toggleAttending = (value) => (e) =>
    setValues((v) => ({ ...v, attending: e.target.checked ? value : "" }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextInvalid = { name: !values.name.trim(), email: !EMAIL_RE.test(values.email.trim()) };
    setInvalid(nextInvalid);

    if (!values.attending) return setStatus("Please let us know if you’ll be attending.");
    if (nextInvalid.name || nextInvalid.email) return setStatus("Please fill in your name and email.");
    if (!RSVP_ENDPOINT) {
      console.warn("Set RSVP_ENDPOINT in src/config.js (or VITE_RSVP_ENDPOINT) to enable RSVP submissions.");
      return setStatus("RSVPs aren’t connected yet — please check back soon.");
    }

    // Field names match the original Framer form.
    const data = new FormData();
    if (values.attending === "yes") data.append("Will you be attending?", "Yes");
    if (values.attending === "no") data.append("Not attending", "Not attending");
    data.append("Name", values.name.trim());
    data.append("Guest Name", values.guest.trim());
    data.append("Contact", values.email.trim());
    data.append("Entree Selection", values.entree);
    data.append("Dietary Restrictions", values.dietary.trim());

    setSending(true);
    setStatus("");
    try {
      const res = await fetch(RSVP_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setValues(EMPTY);
      setStatus("Grazie! Your RSVP has been received.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong — please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rsvp" id="rsvp">
      <Reveal className="rsvp-paper">
        <form className="rsvp-form" onSubmit={onSubmit} noValidate>
          <div className="rsvp-heading">
            <p className="rsvp-date">June 9th 2027</p>
            <h2 className="rsvp-title">RSVP</h2>
            <p className="rsvp-place">Zoagli, Italy</p>
          </div>
          <div className="rsvp-attend">
            <label className="check">
              <input type="checkbox" checked={values.attending === "yes"} onChange={toggleAttending("yes")} />
              <span>Attending</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={values.attending === "no"} onChange={toggleAttending("no")} />
              <span>Not Attending</span>
            </label>
          </div>
          <input
            className={`line-input${invalid.name ? " is-invalid" : ""}`}
            type="text"
            placeholder="Name (First + Last)"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
          />
          <input className="line-input" type="text" placeholder="Guest Name ( If Applicable )" value={values.guest} onChange={set("guest")} />
          <input
            className={`line-input${invalid.email ? " is-invalid" : ""}`}
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set("email")}
          />
          <div className="select-wrap">
            <select value={values.entree} onChange={set("entree")} aria-label="Entrée selection">
              <option value="">Entrée Selection</option>
              <option value="Land">Land</option>
              <option value="Sea">Sea</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            className="line-input"
            type="text"
            name="Dietary Restrictions"
            placeholder="Dietary Restrictions ( If Any )"
            aria-label="Dietary restrictions"
            value={values.dietary}
            onChange={set("dietary")}
          />
          <button className="rsvp-submit" type="submit" disabled={sending}>
            Submit
          </button>
          <p className="rsvp-status" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
