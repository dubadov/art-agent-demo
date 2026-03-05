"use client";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-gray-50">
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
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">אודות</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {fullDescription}
              </div>
            </div>

            {/* Gallery */}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Highlights */}
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

            {/* Metadata */}
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

            {/* AI Badge */}
            <div className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-light)] rounded-2xl p-5 text-white text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm text-gray-300">
                המידע נאסף אוטומטית על ידי סוכן AI
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Gemini • Tavily • Brave • Wikipedia
              </p>
            </div>
          </div>
        </div>
      </div>
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
