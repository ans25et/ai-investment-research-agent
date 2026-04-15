import { useMemo, useState } from "react";
import { analyzeInvestmentQuery } from "./services/api";

const loadingStages = [
  "Fetching market context...",
  "Analyzing signals...",
  "Generating insights..."
];

const samplePrompts = [
  "Analyze Tesla stock risks",
  "What are the key risks around Nvidia after AI demand growth?",
  "Is the renewable energy sector attractive right now?"
];

const depthOptions = [
  { value: "quick", label: "Quick read" },
  { value: "standard", label: "Standard" },
  { value: "deep", label: "Deep dive" }
];

function App() {
  const [query, setQuery] = useState(samplePrompts[0]);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [depth, setDepth] = useState("standard");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  const activeStage = useMemo(() => loadingStages[stageIndex] ?? loadingStages[0], [stageIndex]);

  const handleAnalyze = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("Enter a company, sector, or market question to analyze.");
      setResult(null);
      return;
    }

    setError("");
    setIsLoading(true);
    setStageIndex(0);
    setSubmittedQuery(trimmedQuery);

    const stageTimers = loadingStages.slice(1).map((_, index) =>
      window.setTimeout(() => setStageIndex(index + 1), (index + 1) * 900)
    );

    try {
      const analysis = await analyzeInvestmentQuery(trimmedQuery, { depth });
      setResult(analysis);
      setHistory((currentHistory) => [
        {
          id: `${Date.now()}-${trimmedQuery}`,
          query: trimmedQuery,
          company: analysis.company,
          sentiment: analysis.sentiment,
          modeLabel: analysis.modeLabel
        },
        ...currentHistory.filter((item) => item.query !== trimmedQuery).slice(0, 3)
      ]);
    } catch (requestError) {
      setError(requestError.message || "Analysis failed. Please try again.");
      setResult(null);
    } finally {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      setIsLoading(false);
      setStageIndex(0);
    }
  };

  return (
    <div className="app-shell">
      <div className="background-grid" />
      <main className="layout">
        <section className="hero">
          <div className="eyebrow">AI Investment Research Agent</div>
          <h1>From messy market questions to clean investment signals.</h1>
          <p>
            Run a lightweight research workflow that converts unstructured finance prompts into
            structured insight cards you can scan in seconds.
          </p>
          <div className="hero-metrics">
            <div className="metric">
              <span className="metric-label">Mode</span>
              <strong>{result?.modeLabel || "Ready"}</strong>
            </div>
            <div className="metric">
              <span className="metric-label">Depth</span>
              <strong>{depthOptions.find((option) => option.value === depth)?.label}</strong>
            </div>
            <div className="metric">
              <span className="metric-label">Model</span>
              <strong>{result?.model || "Awaiting run"}</strong>
            </div>
          </div>
        </section>

        <section className="workspace">
          <div className="panel composer-panel">
            <form className="composer" onSubmit={handleAnalyze}>
              <label className="input-label" htmlFor="query">
                Ask about a company, sector, or market theme
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Analyze Tesla stock risks"
                rows={4}
              />
              <div className="composer-toolbar">
                <div className="depth-selector" role="radiogroup" aria-label="Analysis depth">
                  {depthOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={option.value === depth ? "depth-chip active" : "depth-chip"}
                      onClick={() => setDepth(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="helper-copy">
                  {depth === "quick"
                    ? "Fast brief for rapid screening."
                    : depth === "deep"
                      ? "Longer, sharper framing for higher-conviction review."
                      : "Balanced coverage for everyday research questions."}
                </p>
              </div>
              <div className="composer-footer">
                <div className="chip-row">
                  {samplePrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="chip"
                      onClick={() => setQuery(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <button type="submit" className="primary-button" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
            </form>
          </div>

          {history.length ? (
            <aside className="panel history-panel">
              <p className="status-label">Recent Briefs</p>
              <div className="history-list">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="history-item"
                    onClick={() => setQuery(item.query)}
                  >
                    <span className="history-title">{item.company}</span>
                    <span className="history-query">{item.query}</span>
                    <span className="history-meta">
                      {item.sentiment} · {item.modeLabel}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          ) : null}

          <div className="results-column">
            {isLoading ? (
              <section className="panel loading-panel">
                <div className="loading-pulse" aria-hidden="true" />
                <div>
                  <p className="status-label">Research workflow running</p>
                  <h2>{activeStage}</h2>
                </div>
                <ol className="timeline" aria-label="Analysis stages">
                  {loadingStages.map((stage, index) => (
                    <li
                      key={stage}
                      className={index <= stageIndex ? "timeline-item active" : "timeline-item"}
                    >
                      {stage}
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {error ? (
              <section className="panel error-panel">
                <p className="status-label">Something needs attention</p>
                <h2>{error}</h2>
              </section>
            ) : null}

            {result ? (
              <section className="results-grid" aria-live="polite">
                <article className="panel insight-card hero-card">
                  <div className="card-heading">
                    <p className="status-label">Coverage</p>
                    <span className={result.provider === "openai" ? "mode-pill live" : "mode-pill demo"}>
                      {result.modeLabel}
                    </span>
                  </div>
                  <h2>{result.company}</h2>
                  <p className="analyzed-query">Query: {submittedQuery}</p>
                  <p>{result.summary}</p>
                </article>

                <article className="panel insight-card">
                  <p className="status-label">Sentiment</p>
                  <div className={`sentiment sentiment-${result.sentiment.toLowerCase()}`}>
                    {result.sentiment}
                  </div>
                  <p>{result.confidenceNote}</p>
                </article>

                <article className="panel insight-card risks-card">
                  <p className="status-label">Key Risks</p>
                  <ul>
                    {result.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </article>

                <article className="panel insight-card">
                  <p className="status-label">Actionable Insight</p>
                  <p>{result.insight}</p>
                </article>
              </section>
            ) : (
              <section className="panel empty-panel">
                <p className="status-label">Ready</p>
                <h2>Run your first research brief.</h2>
                <p>
                  Try a ticker, a sector theme, or a broad question about market risk. The app
                  will structure the response into summary, risks, sentiment, and an actionable
                  angle.
                </p>
              </section>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
