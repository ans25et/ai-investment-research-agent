import dotenv from "dotenv";
import express from "express";
import { runAnalysis } from "./services/analyzer.js";

dotenv.config();
dotenv.config({ path: "local.env", override: false });

const app = express();
const port = Number(process.env.PORT || 3002);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (origin && (allowedOrigins.length === 0 || allowedOrigins.includes(origin))) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/analyze", async (request, response) => {
  try {
    const query = request.body?.query;
    const depth = request.body?.depth;

    if (typeof query !== "string" || !query.trim()) {
      response.status(400).json({ error: "A market or company query is required." });
      return;
    }

    const result = await runAnalysis(query.trim(), { depth });
    response.json({ data: result });
  } catch (error) {
    console.error("Analysis request failed", error);
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "The research workflow hit a problem. Please try again in a moment."
    });
  }
});

app.listen(port, () => {
  console.log(`AI Investment Research Agent server listening on http://localhost:${port}`);
});
