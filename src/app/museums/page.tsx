"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import museums from "@/data/museums.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";

type MuseumItem = (typeof museums)[number] & { topFeatured?: boolean };

const TOP_IDS = [1, 2, 6];
const regions = [...new Set(museums.map((m) => m.region))].sort();
const regionOptions = regions.map((r) => ({ value: r, label: r }));

function HeroCard({ museum }: { museum: MuseumItem }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = museum.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <Link href={`/museums/${museum.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
        <div className="relative h-56 overflow-hidden">
          {museum.image && !imgErr ? (
            <img
              src={museum.image}
              alt={museum.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="image-placeholder w-full h-full text-3xl">{initials}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
            {museum.visitors && (
              <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                {museum.visitors} מבקרים
              </span>
            )}
            <span className="text-xs bg-[var(--color-accent)]/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              צפה בדוח מלא ←
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{museum.name}</h3>
          <p className="text-sm text-[var(--color-accent)] font-medium mb-1">{museum.nameEn}</p>
          <p className="text-sm text-gray-500 mb-2">{museum.city} • {museum.region}</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{museum.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function MuseumsPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const topMuseums = (museums as MuseumItem[]).filter((m) => TOP_IDS.includes(m.id));

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

  const remaining = filtered.filter((m) => !TOP_IDS.includes(m.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏛️ מוזיאונים בישראל</h1>
        <p className="text-gray-500">
          {museums.length} מוזיאונים נמצאו על ידי הסוכן • מוצגים {filtered.length} תוצאות
        </p>
      </div>

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

      {/* Top 3 Hero */}
      {!search && !region && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">המוזיאונים המובילים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMuseums.map((m) => (
              <HeroCard key={m.id} museum={m} />
            ))}
          </div>
        </div>
      )}

      {remaining.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {search || region ? `תוצאות (${filtered.length})` : `כל המוזיאונים (${remaining.length})`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(search || region ? filtered : remaining).map((m) => (
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
