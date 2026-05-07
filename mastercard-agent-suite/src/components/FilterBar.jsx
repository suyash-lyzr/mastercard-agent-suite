import "./FilterBar.css";

export function FilterBar({ categories, active, onChange, query, onQuery, total }) {
  return (
    <div className="filterbar">
      <div className="filterbar__row">
        <div className="filterbar__pills" role="tablist" aria-label="Categories">
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                className={"pill" + (isActive ? " pill--active" : "")}
                onClick={() => onChange(c.id)}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="filterbar__search">
          <i className="ti ti-search" />
          <input
            type="search"
            placeholder="Search agents…"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            aria-label="Search agents"
          />
          <span className="filterbar__count">{total} agents</span>
        </div>
      </div>
    </div>
  );
}
