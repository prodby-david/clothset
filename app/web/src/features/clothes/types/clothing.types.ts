import { z } from "zod";

export const CLOTHING_CATEGORIES = [
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "outerwear", label: "Outerwear" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
] as const;

export type ClothingCategoryId = (typeof CLOTHING_CATEGORIES)[number]["id"];

export const CLOTHING_SEASONS = [
  { id: "all-season", label: "All Season" },
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "fall", label: "Fall" },
  { id: "winter", label: "Winter" },
] as const;

export type ClothingSeasonId = (typeof CLOTHING_SEASONS)[number]["id"];

export const DEFAULT_COLORS = [
  "White",
  "Black",
  "Charcoal",
  "Beige",
  "Cream",
  "Navy",
  "Sage Green",
  "Forest Green",
  "Brown",
  "Denim Blue",
];

export const clothingSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  color: z.string().min(1, "Please specify a primary color"),
  season: z.string().min(1, "Please select a season"),
  imageUrl: z.string().optional(),
});

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
