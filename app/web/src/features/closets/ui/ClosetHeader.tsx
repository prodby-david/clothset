import { Folder, Pencil, Trash2, Plus } from "lucide-react";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import { ClosetHeaderProps } from "../types/closet.types";

export default function ClosetHeader({
  name,
  description,
  typeTitle,
  itemsCount,
  isLoading,
  onEdit,
  onDelete,
  onAddClothing,
  capacity,
}: ClosetHeaderProps) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-warm-gray flex flex-col gap-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pale-sage text-forest flex items-center justify-center shrink-0 shadow-xs">
            <Folder className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="accent">{typeTitle}</Badge>
              <span className="text-xs text-muted-gray">
                {itemsCount} {itemsCount === 1 ? "item" : "items"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-charcoal mt-1 tracking-tight">
              {isLoading ? "Loading closet..." : name}
            </h1>
            {description && (
              <p className="text-xs text-muted-gray mt-1 max-w-xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            aria-label="Edit closet details"
            className="p-2.5 sm:px-3 sm:py-2"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            aria-label="Delete closet"
            className="text-rose-600 hover:bg-rose-50 p-2.5 sm:px-3 sm:py-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onAddClothing}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Clothing</span>
          </Button>
        </div>
      </div>

      {capacity && (
        <div className="pt-4 border-t border-warm-gray/60 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-charcoal">
              {capacity.currentCount} / {capacity.maxLimit} items used
            </span>
            <Badge variant="secondary" dot className="text-xs py-0.5 px-2">
              {capacity.statusLabel}
            </Badge>
          </div>
          <div className="w-full sm:w-56 bg-pale-sage/60 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                capacity.isNearLimit ? "bg-forest" : "bg-sage"
              }`}
              style={{ width: `${capacity.percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
