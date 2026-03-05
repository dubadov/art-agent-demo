"use client";
import { useState, useMemo } from "react";
import galleries from "@/data/galleries.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";

const regions = [...new Set(galleries.map((g) => g.region))].sort();
const regionOptions = regions.map((r) => ({ value: r, label: r }));

const types = [...new Set(galleries.map((g) => g.type))].sort();
const typeOptions = types.map((t) => ({ value: t, label: t }));

export default function GalleriesPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    return galleries.filter((g) => {
      const matchSearch =
        !search ||
        g.name.includes(search) ||
        g.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        g.city.includes(search);
      const matchRegion = !region || g.region === region;
      const matchType = !type || g.type === type;
      return matchSearch && matchRegion && matchType;
    });
  }, [search, region, type]);

  const featured = filtered.filter((g) => g.featured);
  const rest = filtered.filter((g) => !g.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🖼️ גלריות אמנות בישראל</h1>
        <p className="text-gray-500">
          {galleries.length} גלריות נמצאו על ידי הסוכן • מוצגות {filtered.length} תוצאות
        </p>
      </div>

      <SearchFilter
        searchPlaceholder="חפש גלריה לפי שם, עיר..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "כל האזורים",
            value: region,
            options: regionOptions,
            onChange: setRegion,
          },
          {
            label: "כל הסוגים",
            value: type,
            options: typeOptions,
            onChange: setType,
          },
        ]}
      />

      {featured.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            גלריות מובילות ({featured.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featured.map((g) => (
              <ImageCard
                key={g.id}
                title={g.name}
                subtitle={`${g.city} • ${g.type}`}
                description={g.description}
                initials={g.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                badges={[{ label: g.type, className: "bg-purple-900/70 text-purple-200 backdrop-blur-sm" }]}
                details={[
                  { label: "שם באנגלית", value: g.nameEn },
                  { label: "כתובת", value: g.address },
                  ...(g.website ? [{ label: "אתר", value: g.website }] : []),
                ]}
              />
            ))}
          </div>
        </>
      )}

      {rest.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            גלריות נוספות ({rest.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rest.map((g) => (
              <ImageCard
                key={g.id}
                title={g.name}
                subtitle={`${g.city} • ${g.type}`}
                description={g.description}
                initials={g.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                details={[
                  { label: "שם באנגלית", value: g.nameEn },
                  { label: "כתובת", value: g.address },
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
