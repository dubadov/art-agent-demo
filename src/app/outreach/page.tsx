"use client";
import { useState } from "react";
import Image from "next/image";
import emails from "@/data/emails.json";
import artists from "@/data/artists.json";
import EngineZone from "../components/engine/EngineZone";
import PipelineFlow from "../components/engine/PipelineFlow";
import MetricPanel from "../components/engine/MetricPanel";
import OutputPreview from "../components/engine/OutputPreview";

const EMAIL_PIPELINE = [
  { label: "Research", sublabel: "Deep artist scan", done: true },
  { label: "Context Build", sublabel: "Works + values", done: true },
  { label: "Prompt Eng.", sublabel: "Template select", done: true },
  { label: "Draft Gen.", sublabel: "Claude + Gemini", active: true },
  { label: "Quality Check", sublabel: "Tone + accuracy" },
  { label: "Send Queue", sublabel: "Auto-dispatch" },
];

const REASONING_TRACES: Record<number, { research: string; approach: string; uniquePoints: number }> = {
  1: {
    research: "Analyzed Salt Works series, Dead Sea installations, Venice Biennale participation. Found 12 unique art pieces, 3 international awards.",
    approach: "Lead with specific reference to Salt Crystal Bride Dress. Emphasize shared interest in land art and environmental themes.",
    uniquePoints: 8,
  },
  2: {
    research: "Studied video trilogy (Mary Koszmary, Zamach, Mur i Wieża), Polish-Israeli identity themes. Found TED talk, Documenta participation.",
    approach: "Reference social-political art vision. Connect to community art projects. Mention EU-Israel cultural bridges.",
    uniquePoints: 7,
  },
  3: {
    research: "Kinetic art pioneer, 90+ years of innovation. Agam Museum in Rishon LeZion, Fire & Water fountain. Over 1000 public installations.",
    approach: "Honor legacy while proposing digital accessibility for next generation. Reference specific kinetic works and mathematical art principles.",
    uniquePoints: 9,
  },
};

