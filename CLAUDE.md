# Mastercard SMB Agent Suite — Project Context

Living context for the Mastercard demo build. Read this first when continuing work.

## What this is

A pitch-ready React demo of an SMB agent marketplace, built for the **Friday 8 May 2026** pitch to Mastercard. Lyzr is positioning itself as the agent runtime that powers a Mastercard-branded suite of pre-built agents for SMB customers (distributed via banks, accounting platforms, etc.).

## Repo layout

```
Mastercard Marketplace/
├── mastercard-agent-suite/                 # the React + Vite app (this is the demo)
│   ├── public/
│   │   ├── app1_ss.png                     # Bloom & Co — voice receptionist
│   │   ├── app2_ss.png                     # Cove Coffee — support chat
│   │   ├── app3_ss.png                     # Atlas Wealth — sales voice
│   │   ├── app4_ss.png                     # Maple Studio — payment & invoice
│   │   ├── app5_ss.png                     # Halo Skincare — marketing copy studio
│   │   └── app6_ss.png                     # Northstar Coffee — HR onboarding
│   └── src/
│       ├── data/agents.js                  # the 6-agent catalog (source of truth)
│       ├── components/
│       │   ├── AgentCard.jsx               # marketplace card
│       │   ├── AgentArtwork.jsx            # SVG art + screenshot fallback
│       │   ├── CloneModal.jsx              # "Clone & Customise" form (portal'd)
│       │   └── Nav.jsx
│       ├── pages/
│       │   ├── Marketplace.jsx             # home grid + sidebar filters
│       │   └── AgentDetail.jsx             # detail page with browser-chrome preview
│       └── styles/
│           ├── global.css                  # original dark theme tokens (kept as base)
│           └── press-mode.css              # ~1200 lines, ALL light-theme overrides
├── architect-prompts.md                    # ready-to-paste prompts for Architect (all 6)
├── bloom-co-knowledge-base.pdf             # KB for #1 voice receptionist
├── cove-coffee-knowledge-base.pdf          # KB for #2 support chat
├── atlas-wealth-knowledge-base.pdf         # KB for #3 sales voice
├── maple-studio-*-knowledge-base.pdf       # KBs for #4 payment & invoice (3 sub-agents)
├── halo-skincare-knowledge-base.pdf        # KB for #5 marketing copy studio
├── northstar-coffee-knowledge-base.pdf     # KB for #6 HR onboarding
└── CLAUDE.md                               # you are here
```

## Theme architecture (important)

- The original codebase was a dark "MasterClass cinema" theme. We **kept those styles untouched** as the fallback.
- Everything visual now lives under `body.press-mode` overrides in `src/styles/press-mode.css`.
- `src/main.jsx` adds the class globally: `document.body.classList.add("press-mode")`.
- This means: **never edit `global.css` for visual changes** — add overrides to `press-mode.css` instead.
- Brand palette: `#EB001B` red, `#FF671B` orange, `#F79E1B` yellow, `#141413` ink, `#F0EBE1`/`#FAF7F1` cream. Fonts: **Inter** for UI, **Fraunces** for headings only when needed.

## The 6 agents (state — all live as of 2026-05-07)

| # | Agent | Demo SMB | Status | Architect URL | Screenshot |
|---|---|---|---|---|---|
| 1 | AI Voice Receptionist | Bloom & Co (florist) | **live** | `preview--bloom-concierge-awesome-vault-d4qn.app.architect.new` | `app1_ss.png` |
| 2 | Customer Support Chat | Cove Coffee Co. (DTC roaster) | **live** | `preview--cove-brew-brilliant-beam-nyba.app.architect.new` | `app2_ss.png` |
| 3 | Sales Voice Agent | Atlas Wealth Partners (advisory) | **live** | `atlas-voice-amazing-base-7nig.architect.space` | `app3_ss.png` |
| 4 | Payment & Invoice Agent | Maple Studio (B2B agency) | **live** | `invoice-flow-mega-lab-92s7.architect.space` | `app4_ss.png` |
| 5 | Marketing Copy Studio | Halo Skincare (DTC clean beauty) | **live** | `forge-halo-clever-node-t7we.architect.space` | `app5_ss.png` |
| 6 | HR Onboarding Agent | Northstar Coffee (12-location café chain) | **live** | `onboard-compass-mega-flow-1h9t.architect.space` | `app6_ss.png` |

Order on the home grid: Voice → Chat → Sales → Payment → Marketing → HR.

**Note:** "Appointment Scheduler" was replaced by **Marketing Copy Studio** because the user wanted a use case with no third-party integrations (Architect's calendar/HRIS connectors weren't reliable enough for a demo).

## Architect prompts

