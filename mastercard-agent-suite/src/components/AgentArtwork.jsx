import "./AgentArtwork.css";

// Clean, light-themed wireframe artwork per agent kind.
// Replaces the dark mock-dashboard previews on press-mode cards.

export function AgentArtwork({ agent }) {
  const kind = agent.previewKind || agent.id;
  const accent = agent.accent || "#ff671b";
  return (
    <div
      className={`artwork artwork--${kind}${agent.screenshot ? " artwork--shot" : ""}`}
      style={{ "--accent": accent }}
    >
      {agent.screenshot ? (
        <img className="artwork__shot" src={agent.screenshot} alt={`${agent.name} preview`} />
      ) : (
        renderArt(kind)
      )}
    </div>
  );
}

function renderArt(kind) {
  switch (kind) {
    case "voice":
    case "voice-receptionist":
      return <VoiceArt />;
    case "sales":
    case "sales-voice":
      return <SalesArt />;
    case "support":
    case "support-chat":
    case "chat":
      return <ChatArt />;
    case "payments":
    case "payment-agent":
      return <PaymentArt />;
    case "scheduler":
    case "appointment-scheduler":
      return <CalendarArt />;
    case "hr":
    case "hr-onboarding":
      return <OnboardingArt />;
    default:
      return <DefaultArt />;
  }
}

/* ─── Voice Receptionist — concentric ripples around a phone glyph ─── */
function VoiceArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      <defs>
        <radialGradient id="voiceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill="url(#voiceGlow)" />
      {[88, 64, 40].map((r, i) => (
        <circle
          key={r}
          cx="160"
          cy="100"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.18 + i * 0.08}
          strokeWidth="1"
        />
      ))}
      <circle cx="160" cy="100" r="22" fill="var(--accent)" />
      <path
        d="M156 92 a4 4 0 0 1 4-4 h2 l3 6-3 3 a14 14 0 0 0 7 7 l3-3 6 3 v2 a4 4 0 0 1-4 4 a22 22 0 0 1-21-22z"
        fill="#fff"
        opacity="0.95"
      />
    </svg>
  );
}

/* ─── Sales Voice — ascending bars + sparkline ─── */
function SalesArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      <defs>
        <linearGradient id="salesGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[60, 100, 140].map((y) => (
        <line
          key={y}
          x1="40"
          x2="280"
          y1={y}
          y2={y}
          stroke="rgba(20,20,19,0.06)"
          strokeWidth="1"
        />
      ))}
      {/* bars */}
      {[
        { x: 60, h: 30 },
        { x: 100, h: 50 },
        { x: 140, h: 42 },
        { x: 180, h: 70 },
        { x: 220, h: 86 },
      ].map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={150 - b.h}
          width="22"
          height={b.h}
          rx="3"
          fill="url(#salesGrad)"
        />
      ))}
      {/* sparkline */}
      <path
        d="M50 130 L90 110 L130 116 L170 84 L210 70 L260 50"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="260" cy="50" r="4" fill="var(--accent)" />
    </svg>
  );
}

/* ─── Customer Support Chat — three overlapping speech bubbles ─── */
function ChatArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      <g transform="translate(40, 40)">
        <rect
          x="0"
          y="0"
          width="140"
          height="44"
          rx="22"
          fill="#ffffff"
          stroke="rgba(20,20,19,0.1)"
        />
        <circle cx="22" cy="22" r="3" fill="rgba(20,20,19,0.4)" />
        <circle cx="34" cy="22" r="3" fill="rgba(20,20,19,0.4)" />
        <circle cx="46" cy="22" r="3" fill="rgba(20,20,19,0.4)" />
      </g>
      <g transform="translate(120, 86)">
        <rect
          x="0"
          y="0"
          width="160"
          height="44"
          rx="22"
          fill="var(--accent)"
        />
        <rect
          x="20"
          y="14"
          width="74"
          height="6"
          rx="3"
          fill="#ffffff"
          opacity="0.9"
        />
        <rect
          x="20"
          y="26"
          width="48"
          height="6"
          rx="3"
          fill="#ffffff"
          opacity="0.6"
        />
      </g>
      <g transform="translate(60, 132)">
        <rect
          x="0"
          y="0"
          width="124"
          height="36"
          rx="18"
          fill="#ffffff"
          stroke="rgba(20,20,19,0.1)"
        />
        <rect
          x="16"
          y="12"
          width="60"
          height="5"
          rx="2"
          fill="rgba(20,20,19,0.35)"
        />
        <rect
          x="16"
          y="22"
          width="40"
          height="5"
          rx="2"
          fill="rgba(20,20,19,0.2)"
        />
      </g>
    </svg>
  );
}

