import type { z } from "zod";
import { CLOSET_TYPES } from "../constants/closet.constants";
import { closetSchema } from "../schemas/closet.schema";

export { CLOSET_TYPES };
export { closetSchema };

export type ClosetTypeId = (typeof CLOSET_TYPES)[number]["id"];
export type ClosetFormData = z.infer<typeof closetSchema>;

export interface Closet {
  id: string;
  name: string;
  type: string;
  description?: string;
  clothesCount?: number;
  maxItems?: number;
  maxSize?: number;
  templateId?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface WardrobeTemplateItem {
  id: string;
  name: string;
  description?: string | null;
  type: string;
  minTier: "FREE" | "PLUS" | "ELITE";
  isEligible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface WardrobeTemplateCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (templateId: string) => Promise<void>;
  userPlan?: string;
  closets: Closet[];
  maxClosets: number;
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
  onAddGarment?: (closetId: string) => void;
}

export interface ClosetCardProps {
  closet: Closet;
  onEdit: (closet: Closet) => void;
  onDelete: (closet: Closet) => void;
  onSelect?: (closetId: string) => void;
  onAddGarment?: (closetId: string) => void;
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
