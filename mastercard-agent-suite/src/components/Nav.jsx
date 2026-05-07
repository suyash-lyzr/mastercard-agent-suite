import { NavLink, Link } from "react-router-dom";
import { MasterCardLogo } from "./MasterCardLogo.jsx";
import "./Nav.css";

export function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner container-wide">
        <Link to="/" className="nav__brand" aria-label="Mastercard home">
          <MasterCardLogo size={28} />
          <span className="nav__brand-mark">Mastercard</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink end to="/" className={navClass}>
            Browse Agents
          </NavLink>
          <NavLink to="/my-agents" className={navClass}>
            My Agents
          </NavLink>
        </nav>

        <div className="nav__actions">
          <button className="nav__icon" aria-label="Search">
            <i className="ti ti-search" />
          </button>
          <button className="btn btn--primary nav__cta">
            Get Started <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function navClass({ isActive }) {
  return "nav__link" + (isActive ? " nav__link--active" : "");
}
