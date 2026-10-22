import { useState } from "react";
import { FAQS } from "../content";
import { REGISTRY_URL } from "../config";
import Reveal from "./Reveal";

function Answer({ value }) {
  if (value === "registry") {
    return (
      <p>
        We appreciate any gifts, you can find our registry{" "}
        {REGISTRY_URL ? (
          <a href={REGISTRY_URL} target="_blank" rel="noopener noreferrer">
            here
          </a>
        ) : (
          "here"
        )}
        .
      </p>
    );
  }
  if (value === "contact") {
    return (
      <p>
        Yes, we would love to help. Please contact Karalyn at <a href="tel:+16123094939">(612) 309-4939</a>.
      </p>
    );
  }
  return <p>{value}</p>;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="tint tint--faq">
        <img className="bg-media" src="/assets/img/faq-bg.jpg" alt="" />
      </div>
      <div className="faq-fade" />
      <div className="faq-inner">
        <Reveal as="header" className="section-title section-title--center">
          <h2 className="title-caps">FAQ</h2>
          <p className="script-sub">your questions, answered</p>
        </Reveal>
        <Reveal className="faq-list">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={`faq-item${open ? " is-open" : ""}`} key={item.q}>
                <button
                  className="faq-question"
                  id={`faq-button-${i}`}
                  aria-expanded={open}
                  aria-controls={`faq-region-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="faq-region" id={`faq-region-${i}`} role="region" aria-labelledby={`faq-button-${i}`}>
                  <div className="faq-answer">
                    <Answer value={item.a} />
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
