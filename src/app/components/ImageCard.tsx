"use client";
import { useState } from "react";

interface ImageCardProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  badges?: { label: string; className: string }[];
  details?: { label: string; value: string }[];
  initials?: string;
}

export default function ImageCard({
  title,
  subtitle,
  description,
  image,
  badges,
  details,
  initials,
}: ImageCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="h-48 relative overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder w-full h-full">
            {initials || title.charAt(0)}
          </div>
        )}
        {badges && badges.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-2">
            {badges.map((b, i) => (
              <span key={i} className={`badge ${b.className}`}>
                {b.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{title}</h3>
        <p className="text-sm text-[var(--color-accent)] font-medium mb-2">{subtitle}</p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{description}</p>

        {expanded && details && details.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            {details.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="font-medium text-gray-700 min-w-[80px]">{d.label}:</span>
                <span className="text-gray-600">{d.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 text-xs text-gray-400">
          {expanded ? "לחץ לסגירה ▲" : "לחץ לפרטים נוספים ▼"}
        </div>
      </div>
    </div>
  );
}
