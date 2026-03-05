import { notFound } from "next/navigation";
import artists from "@/data/artists.json";
import DetailPageLayout from "../../components/DetailPageLayout";

type ArtistItem = (typeof artists)[number] & {
  topFeatured?: boolean;
  fullDescription?: string;
  fullDescriptionEn?: string;
  galleryImages?: string[];
  highlights?: string[];
  highlightsEn?: string[];
};

export function generateStaticParams() {
  return (artists as ArtistItem[])
    .filter((a) => a.topFeatured)
    .map((a) => ({ id: String(a.id) }));
}

export default async function ArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = (artists as ArtistItem[]).find((a) => String(a.id) === id);
  if (!artist || !artist.topFeatured) notFound();

  return (
    <DetailPageLayout
      backHref="/artists"
      backLabel="חזרה לאמנים"
      title={artist.name}
      titleEn={artist.nameEn}
      subtitle={artist.medium}
      fullDescription={artist.fullDescription || artist.bio}
      highlights={artist.highlights || []}
      galleryImages={artist.galleryImages || []}
      metadata={[
        { label: "מדיום", value: artist.medium },
        { label: "יצירות בולטות", value: artist.notableWorks.join(", ") },
        ...(artist.email ? [{ label: "אימייל", value: artist.email }] : []),
        ...(artist.website ? [{ label: "אתר", value: artist.website }] : []),
        ...(artist.wikipedia ? [{ label: "ויקיפדיה", value: artist.wikipedia }] : []),
      ]}
    />
  );
}
