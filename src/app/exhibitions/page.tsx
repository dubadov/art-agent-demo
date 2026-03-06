"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import exhibitions from "@/data/exhibitions.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";
import ModuleEngineZone from "../components/ModuleEngineZone";
import OutputPreview from "../components/engine/OutputPreview";

type ExhibitionItem = (typeof exhibitions)[number] & { topFeatured?: boolean; galleryImages?: string[] };

const TOP_IDS = [4, 3, 1];
const cities = [...new Set(exhibitions.map((e) => e.city))].sort();
const cityOptions = cities.map((c) => ({ value: c, label: c }));
const statuses = [
  { value: "showing", label: "מוצג כעת" },
  { value: "upcoming", label: "בקרוב" },
];

const EXHIBITION_SCHEMA = [
  { name: "id", type: "number", example: "1" },
  { name: "title / titleEn", type: "string", example: '"סוף יום: 100 שנה..."' },
  { name: "venue / venueEn", type: "string", example: '"מוזיאון תל אביב"' },
  { name: "city / cityEn", type: "string" },
  { name: "startDate", type: "date", example: '"2026-03-15"' },
  { name: "endDate", type: "date", example: '"2026-08-30"' },
  { name: "description / descriptionEn", type: "string" },
  { name: "categories / categoriesEn", type: "string[]" },
  { name: "status", type: '"showing" | "upcoming"' },
  { name: "topFeatured", type: "boolean?" },
  { name: "galleryImages", type: "string[]?" },
];

const EXHIBITION_SOURCES = [
  { engine: "Tavily", role: "Event discovery" },
  { engine: "Brave Search", role: "Date verification" },
  { engine: "Gemini Pro", role: "Description & categorization" },
  { engine: "Jina Reader", role: "Venue page extraction" },
  { engine: "Claude 3.5", role: "Content synthesis" },
];

const EXHIBITION_COMPLETENESS = [
  { label: "title (HE+EN)", pct: 100 },
  { label: "venue", pct: 100 },
  { label: "dates", pct: 100 },
  { label: "description", pct: 100 },
  { label: "galleryImages", pct: 45 },
  { label: "categories", pct: 100 },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
}

function getStatusBadge(status: string) {
  if (status === "showing") return { label: "מוצג כעת", className: "badge-showing" };
  return { label: "בקרוב", className: "badge-upcoming" };
}

function HeroCard({ exhibition }: { exhibition: ExhibitionItem }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = exhibition.titleEn.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const coverImage = exhibition.galleryImages?.[0];

  return (
    <Link href={`/exhibitions/${exhibition.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
        <div className="relative h-56 overflow-hidden">
          {coverImage && !imgErr ? (
            <img
              src={coverImage}
              alt={exhibition.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="image-placeholder w-full h-full text-3xl group-hover:scale-105 transition-transform duration-500">
              {initials}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
            <span className={`text-xs px-2 py-1 rounded-full ${exhibition.status === "showing" ? "badge-showing" : "badge-upcoming"}`}>
              {exhibition.status === "showing" ? "מוצג כעת" : "בקרוב"}
            </span>
            <span className="text-xs bg-[var(--color-accent)]/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              צפה בדוח מלא ←
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{exhibition.title}</h3>
          <p className="text-sm text-[var(--color-accent)] font-medium mb-1">{exhibition.titleEn}</p>
          <p className="text-sm text-gray-500 mb-2">{exhibition.venue} • {exhibition.city}</p>
          <p className="text-xs text-gray-400 mb-2">
            {formatDate(exhibition.startDate)} – {formatDate(exhibition.endDate)}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{exhibition.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ExhibitionsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const topExhibitions = (exhibitions as ExhibitionItem[]).filter((e) => TOP_IDS.includes(e.id));

  const filtered = useMemo(() => {
    return exhibitions.filter((e) => {
      const matchSearch =
        !search ||
        e.title.includes(search) ||
        e.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.includes(search);
      const matchCity = !city || e.city === city;
      const matchStatus = !status || e.status === status;
      return matchSearch && matchCity && matchStatus;
    });
  }, [search, city, status]);

  const remaining = filtered.filter((e) => !TOP_IDS.includes(e.id));

  const showingCount = exhibitions.filter((e) => e.status === "showing").length;

  return (
    <div>
      <ModuleEngineZone
        moduleName="Exhibitions"
        recordCount={exhibitions.length}
        schemaTitle="Exhibition Data Schema"
        schemaFields={EXHIBITION_SCHEMA}
        completenessItems={EXHIBITION_COMPLETENESS}
        sources={EXHIBITION_SOURCES}
        extraMetrics={[
          { label: "Showing Now", value: showingCount, color: "var(--engine-green)" },
          { label: "Cities", value: cities.length },
        ]}
      />

      <OutputPreview>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Image src="/icon-exhibitions.png" alt="תערוכות" width={36} height={36} />
              תערוכות אמנות 2026
            </h1>
            <p className="text-gray-500">
              {exhibitions.length} תערוכות נמצאו על ידי הסוכן • מוצגות {filtered.length} תוצאות
            </p>
          </div>

          <SearchFilter
            searchPlaceholder="חפש תערוכה לפי שם, מקום..."
            searchValue={search}
            onSearchChange={setSearch}
            filters={[
              { label: "כל הערים", value: city, options: cityOptions, onChange: setCity },
              { label: "כל הסטטוסים", value: status, options: statuses, onChange: setStatus },
            ]}
          />

          {!search && !city && !status && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-4">התערוכות המובילות</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topExhibitions.map((e) => (
                  <HeroCard key={e.id} exhibition={e} />
                ))}
              </div>
            </div>
          )}

          {remaining.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {search || city || status ? `תוצאות (${filtered.length})` : `כל התערוכות (${remaining.length})`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(search || city || status ? filtered : remaining).map((e) => (
                  <ImageCard
                    key={e.id}
                    title={e.title}
                    subtitle={e.venue}
                    description={e.description}
                    initials={e.titleEn.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    badges={[getStatusBadge(e.status)]}
                    details={[
                      { label: "שם באנגלית", value: e.titleEn },
                      { label: "עיר", value: e.city },
                      { label: "תאריך פתיחה", value: formatDate(e.startDate) },
                      { label: "תאריך סיום", value: formatDate(e.endDate) },
                      { label: "קטגוריות", value: e.categories.join(", ") },
                    ]}
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
