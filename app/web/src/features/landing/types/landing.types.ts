export type ClosetTab = "all" | "work" | "weekend" | "summer";

export interface PreviewItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  closet: ClosetTab;
}

export interface OutfitRecommendation {
  top: string;
  bottom: string;
  footwear: string;
  occasion: string;
  palette: string;
  reason: string;
}

export interface LayeredOutfitPiece {
  id: string;
  slot: "layer" | "top" | "bottom" | "footwear";
  slotLabel: string;
  name: string;
  color: string;
  imageUrl: string;
}

export interface CapsulePreset {
  id: string;
  title: string;
  vibe: string;
  palette: string;
  harmonyScore: number;
  description: string;
  outfits: LayeredOutfitPiece[][];
}

export interface LandingHeaderProps {
  className?: string;
}

export interface LandingHeroContentProps {
  className?: string;
}

export interface HeroPieceCardProps {
  piece: LayeredOutfitPiece;
  className?: string;
}

export interface LandingCtaProps {
  className?: string;
}

export interface LandingFooterProps {
  className?: string;
}