All prompts live in [architect-prompts.md](architect-prompts.md) — variabilised template + demo-ready filled-in version per agent. All 6 sections present (Bloom, Cove, Atlas, Maple, Halo, Northstar). #3 uses **Google Calendar** for booking. #6 is text-only / no-integration to keep the demo self-contained.

## How agent screenshots work

`AgentArtwork.jsx` checks for `agent.screenshot` in `agents.js`:
- If present → renders an `<img>` (used everywhere: home card, detail preview frame, related grid).
- If absent → renders the per-kind SVG line art (Voice ripples, Sales bars, Chat bubbles, Calendar grid, etc).

To swap in a new screenshot for any agent: drop the file in `public/` and add `screenshot: "/file.png"` to the agent in `agents.js`. No other changes needed.

The detail-page preview frame uses `:has(.artwork--shot)` to switch from a fixed 380px tall frame to `height: auto` with `object-fit: contain`, so the full image is visible without cropping.

## CloneModal

- Portal'd to `document.body` via `createPortal` — must stay this way. The `.detail` page has an `animation: fadeIn` keyframe with `transform`, which creates a containing block and breaks `position: fixed` if the modal is rendered inside it.
- Width: `min(820px, 100%)` in press mode.
- Detects chat agents via `agent.previewKind === "chat"` and shows extra fields: channels (multi-toggle), shipping policy, return policy, escalation email, escalation hours.
- Voice agents get the operating-hours field instead.

## Visual rules learned the hard way (DO NOT regress)

- **No tagline on cards.** Just name + description.
- **No "used by" chip** ("Dental clinics · Salons & spas") in the card foot. Replaced with a small badge pill (e.g. "Most popular", "Top rated", "New") sourced from `agent.badge`.
- **No "Live preview" or top-rated badges over the screenshot.** Only "Coming soon" badges remain (currently none — all 6 are live).
- **No emojis anywhere** — use line-style SVG icons (Lucide / Tabler).
- **Description max 2 lines** with `-webkit-line-clamp: 2` and breathing room (~8px top, ~6px bottom).
- **Don't over-space.** User pushed back on both "too congested" and "too much space" — current values are the dialed-in middle. Container bottom padding is `24px`, footer margin-top `24px`, `#root` and `.app` have `min-height: 0` in press mode (otherwise empty cream gap appears below cards).
- **Nav is fixed at top** with frosted-white background, `height: 64px`, `.app { padding-top: 64px }`. Don't make it sticky or floating.

## Knowledge base PDFs

Generated via headless Chrome (`Google Chrome --headless --print-to-pdf`) from styled HTML in `/tmp/`. Stored at project root, not in `public/`. To regenerate:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="output.pdf" "file:///tmp/source.html"
```

PDFs aren't auto-deployed anywhere — they exist for upload into Architect when building each agent's KB. All 6 KBs now generated and uploaded.

## Open todos

- [ ] Confirm all six demo URLs are iframe-embeddable. If `X-Frame-Options: SAMEORIGIN` or `CSP frame-ancestors` blocks `app.architect.new` / `architect.space` from being framed, keep the current "open in new tab" CTA.
- [ ] (Optional) Improve the deployed Architect chat UI for Cove Coffee — current build is functional but basic. Mockup at `cove-chat-mockup.png` (project root) is the design target if we revisit.
- [ ] (Optional) Final dry-run of the full 6-agent flow before Friday's pitch.

## Useful commands

```bash
# Dev server (run from mastercard-agent-suite/)
cd mastercard-agent-suite && npm run dev   # localhost:5173/5174

# Regenerate any KB PDF
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="<name>-knowledge-base.pdf" "file:///tmp/<name>-kb.html"
```

## Pitch-day plan (Friday 8 May 2026)

The demo flow Vidur/Suyash will walk Mastercard through:
1. Land on the marketplace — looks like a polished Mastercard product, not a Lyzr demo.
2. Click AI Voice Receptionist → detail page → "Try it live" → live Bloom & Co agent answers a real call.
3. Back, click Customer Support Chat → live Cove Coffee chat handles an order-status query.
4. Back, click Sales Voice Agent → live Atlas Wealth qualifies a lead and books a call.
5. Click Payment & Invoice → Maple Studio sends an invoice with a Mastercard pay link (this is the explicit Mastercard-revenue moment).
6. Click Marketing Copy Studio → Halo Skincare generates 5 on-brand Instagram captions in seconds.
7. Click HR Onboarding → Northstar Coffee walks through a new-hire's first day.
8. Close: "Mastercard already has the SMB distribution. Lyzr has the agent runtime. This is what the suite looks like."

Don't show Architect's builder UI or Lyzr branding during the demo — the marketplace IS the product.
