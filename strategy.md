# Mastercard SMB Agent Suite — Strategy & Research Document

> **Purpose:** Pre-build alignment doc. Defines *what* we're building, *why*, *for whom*, *which agents* and *why those*, and *how it lands* on Friday 8 May 2026. Once Vidur signs off, we hand `context.md` to Claude Code.
> **Author:** Suyash · **Reviewer:** Vidur · **Status:** Draft for approval

---

## 1. Executive Summary

We are building a **demo of "Mastercard Agent Suite for SMBs"** — a marketplace UI where a Mastercard small-business customer (e.g. a flower shop, a dental clinic, a mid-sized bank) browses pre-built AI agents, customises one to their business in a form, and "deploys" it. The agent previews are real, working Architect apps embedded as iframes; the deploy/clone flow is a polished mock.

**The strategic argument we're making to Mastercard:**

> "You announced Agent Suite in January and Virtual C-Suite in March. Those are positioned around financial intelligence (Virtual CFO first). But your SMB customers — the flower shop, the dental clinic, the local bank — also need *operational* agents: a voice receptionist that picks up the phone, a sales agent that qualifies leads, a support agent that resolves chats. Lyzr's Architect platform is what lets you ship those, fast, white-labeled under Agent Suite, and distribute them through the same channel partners (banks, accounting platforms, software providers) you've already named."

**One-line value prop for the demo:** *"Mastercard becomes the distribution channel for an SMB's entire agent stack — and every agent runs on Lyzr."*

---

## 2. The Mastercard Context (What's Already Public)

This is what Mastercard has publicly committed to in 2026 — every Lyzr message must be consistent with these.

| Announcement                  | Date       | Substance                                                                                                                                                                      |
| ----------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mastercard Agent Suite**    | Jan 2026   | "A new set of services to help enterprises adopt agentic AI, combining customizable AI agents with technical support and consulting." GA Q2 2026.                              |
| **Virtual C-Suite**           | March 2026 | Agentic experience giving SMBs "executive-level insight." First module: **Virtual CFO**. Delivered through **financial institutions, accounting platforms, software providers**. |
| **Strive India**              | Aug 2023, ongoing | Goal: enable **500,000 small businesses** to succeed in the digital economy by 2026. Focus on women-led and agri-businesses.                                              |
| **$100M HDFC credit facility** | 2023-ongoing | India SMB credit, partnership with HDFC Bank, DFC, USAID.                                                                                                                  |
| **Mastercard Start Path SMB** | Ongoing    | Partner program for startups serving small businesses.                                                                                                                         |

**Implication for our pitch:** The product name "Agent Suite" is Mastercard's, not ours. We're proposing Lyzr as the engine that lets Mastercard *populate* Agent Suite with SMB-grade operational agents and distribute them through their existing bank + software channel.

---

## 3. The Strategic Gap We Fill

Mastercard's 2026 agentic strategy has **three observable gaps** that Lyzr/Architect plugs into cleanly:

1. **Virtual CFO ≠ a full agent stack.** The Virtual C-Suite module Mastercard has announced is finance-facing. SMBs need *customer-facing* agents (calls, sales, support) and *operational* agents (scheduling, HR, invoicing). That breadth is what an Agent **Suite** implies but isn't yet shipped.
2. **Agent Suite is positioned for "enterprises."** The press release language is enterprise-led. SMBs need a self-serve, no-code path — the marketplace + clone-and-customise flow we're demoing.
3. **No public reference for the *distribution surface*.** Mastercard has named the channels (banks, accounting platforms, software providers) but not shown what an SMB actually sees. Our demo *is* that surface.

**Lyzr's role:** the agent runtime + the marketplace surface that sits inside Mastercard's distribution channels.

---

## 4. The Demo Moment (Friday 8 May 2026, 2 PM ET)

From Kress's note in Slack — total 45 minutes, MS Teams:

```
1. Intros
2. Mastercard presents 3 use cases to Lyzr
3. Lyzr presents up to 3 use cases:
   3.1 Mastercard Agent Suite Marketplace (Vidur — what we are building)
   3.2 Mastercard Agentic Commerce (Mudit — UCP, retail)
   3.3 Banking Agents (Kress/Mudit — if time permits, ICP: small/medium bank)
```

