const companyCatalog = [
  {
    name: "Tesla",
    aliases: ["tesla", "tsla"],
    sector: "EVs, autonomy, and energy storage",
    positiveSignals: ["delivery growth", "margin stabilization", "fsd", "autonomy", "energy storage"],
    negativeSignals: ["risk", "downside", "competition", "margin", "recall", "china"],
    risks: [
      "Vehicle pricing pressure could continue to squeeze automotive gross margins.",
      "Execution risk rises if autonomy timelines or next-generation vehicle launches slip.",
      "Demand softness in China or Europe could weaken delivery growth against expectations."
    ],
    summary:
      "Tesla sits at the intersection of autos, software, and energy, so the thesis depends on both manufacturing execution and whether high-growth narratives stay believable.",
    insightPositive:
      "Watch whether margin recovery and software monetization improve together; that combination matters more than short-term headline momentum.",
    insightNeutral:
      "Treat the setup as catalyst-driven and keep an eye on delivery trends, margin direction, and management commentary around autonomy.",
    insightNegative:
      "Keep the bar high for new capital until margins, delivery quality, or product cadence show more durable support."
  },
  {
    name: "Nvidia",
    aliases: ["nvidia", "nvda"],
    sector: "AI compute and semiconductors",
    positiveSignals: ["ai demand", "datacenter", "cuda", "inference", "growth"],
    negativeSignals: ["export", "competition", "valuation", "concentration", "slowdown"],
    risks: [
      "Customer concentration among hyperscalers can amplify any pause in AI infrastructure spending.",
      "Export controls or supply constraints could limit how quickly strong demand turns into recognized revenue.",
      "A rich valuation leaves the stock sensitive to even modest signs of decelerating data-center growth."
    ],
    summary:
      "Nvidia remains central to AI infrastructure spending, but the market is pricing in sustained leadership, fast demand conversion, and few execution surprises.",
    insightPositive:
      "The bull case is strongest when revenue growth and platform stickiness keep outrunning valuation concerns.",
    insightNeutral:
      "Focus on order durability, competitive positioning, and whether enterprise inference demand broadens beyond a few major buyers.",
    insightNegative:
      "Treat upside cautiously if the thesis is relying only on momentum rather than evidence that demand breadth and margins remain exceptional."
  },
  {
    name: "Meta Platforms",
    aliases: ["meta platforms", "meta", "facebook"],
    sector: "digital advertising and AI monetization",
    positiveSignals: ["ad growth", "engagement", "reels", "ai efficiency", "upside"],
    negativeSignals: ["regulation", "capex", "competition", "privacy", "risk"],
    risks: [
      "Advertising growth could cool if the macro backdrop weakens or ad pricing softens.",
      "Heavy AI and infrastructure spending may pressure free cash flow if monetization lags investment.",
      "Regulatory or privacy changes could disrupt targeting efficiency and increase compliance costs."
    ],
    summary:
      "Meta combines a resilient ad platform with aggressive AI investment, so the thesis balances earnings power today against spending discipline and future monetization.",
    insightPositive:
      "The setup improves if ad efficiency and AI monetization advance without a fresh leg up in spending intensity.",
    insightNeutral:
      "Track ad demand, capex discipline, and whether new AI features translate into measurable engagement or pricing gains.",
    insightNegative:
      "Stay selective until management shows that large AI spending plans can convert into durable revenue support."
  },
  {
    name: "Microsoft",
    aliases: ["microsoft", "msft"],
    sector: "cloud, enterprise software, and AI platforms",
    positiveSignals: ["azure", "copilot", "cloud growth", "enterprise demand"],
    negativeSignals: ["valuation", "slowdown", "competition", "capex"],
    risks: [
      "Cloud growth expectations may reset if enterprise optimization lasts longer than the market expects.",
      "AI monetization may take time to justify elevated capital spending and valuation premiums.",
      "Competitive pressure in cloud and productivity software could limit pricing leverage."
    ],
    summary:
      "Microsoft is being driven by cloud resilience and AI optionality, but both revenue durability and capital allocation matter to the investment case.",
    insightPositive:
      "The thesis strengthens when Azure demand and AI monetization both remain visible rather than resting on narrative alone.",
    insightNeutral:
      "Use upcoming cloud growth and margin commentary as the cleanest read on whether the market is still underwriting the right pace of earnings expansion.",
    insightNegative:
      "Be patient if the stock is pricing in ideal AI conversion before enterprise demand or margin leverage fully confirms it."
  }
];

