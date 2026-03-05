"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import galleries from "@/data/galleries.json";
import SearchFilter from "../components/SearchFilter";
import ImageCard from "../components/ImageCard";

type GalleryItem = (typeof galleries)[number] & { topFeatured?: boolean };

const TOP_IDS = [2, 12, 6];
const regions = [...new Set(galleries.map((g) => g.region))].sort();
const regionOptions = regions.map((r) => ({ value: r, label: r }));
const types = [...new Set(galleries.map((g) => g.type))].sort();
const typeOptions = types.map((t) => ({ value: t, label: t }));

function HeroCard({ gallery }: { gallery: GalleryItem }) {
  const initials = gallery.nameEn.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <Link href={`/galleries/${gallery.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
        <div className="relative h-56 overflow-hidden">
          <div className="image-placeholder w-full h-full text-3xl group-hover:scale-105 transition-transform duration-500">
            {initials}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
            <span className="text-xs bg-purple-900/70 text-purple-200 px-2 py-1 rounded-full backdrop-blur-sm">
              {gallery.type}
            </span>
            <span className="text-xs bg-[var(--color-accent)]/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              צפה בדוח מלא ←
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{gallery.name}</h3>
          <p className="text-sm text-[var(--color-accent)] font-medium mb-1">{gallery.nameEn}</p>
          <p className="text-sm text-gray-500 mb-2">{gallery.city} • {gallery.type}</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{gallery.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function GalleriesPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");

  const topGalleries = (galleries as GalleryItem[]).filter((g) => TOP_IDS.includes(g.id));

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

  const remaining = filtered.filter((g) => !TOP_IDS.includes(g.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🖼️ גלריות אמנות בישראל</h1>
        <p className="text-gray-500">
          {galleries.length} גלריות נמצאו על ידי הסוכן • מוצגות {filtered.length} תוצאות
        </p>
      </div>

      {/* Top 3 Hero */}
      {!search && !region && !type && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">הגלריות המובילות</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topGalleries.map((g) => (
              <HeroCard key={g.id} gallery={g} />
            ))}
          </div>
        </div>
      )}

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

      {remaining.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {search || region || type ? `תוצאות (${filtered.length})` : `כל הגלריות (${remaining.length})`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(search || region || type ? filtered : remaining).map((g) => (
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

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">לא נמצאו תוצאות</p>
        </div>
      )}
    </div>
  );
}
