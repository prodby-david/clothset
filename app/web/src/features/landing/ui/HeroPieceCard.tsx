"use client";

import Image from "next/image";
import type { HeroPieceCardProps } from "../types/landing.types";

export default function HeroPieceCard({ piece, className = "" }: HeroPieceCardProps) {
  return (
    <div
      className={`group rounded-2xl border border-warm-gray bg-surface overflow-hidden shadow-xs hover:border-sage/60 hover:shadow-sm transition-all duration-300 flex flex-col ${className}`}
    >
      <div className="relative aspect-3/4 w-full bg-cream/50 dark:bg-[#121713] overflow-hidden">
        <Image
          src={piece.imageUrl}
          alt={piece.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-forest dark:text-sage px-2.5 py-1 rounded-md bg-surface/90 dark:bg-[#18201a]/90 backdrop-blur-xs border border-warm-gray/80 shadow-2xs">
            {piece.slotLabel}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
        <h3 className="text-sm font-bold text-charcoal leading-snug line-clamp-1 group-hover:text-forest dark:group-hover:text-sage transition-colors">
          {piece.name}
        </h3>

        <div className="pt-2 border-t border-warm-gray/70 flex items-center justify-between text-xs">
          <span className="text-muted-gray text-[11px]">Color</span>
          <span className="font-semibold text-charcoal text-[11px] truncate max-w-[120px]">
            {piece.color}
          </span>
        </div>
      </div>
    </div>
  );
}
