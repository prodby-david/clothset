import Link from "next/link";
import { ArrowRight, Plus, Shirt } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import type { ClosetCardFooterProps } from "../types/closet.types";

export default function ClosetCardFooter({
  closetId,
  clothesCount = 0,
  maxSize = 20,
  onSelect,
  onAddGarment,
}: ClosetCardFooterProps) {
  const safeMax = maxSize > 0 ? maxSize : 20;
  const pct = Math.min(100, Math.round((clothesCount / safeMax) * 100));
  const isFull = clothesCount >= safeMax;

  const barColor = isFull
    ? "bg-rose-600 dark:bg-rose-500"
    : pct >= 80
    ? "bg-amber-600 dark:bg-amber-500"
    : "bg-forest dark:bg-sage";

  return (
    <div className="mt-5 pt-4 border-t border-warm-gray/70 flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
        <div className="flex items-center gap-1.5">
          <Shirt className="w-3.5 h-3.5 text-sage shrink-0" />
          <span>
            {clothesCount} / {safeMax} items
          </span>
        </div>
        <span
          className={`text-xs font-mono font-medium ${
            isFull
              ? "text-rose-600 dark:text-rose-400 font-bold"
              : pct >= 80
              ? "text-amber-700 dark:text-amber-400 font-bold"
              : "text-muted-gray"
          }`}
        >
          {isFull ? "At Capacity" : `${pct}% capacity`}
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-warm-gray/40 dark:bg-[#252f27] overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        {onAddGarment && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isFull}
            onClick={() => onAddGarment(closetId)}
            className={`gap-1 text-xs py-1.5 h-8 px-2.5 ${
              isFull ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFull ? "Full" : "Add Item"}</span>
          </Button>
        )}

        <div className="ml-auto">
          {onSelect ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => onSelect(closetId)}
              className="gap-1.5 text-xs py-1.5 h-8 px-3 cursor-pointer"
            >
              <span>View Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Link href={`/closets/${closetId}`}>
              <Button variant="primary" size="sm" className="gap-1.5 text-xs py-1.5 h-8 px-3">
                <span>View Items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
