import Image from "next/image";
import { Pencil, Trash2, Shirt } from "lucide-react";
import Badge from "@/shared/components/ui/Badge";
import { ClothingCardImageProps } from "../types/clothing.types";

export default function ClothingCardImage({
  imageUrl,
  name,
  categoryLabel,
  onEdit,
  onDelete,
}: ClothingCardImageProps) {
  return (
    <div className="relative aspect-portrait w-full bg-cream flex items-center justify-center overflow-hidden border-b border-warm-gray">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-gray/50 gap-2">
          <Shirt className="w-12 h-12" />
          <span className="text-xs uppercase tracking-wider font-medium">
            No Image
          </span>
        </div>
      )}

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit}
          className="p-2 rounded-xl bg-surface/95 text-charcoal shadow-xs hover:bg-surface transition-colors cursor-pointer"
          aria-label="Edit clothing"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-2 rounded-xl bg-surface/95 text-rose-600 dark:text-rose-400 shadow-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          aria-label="Delete clothing"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="absolute bottom-2.5 left-2.5">
        <Badge variant="accent" className="shadow-xs backdrop-blur-xs">
          {categoryLabel}
        </Badge>
      </div>
    </div>
  );
}
