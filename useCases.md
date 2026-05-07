Build order for the 3 live agents
Per the strategy doc and the Friday 8 May 2026 demo plan — we ship 3 live, 3 coming-soon. Here's the order I'd build them in, and why each one earns its slot in the Mastercard pitch.

1. AI Voice Receptionist (build first)
   Architect prompt: "Voice receptionist for a small business. Greets callers, answers FAQs (hours, location, services), books appointments, collects caller details. Friendly + professional tone. Demo business: flower shop Bloom & Co."

Why this is the Mastercard slot:

It's the demo's credibility moment. The pitch is "this isn't a slide." Voice is the most visceral proof — Kress and Mastercard execs hear the agent answer in real time.
It's Kress's own example. He named the flower shop as the SMB archetype. Building this directly answers his framing.
It maps to a public Mastercard commitment. Agent Suite (Jan 2026) is positioned as customisable agents for "fit-for-purpose" tasks — voice receptionist is the canonical SMB version of that. Their announced scope is enterprise-led; we're showing what the SMB-facing surface actually looks like.
The pain is universal and quantifiable. Missed calls = missed revenue for every dental clinic, salon, and restaurant Mastercard processes payments for.

2. Customer Support Chat (build second)
   Architect prompt: "Customer support agent that answers questions from a knowledge base. Handles order status, returns, refunds, FAQs. Escalates to a human when confidence is low. Channels: web chat + WhatsApp."

Why second:

Lowest demo risk. Chat doesn't need a working microphone, doesn't depend on call-quality on Teams. If voice fails on Friday for any reason, this is the fallback that still lands.
Highest-volume use case. Chat > voice in real SMB support traffic. Shows we understand where the volume actually is.
Demonstrates knowledge-base ingestion. Mastercard customers (and the banks they distribute through) care about grounding — agents that answer from your docs, not hallucinations. This proves it.
Channel breadth. Web + WhatsApp + SMS shows the agent is omnichannel, which matches Mastercard's distribution-through-channel-partners model (Virtual C-Suite is delivered through banks/accounting platforms — same shape).

3. Sales Voice Agent (build third)
   Architect prompt: "Inbound sales voice agent. Qualifies leads against an ICP, delivers a tailored pitch, handles objections, books a discovery call. Logs interaction notes. Demo business: a financial-advisory firm pitching a wealth-planning service."

Why third:

Ties agents directly to Mastercard revenue. Every deal a Sales Voice Agent closes for an SMB → more transactions on Mastercard rails. This is the "Mastercard captures more spend" close in Beat 5.
Maps to Strive India language. Mastercard has publicly committed to helping SMBs grow. A sales agent is the most literal expression of that goal.
Differentiates from Mudit's segment. Mudit's agentic-commerce pitch is consumer-side (UCP, retail). Sales Voice is the SMB-facing complement — same agentic theme, different surface, no overlap.
Build order rationale: it's higher technical risk than #2 (objection handling, tone variability) but lower stakes than #1 because by then we'll have proven the voice runtime works on Receptionist.
What we deliberately don't build live
Agent Why coming-soon helps the pitch
Payment & Invoice Strongest commercial punchline ("agent sends invoices on Mastercard rails"). Marking it as roadmap signals depth without overpromising — and gives Mastercard psychological room to co-build it, which is the partnership ask.
Appointment Scheduler Cross-cutting reinforcement (every SMB wants this). Listed to show breadth, not built because the demo doesn't need three voice/chat agents and a calendar UI to land.
HR Onboarding Hooks the bank-as-distributor thesis (Archetype B in strategy.md). Mentioning it in the close, not building it, keeps focus on the customer-facing trio.
