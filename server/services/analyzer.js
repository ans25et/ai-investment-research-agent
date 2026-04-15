import { analyzeWithMockEngine } from "./mockAnalyzer.js";
import { analyzeWithOpenAI } from "./openaiAnalyzer.js";

export async function runAnalysis(query, options = {}) {
  if (process.env.OPENAI_API_KEY) {
    try {
      const result = await analyzeWithOpenAI(query, options);
      return {
        ...result,
        provider: "openai",
        modeLabel: "OpenAI Live",
        model: process.env.OPENAI_MODEL || "gpt-4o-mini"
      };
    } catch (error) {
      console.error("OpenAI analysis failed.", error);

      const allowFallback = process.env.ALLOW_LOCAL_FALLBACK === "true";
      if (!allowFallback) {
        throw new Error(
          error instanceof Error
            ? error.message
            : "OpenAI analysis failed. Check your API key, billing, and model access."
        );
      }

      console.warn("Falling back to local analysis engine because ALLOW_LOCAL_FALLBACK=true.");
    }
  }

  return {
    ...analyzeWithMockEngine(query),
    provider: "demo",
    modeLabel: "Demo Mode",
    model: "local-rules"
  };
}
