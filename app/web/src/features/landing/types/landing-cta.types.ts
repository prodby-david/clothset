export interface TrustBadgeItem {
  id: string;
  label: string;
  iconName: "check" | "shield";
}

export interface WardrobeDrawerCategory {
  id: string;
  label: string;
  count: number;
}

export interface WardrobeDrawerItem {
  id: string;
  name: string;
  category: string;
  color: string;
}

export interface WardrobeDrawerPreviewData {
  drawerName: string;
  currentCount: number;
  maxCount: number;
  percentage: number;
  categories: WardrobeDrawerCategory[];
  sampleItems: WardrobeDrawerItem[];
}

export interface LandingCtaContentProps {
  className?: string;
}

export interface WardrobeDrawerPreviewProps {
  className?: string;
  data?: WardrobeDrawerPreviewData;
}
