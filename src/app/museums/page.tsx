"use client";
import { useState, useMemo } from "react";
import museums from "@/data/museums.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";

const regions = [...new Set(museums.map((m) => m.region))].sort();
const regionOptions = regions.map((r) => {
  const en = museums.find((m) => m.region === r)?.regionEn || r;
  return { value: r, label: r };
});

export default function MuseumsPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filtered = useMemo(() => {
    return museums.filter((m) => {
      const matchSearch =
        !search ||
        m.name.includes(search) ||
        m.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        m.city.includes(search) ||
        m.cityEn.toLowerCase().includes(search.toLowerCase());
      const matchRegion = !region || m.region === region;
      return matchSearch && matchRegion;
    });
  }, [search, region]);

  const featured = filtered.filter((m) => m.featured);
  const rest = filtered.filter((m) => !m.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏛️ מוזיאונים בישראל</h1>
        <p className="text-gray-500">
          {museums.length} מוזיאונים נמצאו על ידי הסוכן • מוצגים {filtered.length} תוצאות
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilter
        searchPlaceholder="חפש מוזיאון לפי שם, עיר..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "כל האזורים",
            value: region,
            options: regionOptions,
            onChange: setRegion,
          },
        ]}
      />

      {/* Featured Grid */}
      {featured.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            מוזיאונים מובילים ({featured.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featured.map((m) => (
              <ImageCard
                key={m.id}
                title={m.name}
                subtitle={`${m.city} • ${m.region}`}
                description={m.description}
                image={m.image}
                initials={m.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                badges={m.visitors ? [{ label: `${m.visitors} מבקרים`, className: "bg-black/50 text-white backdrop-blur-sm" }] : []}
                details={[
                  { label: "שם באנגלית", value: m.nameEn },
                  { label: "קטגוריות", value: m.categories.join(", ") },
                  ...(m.website ? [{ label: "אתר", value: m.website }] : []),
                ]}
              />
            ))}
          </div>
        </>
      )}

      {/* Additional Museums */}
      {rest.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            מוזיאונים נוספים ({rest.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rest.map((m) => (
              <ImageCard
                key={m.id}
                title={m.name}
                subtitle={`${m.city} • ${m.region}`}
                description={m.description}
                image={m.image}
                initials={m.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                details={[
                  { label: "שם באנגלית", value: m.nameEn },
                  { label: "קטגוריות", value: m.categories.join(", ") },
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
          <p className="text-sm mt-2">נסה לשנות את החיפוש או הסינון</p>
        </div>
      )}
    </div>
  );
}
