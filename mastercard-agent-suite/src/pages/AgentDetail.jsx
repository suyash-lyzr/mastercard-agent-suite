import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { agents } from "../data/agents.js";
import { AgentPreview } from "../components/AgentPreview.jsx";
import { AgentArtwork } from "../components/AgentArtwork.jsx";
import { AgentCard } from "../components/AgentCard.jsx";
import { CloneModal } from "../components/CloneModal.jsx";
import "./AgentDetail.css";

export function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = agents.find((a) => a.id === id);
  const [open, setOpen] = useState(false);

  if (!agent) {
    return (
      <div className="container-wide" style={{ padding: "80px 0" }}>
        <h1 style={{ fontFamily: "var(--font-display)" }}>Agent not found</h1>
        <Link to="/" className="btn btn--ghost" style={{ marginTop: 16 }}>
          ← Back to marketplace
        </Link>
      </div>
    );
  }

  const isLive = agent.status === "live";

  return (
    <div className="detail">
      <div className="container-wide detail__inner">
        <nav className="detail__crumbs" aria-label="Breadcrumb">
          <Link to="/">Marketplace</Link>
          <span className="detail__crumb-sep">›</span>
          <Link to={`/?cat=${encodeURIComponent(agent.category)}`}>
            {agent.categoryLabel}
          </Link>
          <span className="detail__crumb-sep">›</span>
          <span className="detail__crumb-current">{agent.name}</span>
        </nav>

        <div className="detail__layout">
          {/* LEFT */}
          <div className="detail__main">
            <h1 className="detail__name">{agent.name}</h1>
            {agent.demoBusiness && (
              <div className="detail__demo">
                <span className="detail__demo-label">Live demo for</span>
                <span className="detail__demo-name">
                  {agent.demoBusiness.name}
                </span>
                <span className="detail__demo-sub">
                  · {agent.demoBusiness.sub}
                </span>
              </div>
            )}
            <hr className="divider divider--press" />
            <p className="detail__tagline">{agent.tagline}</p>
            <hr className="divider divider--press" />
            <p className="detail__desc">{agent.longDescription}</p>

            <div className="detail__rating">
              <span className="detail__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={
                      i < Math.round(agent.rating)
                        ? "ti ti-star-filled"
                        : "ti ti-star"
                    }
                  />
                ))}
              </span>
              <span className="detail__rating-num">{agent.rating}</span>
              <span className="detail__reviews">
                · {agent.reviews} reviews from Mastercard SMBs
              </span>
            </div>

            <hr className="divider" />

            <section className="detail__section">
              <h2 className="detail__h2">What this agent does</h2>
              <ul className="detail__caps">
                {agent.capabilities.map((c) => (
                  <li key={c}>
                    <span className="detail__cap-dot">
                      <i className="ti ti-check" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail__section">
              <h2 className="detail__h2">Built for</h2>
              <div className="detail__used">
                {(agent.builtFor || agent.usedBy).map((u) => (
                  <span key={u} className="detail__used-chip">
                    <i className="ti ti-building-store" /> {u}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="detail__aside">
            <div className="detail__preview">
              <div className="detail__preview-chrome">
                <span className="detail__preview-dot" />
                <span className="detail__preview-dot" />
                <span className="detail__preview-dot" />
                <span className="detail__preview-label">
                  {agent.demoBusiness ? agent.demoBusiness.name : agent.name}
                </span>
                <span className="detail__preview-live">
                  <span className="live-dot" /> Live preview
                </span>
              </div>
              <AgentPreview agent={agent} size="detail" />
              <AgentArtwork agent={agent} />
            </div>

            <div className="detail__cta-stack">
              {isLive ? (
                <a
                  href={agent.architectUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost detail__try"
                >
                  <i className="ti ti-external-link" /> View App
                </a>
              ) : (
                <button className="btn btn--ghost detail__try" disabled>
                  <i className="ti ti-clock" /> Live preview coming soon
                </button>
              )}

              <button
                className="btn btn--primary detail__deploy"
                onClick={() => setOpen(true)}
              >
                Customise &amp; Clone for Your Business{" "}
                <span className="arrow">→</span>
              </button>

              <ul className="detail__assurances">
                {(agent.keyFeatures || []).map((f) => (
                  <li key={f.text}>
                    <i className={`ti ${f.icon}`} /> {f.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <section className="container-wide detail__related">
        <div className="detail__related-head">
          <span className="eyebrow">You may also be interested in</span>
          <h2 className="detail__related-title">More agents in your suite</h2>
        </div>
        <div className="detail__related-grid">
          {agents
            .filter((a) => a.id !== agent.id)
            .slice(0, 4)
            .map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
        </div>
      </section>

      {open && (
        <CloneModal
          agent={agent}
          onClose={() => setOpen(false)}
          onDeploy={(payload, prompt) => {
            setOpen(false);
            navigate("/deployed", { state: { agent, payload, prompt } });
          }}
        />
      )}
    </div>
  );
}
