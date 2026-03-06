import Link from "next/link";
import museums from "@/data/museums.json";
import galleries from "@/data/galleries.json";
import exhibitions from "@/data/exhibitions.json";
import artists from "@/data/artists.json";
import emails from "@/data/emails.json";
import HomeEngineZone from "./components/HomeEngineZone";
import OutputPreview from "./components/engine/OutputPreview";

const TARGET_COVERAGE = [
  { module: "מוזיאונים", indexed: museums.length, target: 230, href: "/museums" },
  { module: "גלריות", indexed: galleries.length, target: 320, href: "/galleries" },
  { module: "תערוכות", indexed: exhibitions.length, target: 580, href: "/exhibitions" },
  { module: "אמנים", indexed: artists.length, target: 8500, href: "/artists" },
  { module: "טיוטות אימייל", indexed: emails.length, target: artists.length, href: "/outreach" },
];

const PIPELINE_STEPS = [
  {
    phase: "PHASE 1 — CRAWL & DISCOVER",
    desc: "סריקה רציפה של מקורות נתונים באינטרנט. זיהוי ישויות חדשות (מוזיאונים, גלריות, תערוכות, אמנים) מתוך מנועי חיפוש, אגרגטורים ומאגרי מידע ממוסדיים.",
    engines: ["Gemini 2.5 Pro", "Tavily Search", "Brave Search", "EXA AI", "Perplexity", "Wikipedia API", "Groq Compound Beta"],
    input: "raw search queries, seed URLs",
    output: "candidate entity list (JSON)",
  },
  {
    phase: "PHASE 2 — ENRICH & CLASSIFY",
    desc: "העשרת כל ישות בנתונים מובנים: כתובת, אזור, קטגוריה, מדיום אמנותי, ביוגרפיה, תאריכי פעילות. סיווג אוטומטי ודירוג רלוונטיות.",
    engines: ["Claude 3.5 Sonnet", "Gemini Pro", "Jina Reader", "Perplexity"],
    input: "candidate entity list",
    output: "structured records with confidence scores",
  },
  {
    phase: "PHASE 3 — OUTREACH GENERATION",
    desc: "יצירת אימייל מותאם אישית לכל אמן. ניתוח עומק של יצירות, ערכים אמנותיים והקשר תרבותי. Prompt engineering מתקדם עם בקרת איכות אוטומטית.",
    engines: ["Gemini 2.5 Pro", "Claude 3.5 Sonnet", "Perplexity", "Custom Prompt Pipeline"],
    input: "enriched artist records",
    output: "personalized email drafts (Hebrew)",
  },
];

const totalRecords = museums.length + galleries.length + exhibitions.length + artists.length;

export default function Home() {
  return (
    <div>
      <HomeEngineZone totalRecords={totalRecords} emailsDone={emails.length} totalArtists={artists.length} />

      <OutputPreview>
        <div className="bg-[#0a0e17] min-h-screen">
          {/* System Header */}
          <div className="max-w-6xl mx-auto px-6 py-10" dir="rtl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-mono text-[0.65rem] text-cyan-400 uppercase tracking-widest">ArtAgent Engine v2.1 — System Overview</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 font-['Heebo']">
              מנוע AI לגילוי ומיפוי אמנות ישראלית
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed font-['Heebo']">
              המערכת סורקת, ממפה ומעשירה באופן אוטומטי את מלוא מסד הנתונים של האמנות הישראלית —
              מוזיאונים, גלריות, תערוכות ואמנים — ומייצרת פנייה מותאמת אישית לכל אמן בנפרד.
            </p>
          </div>

          {/* Target Coverage Table */}
          <div className="max-w-6xl mx-auto px-6 pb-8" dir="rtl">
            <div className="border border-[#1e293b] rounded-lg overflow-hidden">
              <div className="bg-[#0d1424] px-4 py-2 border-b border-[#1e293b] flex items-center gap-2">
                <span className="font-mono text-[0.6rem] text-cyan-400 uppercase tracking-wider">Target Coverage — Israel National Index</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[0.65rem] font-mono text-gray-500 uppercase border-b border-[#1e293b]">
                    <th className="text-right px-4 py-2 font-normal">מודול</th>
                    <th className="text-right px-4 py-2 font-normal">מאונדקס</th>
                    <th className="text-right px-4 py-2 font-normal">יעד ארצי</th>
                    <th className="text-right px-4 py-2 font-normal">כיסוי</th>
                    <th className="text-right px-4 py-2 font-normal">סטטוס</th>
                  </tr>
                </thead>
                <tbody>
                  {TARGET_COVERAGE.map((row) => {
                    const pct = Math.round((row.indexed / row.target) * 100);
                    return (
                      <tr key={row.module} className="border-b border-[#1e293b]/50 hover:bg-[#111827] transition-colors">
                        <td className="px-4 py-3">
                          <Link href={row.href} className="text-gray-200 hover:text-cyan-400 transition-colors font-['Heebo'] font-medium">
                            {row.module}
                          </Link>
                        </td>
                        <td className="px-4 py-3 font-mono text-cyan-400">{row.indexed.toLocaleString()}</td>
                        <td className="px-4 py-3 font-mono text-gray-500">{row.target.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.min(pct, 100)}%`,
                                  background: pct > 80 ? "var(--engine-green)" : pct > 40 ? "var(--engine-amber)" : "var(--engine-red)",
                                }}
                              />
                            </div>
                            <span className="font-mono text-xs text-gray-400">{pct}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-[0.6rem] px-2 py-0.5 rounded ${pct > 80 ? "bg-emerald-900/30 text-emerald-400" : pct > 40 ? "bg-amber-900/30 text-amber-400" : "bg-red-900/30 text-red-400"}`}>
                            {pct > 80 ? "ACTIVE" : pct > 40 ? "SCANNING" : "CRAWLING"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Processing Pipeline */}
          <div className="max-w-6xl mx-auto px-6 pb-8" dir="rtl">
            <div className="border border-[#1e293b] rounded-lg overflow-hidden">
              <div className="bg-[#0d1424] px-4 py-2 border-b border-[#1e293b]">
                <span className="font-mono text-[0.6rem] text-cyan-400 uppercase tracking-wider">Processing Pipeline — Execution Flow</span>
              </div>
              <div className="divide-y divide-[#1e293b]/50">
                {PIPELINE_STEPS.map((step, i) => (
                  <div key={i} className="p-5 hover:bg-[#111827] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="font-mono text-[0.6rem] text-gray-600 whitespace-nowrap mt-1 min-w-[180px]">{step.phase}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 leading-relaxed mb-3 font-['Heebo']">{step.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {step.engines.map((e) => (
                            <span key={e} className="font-mono text-[0.55rem] px-2 py-0.5 rounded bg-[#1e293b] text-gray-400 border border-[#2d3748]">
                              {e}
                            </span>
                          ))}
                        </div>
                        <div className="font-mono text-[0.55rem] text-gray-600">
                          INPUT: <span className="text-gray-500">{step.input}</span>
                          <span className="mx-2 text-gray-700">→</span>
                          OUTPUT: <span className="text-gray-500">{step.output}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-6xl mx-auto px-6 py-6 border-t border-[#1e293b]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6rem] text-gray-600">
                ArtAgent Engine v2.1 • Build {new Date().getFullYear()}.03
              </span>
              <span className="font-mono text-[0.6rem] text-gray-600">
                All data collected autonomously by AI agents • Runtime: Node.js + Next.js
              </span>
            </div>
          </div>
        </div>
      </OutputPreview>
    </div>
  );
}