const themeCatalog = [
  {
    name: "Renewable Energy",
    aliases: ["renewable energy", "renewable", "solar", "wind", "clean energy"],
    sector: "power generation and energy transition",
    defaultSentiment: "Neutral",
    risks: [
      "Project returns can compress if rates stay elevated and financing remains expensive.",
      "Policy changes or slower subsidy support could weaken near-term installation demand.",
      "Supply-chain volatility may pressure equipment costs and deployment timelines."
    ],
    summary:
      "Renewable energy is attractive when policy support, capital access, and demand growth line up, but returns can still swing sharply with rates and execution.",
    insightPositive:
      "The opportunity looks strongest where backlog visibility and policy support are both improving.",
    insightNeutral:
      "Stay selective and focus on balance-sheet strength, subsidy durability, and project economics rather than broad thematic enthusiasm.",
    insightNegative:
      "Avoid treating the theme as uniformly strong until financing conditions and policy support look more stable."
  },
  {
    name: "AI Infrastructure",
    aliases: ["ai", "artificial intelligence", "semiconductor", "chip", "chips"],
    sector: "compute, models, and deployment infrastructure",
    defaultSentiment: "Positive",
    risks: [
      "Spending could narrow to a small buyer set, making demand more volatile than headline enthusiasm suggests.",
      "Competitive intensity may rise as large platforms push harder into models, chips, and inference tooling.",
      "Valuations across the theme may leave little room for execution missteps."
    ],
    summary:
      "AI infrastructure remains one of the market's strongest themes, though leadership and earnings durability matter more now than simple exposure.",
    insightPositive:
      "The cleanest setups combine real revenue capture with platform stickiness, not just narrative tailwinds.",
    insightNeutral:
      "Differentiate between companies selling into durable workloads and those mainly benefiting from short-lived capital-spending bursts.",
    insightNegative:
      "Keep the focus on cash conversion and customer concentration if enthusiasm is outrunning evidence."
  },
  {
    name: "Macro Environment",
    aliases: ["interest rates", "rate", "rates", "inflation", "fed", "macro"],
    sector: "monetary policy and economic conditions",
    defaultSentiment: "Neutral",
    risks: [
      "Higher-for-longer rates can compress valuation multiples and slow financing-heavy sectors.",
      "Sticky inflation could reduce the market's confidence in policy easing.",
      "A macro slowdown may pressure earnings forecasts even if rate expectations improve."
    ],
    summary:
      "Macro conditions matter because rates, inflation, and growth expectations change both valuation support and the earnings outlook across sectors.",
    insightPositive:
      "A friendlier macro setup helps most when earnings expectations are already conservative and balance sheets are strong.",
    insightNeutral:
      "Use policy language and earnings revisions together rather than relying on rate headlines in isolation.",
    insightNegative:
      "Stay disciplined where valuations still assume easy policy or resilient growth without much margin for disappointment."
  }
];

const fillerWords = new Set([
  "analyze",
  "analysis",
  "review",
  "assess",
  "evaluate",
  "stock",
  "stocks",
  "shares",
  "company",
  "market",
  "markets",
  "sector",
  "theme",
  "right",
  "now",
  "today",
  "outlook",
  "risks",
  "risk",
  "what",
  "are",
  "the",
  "key",
  "around",
  "after",
  "is",
  "attractive"
]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function textIncludesAlias(text, alias) {
  return new RegExp(`\\b${escapeRegex(alias)}\\b`, "i").test(text);
}

function findBestCatalogMatch(query, catalog) {
  const normalized = query.toLowerCase();

  let bestMatch = null;

  for (const item of catalog) {
    const matchedAliases = item.aliases.filter((alias) => textIncludesAlias(normalized, alias));
    if (!matchedAliases.length) {
      continue;
    }

    const score = matchedAliases.reduce((total, alias) => total + alias.length, 0);
    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { item, score };
    }
  }

  return bestMatch?.item ?? null;
}

