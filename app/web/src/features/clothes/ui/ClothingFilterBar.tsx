import {
  CLOTHING_CATEGORIES,
  CLOTHING_SEASONS,
  ClothingSeasonId,
  ClothingFilterBarProps,
} from "../types/clothing.types";

export default function ClothingFilterBar({
  selectedCategory,
  selectedSeason,
  onSelectCategory,
  onSelectSeason,
  totalCount,
}: ClothingFilterBarProps) {
  return (
    <div className="flex flex-col gap-3.5 py-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
          Wardrobe Pieces ({totalCount})
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="season-filter" className="text-xs font-medium text-muted-gray">
            Season:
          </label>
          <select
            id="season-filter"
            value={selectedSeason}
            onChange={(e) =>
              onSelectSeason(e.target.value as ClothingSeasonId | "all")
            }
            className="h-8.5 px-3 bg-surface border border-warm-gray rounded-xl text-xs font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-sage cursor-pointer shadow-xs"
          >
            <option value="all">All Seasons</option>
            {CLOTHING_SEASONS.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
            selectedCategory === "all"
              ? "bg-forest text-white shadow-xs"
              : "bg-surface text-muted-gray border border-warm-gray hover:bg-pale-sage/40 hover:text-forest"
          }`}
        >
          All Items
        </button>
        {CLOTHING_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-forest text-white shadow-xs"
                  : "bg-surface text-muted-gray border border-warm-gray hover:bg-pale-sage/40 hover:text-forest"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
