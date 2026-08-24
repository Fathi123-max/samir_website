import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

type Ratio = "portrait" | "video" | "square";

const RATIO_CLASSES: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  square: "aspect-square",
};

interface MediaFrameProps {
  /** Path under /public (e.g. "/images/cop28/cover.jpg"). Empty/undefined renders the styled placeholder. */
  src?: string;
  alt: string;
  ratio?: Ratio;
  /** Mono caption shown inside the placeholder slot. */
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function MediaFrame({
  src,
  alt,
  ratio = "video",
  label,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}: MediaFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-paper ${RATIO_CLASSES[ratio]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="bg-dots absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="w-12 h-12 rounded-full bg-white border border-hairline shadow-sm flex items-center justify-center text-zinc-400">
            <Camera className="w-5 h-5" aria-hidden="true" />
          </span>
          {label && (
            <span className="eyebrow text-zinc-400 max-w-[24ch] leading-relaxed">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
