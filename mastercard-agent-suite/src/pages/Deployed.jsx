import { useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { agents } from "../data/agents.js";
import "./Deployed.css";

export function Deployed() {
  const [params] = useSearchParams();
  const handoffKey = params.get("k");
  const [copied, setCopied] = useState(false);

  const handoff = useMemo(() => {
    if (!handoffKey) return null;
    try {
      const raw = localStorage.getItem(handoffKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, [handoffKey]);

  // Clean up the handoff key after the page reads it once.
  useEffect(() => {
    if (handoffKey && handoff) {
      const cleanup = setTimeout(() => {
        try {
          localStorage.removeItem(handoffKey);
        } catch {
          /* ignore */
        }
      }, 30_000);
      return () => clearTimeout(cleanup);
    }
  }, [handoffKey, handoff]);

  if (!handoff) {
    return <Navigate to="/" replace />;
  }

  const agent = agents.find((a) => a.id === handoff.agentId);
  const { prompt, payload } = handoff;

  function copyPrompt() {
    try {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  function openArchitect() {
    try {
      navigator.clipboard.writeText(prompt);
    } catch {
      /* ignore */
    }
    const url = `https://architect.new/?prompt=${encodeURIComponent(prompt)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="archmock">
      <div className="archmock__shell">
        <aside className="archmock__sidebar" aria-hidden>
          <div className="archmock__brand">
            <span className="archmock__brand-mark">
              <i className="ti ti-cube-3d-sphere" />
            </span>
            <span className="archmock__brand-name">lyzr</span>
          </div>

          <nav className="archmock__nav">
            <a className="archmock__navitem archmock__navitem--active">
              <i className="ti ti-cube-3d-sphere" /> Architect
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-arrow-up-right" /> Agent Studio
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-home" /> My Agents
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-users" /> Shared with Me
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-sparkles" /> Prompt Library
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-building-store" /> Agentlets
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-chart-bar" /> Usage
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-bulb" /> What should I build?
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-book" /> Docs
            </a>
            <a className="archmock__navitem">
              <i className="ti ti-brand-discord" /> Join our Discord
            </a>
          </nav>

          <a className="archmock__navitem archmock__navitem--foot">
            <i className="ti ti-help" /> Help &amp; Support
          </a>
        </aside>

        <main className="archmock__main">
          <div className="archmock__topbar">
            <span className="archmock__topbar-pill">
              <i className="ti ti-award" /> Your prompt is ready
            </span>
            <div className="archmock__topbar-right">
              <span className="archmock__topbar-chip archmock__topbar-chip--ph">
                <i className="ti ti-trophy" /> #3 Product of the Day
              </span>
              <span className="archmock__topbar-chip">
                <i className="ti ti-gift" /> Get free $10 of credits
              </span>
              <span className="archmock__topbar-chip">
                <i className="ti ti-coin" /> $8,638.01
              </span>
              <span className="archmock__user">
                <span className="archmock__avatar">SU</span>
                <span>suyash</span>
              </span>
            </div>
          </div>

          <div className="archmock__hero">
            <h1 className="archmock__title">Architect</h1>
            <p className="archmock__sub">
              The Agent Builder Platform for Business Executives &amp; Consultants
            </p>
          </div>

          <div className="archmock__inputwrap">
            <div className="archmock__inputlabel">
              <span>
                <i className="ti ti-sparkles" /> Personalised prompt for{" "}
                <strong>{payload?.businessName || agent?.name}</strong>
              </span>
              <button
                type="button"
                className="archmock__copybtn"
                onClick={copyPrompt}
                aria-label="Copy prompt"
              >
                <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="archmock__inputbox">
              <textarea
                className="archmock__prompt"
                readOnly
                value={prompt}
                rows={Math.min(16, Math.max(6, prompt.split("\n").length + 1))}
              />
              <div className="archmock__inputrow">
                <button
                  type="button"
                  className="archmock__inputicon"
                  aria-label="Attach"
                  disabled
                >
                  <i className="ti ti-plus" />
                </button>
                <div className="archmock__inputrow-right">
                  <button
                    type="button"
                    className="archmock__inputicon"
                    aria-label="Voice"
                    disabled
                  >
                    <i className="ti ti-microphone" />
                  </button>
                  <button
                    type="button"
                    className="archmock__sendbtn"
                    onClick={openArchitect}
                    aria-label="Send to Architect"
                  >
                    <i className="ti ti-arrow-up" />
                  </button>
                </div>
              </div>
            </div>

            <div className="archmock__cta-row">
              <span className="archmock__hint">
                <i className="ti ti-info-circle" /> The prompt is also copied
                to your clipboard.
              </span>
              <button
                type="button"
                className="btn btn--primary archmock__cta"
                onClick={openArchitect}
              >
                Open Architect &amp; paste prompt{" "}
                <span className="arrow">→</span>
              </button>
            </div>
          </div>

          <div className="archmock__connectrow">
            <span className="archmock__connectlabel">Connect with</span>
            <span className="archmock__connecticons">
              <i className="ti ti-brand-google" title="Gmail" />
              <i className="ti ti-brand-slack" title="Slack" />
              <i className="ti ti-brand-office" title="Microsoft" />
              <i className="ti ti-brand-notion" title="Notion" />
              <i className="ti ti-brand-github" title="GitHub" />
              <i className="ti ti-brand-zapier" title="Zapier" />
              <i className="ti ti-database" title="Database" />
            </span>
            <span className="archmock__connectmore">And many more</span>
          </div>

          <section className="archmock__myapps">
            <h2>My Apps</h2>
            <p>Your created applications</p>
            <div className="archmock__appgrid">
              <div className="archmock__appcard">
                <div className="archmock__appcard-thumb" />
                <div className="archmock__appcard-name">{agent?.name}</div>
                <div className="archmock__appcard-sub">
                  Just generated · ready to build
                </div>
              </div>
              <div className="archmock__appcard archmock__appcard--ghost" />
              <div className="archmock__appcard archmock__appcard--ghost" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
