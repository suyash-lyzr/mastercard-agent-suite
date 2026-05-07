import { Link, Navigate, useLocation } from "react-router-dom";
import "./Deployed.css";

export function Deployed() {
  const location = useLocation();
  const state = location.state;

  if (!state || !state.agent) {
    return <Navigate to="/" replace />;
  }

  const { agent, payload } = state;

  return (
    <div className="deployed">
      <div className="container deployed__inner">
        <div className="deployed__check" aria-hidden>
          <svg viewBox="0 0 80 80" className="deployed__check-svg">
            <circle
              cx="40"
              cy="40"
              r="36"
              className="deployed__check-bg"
            />
            <path
              d="M24 42 L36 54 L58 30"
              className="deployed__check-tick"
            />
          </svg>
        </div>

        <span className="eyebrow deployed__eyebrow">Live · Active now</span>
        <h1 className="deployed__heading">
          Your agent is <span className="deployed__heading-grad">live.</span>
        </h1>
        <p className="deployed__sub">
          {agent.name} is deployed to{" "}
          <strong>{payload?.businessName || "your business"}</strong>. It's
          ready to start handling {agent.channel.toLowerCase()} from this
          moment.
        </p>

        <div className="deployed__card">
          <div className="deployed__card-head">
            <span className="tag tag--live">
              <span className="live-dot" /> Active
            </span>
            <span className="deployed__card-title">{agent.name}</span>
          </div>
          <hr className="divider" />
          <dl className="deployed__rows">
            <div>
              <dt>Business</dt>
              <dd>{payload?.businessName}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{payload?.industry}</dd>
            </div>
            <div>
              <dt>Channel</dt>
              <dd>{agent.channel}</dd>
            </div>
            <div>
              <dt>Tone</dt>
              <dd>{payload?.tone}</dd>
            </div>
            <div>
              <dt>Language</dt>
              <dd>{payload?.language}</dd>
            </div>
            {payload?.hours && (
              <div>
                <dt>Hours</dt>
                <dd>{payload.hours}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="deployed__ctas">
          <Link to="/" className="btn btn--ghost">
            <i className="ti ti-plus" /> Add another agent
          </Link>
          <button className="btn btn--primary">
            View your dashboard <span className="arrow">→</span>
          </button>
        </div>

        <div className="deployed__foot">
          Built with <strong>Architect</strong> by <strong>Lyzr</strong> ·
          Distributed via Mastercard Agent Suite
        </div>
      </div>
    </div>
  );
}
