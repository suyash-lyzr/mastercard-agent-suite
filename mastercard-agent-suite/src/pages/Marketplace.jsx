import { useMemo, useState } from "react";
import { agents, categories } from "../data/agents.js";
import { AgentCard } from "../components/AgentCard.jsx";
import "./Marketplace.css";

const useCases = [
  { id: "lead-gen", label: "Lead Generation" },
  { id: "customer-engagement", label: "Customer Engagement" },
  { id: "workflow", label: "Workflow Automation" },
  { id: "data-analysis", label: "Data Analysis" },
  { id: "content", label: "Content Creation" },
  { id: "scheduling", label: "Scheduling" },
];

const sortTabs = [
  { id: "popular", label: "Popular", icon: "ti-sparkles" },
  { id: "recent", label: "Recent", icon: "ti-clock" },
  { id: "top", label: "Top Rated", icon: "ti-star" },
];

export function Marketplace() {
  const [activeCats, setActiveCats] = useState(new Set());
  const [activeUseCases, setActiveUseCases] = useState(new Set());
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  const toggle = (set, setter, id) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

  const visible = useMemo(() => {
    let list = agents.filter((a) => {
      const matchesCat =
        activeCats.size === 0 || activeCats.has(a.category);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
    if (sort === "top") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sort === "recent") {
      list = [...list].reverse();
    }
    return list;
  }, [activeCats, activeUseCases, query, sort]);

  return (
    <div className="marketplace press">
      <div className="press__container">
        <header className="press__head">
          <h1 className="press__h1">Agent Suite</h1>
          <p className="press__sub">
            Ready-to-deploy AI agents for Mastercard's business customers
          </p>
        </header>

        <div className="press__searchrow">
          <div className="press__searchbox">
            <i className="ti ti-search" />
            <input
              type="search"
              placeholder="Search agents by name, description, or tags…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search agents"
            />
          </div>
          <div className="press__sorttabs" role="tablist">
            {sortTabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={sort === t.id}
                className={
                  "press__sorttab" +
                  (sort === t.id ? " press__sorttab--active" : "")
                }
                onClick={() => setSort(t.id)}
              >
                <i className={`ti ${t.icon}`} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="press__layout">
          <aside className="press__sidebar" aria-label="Filters">
            <FilterSection
              title="Categories"
              items={categories.filter((c) => c.id !== "all")}
              active={activeCats}
              onToggle={(id) => toggle(activeCats, setActiveCats, id)}
            />
            <FilterSection
              title="Use Cases"
              items={useCases}
              active={activeUseCases}
              onToggle={(id) =>
                toggle(activeUseCases, setActiveUseCases, id)
              }
            />
          </aside>

          <div className="press__content">
            <div className="press__resulthead">
              <h2 className="press__resulttitle">
                All Agents{" "}
                <span className="press__resultcount">({visible.length})</span>
              </h2>
            </div>

            <div className="marketplace__grid press__grid">
              {visible.map((a, i) => (
                <AgentCard key={a.id} agent={a} index={i} />
              ))}
            </div>

            {visible.length === 0 && (
              <div className="marketplace__empty">
                <i className="ti ti-search-off" />
                <h3>No agents match that search.</h3>
                <p>Try clearing a filter or searching for something else.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, items, active, onToggle }) {
  const allSelected = active.size === 0;
  return (
    <div className="press__filtergroup">
      <div className="press__filterhead">
        <span>{title}</span>
        {!allSelected && (
          <button
            className="press__selectall"
            onClick={() => active.forEach((id) => onToggle(id))}
          >
            Clear
          </button>
        )}
      </div>
      <ul className="press__checklist">
        {items.map((it) => (
          <li key={it.id}>
            <label className="press__check">
              <input
                type="checkbox"
                checked={active.has(it.id)}
                onChange={() => onToggle(it.id)}
              />
              <span className="press__checkbox" aria-hidden />
              <span className="press__checklabel">{it.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