**Our slot is 3.1.** We get ~10 minutes inside Vidur's segment. We need:

- **~60 seconds** to set up the pitch ("you announced Agent Suite — here's what the SMB experience looks like")
- **~5 minutes** of live demo (browse → pick → preview → clone → customise → deploy)
- **~3 minutes** to explain what's behind it (Architect, channel-partner distribution model)
- **~1 minute** to close on the commercial implication (Mastercard captures more spend; SMBs retain in the MC ecosystem)

**The single moment that has to land:** when the user clicks an agent card and a *real, talking, working* AI voice receptionist appears in an iframe and answers a question live. That's the "this isn't a mockup" beat.

---

## 5. Target Customer Persona

We're designing the demo for **two SMB archetypes** Mastercard has explicitly named:

### Archetype A — Local service SMB (Kress's "flower shop" example)
- Owner-operator, 1–10 staff
- Pain: missed calls = missed revenue; can't afford a receptionist; can't be on chat 24/7
- Already takes Mastercard payments via terminal
- Sees Mastercard as a payments brand, not a software vendor — *yet*

### Archetype B — Mid-sized regional bank (Kress's other example)
- Customer of Mastercard's network services
- Wants to offer agentic services to **their** SMB customers (white-labeled)
- Pain: building agents is slow + costly; compliance/risk teams are nervous
- Looks to Mastercard for trusted, distributable AI building blocks

**Both archetypes are addressable by the same marketplace surface** — Archetype A uses it directly; Archetype B re-distributes it. The demo emphasises Archetype A (concrete, visceral, "the flower shop") and *names* Archetype B in the close.

---

## 6. The Six Agents — Why These, Why Now

We're shipping **3 live + 3 "coming soon"** in the demo. The six were chosen so each maps directly to a public Mastercard priority or to a high-frequency SMB pain point that maps to revenue Mastercard sees.

| #   | Agent                       | Status     | Why it's in the catalog                                                                                                                                                                                          |
| --- | --------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **AI Voice Receptionist**   | Live       | Most viscerally demoable. Solves the #1 SMB pain (missed calls = lost revenue). Voice is the strongest "this is real" moment — the room *hears* it work. Maps directly to Kress's flower-shop example.            |
| 2   | **Sales Voice Agent**       | Live       | Maps to Mastercard's stated goal of helping SMBs *grow* (Strive India language). Higher-revenue pitch — directly produces more transactions on Mastercard rails when an SMB closes more deals.                  |
| 3   | **Customer Support Chat**   | Live       | Highest-volume use case (chat > voice). Demonstrates knowledge-base ingestion and channel breadth (web, WhatsApp, SMS). Easiest one to make work in a 30-second demo without phone audio risk.                   |
| 4   | **Payment & Invoice Agent** | Coming Soon | The *commercial* punchline of the suite. "Sends invoices on Mastercard payment rails" — explicitly ties an agent to Mastercard's core revenue. Listed as coming-soon to signal roadmap depth without overpromising. |
| 5   | **Appointment Scheduler**   | Coming Soon | Cross-cutting — every service SMB (clinic, salon, gym) wants this. Shows omnichannel (voice + chat + SMS + calendar sync), reinforcing platform breadth.                                                          |
| 6   | **HR Onboarding Agent**     | Coming Soon | Hooks into the *bank-as-distributor* thesis: a regional bank's SMB customers all hire and onboard. Shows we're not just customer-facing — we cover internal ops too.                                              |

**Why 3 live, 3 coming-soon (not 6 live):**
- Building 6 Architect apps before Friday is risk we don't need.
- "Coming soon" *helps* the pitch — it implies a roadmap and gives Mastercard psychological room to co-build with us.
- 3 live is enough to prove the iframe surface works without one bug killing the demo.

**Why no Virtual CFO clone:** Mastercard explicitly named that as their first Virtual C-Suite module. Cloning it competes; staying out of it positions Lyzr as *complementary*, not duplicative. We can mention it in the close: "Virtual CFO is yours; everything else can be ours, together."

---

## 7. Why MasterClass Aesthetic (Not Standard SaaS)

There's a real argument here, not just taste:

