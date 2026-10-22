import { Pencil, Trash2 } from "lucide-react";
import Badge from "@/shared/components/ui/Badge";
import type { ClosetCardHeaderProps } from "../types/closet.types";

export default function ClosetCardHeader({
  typeTitle,
  onEdit,
  onDelete,
}: ClosetCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <Badge variant="accent">{typeTitle}</Badge>
      <div className="flex items-center gap-1">
        <button
          onClick={onEdit}
          className="p-1.5 text-muted-gray hover:text-charcoal hover:bg-cream rounded-lg transition-colors cursor-pointer"
          aria-label="Edit closet"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-muted-gray hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
          aria-label="Delete closet"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
