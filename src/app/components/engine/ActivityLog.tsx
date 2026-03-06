"use client";
import { useState, useEffect, useRef } from "react";

const SAMPLE_LOGS = [
  { type: "scan", msg: "Scanning tavily.com for Israeli exhibitions..." },
  { type: "ai", msg: "Gemini Pro analyzing: מוזיאון ישראל — extracting metadata" },
  { type: "scan", msg: "Brave Search: querying 'Israeli contemporary art galleries 2026'" },
  { type: "ai", msg: "Claude enriching artist profile: סיגלית לנדאו" },
  { type: "data", msg: "Record created: Exhibition #8 — 'Borders of Light' at Tel Aviv Museum" },
  { type: "scan", msg: "EXA deep search: Israeli art fairs and biennials" },
  { type: "ai", msg: "Perplexity verifying gallery address: גלריה דביר, תל אביב" },
  { type: "email", msg: "Email draft generated for Yael Bartana — personalization score: 94%" },
  { type: "data", msg: "Museum record updated: הייכל הפסגה — 3 new gallery images found" },
  { type: "ai", msg: "Groq Compound: cross-referencing 15 artists with Wikipedia data" },
  { type: "scan", msg: "Jina Reader extracting content from shaloshgallery.com" },
  { type: "ai", msg: "Gemini Pro generating cover description for Yaacov Agam" },
  { type: "email", msg: "Email draft generated for Michal Rovner — personalization score: 91%" },
  { type: "data", msg: "6 new exhibitions discovered in Jerusalem district" },
  { type: "scan", msg: "Wikipedia API: fetching Israeli art movement categories" },
  { type: "ai", msg: "Claude analyzing art medium classification for 8 artists" },
];

const typeColors: Record<string, string> = {
  scan: "text-[var(--engine-cyan)]",
  ai: "text-purple-400",
  data: "text-[var(--engine-green)]",
  email: "text-[var(--engine-amber)]",
};

const typeLabels: Record<string, string> = {
  scan: "SCAN",
  ai: "AI",
  data: "DATA",
  email: "MAIL",
};

export default function ActivityLog({ maxLines = 8 }: { maxLines?: number }) {
  const [lines, setLines] = useState<{ type: string; msg: string; time: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const initial = [];
    for (let i = 0; i < Math.min(4, SAMPLE_LOGS.length); i++) {
      const log = SAMPLE_LOGS[i];
      initial.push({ ...log, time: fakeTime(i) });
    }
    indexRef.current = 4;
    setLines(initial);

    const interval = setInterval(() => {
      const log = SAMPLE_LOGS[indexRef.current % SAMPLE_LOGS.length];
      indexRef.current++;
      setLines((prev) => {
        const next = [...prev, { ...log, time: new Date().toLocaleTimeString("en-US", { hour12: false }) }];
        return next.slice(-maxLines);
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [maxLines]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="engine-panel">
      <div className="engine-label">Live Activity Log</div>
      <div ref={scrollRef} className="max-h-48 overflow-y-auto space-y-0.5">
        {lines.map((l, i) => (
          <div key={i} className="log-entry flex gap-2" dir="ltr">
            <span className="text-[var(--engine-text)] opacity-40 shrink-0">{l.time}</span>
            <span className={`${typeColors[l.type]} shrink-0 w-10`}>[{typeLabels[l.type]}]</span>
            <span className="text-[var(--engine-text-bright)]">{l.msg}</span>
          </div>
        ))}
        <div className="log-entry flex gap-2 opacity-50" dir="ltr">
          <span className="text-[var(--engine-cyan)] animate-pulse">&#9608;</span>
        </div>
      </div>
    </div>
  );
}

function fakeTime(offset: number) {
  const d = new Date();
  d.setSeconds(d.getSeconds() - (4 - offset) * 3);
  return d.toLocaleTimeString("en-US", { hour12: false });
}
