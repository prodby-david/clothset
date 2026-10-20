import { Closet } from "@/features/closets/types/closet.types";

export type DashboardTab =
  | "overview"
  | "wardrobes"
  | "clothes"
  | "outfits"
  | "insights";

export interface DashboardHeaderProps {
  userName?: string | null;
  onCreateCloset: () => void;
  onAddGarment?: () => void;
  onMatchOutfit?: () => void;
}

export interface DailyOutfitItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl?: string;
}

export interface DailyOutfit {
  id: string;
  title: string;
  occasion: "work" | "casual" | "evening";
  weather: string;
  harmony: string;
  top: DailyOutfitItem;
  bottom: DailyOutfitItem;
  footwear: DailyOutfitItem;
  reason: string;
}

export interface DailyOutfitSpotlightProps {
  activeOccasion: "work" | "casual" | "evening";
  onSelectOccasion: (occasion: "work" | "casual" | "evening") => void;
  outfit: DailyOutfit;
  onShuffle: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export interface WardrobeInsightsProps {
  totalClosets: number;
  totalGarments: number;
}

export interface RecentGarment {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  closetId?: string;
  closetName: string;
  imageUrl?: string;
}

export interface RecentClothesGridProps {
  items: RecentGarment[];
  onAddNew: () => void;
}

export interface DashboardClothingFormData {
  name: string;
  closetId: string;
  category: string;
  color: string;
  season: string;
}

export interface DashboardClothingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DashboardClothingFormData) => Promise<void>;
  closets: Closet[];
}

export interface DashboardStatsProps {
  totalClosets: number;
  totalGarments: number;
}

export interface DashboardSidebarProps {
  userEmail?: string | null;
  userName?: string | null;
  onLogout: () => void;
  closets: Closet[];
  selectedWardrobeId: string;
  onSelectWardrobe: (id: string) => void;
  activeTab?: DashboardTab;
  onSelectTab?: (tab: DashboardTab) => void;
  onCreateCloset: () => void;
  totalClothesCount: number;
  planLimit?: number;
  className?: string;
}

export interface DashboardBottomNavProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export interface DashboardOverviewTabProps {
  userName?: string | null;
  totalClosets: number;
  totalGarments: number;
  planLimit?: number;
  onNavigateTab: (tab: DashboardTab, closetId?: string) => void;
  onCreateCloset: () => void;
  onAddGarment: () => void;
}

export interface DashboardClothesTabProps {
  closets: Closet[];
  selectedWardrobeId: string;
  onSelectWardrobe: (id: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  garments: RecentGarment[];
  onAddNewGarment: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

export interface WardrobeClothesExplorerProps {
  closets: Closet[];
  selectedWardrobeId: string;
  onSelectWardrobe: (id: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  garments: RecentGarment[];
  onAddNewGarment: () => void;
  onEditCloset: (closet: Closet) => void;
  onDeleteCloset: (closet: Closet) => void;
}