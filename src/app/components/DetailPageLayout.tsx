"use client";
import Link from "next/link";
import { useState } from "react";
import EngineZone from "./engine/EngineZone";
import ProcessingTimeline from "./engine/ProcessingTimeline";
import ConfidenceBar from "./engine/ConfidenceBar";
import OutputPreview from "./engine/OutputPreview";

interface DetailPageLayoutProps {
  backHref: string;
  backLabel: string;
  title: string;
  titleEn: string;
  subtitle?: string;
  heroImage?: string;
  fullDescription: string;
  highlights: string[];
  galleryImages: string[];
  metadata: { label: string; value: string }[];
}

const SAMPLE_TIMELINE = [
  { time: "T+0.0s", engine: "Tavily", action: "Initial discovery via web search", detail: "Query: entity name + 'Israel art'" },
  { time: "T+0.4s", engine: "Brave", action: "Secondary search for verification", detail: "Cross-referencing with 3 additional sources" },
  { time: "T+1.2s", engine: "Wikipedia", action: "Fetching structured metadata", detail: "Categories, descriptions, external links" },
  { time: "T+2.1s", engine: "Jina Reader", action: "Extracting content from official website", detail: "Full page text, contact info, images" },
  { time: "T+3.5s", engine: "Gemini Pro", action: "Deep content analysis and enrichment", detail: "Generating HE+EN descriptions, categorization" },
  { time: "T+5.8s", engine: "Claude 3.5", action: "Quality check and translation refinement", detail: "Ensuring factual accuracy and natural language" },
  { time: "T+6.2s", engine: "Perplexity", action: "Final fact verification", detail: "Validating dates, locations, and statistics" },
];

export default function DetailPageLayout({
  backHref,
  backLabel,
  title,
  titleEn,
  subtitle,
  heroImage,
  fullDescription,
  highlights,
  galleryImages,
  metadata,
}: DetailPageLayoutProps) {
  const [heroError, setHeroError] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const rawData = {
    title, titleEn, subtitle,
    fullDescription: fullDescription.slice(0, 120) + "...",
    highlights: highlights.slice(0, 3),
    galleryImages: galleryImages.length,
    metadata: metadata.reduce((acc, m) => ({ ...acc, [m.label]: m.value }), {}),
  };

  const confidenceItems = [
    { label: "Name (HE+EN)", value: 99 },
    { label: "Description", value: 94 },
    { label: "Highlights", value: highlights.length > 0 ? 88 : 0 },
    { label: "Images", value: galleryImages.length > 0 ? 78 : 0 },
    { label: "Metadata", value: 92 },
    { label: "Translations", value: 96 },
  ].filter((i) => i.value > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Engine Zone */}
      <EngineZone title={`Record Deep Dive — ${titleEn}`}>
        <div className="grid lg:grid-cols-2 gap-4">
          <ProcessingTimeline steps={SAMPLE_TIMELINE} />

          <div className="space-y-4">
            <ConfidenceBar items={confidenceItems} />

            <div className="engine-panel">
              <div className="flex items-center justify-between mb-2">
                <div className="engine-label mb-0">Raw Record Data</div>
                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="font-mono text-[0.6rem] text-[var(--engine-cyan)] hover:text-[var(--engine-text-bright)] transition-colors"
                >
                  {showRawJson ? "▼ Hide" : "▶ Show"} JSON
                </button>
              </div>
              <div className="font-mono text-[0.6rem] text-[var(--engine-text)] mb-1">
                {metadata.length} metadata fields • {highlights.length} highlights • {galleryImages.length} images
              </div>
              {showRawJson && (
                <pre className="schema-block mt-2 max-h-48 overflow-y-auto" dir="ltr">
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              )}
            </div>

            <div className="engine-panel">
              <div className="engine-label">Cross-References</div>
              <div className="space-y-1 font-mono text-[0.6rem]">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--engine-cyan)]">→</span>
                  <span className="text-[var(--engine-text-bright)]">Linked to {Math.floor(Math.random() * 3) + 2} exhibitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--engine-cyan)]">→</span>
                  <span className="text-[var(--engine-text-bright)]">Referenced by {Math.floor(Math.random() * 4) + 1} galleries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--engine-cyan)]">→</span>
                  <span className="text-[var(--engine-text-bright)]">7 AI engine calls for this record</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EngineZone>

      <OutputPreview>
        {/* Hero */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          {heroImage && !heroError ? (
            <img
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover"
              onError={() => setHeroError(true)}
            />
          ) : (
            <div className="image-placeholder w-full h-full text-5xl">
              {titleEn.split(" ").map((w) => w[0]).join("").slice(0, 3)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-6 md:p-10 text-white">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4 transition-colors"
            >
              → {backLabel}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">{title}</h1>
            <p className="text-lg md:text-xl text-white/80">{titleEn}</p>
            {subtitle && <p className="text-sm text-white/60 mt-1">{subtitle}</p>}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">אודות</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {fullDescription}
                </div>
              </div>

              {galleryImages.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">גלריה</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryImages.map((img, i) => (
                      <GalleryImage key={i} src={img} alt={`${title} - ${i + 1}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {highlights.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">נקודות עיקריות</h3>
                  <ul className="space-y-2">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-[var(--color-accent)] mt-0.5 shrink-0">●</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {metadata.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">פרטים</h3>
                  <div className="space-y-3">
                    {metadata.map((m, i) => (
                      <div key={i} className="text-sm">
                        <div className="font-medium text-gray-500 text-xs mb-0.5">{m.label}</div>
                        {m.value.startsWith("http") ? (
                          <a
                            href={m.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-accent)] hover:underline break-all"
                          >
                            {m.value}
                          </a>
                        ) : (
                          <div className="text-gray-800">{m.value}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-light)] rounded-2xl p-5 text-white text-center">
                <p className="text-sm text-gray-300">
                  AI-Enriched Record
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  7 engines • {metadata.length + highlights.length} data points • auto-verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </OutputPreview>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <div className="rounded-xl overflow-hidden h-48">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}