- **Mastercard the brand is premium.** Their consumer-facing creative is cinematic, high-contrast, emotional ("Priceless" campaigns). A standard B2B SaaS dashboard would look downmarket against it.
- **MasterClass solves the same UI problem we have:** a *catalog of distinct premium offerings* (instructors / agents) browsed visually before commitment. Their layout (full-bleed hero, 3-column tile grid, dark surfaces, serif display type) is the proven shape for this content type.
- **Differentiation from competitor demos.** Mudit's agentic-commerce demo and Kress's banking-agent demo will likely look like standard product UIs. Ours looking like a Netflix/MasterClass storefront makes Lyzr's segment visually distinct on a 45-minute call where attention is the scarce resource.
- **Mastercard's color system *fits* the dark cinema palette.** Red `#EB001B`, orange `#FF5F00`, yellow `#F79E1B` on near-black `#19110B` reads warm, premium, and unmistakably Mastercard — without copying mastercard.com, which is light/blue/clean and would feel like we just lifted their site.

**Risk to flag:** if Mastercard's brand team ever sees this, they may push back on dark-mode use of brand colors. For a Friday pitch this is fine; for a real product they would supply a brand kit. We say this on the call if asked.

---

## 8. What's Real vs What's Mocked (Demo Honesty)

We will be explicit on the call about which parts of the demo are real and which are mocked. This builds trust — Mastercard execs have seen too many vapor demos.

| Layer                             | Real / Mock | What we say                                                                            |
| --------------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| Marketplace UI + catalog          | Real (front-end), data hardcoded | "This is the real surface; the agents shown are 6 we picked for the demo."        |
| Live agent previews (iframes)     | **Real**    | "These are real Architect apps. You can talk to them right now." — *the credibility moment* |
| Clone & Customise form            | Mock        | "In production this writes to a workspace; today we're showing the UX, not the wiring." |
| Deploy → Success screen           | Mock        | "In production this provisions the agent; today it's a 30-second walkthrough."         |
| "My Agents" / Dashboard           | Mock        | Not shown unless asked.                                                                |

**Rule:** never claim something is real that isn't. The iframe is our proof; everything else is positioning.

---

## 9. The Architect Layer (What Lyzr Actually Brings)

The demo positions Lyzr/Architect as **three things** to Mastercard:

1. **The agent runtime.** Each agent in the marketplace is built and run on Architect. This is the *engine* under Agent Suite.
2. **The customisation surface.** The clone-and-customise form, in production, becomes a no-code workspace where Mastercard's SMB customers tune agents to their business — built on Architect's existing app-builder.
3. **The distribution wrapper.** The marketplace UI itself can be embedded into a bank's portal, an accounting platform, or Mastercard's own SMB tools — matching the channel partners Mastercard already named for Virtual C-Suite.

**What we are *not* offering:** to take over Agent Suite's branding, advisory, or compliance posture. Those stay with Mastercard. Lyzr is the platform layer.

---

## 10. Demo Narrative (the script Vidur runs)

A clean five-beat narrative, each beat ≤ 60 seconds:

**Beat 1 — The setup (60s).** "Mastercard, in January you announced Agent Suite. In March you announced Virtual C-Suite for small businesses. We've been thinking about what the SMB-facing surface for that strategy looks like. Here's a working version."

**Beat 2 — The marketplace (60s).** Open the app, scroll the card grid. "Six agents — three live today, three on the roadmap. Each one is a real working agent, not a slide."

**Beat 3 — The credibility moment (90s).** Click AI Voice Receptionist. Show the embedded iframe. *Talk to it on the call.* "This is a real Architect app. The flower shop's customer just called and the agent picked up."

**Beat 4 — The clone flow (90s).** Click "Clone & Customise." Fill in: business name "Bloom & Co", industry "Retail", tone "Warm". Click Deploy. Show the success screen. "No code. No engineer. Sixty seconds from picking an agent to having one personalised to your business."

**Beat 5 — The close (60s).** "Mastercard becomes the distribution channel for an SMB's full agent stack. The flower shop never leaves the Mastercard ecosystem to get this — and every transaction the agent generates flows back through Mastercard rails. Architect by Lyzr is the engine; Agent Suite is the brand. We'd love to talk about how to build this together."

---

## 11. Open Questions for Vidur (need answers before build starts)

