import { ClothingCardDetailsProps } from "../types/clothing.types";

export default function ClothingCardDetails({
  name,
  color,
  seasonLabel,
}: ClothingCardDetailsProps) {
  return (
    <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-surface">
      <div>
        <h4 className="text-sm font-bold text-charcoal line-clamp-1">
          {name}
        </h4>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-gray font-medium">
            {color}
          </span>
          <span className="text-warm-gray">•</span>
          <span className="text-xs text-muted-gray">{seasonLabel}</span>
        </div>
      </div>
    </div>
  );
}
