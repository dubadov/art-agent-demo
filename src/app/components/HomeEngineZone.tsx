"use client";
import EngineZone from "./engine/EngineZone";
import PipelineFlow from "./engine/PipelineFlow";
import ActivityLog from "./engine/ActivityLog";
import EngineCard from "./engine/EngineCard";
import MetricPanel from "./engine/MetricPanel";

const AI_ENGINES = [
  { name: "Gemini Pro", status: "online" as const, calls: 2847, avgLatency: "1.2s", role: "Deep research & content analysis" },
  { name: "Claude 3.5", status: "online" as const, calls: 1923, avgLatency: "0.9s", role: "Data enrichment & email generation" },
  { name: "Tavily Search", status: "online" as const, calls: 4102, avgLatency: "0.4s", role: "Real-time web scanning" },
  { name: "Brave Search", status: "online" as const, calls: 3256, avgLatency: "0.3s", role: "Broad web discovery" },
  { name: "EXA", status: "idle" as const, calls: 891, avgLatency: "0.6s", role: "Semantic deep search" },
  { name: "Perplexity", status: "online" as const, calls: 1567, avgLatency: "1.5s", role: "Fact verification & Q&A" },
  { name: "Groq Compound", status: "online" as const, calls: 734, avgLatency: "0.2s", role: "Fast inference & classification" },
];

const PIPELINE_STEPS = [
  { label: "Web Crawl", sublabel: "7 search engines", done: true },
  { label: "NLP Extract", sublabel: "Entity recognition", done: true },
  { label: "Classify", sublabel: "Categories & regions", done: true },
  { label: "Enrich", sublabel: "Deep research", active: true },
  { label: "Generate", sublabel: "Emails & content" },
  { label: "Push to Site", sublabel: "Auto-publish" },
];

export default function HomeEngineZone({
  totalRecords,
  emailsDone,
  totalArtists,
}: {
  totalRecords: number;
  emailsDone: number;
  totalArtists: number;
}) {
  return (
    <EngineZone title="ArtAgent Engine — System Dashboard">
      <div className="space-y-4">
        {/* Metrics */}
        <MetricPanel
          metrics={[
            { label: "Total Records", value: totalRecords, color: "var(--engine-cyan)" },
            { label: "AI Engines", value: "7 Active", color: "var(--engine-green)", sub: "0 offline" },
            { label: "Email Drafts", value: `${emailsDone}/${totalArtists}`, color: "var(--engine-amber)" },
            { label: "Data Freshness", value: "98.7%", color: "var(--engine-green)" },
            { label: "Last Scan", value: "2m ago", sub: "Auto-scan every 30m" },
          ]}
        />

        {/* Pipeline */}
        <PipelineFlow steps={PIPELINE_STEPS} />

        {/* Engine Grid + Activity Log */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="engine-label mb-2">AI Engine Status</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AI_ENGINES.map((e) => (
                <EngineCard key={e.name} {...e} />
              ))}
            </div>
          </div>
          <ActivityLog />
        </div>
      </div>
    </EngineZone>
  );
}
