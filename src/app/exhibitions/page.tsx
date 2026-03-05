"use client";
import { useState, useMemo } from "react";
import exhibitions from "@/data/exhibitions.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";

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

export default function ExhibitionsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

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

  const featured = filtered.filter((e) => e.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎭 תערוכות אמנות 2026</h1>
        <p className="text-gray-500">
          {exhibitions.length} תערוכות נמצאו על ידי הסוכן • מוצגות {filtered.length} תוצאות
        </p>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featured.map((e) => (
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

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">לא נמצאו תוצאות</p>
        </div>
      )}
    </div>
  );
}
