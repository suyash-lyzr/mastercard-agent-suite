import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./CloneModal.css";

const INDUSTRIES = [
  "Healthcare",
  "Retail",
  "Food & Beverage",
  "Financial Services",
  "Hospitality",
  "Legal",
  "Real Estate",
  "Education",
  "Beauty & Wellness",
  "Professional Services",
  "Marketing & Media",
  "Other",
];

const SIZES = ["1–10", "11–50", "51–200", "200+"];
const TONES = ["Friendly", "Professional", "Concise", "Warm"];
const LANGUAGES = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
  "Portuguese",
  "German",
  "Italian",
  "Hindi",
  "Arabic",
];

export function CloneModal({ agent, onClose, onDeploy }) {
  const schema = agent.cloneFields || {};
  const step1Extras = schema.step1Extras || [];
  const step2Fields = schema.step2Fields || [];

  // Defaults: derive a sensible business name + industry per agent
  const defaultBizName = agent.demoBusiness?.name || "";
  const defaultIndustry = pickIndustry(agent.category);

  const [businessName, setBusinessName] = useState(defaultBizName);
  const [industry, setIndustry] = useState(defaultIndustry);
  const [size, setSize] = useState("1–10");
  const [knowledge, setKnowledge] = useState(null);

  // Schema-driven values
  const [values, setValues] = useState(() => {
    const init = {};
    [...step1Extras, ...step2Fields].forEach((f) => {
      init[f.id] =
        f.default !== undefined
          ? f.default
          : f.type === "toggles"
          ? []
          : "";
    });
    return init;
  });

  function setValue(id, v) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  function toggleArrayValue(id, option) {
    setValues((prev) => {
      const arr = prev[id] || [];
      return {
        ...prev,
        [id]: arr.includes(option)
          ? arr.filter((o) => o !== option)
          : [...arr, option],
      };
    });
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
      ...values,
      knowledge: knowledge?.name || null,
      tone: values.tone, // surfaced to Deployed page
      language: values.language,
      hours: values.operatingHours || null,
    });
  }

  // Group sequential non-full fields into rows of 2 (matching original layout)
  const step1Rows = useMemo(() => groupIntoRows(step1Extras), [step1Extras]);
  const step2Rows = useMemo(() => groupIntoRows(step2Fields), [step2Fields]);

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
              {schema.step1Intro ||
                "We use this to personalise how the agent introduces itself and what context it has when answering questions."}
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
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                {SIZES.map((s) => (
                  <option key={s}>{s} people</option>
                ))}
              </select>
            </Field>
          </div>

          {step1Rows.map((row, i) => (
            <RenderRow
              key={`s1-${i}`}
              row={row}
              values={values}
              setValue={setValue}
              toggleArrayValue={toggleArrayValue}
            />
          ))}

          <div className="modal__intro modal__intro--2">
            <span className="eyebrow">
              Step 2 · Shape how your agent works
            </span>
            {schema.step2Intro && <p>{schema.step2Intro}</p>}
          </div>

          {step2Rows.map((row, i) => (
            <RenderRow
              key={`s2-${i}`}
              row={row}
              values={values}
              setValue={setValue}
              toggleArrayValue={toggleArrayValue}
            />
          ))}

          <div className="modal__intro modal__intro--2">
            <span className="eyebrow">Step 3 · Optional context</span>
          </div>

          <Field
            label="Upload knowledge base"
            full
            hint="FAQs, product info, policies — PDF / DOCX / TXT"
          >
            <label className="upload">
              <i className="ti ti-cloud-upload" />
              <span>
                {knowledge ? knowledge.name : "Drop files or click to upload"}
              </span>
              <input
                type="file"
                accept=".pdf,.docx,.txt,.md"
                onChange={(e) => setKnowledge(e.target.files?.[0] || null)}
              />
            </label>
          </Field>

          <div className="modal__foot">
            <span className="modal__foot-note">
              <i className="ti ti-bolt" />
              Your custom app builds in 10–15 minutes.
            </span>
            <button type="submit" className="btn btn--primary modal__submit">
              Build Customised App <span className="arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function pickIndustry(category) {
  switch (category) {
    case "customer-service":
      return "Retail";
    case "sales":
      return "Professional Services";
    case "payments":
      return "Professional Services";
    case "marketing":
      return "Marketing & Media";
    case "hr":
      return "Food & Beverage";
    default:
      return "Retail";
  }
}

function groupIntoRows(fields) {
  const rows = [];
  let pair = [];
  const flush = () => {
    if (pair.length > 0) {
      rows.push(pair);
      pair = [];
    }
  };
  fields.forEach((f) => {
    if (f.full) {
      flush();
      rows.push([f]);
    } else {
      pair.push(f);
      if (pair.length === 2) flush();
    }
  });
  flush();
  return rows;
}

function RenderRow({ row, values, setValue, toggleArrayValue }) {
  if (row.length === 1 && row[0].full) {
    return (
      <div className="field-row">
        {renderField(row[0], values, setValue, toggleArrayValue)}
      </div>
    );
  }
  if (row.length === 2) {
    return (
      <div className="field-row field-row--2">
        {row.map((f) => renderField(f, values, setValue, toggleArrayValue))}
      </div>
    );
  }
  return (
    <div className="field-row field-row--1">
      {row.map((f) => renderField(f, values, setValue, toggleArrayValue))}
    </div>
  );
}

function renderField(f, values, setValue, toggleArrayValue) {
  const v = values[f.id];

  if (f.type === "tone") {
    return (
      <Field key={f.id} label={f.label} full hint={f.hint}>
        <div className="toggles">
          {TONES.map((t) => (
            <button
              type="button"
              key={t}
              className={"toggle" + (v === t ? " toggle--on" : "")}
              onClick={() => setValue(f.id, t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>
    );
  }

  if (f.type === "language") {
    return (
      <Field key={f.id} label={f.label} hint={f.hint}>
        <select value={v} onChange={(e) => setValue(f.id, e.target.value)}>
          {LANGUAGES.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </Field>
    );
  }

  if (f.type === "select") {
    return (
      <Field key={f.id} label={f.label} full={f.full} hint={f.hint}>
        <select value={v} onChange={(e) => setValue(f.id, e.target.value)}>
          {(f.options || []).map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </Field>
    );
  }

  if (f.type === "toggles") {
    const arr = Array.isArray(v) ? v : [];
    return (
      <Field key={f.id} label={f.label} full hint={f.hint}>
        <div className="toggles">
          {(f.options || []).map((opt) => (
            <button
              type="button"
              key={opt}
              className={"toggle" + (arr.includes(opt) ? " toggle--on" : "")}
              onClick={() => toggleArrayValue(f.id, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>
    );
  }

  if (f.type === "textarea") {
    return (
      <Field key={f.id} label={f.label} full={f.full} hint={f.hint}>
        <textarea
          rows={f.rows || 2}
          value={v}
          onChange={(e) => setValue(f.id, e.target.value)}
          placeholder={f.placeholder}
        />
      </Field>
    );
  }

  // text / email / tel
  return (
    <Field key={f.id} label={f.label} full={f.full} hint={f.hint}>
      <input
        type={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "text"}
        value={v}
        onChange={(e) => setValue(f.id, e.target.value)}
        placeholder={f.placeholder}
      />
    </Field>
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
