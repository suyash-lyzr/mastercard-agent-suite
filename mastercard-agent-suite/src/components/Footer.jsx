import { MasterCardLogo } from "./MasterCardLogo.jsx";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer footer--slim">
      <div className="container-wide footer__row">
        <div className="footer__brand">
          <MasterCardLogo size={18} />
          <span className="footer__brand-text">Mastercard Agent Suite</span>
          <span className="footer__sep">·</span>
          <span className="footer__powered">
            <span className="nav__powered-dot" /> Powered by Lyzr
          </span>
        </div>
        <span className="footer__legal-line">
          © 2026 Mastercard
        </span>
      </div>
    </footer>
  );
}
