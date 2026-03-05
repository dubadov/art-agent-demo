"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import exhibitions from "@/data/exhibitions.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";

type ExhibitionItem = (typeof exhibitions)[number] & { topFeatured?: boolean };

const TOP_IDS = [4, 3, 1];
const cities = [...new Set(exhibitions.map((e) => e.city))].sort();
const cityOptions = cities.map((c) => ({ value: c, label: c }));
const statuses = [
  { value: "showing", label: "מוצג כעת" },
  { value: "upcoming", label: "בקרוב" },
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
  const initials = exhibition.titleEn.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <Link href={`/exhibitions/${exhibition.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
        <div className="relative h-56 overflow-hidden">
          <div className="image-placeholder w-full h-full text-3xl group-hover:scale-105 transition-transform duration-500">
            {initials}
          </div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎭 תערוכות אמנות 2026</h1>
        <p className="text-gray-500">
          {exhibitions.length} תערוכות נמצאו על ידי הסוכן • מוצגות {filtered.length} תוצאות
        </p>
      </div>

      {/* Top 3 Hero */}
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

      <SearchFilter
        searchPlaceholder="חפש תערוכה לפי שם, מקום..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "כל הערים",
            value: city,
            options: cityOptions,
            onChange: setCity,
          },
          {
            label: "כל הסטטוסים",
            value: status,
            options: statuses,
            onChange: setStatus,
          },
        ]}
      />

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
  );
}
