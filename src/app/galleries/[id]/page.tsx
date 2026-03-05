import { notFound } from "next/navigation";
import galleries from "@/data/galleries.json";
import DetailPageLayout from "../../components/DetailPageLayout";

type GalleryItem = (typeof galleries)[number] & {
  topFeatured?: boolean;
  fullDescription?: string;
  fullDescriptionEn?: string;
  galleryImages?: string[];
  highlights?: string[];
  highlightsEn?: string[];
};

export function generateStaticParams() {
  return (galleries as GalleryItem[])
    .filter((g) => g.topFeatured)
    .map((g) => ({ id: String(g.id) }));
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gallery = (galleries as GalleryItem[]).find((g) => String(g.id) === id);
  if (!gallery || !gallery.topFeatured) notFound();

  return (
    <DetailPageLayout
      backHref="/galleries"
      backLabel="חזרה לגלריות"
      title={gallery.name}
      titleEn={gallery.nameEn}
      subtitle={`${gallery.city} • ${gallery.type}`}
      fullDescription={gallery.fullDescription || gallery.description}
      highlights={gallery.highlights || []}
      galleryImages={gallery.galleryImages || []}
      metadata={[
        { label: "עיר", value: gallery.city },
        { label: "סוג", value: gallery.type },
        { label: "כתובת", value: gallery.address },
        ...(gallery.website ? [{ label: "אתר", value: gallery.website }] : []),
      ]}
    />
  );
}
