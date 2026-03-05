import { notFound } from "next/navigation";
import exhibitions from "@/data/exhibitions.json";
import DetailPageLayout from "../../components/DetailPageLayout";

type ExhibitionItem = (typeof exhibitions)[number] & {
  topFeatured?: boolean;
  fullDescription?: string;
  fullDescriptionEn?: string;
  galleryImages?: string[];
  highlights?: string[];
  highlightsEn?: string[];
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
}

export function generateStaticParams() {
  return (exhibitions as ExhibitionItem[])
    .filter((e) => e.topFeatured)
    .map((e) => ({ id: String(e.id) }));
}

export default async function ExhibitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exhibition = (exhibitions as ExhibitionItem[]).find((e) => String(e.id) === id);
  if (!exhibition || !exhibition.topFeatured) notFound();

  return (
    <DetailPageLayout
      backHref="/exhibitions"
      backLabel="חזרה לתערוכות"
      title={exhibition.title}
      titleEn={exhibition.titleEn}
      subtitle={`${exhibition.venue} • ${exhibition.city}`}
      heroImage={exhibition.galleryImages?.[0]}
      fullDescription={exhibition.fullDescription || exhibition.description}
      highlights={exhibition.highlights || []}
      galleryImages={exhibition.galleryImages || []}
      metadata={[
        { label: "מקום", value: exhibition.venue },
        { label: "עיר", value: exhibition.city },
        { label: "תאריך פתיחה", value: formatDate(exhibition.startDate) },
        { label: "תאריך סיום", value: formatDate(exhibition.endDate) },
        { label: "קטגוריות", value: exhibition.categories.join(", ") },
        { label: "סטטוס", value: exhibition.status === "showing" ? "מוצג כעת" : "בקרוב" },
      ]}
    />
  );
}