1. **Are the three Architect apps already built?** (Voice Receptionist, Sales Voice, Support Chat.) If not, who builds them and by when? We need URLs in `agents.js` no later than Thursday EOD.
2. **Iframe embeddability.** Have we confirmed Architect public app URLs allow `<iframe>` embedding (no `X-Frame-Options: DENY`)? If not, fallback is a screen-recording loop.
3. **"Powered by Lyzr" vs "Architect by Lyzr"** — which wordmark does Vidur want shown in the nav?
4. **Live mic/voice on the call.** Will Vidur attempt a live voice interaction with the receptionist agent on the Teams call, or pre-record? (Live is higher impact, also higher risk.)
5. **Logo usage permission.** Can we display the Mastercard logo mark in the demo (CSS reproduction, not asset)? Default assumption: yes for an internal pitch, but worth confirming.
6. **Will Mudit's segment overlap?** If Mudit is also showing an agent-builder UI for agentic commerce, we want visual differentiation — confirm whose UI is whose so we don't look duplicative.

---

## 12. Risks & Mitigations

| Risk                                                            | Mitigation                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Architect iframe blocked by `X-Frame-Options`                   | Fallback: screen-recorded MP4 loop styled to look like a live preview; live talk track unchanged.    |
| Live voice agent fails on call (network, mic, model)            | Pre-record 30-second voice clip as backup; switch to chat agent for the live beat.                   |
| Mastercard brand team objects to dark-mode color use            | This is an internal pitch demo, not a product launch — frame as "design exploration." Have a light-mode variant ready in CSS variables (theoretical, only build if asked). |
| Demo runs over 10 minutes and eats Mudit/Kress's segments       | Vidur rehearses with a timer Thursday. Cut Beat 4 (clone flow) first if running long.                |
| Mastercard asks "what does this cost / how is it priced"        | Out of scope for Friday. Vidur defers: "Commercials we'd take offline once we're aligned on the shape." |
| One of the 6 agents doesn't ring true to a Mastercard exec      | Pre-flight the catalog with Kress on Wednesday/Thursday — he's said he'll provide the base set.       |

---

## 13. Build Sequence (only after this doc is approved)

1. **Vidur approves this strategy doc.**
2. Build the React + Vite scaffold per `context.md` Section 13.
3. Architect apps for agents 1–3 built in parallel and URLs pasted into `agents.js`.
4. End-to-end run-through with Vidur Thursday morning IST (Wednesday night ET).
5. Final polish + backup recordings Thursday evening IST.
6. Friday 2 PM ET: live.

---

## 14. What This Doc Is *Not*

- Not a product spec — that's `context.md`.
- Not a commercial proposal — no pricing, no contract terms.
- Not a long-term Mastercard partnership document — only the Friday pitch.
- Not a Lyzr-internal roadmap — only what's relevant to the demo.

---

_Prepared for Vidur, Lyzr — for review before build kick-off._
_Friday demo: 8 May 2026, 2 PM ET, MS Teams._

**Sources used in this research:**
- [Mastercard launches Agent Suite to ready enterprises for a new era — Mastercard Newsroom (Jan 2026)](https://www.mastercard.com/us/en/news-and-trends/press/2026/january/mastercard-launches-agent-suite-to-ready-enterprises-for-a-new-e.html)
- [Mastercard advances its agentic AI strategy with Virtual C-Suite — Mastercard Newsroom (Mar 2026)](https://www.mastercard.com/us/en/news-and-trends/press/2026/march/Mastercard-Virtual-C-Suite-bringing-executive-level-intelligence-to-small-businesses.html)
- [Mastercard launches 'agent suite' to help merchants deploy agentic AI — Digital Commerce 360 (Jan 2026)](https://www.digitalcommerce360.com/2026/01/27/mastercard-launches-agent-suite-agentic-ai/)
- [Mastercard Strive India — Strive Community](https://www.strivecommunity.org/programs/strive-india)
- [Launch of Mastercard Strive India — Mastercard Newsroom (Aug 2023)](https://www.mastercard.com/news/ap/en-in/newsroom/press-releases/en-in/2023/august/launch-of-mastercard-strive-india-aims-to-enable-small-businesses-to-succeed-in-the-digital-economy/)
- [Mastercard Small Business Start Path](https://www.mastercard.com/global/en/innovation/partner-with-us/start-path/small-business.html)
- [Slack thread, Kress Franzen, 6 May 2026 — initial brief and Friday agenda]
