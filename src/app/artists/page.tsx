"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import artists from "@/data/artists.json";
import SearchFilter from "../components/SearchFilter";
import ModuleEngineZone from "../components/ModuleEngineZone";
import OutputPreview from "../components/engine/OutputPreview";

type ArtistItem = (typeof artists)[number] & { topFeatured?: boolean; galleryImages?: string[] };

const TOP_IDS = [3, 1, 4];
const mediums = [...new Set(artists.flatMap((a) => a.medium.split(", ")))].sort();
const mediumOptions = mediums.map((m) => ({ value: m, label: m }));

const ARTIST_SCHEMA = [
  { name: "id", type: "number", example: "1" },
  { name: "name", type: "string", example: '"יעל ברתנא"' },
  { name: "nameEn", type: "string", example: '"Yael Bartana"' },
  { name: "medium / mediumEn", type: "string", example: '"וידאו, צילום"' },
  { name: "bio / bioEn", type: "string" },
  { name: "website", type: "string?", example: '"https://..."' },
  { name: "wikipedia", type: "string?", example: '"https://en.wiki..."' },
  { name: "email", type: "string?", example: '"studio@..."' },
  { name: "notableWorks", type: "string[]", example: '["Stones","Data Zone"]' },
  { name: "featured", type: "boolean" },
  { name: "topFeatured", type: "boolean?" },
  { name: "galleryImages", type: "string[]?" },
];

const ARTIST_SOURCES = [
  { engine: "Tavily", role: "Artist discovery" },
  { engine: "Wikipedia", role: "Biography & works" },
  { engine: "Brave Search", role: "Contact info" },
  { engine: "Claude 3.5", role: "Bio writing & translation" },
  { engine: "Perplexity", role: "Cross-verification" },
  { engine: "Gemini Pro", role: "Image curation" },
];

const ARTIST_COMPLETENESS = [
  { label: "name (HE+EN)", pct: 100 },
  { label: "bio (HE+EN)", pct: 100 },
  { label: "medium", pct: 100 },
  { label: "email", pct: 80 },
  { label: "website", pct: 73 },
  { label: "wikipedia", pct: 87 },
  { label: "notableWorks", pct: 100 },
  { label: "galleryImages", pct: 27 },
];

function HeroCard({ artist }: { artist: ArtistItem }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = artist.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const coverImage = artist.galleryImages?.[0];

  return (
    <Link href={`/artists/${artist.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
        <div className="relative h-56 overflow-hidden">
          {coverImage && !imgErr ? (
            <img
              src={coverImage}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="image-placeholder w-full h-full text-4xl group-hover:scale-105 transition-transform duration-500">
              {initials}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
            <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
              {artist.medium}
            </span>
            <span className="text-xs bg-[var(--color-accent)]/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              צפה בדוח מלא ←
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{artist.name}</h3>
          <p className="text-sm text-[var(--color-accent)] font-medium mb-1">{artist.nameEn}</p>
          <p className="text-xs text-gray-500 mb-2">{artist.medium}</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{artist.bio}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ArtistsPage() {
  const [search, setSearch] = useState("");
  const [medium, setMedium] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const topArtists = (artists as ArtistItem[]).filter((a) => TOP_IDS.includes(a.id));

  const filtered = useMemo(() => {
    return artists.filter((a) => {
      const matchSearch =
        !search ||
        a.name.includes(search) ||
        a.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        a.medium.includes(search);
      const matchMedium = !medium || a.medium.includes(medium);
      return matchSearch && matchMedium;
    });
  }, [search, medium]);

  const remaining = filtered.filter((a) => !TOP_IDS.includes(a.id));

  const withEmail = artists.filter((a) => a.email).length;

  return (
    <div>
      <ModuleEngineZone
        moduleName="Artists"
        recordCount={artists.length}
        schemaTitle="Artist Data Schema"
        schemaFields={ARTIST_SCHEMA}
        completenessItems={ARTIST_COMPLETENESS}
        sources={ARTIST_SOURCES}
        extraMetrics={[
          { label: "With Email", value: withEmail, color: "var(--engine-green)" },
          { label: "Mediums", value: mediums.length },
        ]}
      />

      <OutputPreview>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Image src="/icon-artists.png" alt="אמנים" width={36} height={36} />
              אמנים ישראלים מובילים
            </h1>
            <p className="text-gray-500">
              {artists.length} אמנים נמצאו על ידי הסוכן • מוצגים {filtered.length} תוצאות
            </p>
          </div>

          <SearchFilter
            searchPlaceholder="חפש אמן לפי שם, מדיום..."
            searchValue={search}
            onSearchChange={setSearch}
            filters={[
              { label: "כל המדיומים", value: medium, options: mediumOptions, onChange: setMedium },
            ]}
          />

          {!search && !medium && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-4">אמנים מובילים</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topArtists.map((a) => (
                  <HeroCard key={a.id} artist={a} />
                ))}
              </div>
            </div>
          )}

          {remaining.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {search || medium ? `תוצאות (${filtered.length})` : `כל האמנים (${remaining.length})`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {(search || medium ? filtered : remaining).map((a) => (
                  <ArtistCard
                    key={a.id}
                    artist={a}
                    expanded={expandedId === a.id}
                    onToggle={() => setExpandedId(expandedId === a.id ? null : a.id)}
                  />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">לא נמצאו תוצאות</p>
            </div>
          )}
        </div>
      </OutputPreview>
    </div>
  );
}

interface ArtistType {
  id: number;
  name: string;
  nameEn: string;
  medium: string;
  mediumEn: string;
  bio: string;
  website: string;
  wikipedia: string;
  email: string;
  notableWorks: string[];
  featured: boolean;
}

function ArtistCard({
  artist: a,
  expanded,
  onToggle,
}: {
  artist: ArtistType;
  expanded: boolean;
  onToggle: () => void;
}) {
  const initials = a.nameEn
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer"
      onClick={onToggle}
    >
      <div className="h-40 image-placeholder text-3xl">{initials}</div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{a.name}</h3>
        <p className="text-sm text-[var(--color-accent)] font-medium mb-1">{a.nameEn}</p>
        <p className="text-xs text-gray-500 mb-2">{a.medium}</p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{a.bio}</p>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            {a.notableWorks.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-gray-700">יצירות בולטות:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {a.notableWorks.map((w, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {a.email && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">אימייל: </span>
                <span className="text-gray-600">{a.email}</span>
              </div>
            )}
            {a.website && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">אתר: </span>
                <a
                  href={a.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent)] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {a.website}
                </a>
              </div>
            )}
            {a.wikipedia && (
              <div className="text-sm">
                <a
                  href={a.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  Wikipedia
                </a>
              </div>
            )}
          </div>
        )}

        <div className="mt-3 text-xs text-gray-400">
          {expanded ? "לחץ לסגירה ▲" : "לחץ לפרטים ▼"}
        </div>
      </div>
    </div>
  );
}
