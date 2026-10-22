import {
  type ClothingItem,
  CLOTHING_CATEGORIES,
  CLOTHING_SEASONS,
} from "../types/clothing.types";

export function useClothingCard(clothing: ClothingItem) {
  const categoryLabel =
    CLOTHING_CATEGORIES.find((c) => c.id === clothing.category)?.label ||
    clothing.category;

  const seasonLabel =
    CLOTHING_SEASONS.find((s) => s.id === clothing.season)?.label ||
    clothing.season;

  return {
    categoryLabel,
    seasonLabel,
  };
}
