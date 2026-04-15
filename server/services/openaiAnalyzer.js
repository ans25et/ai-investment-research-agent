const analysisSchema = {
  name: "investment_research_brief",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      company: { type: "string" },
      summary: { type: "string" },
      risks: {
        type: "array",
        items: { type: "string" },
        minItems: 2,
        maxItems: 4
      },
      sentiment: {
        type: "string",
        enum: ["Positive", "Neutral", "Negative"]
      },
      insight: { type: "string" },
      confidenceNote: { type: "string" }
    },
    required: ["company", "summary", "risks", "sentiment", "insight", "confidenceNote"]
  }
};

const depthMap = {
  quick: "Keep the brief compact and decision-oriented.",
  standard: "Balance brevity with enough context to justify the stance.",
  deep: "Give a more nuanced investor-style brief with sharper risk framing and clearer catalysts."
};

export async function analyzeWithOpenAI(query, options = {}) {
  const depthInstruction = depthMap[options.depth] || depthMap.standard;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      instructions:
        `You are an investment research assistant writing for a buy-side analyst dashboard.
Write in crisp finance language, avoid hype, and do not sound like general marketing copy.
Treat the prompt as an investment research request, not personal financial advice.
${depthInstruction}
Requirements:
- Identify the primary company, sector, or theme cleanly.
- Summary should be 2 concise sentences focused on thesis and setup.
- Risks should be specific, investor-relevant, and non-overlapping.
- Sentiment should reflect the balance of near-term positives vs risks, not generic optimism.
- Insight should be a concrete monitoring angle, not a disclaimer.
- confidenceNote should be one short sentence about why the stance is high, moderate, or cautious conviction.
Return JSON that follows the schema exactly.`,
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: query }]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          ...analysisSchema
        }
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const outputText =
    payload.output_text ||
    payload.output
      ?.flatMap((item) => item.content || [])
      .filter((content) => content.type === "output_text")
      .map((content) => content.text)
      .join("");

  const refusalText = payload.output
    ?.flatMap((item) => item.content || [])
    .filter((content) => content.type === "refusal")
    .map((content) => content.refusal)
    .join("\n");

  if (refusalText) {
    throw new Error(`OpenAI refused the request: ${refusalText}`);
  }

  if (!outputText) {
    throw new Error("OpenAI response did not include structured output text.");
  }

  return JSON.parse(outputText);
}
