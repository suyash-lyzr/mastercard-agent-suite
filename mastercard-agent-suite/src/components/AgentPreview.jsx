import "./AgentPreview.css";

export function AgentPreview({ agent, size = "card" }) {
  const cls = `preview preview--${size} preview--${agent.previewKind}`;
  return (
    <div
      className={cls}
      style={{
        "--accent": agent.accent,
      }}
    >
      <div className="preview__bg" aria-hidden />
      <div className="preview__chrome" aria-hidden>
        <span className="preview__dot" />
        <span className="preview__dot" />
        <span className="preview__dot" />
        <span className="preview__chrome-label">{agent.name}</span>
        <span className="preview__live">
          <span className="live-dot" /> Live preview
        </span>
      </div>
      <div className="preview__stage">{renderStage(agent)}</div>
    </div>
  );
}

function renderStage(agent) {
  switch (agent.previewKind) {
    case "voice":
      return <VoicePreview />;
    case "sales":
      return <SalesPreview />;
    case "chat":
      return <ChatPreview />;
    case "payment":
      return <PaymentPreview />;
    case "scheduler":
      return <SchedulerPreview />;
    case "hr":
      return <HRPreview />;
    default:
      return null;
  }
}

function VoicePreview() {
  return (
    <div className="vp">
      <div className="vp__caller">
        <span className="vp__caller-label">INBOUND CALL</span>
        <span className="vp__caller-num">+1 (415) 555 · 0182</span>
      </div>
      <div className="vp__avatar">
        <span className="vp__ring vp__ring--3" />
        <span className="vp__ring vp__ring--2" />
        <span className="vp__ring vp__ring--1" />
        <span className="vp__avatar-mark">
          <i className="ti ti-flower" />
        </span>
      </div>
      <div className="vp__meta">
        <div className="vp__name">Bloom &amp; Co Receptionist</div>
        <div className="vp__sub">
          <span className="live-dot" /> Speaking · 00:42
        </div>
      </div>
      <div className="vp__wave" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="vp__bar"
            style={{ animationDelay: `${(i % 14) * 0.06}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function SalesPreview() {
  return (
    <div className="sp">
      <div className="sp__header">
        <div className="sp__avatar">SC</div>
        <div className="sp__id">
          <div className="sp__name">Sarah Chen</div>
          <div className="sp__role">VP Sales · TechCo</div>
        </div>
        <span className="sp__badge">Hot lead</span>
      </div>

      <div className="sp__stages">
        <span className="sp__stage sp__stage--done">Qualified</span>
        <span className="sp__stage sp__stage--current">Discovery</span>
        <span className="sp__stage">Demo</span>
        <span className="sp__stage">Closed</span>
      </div>

      <div className="sp__quote">
        <i className="ti ti-quote" />
        <p>
          "Tell me how this works for a 200-person sales team — we currently use
          Salesforce."
        </p>
      </div>

      <div className="sp__row">
        <div className="sp__metric">
          <div className="sp__metric-label">Pipeline</div>
          <div className="sp__metric-value">$42,000</div>
        </div>
        <div className="sp__cta">
          <i className="ti ti-calendar-event" />
          Booked · Wed 2:00 PM ET
        </div>
      </div>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="cp">
      <div className="cp__channel">
        <i className="ti ti-brand-whatsapp" /> WhatsApp Business
      </div>
      <div className="cp__msg cp__msg--in">
        Hi! When does my order #1042 ship?
      </div>
      <div className="cp__msg cp__msg--out">
        Hi Maya — your order shipped today via FedEx. ETA: <b>Wed, May 13</b>.
        Tracking: <span className="cp__link">FX742-1042</span>
      </div>
      <div className="cp__msg cp__msg--in">Can I change the delivery address?</div>
      <div className="cp__typing">
        <span /> <span /> <span />
      </div>
    </div>
  );
}

function PaymentPreview() {
  return (
    <div className="pp">
      <div className="pp__head">
        <div>
          <div className="pp__inv">INVOICE · INV-2103</div>
          <div className="pp__to">For: Crescent Wellness</div>
        </div>
        <div className="pp__brand">
          <span className="pp__circle pp__circle--red" />
          <span className="pp__circle pp__circle--yellow" />
        </div>
      </div>

      <div className="pp__rows">
        <div className="pp__row">
          <span>Strategy session · 4 hrs</span>
          <span>$640.00</span>
        </div>
        <div className="pp__row">
          <span>Implementation</span>
          <span>$520.00</span>
        </div>
        <div className="pp__row">
          <span>Toolkit licence</span>
          <span>$80.00</span>
        </div>
      </div>

      <div className="pp__total">
        <span>Total due</span>
        <span>$1,240.00</span>
      </div>

      <button className="pp__pay">
        <span className="pp__circle pp__circle--red" />
        <span className="pp__circle pp__circle--yellow" />
        Pay $1,240.00 with Mastercard
      </button>
      <div className="pp__foot">Due in 7 days · auto-followup if unpaid</div>
    </div>
  );
}

function SchedulerPreview() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const booked = new Set([
    "0-1",
    "1-2",
    "2-0",
    "2-3",
    "3-1",
    "4-2",
    "5-0",
    "5-3",
  ]);
  return (
    <div className="scp">
      <div className="scp__title">May 11 — May 17</div>
      <div className="scp__grid">
        {days.map((d, di) => (
          <div className="scp__col" key={d}>
            <div className="scp__day">{d}</div>
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className={
                  "scp__slot" + (booked.has(`${di}-${row}`) ? " scp__slot--booked" : "")
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="scp__next">
        <i className="ti ti-clock" />
        <span>Next · 3:00 PM — Hair colour, Priya R.</span>
        <span className="scp__sync">
          <i className="ti ti-refresh" /> Synced
        </span>
      </div>
    </div>
  );
}

function HRPreview() {
  const items = [
    { label: "Personal details", done: true },
    { label: "Tax forms (W-9)", done: true },
    { label: "Direct deposit", done: false },
    { label: "Welcome session", done: false },
  ];
  return (
    <div className="hp">
      <div className="hp__head">
        <div className="hp__avatar">PR</div>
        <div>
          <div className="hp__welcome">Welcome, Priya</div>
          <div className="hp__role">Associate · Acme Retail</div>
        </div>
        <span className="hp__day">Day 1</span>
      </div>
      <div className="hp__progress">
        <div className="hp__progress-bar" style={{ width: "55%" }} />
        <div className="hp__progress-label">55% complete · 2 of 4 tasks</div>
      </div>
      <ul className="hp__list">
        {items.map((it) => (
          <li
            className={"hp__item" + (it.done ? " hp__item--done" : "")}
            key={it.label}
          >
            <span className="hp__check">
              {it.done ? <i className="ti ti-check" /> : null}
            </span>
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
