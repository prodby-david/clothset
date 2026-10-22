import type { z } from "zod";
import {
  CLOTHING_CATEGORIES,
  CLOTHING_SEASONS,
  DEFAULT_COLORS,
} from "../constants/clothing.constants";
import { clothingSchema } from "../schemas/clothing.schema";

export { CLOTHING_CATEGORIES, CLOTHING_SEASONS, DEFAULT_COLORS };
export { clothingSchema };

export type ClothingCategoryId = (typeof CLOTHING_CATEGORIES)[number]["id"];
export type ClothingSeasonId = (typeof CLOTHING_SEASONS)[number]["id"];
export type ClothingFormData = z.infer<typeof clothingSchema>;

export interface ClothingItem {
  id: string;
  closetId: string;
  name: string;
  category: ClothingCategoryId;
  color: string;
  season: ClothingSeasonId;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClothingImageUploaderProps {
  previewUrl: string;
  onImageChange: (dataUrl: string) => void;
  onClearImage: () => void;
}

export interface ClothingColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  error?: string;
}

export interface ClothingCardImageProps {
  imageUrl?: string;
  name: string;
  categoryLabel: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ClothingCardDetailsProps {
  name: string;
  color: string;
  seasonLabel: string;
}

export interface ClothingCardProps {
  clothing: ClothingItem;
  onEdit: (clothing: ClothingItem) => void;
  onDelete: (clothing: ClothingItem) => void;
}

export interface ClothingFilterBarProps {
  selectedCategory: ClothingCategoryId | "all";
  selectedSeason: ClothingSeasonId | "all";
  onSelectCategory: (category: ClothingCategoryId | "all") => void;
  onSelectSeason: (season: ClothingSeasonId | "all") => void;
  totalCount: number;
}

export interface ClothingGridProps {
  clothes: ClothingItem[];
  isLoading: boolean;
  onEdit: (item: ClothingItem) => void;
  onDelete: (item: ClothingItem) => void;
  onAddNew: () => void;
}

export interface ClothingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClothingFormData) => Promise<void>;
  initialData?: ClothingItem | null;
}
