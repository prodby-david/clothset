import Input from "@/shared/components/ui/Input";
import { DEFAULT_COLORS, ClothingColorPickerProps } from "../types/clothing.types";

export default function ClothingColorPicker({
  value,
  onChange,
  error,
}: ClothingColorPickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Input
        label="Primary Color"
        placeholder="e.g. Sage Green, White, Charcoal"
        error={error}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex flex-wrap gap-1.5 mt-1">
        {DEFAULT_COLORS.slice(0, 6).map((col) => (
          <button
            key={col}
            type="button"
            onClick={() => onChange(col)}
            className={`px-2 py-0.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              value === col
                ? "bg-forest text-white border-forest shadow-xs"
                : "bg-surface text-muted-gray border-warm-gray hover:bg-cream"
            }`}
          >
            {col}
          </button>
        ))}
      </div>
    </div>
  );
}
