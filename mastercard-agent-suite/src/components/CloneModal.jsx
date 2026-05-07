import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./CloneModal.css";

const INDUSTRIES = [
  "Healthcare",
  "Retail",
  "Financial Services",
  "Hospitality",
  "Legal",
  "Real Estate",
  "Education",
  "Beauty & Wellness",
  "Other",
];

const SIZES = ["1–10", "11–50", "51–200", "200+"];

const TONES = ["Friendly", "Professional", "Concise", "Warm"];

const LANGUAGES = [
  "English (US)",
  "English (UK)",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Portuguese",
];

const CHAT_CHANNELS = ["Web chat", "WhatsApp", "SMS", "Email"];

export function CloneModal({ agent, onClose, onDeploy }) {
  const isVoice = agent.channel.includes("Voice");
  const isChat = agent.previewKind === "chat" || agent.previewKind === "support";

  const [businessName, setBusinessName] = useState(
    isChat ? "Cove Coffee Co." : "Bloom & Co"
  );
  const [industry, setIndustry] = useState(isChat ? "Retail" : "Retail");
  const [size, setSize] = useState("1–10");
  const [scope, setScope] = useState(
    isChat
      ? "Answer FAQs from our knowledge base, handle order status and returns, and escalate complex issues to a human."
      : "Answer customer calls, share opening hours and bouquet pricing, and book delivery slots."
  );
  const [tone, setTone] = useState(isChat ? "Concise" : "Warm");
  const [language, setLanguage] = useState("English (US)");
  const [hours, setHours] = useState("Mon–Sat · 9:00 AM – 7:00 PM");
  const [knowledge, setKnowledge] = useState(null);

  // Chat-specific
  const [channels, setChannels] = useState(["Web chat", "WhatsApp"]);
  const [shippingPolicy, setShippingPolicy] = useState(
    "Free US shipping over $40. Standard 3–5 business days, Express 1–2."
  );
  const [returnPolicy, setReturnPolicy] = useState(
    "30-day return window on unopened items. Refunds within 5 business days of receipt."
  );
  const [escalationEmail, setEscalationEmail] = useState("support@covecoffee.co");
  const [escalationHours, setEscalationHours] = useState(
    "Mon–Fri · 9:00 AM – 5:00 PM PT"
  );

  function toggleChannel(c) {
    setChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function submit(e) {
    e.preventDefault();
    onDeploy({
      businessName,
      industry,
      size,
      scope,
      tone,
      language,
      hours: isVoice ? hours : null,
      knowledge: knowledge?.name || null,
      ...(isChat
        ? {
            channels,
            shippingPolicy,
            returnPolicy,
            escalationEmail,
            escalationHours,
          }
        : {}),
    });
  }

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel" role="document">
        <header className="modal__head">
          <div className="modal__head-id">
            <span className="modal__brand">
              <span className="modal__circle modal__circle--red" />
              <span className="modal__circle modal__circle--yellow" />
            </span>
            <div>
              <div className="modal__eyebrow">Clone &amp; Customise</div>
              <div className="modal__title">{agent.name}</div>
            </div>
          </div>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close customise"
          >
            <i className="ti ti-x" />
          </button>
        </header>

        <hr className="divider" />

        <form className="modal__form" onSubmit={submit}>
          <div className="modal__intro">
            <span className="eyebrow">Step 1 · Tell us about your business</span>
            <p>
              We use this to personalise how the agent introduces itself and
              what context it has when answering questions.
            </p>
          </div>

          <div className="field-row">
            <Field label="Business name" full>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Bloom & Co"
                required
              />
            </Field>
          </div>

          <div className="field-row field-row--2">
            <Field label="Industry">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                {INDUSTRIES.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </Field>
            <Field label="Business size">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {SIZES.map((s) => (
                  <option key={s}>{s} people</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="modal__intro modal__intro--2">
            <span className="eyebrow">
              Step 2 · Shape how your agent works
            </span>
          </div>

          <Field label="What should this agent help with?" full>
            <textarea
              rows={3}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Describe in plain English what you want the agent to handle…"
            />
          </Field>

          <Field label="Agent tone" full>
            <div className="toggles">
              {TONES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={"toggle" + (tone === t ? " toggle--on" : "")}
                  onClick={() => setTone(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>

          <div
            className={
              "field-row " + (isVoice ? "field-row--2" : "field-row--1")
            }
          >
            <Field label="Primary language">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
            {isVoice && (
              <Field label="Operating hours">
                <input
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="e.g. Mon–Fri 9 AM – 6 PM"
                />
              </Field>
            )}
          </div>

          {isChat && (
            <>
              <Field label="Channels" full hint="Where customers will reach this agent">
                <div className="toggles">
                  {CHAT_CHANNELS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      className={
                        "toggle" + (channels.includes(c) ? " toggle--on" : "")
                      }
                      onClick={() => toggleChannel(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Shipping policy" full>
                <textarea
                  rows={2}
                  value={shippingPolicy}
                  onChange={(e) => setShippingPolicy(e.target.value)}
                  placeholder="e.g. Free shipping over $40. Standard 3–5 business days."
                />
              </Field>

              <Field label="Return & refund policy" full>
                <textarea
                  rows={2}
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                  placeholder="e.g. 30-day window on unopened items. Refunds within 5 business days."
                />
              </Field>

              <div className="field-row field-row--2">
                <Field label="Escalation email">
                  <input
                    type="email"
                    value={escalationEmail}
                    onChange={(e) => setEscalationEmail(e.target.value)}
                    placeholder="support@yourbrand.com"
                  />
                </Field>
                <Field label="Human-available hours">
                  <input
                    value={escalationHours}
                    onChange={(e) => setEscalationHours(e.target.value)}
                    placeholder="e.g. Mon–Fri · 9 AM – 5 PM"
                  />
                </Field>
              </div>
            </>
          )}

          <div className="modal__intro modal__intro--2">
            <span className="eyebrow">Step 3 · Optional context</span>
          </div>

          <Field label="Upload knowledge base" full hint="FAQs, product info, policies — PDF / DOCX / TXT">
            <label className="upload">
              <i className="ti ti-cloud-upload" />
              <span>{knowledge ? knowledge.name : "Drop files or click to upload"}</span>
              <input
                type="file"
                accept=".pdf,.docx,.txt,.md"
                onChange={(e) => setKnowledge(e.target.files?.[0] || null)}
              />
            </label>
          </Field>

          <div className="modal__foot">
            <span className="modal__foot-note">
              <i className="ti ti-shield-check" />
              All inputs stay in your Mastercard workspace. Editable later.
            </span>
            <button type="submit" className="btn btn--primary modal__submit">
              Deploy My Agent <span className="arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function Field({ label, full, hint, children }) {
  return (
    <label className={"field" + (full ? " field--full" : "")}>
      <span className="field__label">{label}</span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}
