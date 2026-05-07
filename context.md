# Mastercard SMB Agent Marketplace — Claude Code Context Document

> **Purpose:** Full build brief for Claude Code. This document covers design language, app architecture, agent catalog, component specs, and the clone/customise flow. Read it in full before writing a single line of code.

---

## 1. What We're Building

A **demo-ready web app** called **"Mastercard Agent Suite"** — a marketplace where Mastercard's SMB customers (e.g. a flower shop, a dental clinic, a retail store) can browse pre-built AI agents, preview them in action, clone one to their own workspace, fill in their business details, and deploy it.

**This is a pitch demo for a Friday Mastercard presentation.** It needs to look premium and production-ready. It does not need a real backend — data can be hardcoded or mocked.

The agents shown in the marketplace are real Architect (architect.new) apps that will be built and embedded as iframes. The clone + customise flow is mocked UI.

---

## 2. Design Language

### 2a. Primary Aesthetic: MasterClass-Inspired Dark Cinema

Take heavy inspiration from [MasterClass.com](https://www.masterclass.com) — the online learning platform. Their aesthetic is:

- **Dark, cinematic, premium.** Near-black backgrounds, not pure black.
- **Full-bleed hero sections** with large typography and atmospheric photography/gradients.
- **Card grid layouts** that feel like Netflix — each card is a rich visual tile.
- **High contrast typography** — bright white headings, muted gray body text.
- **Thin gold/amber accents** used sparingly — never garish.
- **Serif display fonts for headings**, clean sans-serif for UI.
- Feels like a luxury product, not a B2B SaaS dashboard.

### 2b. Mastercard Brand Integration

Layer these Mastercard brand elements on top of the dark aesthetic:

| Token          | Value                    | Usage                                           |
| -------------- | ------------------------ | ----------------------------------------------- |
| MC Red         | `#EB001B`                | Primary CTA buttons, active states, key accents |
| MC Orange      | `#FF5F00`                | Gradient midpoint (red → orange)                |
| MC Yellow      | `#F79E1B`                | Secondary accents, category tags, highlights    |
| MC Dark        | `#19110B`                | Base page background (slightly warm dark)       |
| Surface 1      | `#1C1410`                | Card backgrounds                                |
| Surface 2      | `#231A14`                | Elevated cards, modals                          |
| Text Primary   | `#F5F0E8`                | Warm white for headings                         |
| Text Secondary | `#9A8F84`                | Muted warm gray for body text                   |
| Border         | `rgba(255,255,255,0.08)` | Subtle borders                                  |

**The Mastercard logo mark** (two overlapping circles — red `#EB001B` and yellow `#F79E1B`) should appear in the top-left of the nav. Recreate it with two CSS circles — no image needed.

### 2c. Typography

- **Display / Hero headings:** `Playfair Display` (Google Font) — serif, cinematic
- **UI headings (H2–H4):** `DM Sans` or `Inter` — clean, modern
- **Body / Labels:** `DM Sans`
- **Monospace (agent code/embed snippets):** `JetBrains Mono`

Import from Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### 2d. Visual Details

- **Gradient on hero text:** `background: linear-gradient(135deg, #F5F0E8 0%, #F79E1B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- **Card hover effect:** Subtle upward translate + border glow in MC red
- **CTA buttons:** MC Red background with subtle gradient → orange. Pill-shaped (border-radius: 50px).
- **Tag/badge pills:** Dark surface with MC Yellow text for category labels
- **Section dividers:** Thin horizontal rule using a red→orange gradient line, 1px height

---

## 3. App Architecture & Pages

### Single-page app (React + Vite recommended, or plain HTML/CSS/JS)

```
/
├── index.html          ← App shell
├── src/
│   ├── App.jsx
│   ├── data/
│   │   └── agents.js   ← Hardcoded agent catalog
│   ├── pages/
│   │   ├── Marketplace.jsx     ← Browse screen (Screen 1)
│   │   ├── AgentDetail.jsx     ← Agent detail + live preview (Screen 2)
│   │   └── Deployed.jsx        ← Post-deploy success screen (Screen 4)
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── AgentCard.jsx
│   │   ├── CloneModal.jsx      ← Customise form (Screen 3)
│   │   ├── ArchitectEmbed.jsx  ← iframe wrapper for live agent preview
│   │   └── FilterBar.jsx
│   └── styles/
│       └── tokens.css          ← CSS variables from design tokens above
```

---

## 4. Screen-by-Screen Spec

### Screen 1: Marketplace Browse

**Layout:**

- Full-width nav bar (MC logo mark + "Agent Suite" wordmark + "Powered by Lyzr" badge)
- Hero section: Large Playfair Display heading — _"AI agents for your business. Ready in minutes."_ — with a warm dark gradient background and subtle animated particles or grain texture
- Filter bar: horizontal pill filters — All · Customer Service · Sales · Payments · Operations · HR
- Agent card grid: 3 columns on desktop, 2 on tablet, 1 on mobile

**Agent Card design (MasterClass course card style):**

- Dark surface card (`#1C1410`), 1px border (`rgba(255,255,255,0.08)`)
- Top: 16:9 ratio visual area — use a dark gradient with a centered icon (Tabler icon, 40px, in MC Yellow) or a placeholder illustration color
- Bottom section: Agent name (DM Sans 500), one-line description, category tag, rating
- Hover: card lifts 4px, left border becomes MC Red 2px glow
- "Preview & Deploy" button appears on hover as an overlay CTA

### Screen 2: Agent Detail Page

**Layout: Two-column (60/40 split)**

Left column:

- Agent name in Playfair Display (large, 36px)
- Category tag + rating
- Short description paragraph
- "What this agent does" — bullet list of 4–5 capabilities
- "Who it's for" — 2–3 SMB example business types
- "Powered by" badge (Lyzr + Architect logos)

Right column:

- **Live agent preview** — this is an `<iframe>` embedding the actual Architect app URL
- Below iframe: "Try it yourself" label
- Under preview: a prominent CTA button — **"Clone & Customise for Your Business →"** (MC Red, pill-shaped, full width)

### Screen 3: Clone & Customise Modal

Triggered by clicking "Clone & Customise". Renders as a centered modal overlay on a dark backdrop.

**Modal sections:**

```
┌─────────────────────────────────────┐
│  🔴🟡 Clone: AI Voice Receptionist  │
│                                     │
│  Tell us about your business        │
│                                     │
│  Business name ___________________  │
│  Industry [dropdown] Size [dropdown]│
│                                     │
│  What should your agent handle?     │
│  [textarea]                         │
│                                     │
│  Agent tone                         │
│  [Friendly] [Professional] [Warm]   │
│                                     │
│  Primary language [dropdown]        │
│  Operating hours __________________ │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  Deploy My Agent  →          │   │  ← MC Red button
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Fields to collect:**

- Business name (text input)
- Industry (select: Healthcare, Retail, Financial Services, Hospitality, Legal, Real Estate, Education, Other)
- Business size (select: 1–10, 11–50, 51–200, 200+)
- What should this agent help with? (textarea, 3 rows)
- Agent tone (pill toggles: Friendly / Professional / Concise / Warm)
- Primary language (select: English, Hindi, Spanish, French, Arabic)
- Operating hours (text input, only shown for voice agents)
- Upload company knowledge base (optional file input, styled subtly — "Upload FAQs or product info (optional)")

### Screen 4: Success / Deployed

Full-page confirmation:

- Large MC Red checkmark circle animation (CSS)
- Playfair Display heading: _"Your agent is live."_
- Summary card showing: Agent name, Business name, Industry, Channel, Status (Active)
- Two CTAs: "Add another agent" (outline) | "View your dashboard" (filled MC Red, mocked)
- Small footnote: "Built with Architect by Lyzr"

---

## 5. Agent Catalog (Hardcoded Data)

Build these 6 agents as the catalog. The first 3 will have real Architect embed URLs (fill these in once built). The last 3 can use a placeholder iframe with a "Coming soon" state.

```javascript
// src/data/agents.js

export const agents = [
  {
    id: "voice-receptionist",
    name: "AI Voice Receptionist",
    tagline: "Never miss a customer call again.",
    description:
      "Handles inbound calls 24/7 — books appointments, shares business hours, routes complex queries to your team. Sounds human. Works tirelessly.",
    category: "Customer Service",
    channel: "Voice",
    rating: 4.8,
    reviews: 142,
    icon: "ti-phone",
    accentColor: "#EB001B",
    usedBy: ["Dental clinics", "Salons & spas", "Local restaurants"],
    capabilities: [
      "Answer calls when you're unavailable",
      "Book and reschedule appointments",
      "Share hours, location, and FAQs",
      "Route urgent calls to staff",
      "Collect caller details for follow-up",
    ],
    architectUrl: "REPLACE_WITH_ARCHITECT_APP_URL", // embed this in iframe
    status: "live",
  },
  {
    id: "sales-voice",
    name: "Sales Voice Agent",
    tagline: "Your best salesperson, available 24/7.",
    description:
      "Qualifies inbound leads, pitches your products intelligently, handles objections, and books discovery calls — all via natural voice conversation.",
    category: "Sales",
    channel: "Voice",
    rating: 4.6,
    reviews: 98,
    icon: "ti-speakerphone",
    accentColor: "#F79E1B",
    usedBy: ["Financial advisors", "Real estate agents", "Insurance brokers"],
    capabilities: [
      "Qualify inbound and outbound leads",
      "Deliver tailored product pitches",
      "Handle objections intelligently",
      "Book sales calls with your team",
      "Log all interactions to CRM",
    ],
    architectUrl: "REPLACE_WITH_ARCHITECT_APP_URL",
    status: "live",
  },
  {
    id: "support-chat",
    name: "Customer Support Chat",
    tagline: "Instant answers. Zero wait time.",
    description:
      "Resolves customer queries on your website or WhatsApp instantly using your own FAQs and product knowledge. Escalates to humans when it matters.",
    category: "Customer Service",
    channel: "Chat / WhatsApp",
    rating: 4.9,
    reviews: 214,
    icon: "ti-message-circle",
    accentColor: "#22C55E",
    usedBy: ["E-commerce stores", "SaaS companies", "Retail shops"],
    capabilities: [
      "Answer FAQs from your knowledge base",
      "Handle order and delivery queries",
      "Process return and refund requests",
      "Escalate to human agent when needed",
      "Available on web, WhatsApp, and SMS",
    ],
    architectUrl: "REPLACE_WITH_ARCHITECT_APP_URL",
    status: "live",
  },
  {
    id: "payment-agent",
    name: "Payment & Invoice Agent",
    tagline: "Get paid faster. Automatically.",
    description:
      "Sends invoices, follows up on overdue payments, and answers billing queries — fully automated with Mastercard payment rails.",
    category: "Payments",
    channel: "Chat / Email",
    rating: 4.7,
    reviews: 76,
    icon: "ti-credit-card",
    accentColor: "#F79E1B",
    usedBy: ["Freelancers", "Agencies", "B2B service providers"],
    capabilities: [
      "Send and schedule invoices automatically",
      "Follow up on overdue payments",
      "Answer payment status queries",
      "Generate Mastercard payment links",
      "Provide receipt and transaction history",
    ],
    architectUrl: null,
    status: "coming-soon",
  },
  {
    id: "appointment-scheduler",
    name: "Appointment Scheduler",
    tagline: "Your calendar, fully automated.",
    description:
      "Books, reschedules, and reminds customers across voice, chat, and SMS — synced with your Google or Outlook calendar in real time.",
    category: "Operations",
    channel: "Omnichannel",
    rating: 4.7,
    reviews: 189,
    icon: "ti-calendar",
    accentColor: "#3B82F6",
    usedBy: ["Medical practices", "Beauty salons", "Fitness studios"],
    capabilities: [
      "Show real-time calendar availability",
      "Book and reschedule appointments",
      "Send reminders via SMS and WhatsApp",
      "Handle no-show follow-ups",
      "Sync with Google and Outlook calendar",
    ],
    architectUrl: null,
    status: "coming-soon",
  },
  {
    id: "hr-onboarding",
    name: "HR Onboarding Agent",
    tagline: "Onboard new hires, hands-free.",
    description:
      "Guides new employees through your onboarding flow, answers policy and benefits questions, and collects required documents — all via chat.",
    category: "HR",
    channel: "Chat / Slack",
    rating: 4.5,
    reviews: 63,
    icon: "ti-users",
    accentColor: "#A855F7",
    usedBy: ["SMEs scaling fast", "Retail chains", "Hospitality groups"],
    capabilities: [
      "Walk new hires through onboarding steps",
      "Answer policy and benefits questions",
      "Collect and verify required documents",
      "Set reminders for pending tasks",
      "Escalate to HR team when needed",
    ],
    architectUrl: null,
    status: "coming-soon",
  },
];
```

---

## 6. The Architect Embed Component

This is the core of the demo. When the user is on the Agent Detail page, the right column shows a live Architect app embedded as an iframe. This makes the demo real — they can actually interact with the agent.

```jsx
// src/components/ArchitectEmbed.jsx

export function ArchitectEmbed({ url, agentName }) {
  if (!url) {
    return (
      <div className="embed-placeholder">
        <div className="coming-soon-badge">Coming soon</div>
        <p>This agent is being prepared. Check back before the demo.</p>
      </div>
    );
  }

  return (
    <div className="embed-wrapper">
      <div className="embed-header">
        <span className="live-dot" /> Live preview — try it now
      </div>
      <iframe
        src={url}
        title={`${agentName} live preview`}
        width="100%"
        height="520"
        style={{ border: "none", borderRadius: "12px" }}
        allow="microphone; camera"
      />
    </div>
  );
}
```

**Styling for the embed wrapper:**

```css
.embed-wrapper {
  background: #1c1410;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.embed-header {
  padding: 10px 16px;
  background: rgba(235, 0, 27, 0.08);
  border-bottom: 1px solid rgba(235, 0, 27, 0.2);
  font-size: 12px;
  color: #eb001b;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
```

---

## 7. Navigation Component

```
┌──────────────────────────────────────────────────────────┐
│  🔴🟡 Mastercard   Agent Suite        [Powered by Lyzr]  │
│                                                          │
│  Browse Agents   My Agents   Docs          [ Get Started ]│
└──────────────────────────────────────────────────────────┘
```

- MC logo: two overlapping CSS circles (red + yellow, 20px diameter, 8px overlap)
- "Mastercard" in DM Sans 500, warm white
- "Agent Suite" in DM Sans 300, muted
- "Powered by Lyzr" — small pill badge, dark surface, MC Yellow text, 11px
- Nav links: muted gray, brighten on hover
- "Get Started" button: MC Red pill button

---

## 8. Filter Bar

Horizontal scrollable row of pill filters:

- "All agents", "Customer Service", "Sales", "Payments", "Operations", "HR"
- Default selected: "All agents"
- Selected state: MC Red background, white text
- Inactive: dark surface, muted text, thin border
- Clicking a filter shows only agents in that category (simple JS filter, no backend)

---

## 9. What to Mock vs What to Keep Real

| Feature                   | Real or Mock                                             |
| ------------------------- | -------------------------------------------------------- |
| Agent card grid with data | Real (hardcoded data)                                    |
| Agent detail page         | Real (rendered from data)                                |
| Architect iframe embed    | Real (for agents with URLs)                              |
| Clone / Customise form    | Mocked UI (form accepts input but doesn't POST anywhere) |
| Deploy button             | Mocked (leads to success screen)                         |
| Success screen            | Mocked                                                   |
| "View Dashboard" button   | Mocked (disabled or shows a toast)                       |
| "My Agents" nav link      | Mocked (empty state or placeholder)                      |
| Search                    | Real (client-side filter by name)                        |
| Rating / review counts    | Hardcoded                                                |

---

## 10. Interactions & Animations

- **Page transitions:** Fade in on route change (300ms opacity)
- **Card hover:** `transform: translateY(-4px)` + left border `2px solid #EB001B` (200ms ease)
- **CTA button hover:** Slight brightness increase + right arrow shifts 3px right
- **Modal open:** Fade in backdrop + scale up modal from 0.95 to 1.0 (200ms)
- **Success screen:** Checkmark circle does a 360° CSS spin-in, then settles
- **Live dot:** Pulsing green opacity animation (see embed CSS above)
- **Filter pill click:** Active pill slides a red background in (100ms)

---

## 11. Responsive Breakpoints

| Breakpoint          | Behavior                                         |
| ------------------- | ------------------------------------------------ |
| Desktop (>1024px)   | 3-col card grid, 60/40 detail layout             |
| Tablet (768–1024px) | 2-col card grid, stack detail columns vertically |
| Mobile (<768px)     | 1-col card grid, full-width modal                |

---

## 12. Tech Stack Recommendation

**Preferred:** React + Vite (fast dev server, easy to run locally for demo)

```bash
npm create vite@latest mastercard-agent-suite -- --template react
cd mastercard-agent-suite
npm install
npm run dev
```

**Dependencies to add:**

```bash
npm install react-router-dom  # for routing between screens
```

No other dependencies needed. Keep it lean — no Tailwind, no component libraries. All CSS is custom (inline or CSS modules) to match the design system precisely.

---

## 13. File to Build First

Start with `src/data/agents.js` (paste the catalog from Section 5), then:

1. `src/styles/tokens.css` — all CSS variables from Section 2b
2. `src/components/Nav.jsx` — nav bar
3. `src/pages/Marketplace.jsx` — card grid with filter
4. `src/components/AgentCard.jsx` — individual card
5. `src/pages/AgentDetail.jsx` — detail page with iframe
6. `src/components/ArchitectEmbed.jsx` — iframe wrapper
7. `src/components/CloneModal.jsx` — customise form modal
8. `src/pages/Deployed.jsx` — success screen

---

## 14. Architect Apps to Build (Suyash to complete in Architect)

Before plugging in the iframe URLs, these three apps need to be built in Architect (architect.new) and their public URLs pasted into `agents.js`:

| Agent                 | Build in Architect                    | Plug URL into            |
| --------------------- | ------------------------------------- | ------------------------ |
| AI Voice Receptionist | Voice/chat agent, flower shop example | `agents[0].architectUrl` |
| Sales Voice Agent     | Lead qualifier, demo pitch flow       | `agents[1].architectUrl` |
| Customer Support Chat | FAQ bot with knowledge base           | `agents[2].architectUrl` |

**Suggested Architect prompt to get started:**

> "Build a voice receptionist agent for a small business. It should greet callers, answer FAQs about the business (hours, location, services), book appointments, and collect caller details. Tone: friendly and professional. The demo business is a flower shop called Bloom & Co."

---

## 15. Demo Flow for the Mastercard Presentation

Walk through this in order during the Friday call:

1. **Open the marketplace** — show the hero + card grid. Say: "This is what an SMB customer of Mastercard would see when they log in to their Agent Suite portal."

2. **Click AI Voice Receptionist** — go to detail page. Say: "Each agent comes with a description of what it does and who it's for."

3. **Show the live embed** — say: "And this isn't a mockup — this is a live agent. Let me show you how it works." (Interact with the iframe.)

4. **Click Clone & Customise** — open the modal. Say: "The business owner fills in their details — name, industry, what they need the agent to do. No code, no technical setup."

5. **Fill the form and click Deploy** — reach the success screen. Say: "And within seconds, their agent is live and personalised to their business."

6. **Close with the value prop:** "Mastercard becomes the distribution channel. Every SMB that runs on Mastercard payments now has access to a suite of AI agents — and they never have to leave the Mastercard ecosystem to get it. Powered behind the scenes by Lyzr's Architect platform."

---

_Document prepared for Vidur / Lyzr internal use — Friday 9 May 2026 Mastercard presentation._
_Built with Architect by Lyzr — architect.new_
