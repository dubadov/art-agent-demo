import { notFound } from "next/navigation";
import museums from "@/data/museums.json";
import DetailPageLayout from "../../components/DetailPageLayout";

type MuseumItem = (typeof museums)[number] & {
  topFeatured?: boolean;
  fullDescription?: string;
  fullDescriptionEn?: string;
  galleryImages?: string[];
  highlights?: string[];
  highlightsEn?: string[];
};

export function generateStaticParams() {
  return (museums as MuseumItem[])
    .filter((m) => m.topFeatured)
    .map((m) => ({ id: String(m.id) }));
}

export default async function MuseumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const museum = (museums as MuseumItem[]).find((m) => String(m.id) === id);
  if (!museum || !museum.topFeatured) notFound();

  return (
    <DetailPageLayout
      backHref="/museums"
      backLabel="חזרה למוזיאונים"
      title={museum.name}
      titleEn={museum.nameEn}
      subtitle={`${museum.city} • ${museum.region} • ${museum.visitors || ""} מבקרים`}
      heroImage={museum.image}
      fullDescription={museum.fullDescription || museum.description}
      highlights={museum.highlights || []}
      galleryImages={museum.galleryImages || []}
      metadata={[
        { label: "עיר", value: museum.city },
        { label: "אזור", value: museum.region },
        { label: "קטגוריות", value: museum.categories.join(", ") },
        ...(museum.website ? [{ label: "אתר", value: museum.website }] : []),
        ...(museum.visitors ? [{ label: "מבקרים בשנה", value: museum.visitors }] : []),
      ]}
    />
  );
}