function extractSubjectCandidate(query) {
  const cleaned = query
    .replace(/[?.,/#!$%^&*;:{}=_`~()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "Market Question";
  }

  const importantWords = cleaned
    .split(" ")
    .filter((word) => word.length > 2)
    .filter((word) => !fillerWords.has(word.toLowerCase()));

  const candidate = importantWords.slice(0, 4).join(" ");
  return candidate ? toTitleCase(candidate) : "Market Question";
}

function toTitleCase(value) {
  return value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}

function detectSentiment(query, profile) {
  const normalized = query.toLowerCase();
  const positiveHits = (profile.positiveSignals || []).filter((signal) => normalized.includes(signal)).length;
  const negativeHits = (profile.negativeSignals || []).filter((signal) => normalized.includes(signal)).length;

  if (positiveHits > negativeHits) {
    return "Positive";
  }

  if (negativeHits > positiveHits) {
    return "Negative";
  }

  if (/\b(risk|downside|bear|pressure|regulation|competition|slowdown)\b/i.test(query)) {
    return "Negative";
  }

  if (/\b(upside|growth|tailwind|beat|opportunity|momentum)\b/i.test(query)) {
    return "Positive";
  }

  return profile.defaultSentiment || "Neutral";
}

function detectProfile(query) {
  const companyMatch = findBestCatalogMatch(query, companyCatalog);
  if (companyMatch) {
    return {
      ...companyMatch,
      type: "company",
      confidenceNote:
        "This brief is running on the local analysis engine with company-aware rules. Add an OpenAI API key for model-generated research."
    };
  }

  const themeMatch = findBestCatalogMatch(query, themeCatalog);
  if (themeMatch) {
    return {
      ...themeMatch,
      type: "theme",
      confidenceNote:
        "This brief is running on the local analysis engine with theme-aware rules. Add an OpenAI API key for model-generated research."
    };
  }

  const candidate = extractSubjectCandidate(query);
  return {
    name: candidate,
    sector: "general market context",
    type: "generic",
    defaultSentiment: "Neutral",
    risks: [
      `The thesis on ${candidate} may be too narrative-heavy if near-term fundamentals do not improve.`,
      "Macro conditions and sector rotation could pressure the setup before the next clear catalyst.",
      "Limited context in the prompt raises the risk of missing company-specific balance-sheet or execution issues."
    ],
    summary:
      `${candidate} appears to be a broad or underspecified prompt, so the brief should be treated as a starting point rather than a full diligence view.`,
    insightPositive:
      "The idea may deserve deeper work, but the next step is gathering more company-specific context before acting on momentum alone.",
    insightNeutral:
      "Narrow the prompt with a company name, catalyst, or time horizon to get a more decision-useful brief.",
    insightNegative:
      "Treat this as an early screening read and avoid overconfidence until the question is scoped more precisely.",
    confidenceNote:
      "The prompt was broad, so the local engine produced a conservative screening brief. More specific inputs will improve the result."
  };
}

export function analyzeWithMockEngine(query) {
  const profile = detectProfile(query);
  const sentiment = detectSentiment(query, profile);
  const asksForComparison = /\b(compare|versus|vs)\b/i.test(query);
  const asksForRisks = /\b(risk|risks|downside|concern|headwind)\b/i.test(query);

  return {
    company: profile.name,
    summary: asksForComparison
      ? `${profile.summary} The prompt also suggests a relative-value lens, so peer execution and valuation deserve extra weight.`
      : profile.summary,
    risks: profile.risks.slice(0, asksForRisks ? 4 : 3),
    sentiment,
    insight:
      sentiment === "Positive"
        ? profile.insightPositive
        : sentiment === "Negative"
          ? profile.insightNegative
          : profile.insightNeutral,
    confidenceNote: profile.confidenceNote
  };
}
