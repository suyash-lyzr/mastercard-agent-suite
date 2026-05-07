import { Link } from "react-router-dom";
import { AgentPreview } from "./AgentPreview.jsx";
import { AgentArtwork } from "./AgentArtwork.jsx";
import "./AgentCard.css";

export function AgentCard({ agent, index = 0 }) {
  const isLive = agent.status === "live";
  return (
    <Link
      to={`/agent/${agent.id}`}
      className="agentcard"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="agentcard__media">
        <AgentPreview agent={agent} size="card" />
        <AgentArtwork agent={agent} />
        {!isLive && (
          <div className="agentcard__badges">
            <span className="tag tag--soon">Coming soon</span>
          </div>
        )}
        <div className="agentcard__overlay">
          <span className="btn btn--primary agentcard__cta">
            Preview &amp; Deploy <span className="arrow">→</span>
          </span>
        </div>
      </div>

      <div className="agentcard__body">
        <div className="agentcard__meta">
          <span className="agentcard__category">
            <i className={`ti ${agent.icon}`} />
            {agent.categoryLabel}
          </span>
          <span className="agentcard__rating">
            <i className="ti ti-star-filled" /> {agent.rating}
            <span className="agentcard__reviews">({agent.reviews})</span>
          </span>
        </div>
        <h3 className="agentcard__name">{agent.name}</h3>
        <p className="agentcard__desc">{agent.description}</p>
        <div className="agentcard__foot">
          <span className="agentcard__channel">
            <i className="ti ti-broadcast" /> {agent.channel}
          </span>
          {agent.badge && (
            <span className="agentcard__badge-chip">
              <i className="ti ti-sparkles" /> {agent.badge}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
