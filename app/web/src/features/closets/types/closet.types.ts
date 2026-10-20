import { z } from "zod";

export const CLOSET_TYPES = [
  {
    id: "capsule",
    title: "Capsule Wardrobe",
    description: "Curated minimalist collection of versatile interchangeable pieces",
    icon: "layers",
    defaultMaxSize: 30,
  },
  {
    id: "work",
    title: "Work / Office",
    description: "Professional attire, blazers, and smart tailored pieces",
    icon: "briefcase",
    defaultMaxSize: 40,
  },
  {
    id: "everyday",
    title: "Everyday / Casual",
    description: "Daily comfort wear, denim, and weekend essentials",
    icon: "shirt",
    defaultMaxSize: 50,
  },
  {
    id: "formal",
    title: "Formal / Evening",
    description: "Evening wear, suits, dresses, and special event pieces",
    icon: "award",
    defaultMaxSize: 25,
  },
  {
    id: "seasonal",
    title: "Seasonal Rotation",
    description: "Summer linen, winter coats, and transitional outerwear",
    icon: "sun-snow",
    defaultMaxSize: 60,
  },
  {
    id: "custom",
    title: "Custom Closet",
    description: "Personalized wardrobe capsule with custom capacity",
    icon: "folder",
    defaultMaxSize: 75,
  },
] as const;

export type ClosetTypeId = (typeof CLOSET_TYPES)[number]["id"];

export const closetSchema = z.object({
  type: z.string().min(1, "Please select a closet type"),
  name: z.string().min(2, "Closet name must be at least 2 characters"),
  description: z.string().optional(),
  maxSize: z.number().min(5).max(300).optional(),
});

export type ClosetFormData = z.infer<typeof closetSchema>;

export interface Closet {
  id: string;
  name: string;
  type: string;
  description?: string;
  clothesCount?: number;
  maxSize?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ClosetCardHeaderProps {
  typeTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ClosetCardFooterProps {
  closetId: string;
  clothesCount?: number;
  maxSize?: number;
  onSelect?: (closetId: string) => void;
}

export interface ClosetCardProps {
  closet: Closet;
  onEdit: (closet: Closet) => void;
  onDelete: (closet: Closet) => void;
  onSelect?: (closetId: string) => void;
}

export interface ClosetTypeSelectorProps {
  value: string;
  onChange: (value: ClosetTypeId) => void;
  error?: string;
}

export interface ClosetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClosetFormData) => Promise<void>;
  initialData?: Closet | null;
}

export interface ClosetCapacityInfo {
  currentCount: number;
  maxLimit: number;
  percentage: number;
  isNearLimit: boolean;
  statusLabel: string;
}

export interface ClosetHeaderProps {
  name?: string;
  description?: string;
  typeTitle?: string;
  itemsCount: number;
  isLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAddClothing: () => void;
  capacity?: ClosetCapacityInfo;
}

export interface ClosetListProps {
  closets: Closet[];
  isLoading: boolean;
  onEdit: (closet: Closet) => void;
  onDelete: (closet: Closet) => void;
  onCreateNew?: () => void;
  onAddNew?: () => void;
  onSelectCloset?: (closetId: string) => void;
}

export interface ClosetDetailViewProps {
  closetId: string;
}

export interface ClosetPageViewProps {
  params: Promise<{ id: string }>;
}