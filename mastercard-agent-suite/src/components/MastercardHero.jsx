import "./MastercardHero.css";

export function MastercardHero({
  eyebrow = "Press release · January 2026",
  headline = "AI agents to ready your business for a new era of commerce.",
  sub = "Browse production-ready agents, customise one to your business, and deploy in under a minute — powered by Lyzr, built for Mastercard customers.",
  primaryCta = { label: "Browse the marketplace", href: "#agents" },
  secondaryCta = { label: "Read the announcement", href: "#" },
}) {
  return (
    <section className="mc-hero">
      <div className="mc-hero__bg" aria-hidden="true">
        <MastercardCircles />
      </div>

      <div className="container-wide mc-hero__inner">
        <div className="mc-hero__pressline">
          <span className="mc-hero__eyebrow">{eyebrow}</span>
          <span className="mc-hero__pressline-sep" />
          <span className="mc-hero__dateline">
            January 27, 2026 · Purchase, NY
          </span>
          <span className="mc-hero__pressline-sep" />
          <span className="mc-hero__dateline mc-hero__dateline--accent">
            Powered by Lyzr
          </span>
        </div>

        <h1 className="mc-hero__headline">{headline}</h1>

        <hr className="mc-hero__rule" />
        <p className="mc-hero__dek">
          The expanded offerings include customisable AI agents for small
          businesses.
        </p>
        <hr className="mc-hero__rule" />

        <p className="mc-hero__sub">{sub}</p>

        <div className="mc-hero__ctas">
          <a className="mc-btn mc-btn--primary" href={primaryCta.href}>
            {primaryCta.label}
            <span className="mc-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="mc-btn mc-btn--ghost" href={secondaryCta.href}>
            {secondaryCta.label}
            <span className="mc-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function MastercardCircles() {
  return (
    <svg
      className="mc-circles"
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="120" cy="100" r="92" fill="#eb001b" />
      <circle cx="200" cy="100" r="92" fill="#ffc81f" />
      <circle
        cx="160"
        cy="100"
        r="92"
        fill="#ff671b"
        style={{ mixBlendMode: "multiply" }}
        opacity="0.92"
      />
    </svg>
  );
}