export default function OutreachPage() {
  const [showAutoSendModal, setShowAutoSendModal] = useState(false);
  const [sentEmails, setSentEmails] = useState<Record<number, boolean>>({});
  const [regenerating, setRegenerating] = useState<Record<number, boolean>>({});
  const [expandedTrace, setExpandedTrace] = useState<number | null>(emails[0]?.id ?? null);

  const remainingArtists = artists.length - emails.length;

  function handleSend(emailId: number) {
    setSentEmails((prev) => ({ ...prev, [emailId]: true }));
    setTimeout(() => {
      setSentEmails((prev) => ({ ...prev, [emailId]: false }));
    }, 3000);
  }

  function handleRegenerate(emailId: number) {
    setRegenerating((prev) => ({ ...prev, [emailId]: true }));
    setTimeout(() => {
      setRegenerating((prev) => ({ ...prev, [emailId]: false }));
    }, 2000);
  }

  return (
    <div>
      {/* Engine Zone */}
      <EngineZone title="Email Engine — Personalized Outreach Generator">
        <div className="space-y-4">
          <MetricPanel
            metrics={[
              { label: "Drafts Ready", value: emails.length, color: "var(--engine-green)" },
              { label: "Pending", value: remainingArtists, color: "var(--engine-amber)" },
              { label: "Total Artists", value: artists.length, color: "var(--engine-cyan)" },
              { label: "Avg Personalization", value: "92%", color: "var(--engine-green)", sub: "8+ unique data points/email" },
              { label: "Send Rate", value: "50/hr", sub: "Anti-spam throttle" },
            ]}
          />

          <PipelineFlow steps={EMAIL_PIPELINE} />

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="engine-panel">
              <div className="engine-label">AI Reasoning Traces</div>
              <div className="space-y-2">
                {emails.map((email) => {
                  const trace = REASONING_TRACES[email.id];
                  if (!trace) return null;
                  const isExpanded = expandedTrace === email.id;
                  return (
                    <div key={email.id}>
                      <button
                        onClick={() => setExpandedTrace(isExpanded ? null : email.id)}
                        className="w-full text-left font-mono text-[0.65rem] flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors"
                        dir="ltr"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[var(--engine-cyan)]">[{email.artistNameEn}]</span>
                          <span className="text-[var(--engine-text)]">{trace.uniquePoints} unique data points</span>
                        </span>
                        <span className="text-[var(--engine-text)] opacity-50">{isExpanded ? "▼" : "▶"}</span>
                      </button>
                      {isExpanded && (
                        <div className="p-2 pl-4 space-y-2 font-mono text-[0.6rem] border-l border-[var(--engine-border)] ml-2" dir="ltr">
                          <div>
                            <span className="text-[var(--engine-amber)]">Research:</span>
                            <span className="text-[var(--engine-text-bright)] ml-1">{trace.research}</span>
                          </div>
                          <div>
                            <span className="text-[var(--engine-green)]">Approach:</span>
                            <span className="text-[var(--engine-text-bright)] ml-1">{trace.approach}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="engine-panel">
              <div className="engine-label">Prompt Engineering Template</div>
              <pre className="schema-block text-[0.6rem] max-h-48 overflow-y-auto" dir="ltr">{`system: "You are an art outreach specialist.
  Your goal: write a personalized email to
  {artist_name} based on deep research."

context:
  - artist_bio: {bio_he} | {bio_en}
  - notable_works: {works_list}
  - art_medium: {medium}
  - recent_exhibitions: {exhibitions}
  - artistic_values: {ai_extracted_themes}

instructions:
  1. Open with specific work reference
  2. Connect to shared artistic values
  3. Propose clear collaboration idea
  4. Keep tone warm but professional
  5. Include Hebrew cultural context

constraints:
  - Max 200 words
  - Must reference ≥2 specific works
  - Personalization score target: >85%`}</pre>
            </div>
          </div>
        </div>
      </EngineZone>

      <OutputPreview label="רנדור פלט » תצוגה מקדימה — אימיילים מותאמים אישית שנוצרו">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Image src="/icon-outreach.png" alt="פנייה" width={36} height={36} />
              פנייה אוטומטית לאמנים
            </h1>
            <p className="text-gray-500">
              הסוכן יוצר מייל מותאם אישית לכל אמן, מבוסס על מחקר מעמיק של היצירות והערכים שלו.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{emails.length}</div>
                  <div className="text-sm text-gray-500">טיוטות מוכנות</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">{remainingArtists}</div>
                  <div className="text-sm text-gray-500">ממתינים ליצירת טיוטה</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">{artists.length}</div>
                  <div className="text-sm text-gray-500">אמנים בסה״כ</div>
                </div>
              </div>

              <button
                onClick={() => setShowAutoSendModal(true)}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                שליחה אוטומטית לכל האמנים
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800">
            <strong>איך זה עובד:</strong> הסוכן חוקר כל אמן לעומק – יצירות, תערוכות, ערכים אמנותיים –
            ויוצר מייל ייחודי שמדבר בשפה של האמן. כל מייל שונה לחלוטין ומותאם אישית.
          </div>

          {/* Email Cards */}
          <div className="space-y-6">
            {emails.map((email) => (
              <div
                key={email.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{email.artistName}</h3>
                      <p className="text-sm text-gray-500">{email.artistNameEn}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {email.artistEmail}
                      </span>
                      <span className="badge bg-amber-100 text-amber-800">טיוטה</span>
                      {REASONING_TRACES[email.id] && (
                        <span className="font-mono text-[0.6rem] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                          {REASONING_TRACES[email.id].uniquePoints} AI points
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 border-b border-gray-50">
                  <div className="text-sm text-gray-500 mb-1">נושא:</div>
                  <div className="font-medium text-gray-900">{email.subject}</div>
                </div>

                <div className="px-6 py-4">
                  <div className="text-sm text-gray-500 mb-2">תוכן:</div>
                  <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
                    {regenerating[email.id] ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                          <span className="text-gray-500">AI מייצר גרסה חדשה...</span>
                        </div>
                      </div>
                    ) : (
                      email.body
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => handleSend(email.id)}
                    disabled={sentEmails[email.id]}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                      sentEmails[email.id]
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white"
                    }`}
                  >
                    {sentEmails[email.id] ? "נשלח בהצלחה!" : "שלח מייל"}
                  </button>

                  <button
                    onClick={() => handleRegenerate(email.id)}
                    disabled={regenerating[email.id]}
                    className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    צור מחדש
                  </button>

                  <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    ערוך
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining Banner */}
          <div className="mt-8 bg-linear-to-r from-[var(--color-surface)] to-[var(--color-surface-light)] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">
              עוד {remainingArtists} אמנים מחכים לפנייה מותאמת אישית
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              הסוכן יכול לייצר מייל ייחודי לכל אחד מ-{artists.length} האמנים ברשימה
            </p>
            <button className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl font-medium transition-colors">
              צור טיוטות לכל {remainingArtists} האמנים
            </button>
          </div>

          {/* Auto-Send Modal */}
          {showAutoSendModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">שליחה אוטומטית</h3>
                <p className="text-gray-600 text-sm mb-6">
                  פעולה זו תשלח {emails.length} מיילים מותאמים אישית לאמנים שנבחרו.
                  <br />
                  <span className="text-amber-600 font-medium">
                    בגרסת ההדגמה, המיילים לא נשלחים בפועל.
                  </span>
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">מיילים לשליחה:</span>
                      <span className="font-bold">{emails.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">אמנים ברשימת המתנה:</span>
                      <span className="font-bold">{remainingArtists}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">קצב שליחה:</span>
                      <span className="font-bold">50 מיילים/שעה</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAutoSendModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={() => {
                      setShowAutoSendModal(false);
                      emails.forEach((e) => handleSend(e.id));
                    }}
                    className="flex-1 px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl text-sm font-medium"
                  >
                    שלח הכל
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </OutputPreview>
    </div>
  );
}
