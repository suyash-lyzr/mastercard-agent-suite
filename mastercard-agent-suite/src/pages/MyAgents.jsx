import { agents } from "../data/agents.js";
import { AgentCard } from "../components/AgentCard.jsx";

export function MyAgents() {
  const liveAgents = agents.filter((a) => a.status === "live");

  return (
    <div className="marketplace press">
      <div className="press__container">
        <header className="press__head">
          <h1 className="press__h1">My Agents</h1>
          <p className="press__sub">
            {liveAgents.length} agents deployed and active across your business.
          </p>
        </header>

        <div className="press__content press__content--full">
          <div className="press__resulthead">
            <h2 className="press__resulttitle">
              Active{" "}
              <span className="press__resultcount">({liveAgents.length})</span>
            </h2>
          </div>

          <div className="marketplace__grid press__grid">
            {liveAgents.map((a, i) => (
              <AgentCard key={a.id} agent={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
