import Button from "./Button";
import { EmptyStateProps } from "@/shared/types/ui.types";

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-14 text-center bg-surface/80 border border-dashed border-warm-gray rounded-2xl shadow-xs">
      {icon && (
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-pale-sage text-forest mb-4 shadow-xs">
          {icon}
        </div>
      )}
      <h3 className="text-base sm:text-lg font-bold text-charcoal tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-gray max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
