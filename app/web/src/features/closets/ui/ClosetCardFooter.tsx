import Link from "next/link";
import { ArrowRight, Shirt } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { ClosetCardFooterProps } from "../types/closet.types";

export default function ClosetCardFooter({
  closetId,
  clothesCount = 0,
  maxSize = 50,
  onSelect,
}: ClosetCardFooterProps) {
  const safeMax = maxSize > 0 ? maxSize : 50;
  const pct = Math.min(100, Math.round((clothesCount / safeMax) * 100));

  return (
    <div className="mt-5 pt-4 border-t border-warm-gray/70 flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
        <div className="flex items-center gap-1.5">
          <Shirt className="w-3.5 h-3.5 text-sage" />
          <span>
            {clothesCount} / {safeMax} pieces
          </span>
        </div>
        <span className="text-xs font-medium text-muted-gray">{pct}% full</span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-sand overflow-hidden">
        <div
          className="h-full bg-deep-sage rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-end pt-1">
        {onSelect ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(closetId)}
            className="gap-1.5 text-xs py-1.5 h-8 px-3"
          >
            <span>Explore Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Link href={`/closets/${closetId}`}>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs py-1.5 h-8 px-3">
              <span>Explore Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