/* ─── Payment & Invoice — stylized credit card with arc ─── */
function PaymentArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      <defs>
        <linearGradient id="cardGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="#f79e1b" />
        </linearGradient>
      </defs>
      <rect
        x="60"
        y="48"
        width="200"
        height="120"
        rx="14"
        fill="url(#cardGrad)"
      />
      {/* mc-style overlapping circles */}
      <circle cx="200" cy="138" r="14" fill="#eb001b" opacity="0.95" />
      <circle cx="216" cy="138" r="14" fill="#f79e1b" opacity="0.85" />
      {/* card lines */}
      <rect x="76" y="68" width="40" height="6" rx="2" fill="#ffffff" opacity="0.8" />
      <rect x="76" y="100" width="120" height="6" rx="2" fill="#ffffff" opacity="0.7" />
      <rect x="76" y="114" width="80" height="6" rx="2" fill="#ffffff" opacity="0.5" />
      <rect x="76" y="138" width="60" height="5" rx="2" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

/* ─── Appointment Scheduler — clean calendar grid ─── */
function CalendarArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      <rect
        x="60"
        y="36"
        width="200"
        height="128"
        rx="10"
        fill="#ffffff"
        stroke="rgba(20,20,19,0.1)"
      />
      <rect
        x="60"
        y="36"
        width="200"
        height="24"
        rx="10"
        fill="rgba(20,20,19,0.04)"
      />
      <rect x="60" y="50" width="200" height="10" fill="rgba(20,20,19,0.04)" />
      {/* day cells */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => {
          const x = 70 + col * 26;
          const y = 70 + row * 18;
          const highlight =
            (row === 1 && col === 3) ||
            (row === 2 && col === 5) ||
            (row === 3 && col === 1);
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="20"
              height="14"
              rx="3"
              fill={highlight ? "var(--accent)" : "rgba(20,20,19,0.04)"}
              opacity={highlight ? 0.9 : 1}
            />
          );
        })
      )}
    </svg>
  );
}

/* ─── HR Onboarding — three avatars + checklist ─── */
function OnboardingArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      {/* avatars */}
      {[80, 160, 240].map((cx, i) => (
        <g key={cx}>
          <circle
            cx={cx}
            cy="70"
            r="22"
            fill={i === 1 ? "var(--accent)" : "#ffffff"}
            stroke="rgba(20,20,19,0.12)"
          />
          <circle
            cx={cx}
            cy="64"
            r="7"
            fill={i === 1 ? "#ffffff" : "rgba(20,20,19,0.5)"}
          />
          <path
            d={`M${cx - 11} 84 a11 11 0 0 1 22 0`}
            fill={i === 1 ? "#ffffff" : "rgba(20,20,19,0.5)"}
          />
        </g>
      ))}
      {/* checklist row */}
      <g transform="translate(60, 120)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0, ${i * 18})`}>
            <rect
              x="0"
              y="0"
              width="14"
              height="14"
              rx="3"
              fill={i < 2 ? "var(--accent)" : "#ffffff"}
              stroke={i < 2 ? "var(--accent)" : "rgba(20,20,19,0.18)"}
            />
            {i < 2 && (
              <path
                d="M3.5 7.5 L6.5 10.5 L11 5.5"
                stroke="#ffffff"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <rect
              x="22"
              y="4"
              width={i === 2 ? "70" : "120"}
              height="6"
              rx="2"
              fill="rgba(20,20,19,0.18)"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function DefaultArt() {
  return (
    <svg className="artwork__svg" viewBox="0 0 320 200" aria-hidden>
      <circle cx="120" cy="100" r="60" fill="var(--accent)" opacity="0.18" />
      <circle cx="200" cy="100" r="60" fill="#f79e1b" opacity="0.18" />
    </svg>
  );
}
