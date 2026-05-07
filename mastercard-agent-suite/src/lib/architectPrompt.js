// Builds the personalised Architect prompt from an agent's clone schema +
// the user's form values. Used by both CloneModal (open in new tab) and
// the post-clone Architect mockup page.

export function buildArchitectPrompt(agent, payload) {
  const lines = [];
  const industryLabel = (payload.industry || "business").toLowerCase();
  lines.push(
    `Build a ${agent.name} for ${payload.businessName}, a ${payload.size} people ${industryLabel} business.`
  );
  lines.push("");

  if (agent.longDescription) {
    lines.push(agent.longDescription);
    lines.push("");
  }

  const fields = [
    ...(agent.cloneFields?.step1Extras || []),
    ...(agent.cloneFields?.step2Fields || []),
  ];

  if (fields.length > 0) {
    lines.push("Configuration:");
    fields.forEach((f) => {
      const v = payload[f.id];
      if (v == null || v === "") return;
      const display = Array.isArray(v) ? v.join(", ") : v;
      lines.push(`- ${f.label}: ${display}`);
    });
    lines.push("");
  }

  if (payload.knowledge) {
    lines.push(`Knowledge base file uploaded: ${payload.knowledge}`);
    lines.push(
      "Use this document as the agent's primary source of truth. Never make up facts that aren't in it."
    );
    lines.push("");
  }

  lines.push(
    `Build this as a polished, deploy-ready ${agent.name.toLowerCase()} for ${payload.businessName}, grounded in the configuration above.`
  );

  return lines.join("\n");
}
