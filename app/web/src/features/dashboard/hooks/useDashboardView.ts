"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useClosets } from "@/features/closets/hooks/useClosets";
import { Closet, ClosetFormData } from "@/features/closets/types/closet.types";
import {
  DailyOutfit,
  RecentGarment,
  DashboardClothingFormData,
  DashboardTab,
} from "../types/dashboard.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

const SAMPLE_DAILY_OUTFITS: Record<"work" | "casual" | "evening", DailyOutfit[]> = {
  work: [
    {
      id: "do_w1",
      title: "Smart Workday Minimal",
      occasion: "work",
      weather: "Mild & Sunny • 21°C",
      harmony: "98% Color Harmony",
      top: {
        id: "t1",
        name: "Oatmeal Linen Overshirt",
        category: "Tops",
        color: "Warm Cream",
        imageUrl:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      },
      bottom: {
        id: "b1",
        name: "Pleated Relaxed Trousers",
        category: "Bottoms",
        color: "Sage Green",
        imageUrl:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      },
      footwear: {
        id: "f1",
        name: "Classic Suede Penny Loafers",
        category: "Footwear",
        color: "Earthy Taupe",
        imageUrl:
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
      },
      reason:
        "Tonal cream and sage earthy contrast. Breathable fabrics structured for casual workdays, office presentations, or studio visits.",
    },
    {
      id: "do_w2",
      title: "Clean Structured Professional",
      occasion: "work",
      weather: "Partly Cloudy • 19°C",
      harmony: "96% Color Harmony",
      top: {
        id: "t2",
        name: "Crisp Oxford Cotton Shirt",
        category: "Tops",
        color: "Off White",
        imageUrl:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
      },
      bottom: {
        id: "b2",
        name: "Tailored Charcoal Chinos",
        category: "Bottoms",
        color: "Charcoal",
        imageUrl:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
      },
      footwear: {
        id: "f2",
        name: "Minimalist Derby Shoes",
        category: "Footwear",
        color: "Deep Umber",
        imageUrl:
          "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
      },
      reason:
        "High contrast monochromatic pairing with subtle dark earthy footwear. Clean silhouette optimized for all-day focus.",
    },
  ],
  casual: [
    {
      id: "do_c1",
      title: "Weekend Studio Relaxed",
      occasion: "casual",
      weather: "Pleasant • 23°C",
      harmony: "95% Silhouette Fit",
      top: {
        id: "t3",
        name: "Heavyweight Boxy Cotton Tee",
        category: "Tops",
        color: "Warm Cream",
        imageUrl:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      },
      bottom: {
        id: "b3",
        name: "Wide-Leg Washed Canvas Pants",
        category: "Bottoms",
        color: "Sage Green",
        imageUrl:
          "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80",
      },
      footwear: {
        id: "f3",
        name: "Low-Profile Neutral Trainers",
        category: "Footwear",
        color: "Off-White / Taupe",
        imageUrl:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
      },
      reason:
        "Relaxed boxy proportions with soft neutrals. Easy movement with clean visual lines for coffee walks or gallery afternoons.",
    },
    {
      id: "do_c2",
      title: "Casual Layered Stroll",
      occasion: "casual",
      weather: "Cool Breeze • 18°C",
      harmony: "94% Silhouette Fit",
      top: {
        id: "t4",
        name: "Textured Waffle Knit Crew",
        category: "Tops",
        color: "Earthy Sand",
        imageUrl:
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
      },
      bottom: {
        id: "b4",
        name: "Relaxed Fit Denim",
        category: "Bottoms",
        color: "Faded Indigo",
        imageUrl:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      },
      footwear: {
        id: "f4",
        name: "Suede Chukka Boots",
        category: "Footwear",
        color: "Taupe",
        imageUrl:
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80",
      },
      reason:
        "Tactile waffle knit layered over soft denim, grounded by earthy chukka boots for effortless transitional weather.",
    },
  ],
  evening: [
    {
      id: "do_e1",
      title: "Evening Dinner & Drinks",
      occasion: "evening",
      weather: "Cool Evening • 17°C",
      harmony: "97% Color Harmony",
      top: {
        id: "t5",
        name: "Structured Merino Cardigan",
        category: "Outerwear",
        color: "Forest Green",
        imageUrl:
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
      },
      bottom: {
        id: "b5",
        name: "Pleated Tapered Slacks",
        category: "Bottoms",
        color: "Deep Charcoal",
        imageUrl:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      },
      footwear: {
        id: "f5",
        name: "Polished Chelsea Boots",
        category: "Footwear",
        color: "Dark Espresso",
        imageUrl:
          "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=80",
      },
      reason:
        "Rich deep forest and charcoal tones create an intimate, sophisticated evening look with tactile merino warmth.",
    },
  ],
};

const INITIAL_RECENT_GARMENTS: RecentGarment[] = [
  {
    id: "rg_1",
    name: "Oatmeal Linen Overshirt",
    category: "Tops",
    color: "Warm Cream",
    season: "Spring / Summer",
    closetId: "cls_1",
    closetName: "My Daily Wardrobe",
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_2",
    name: "Heavyweight Boxy Cotton Tee",
    category: "Tops",
    color: "Warm Cream",
    season: "All Season",
    closetId: "cls_1",
    closetName: "My Daily Wardrobe",
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_3",
    name: "Wide-Leg Washed Canvas Pants",
    category: "Bottoms",
    color: "Sage Green",
    season: "All Season",
    closetId: "cls_1",
    closetName: "My Daily Wardrobe",
    imageUrl:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_4",
    name: "Classic Suede Penny Loafers",
    category: "Footwear",
    color: "Earthy Taupe",
    season: "Spring / Autumn",
    closetId: "cls_1",
    closetName: "My Daily Wardrobe",
    imageUrl:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_5",
    name: "Crisp Oxford Cotton Shirt",
    category: "Tops",
    color: "Off White",
    season: "All Season",
    closetId: "cls_2",
    closetName: "Office & Formal Wear",
    imageUrl:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_6",
    name: "Pleated Relaxed Trousers",
    category: "Bottoms",
    color: "Sage Green",
    season: "All Season",
    closetId: "cls_2",
    closetName: "Office & Formal Wear",
    imageUrl:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_7",
    name: "Tailored Charcoal Chinos",
    category: "Bottoms",
    color: "Charcoal",
    season: "All Season",
    closetId: "cls_2",
    closetName: "Office & Formal Wear",
    imageUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_8",
    name: "Structured Merino Cardigan",
    category: "Outerwear",
    color: "Forest Green",
    season: "Autumn / Winter",
    closetId: "cls_2",
    closetName: "Office & Formal Wear",
    imageUrl:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_9",
    name: "Textured Waffle Knit Crew",
    category: "Tops",
    color: "Earthy Sand",
    season: "All Season",
    closetId: "cls_3",
    closetName: "Weekend Minimalist Capsule",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_10",
    name: "Relaxed Fit Denim",
    category: "Bottoms",
    color: "Faded Indigo",
    season: "All Season",
    closetId: "cls_3",
    closetName: "Weekend Minimalist Capsule",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_11",
    name: "Low-Profile Neutral Trainers",
    category: "Footwear",
    color: "Off-White",
    season: "All Season",
    closetId: "cls_3",
    closetName: "Weekend Minimalist Capsule",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rg_12",
    name: "Suede Chukka Boots",
    category: "Footwear",
    color: "Taupe",
    season: "Autumn / Winter",
    closetId: "cls_3",
    closetName: "Weekend Minimalist Capsule",
    imageUrl:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80",
  },
];

const DEFAULT_IMAGE_FALLBACKS: Record<string, string> = {
  Tops: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  Bottoms: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
  Outerwear: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
  Footwear: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
  Accessories: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
};

export function useDashboardView() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    closets,
    isLoading,
    createCloset,
    updateCloset,
    deleteCloset,
  } = useClosets();

  const urlTab = searchParams.get("tab") as DashboardTab | null;
  const activeTab: DashboardTab =
    urlTab && ["overview", "wardrobes", "clothes", "outfits", "insights"].includes(urlTab)
      ? urlTab
      : "overview";

  const selectedWardrobeId: string = searchParams.get("closetId") || "all";

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [editingCloset, setEditingCloset] = useState<Closet | null>(null);
  const [deletingCloset, setDeletingCloset] = useState<Closet | null>(null);
  const [isAddGarmentOpen, setIsAddGarmentOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [activeOccasion, setActiveOccasion] = useState<"work" | "casual" | "evening">("work");
  const [outfitIndex, setOutfitIndex] = useState<number>(0);
  const [savedOutfitIds, setSavedOutfitIds] = useState<Set<string>>(new Set(["do_w1"]));

  const [recentGarments, setRecentGarments] = useState<RecentGarment[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clothset_recent_garments");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {}
      }
    }
    return INITIAL_RECENT_GARMENTS;
  });

  const handleSelectTab = useCallback(
    (tab: DashboardTab, closetId?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      if (closetId !== undefined) {
        if (closetId === "all") {
          params.delete("closetId");
        } else {
          params.set("closetId", closetId);
        }
      } else if (tab !== "clothes") {
        params.delete("closetId");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleSelectWardrobe = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "clothes");
      if (id === "all") {
        params.delete("closetId");
      } else {
        params.set("closetId", id);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setSelectedWardrobeId = useCallback(
    (id: string) => {
      handleSelectWardrobe(id);
    },
    [handleSelectWardrobe]
  );

  const setActiveTab = useCallback(
    (tab: DashboardTab) => {
      handleSelectTab(tab);
    },
    [handleSelectTab]
  );

  const currentOccasionOutfits = SAMPLE_DAILY_OUTFITS[activeOccasion];
  const currentOutfit = currentOccasionOutfits[outfitIndex % currentOccasionOutfits.length];
  const isCurrentOutfitSaved = savedOutfitIds.has(currentOutfit.id);

  const handleSelectOccasion = (occasion: "work" | "casual" | "evening") => {
    setActiveOccasion(occasion);
    setOutfitIndex(0);
  };

  const handleShuffleOutfit = () => {
    setOutfitIndex((prev) => prev + 1);
  };

  const handleToggleSaveOutfit = () => {
    setSavedOutfitIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentOutfit.id)) {
        next.delete(currentOutfit.id);
      } else {
        next.add(currentOutfit.id);
      }
      return next;
    });
  };

  const handleMatchOutfitClick = () => {
    handleShuffleOutfit();
    handleSelectTab("outfits");
  };

  const totalClothesCount = closets.reduce(
    (acc, curr) => acc + (curr.clothesCount || 0),
    0
  );

  const filteredGarments = useMemo(() => {
    return recentGarments.filter((g) => {
      const matchesWardrobe =
        selectedWardrobeId === "all" || g.closetId === selectedWardrobeId;
      const matchesCategory =
        selectedCategory === "all" || g.category === selectedCategory;
      return matchesWardrobe && matchesCategory;
    });
  }, [recentGarments, selectedWardrobeId, selectedCategory]);

  const handleCreateSubmit = async (data: ClosetFormData) => {
    const created = await createCloset(data);
    handleSelectWardrobe(created.id);
  };

  const handleUpdateSubmit = async (data: ClosetFormData) => {
    if (editingCloset) {
      await updateCloset(editingCloset.id, data);
      setEditingCloset(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingCloset) {
      const deletedId = deletingCloset.id;
      await deleteCloset(deletedId);
      if (selectedWardrobeId === deletedId) {
        setSelectedWardrobeId("all");
      }
      setRecentGarments((prev) => prev.filter((g) => g.closetId !== deletedId));
      setDeletingCloset(null);
    }
  };

  const handleAddGarmentSubmit = async (data: DashboardClothingFormData) => {
    const targetCloset = closets.find((c) => c.id === data.closetId);
    const fallbackImage =
      DEFAULT_IMAGE_FALLBACKS[data.category] || DEFAULT_IMAGE_FALLBACKS.Tops;

    const newGarment: RecentGarment = {
      id: `rg_${Date.now()}`,
      name: data.name,
      category: data.category,
      color: data.color,
      season: data.season,
      closetId: data.closetId || closets[0]?.id || "cls_1",
      closetName: targetCloset?.name || "Capsule Wardrobe",
      imageUrl: fallbackImage,
    };

    const updated = [newGarment, ...recentGarments];
    setRecentGarments(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem("clothset_recent_garments", JSON.stringify(updated));
    }
  };

  return {
    user,
    logout,
    closets,
    isLoading,
    totalClothesCount,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingCloset,
    setEditingCloset,
    deletingCloset,
    setDeletingCloset,
    isAddGarmentOpen,
    setIsAddGarmentOpen,
    activeTab,
    setActiveTab,
    handleSelectTab,
    handleSelectWardrobe,
    activeOccasion,
    currentOutfit,
    isCurrentOutfitSaved,
    recentGarments,
    filteredGarments,
    selectedWardrobeId,
    setSelectedWardrobeId,
    selectedCategory,
    setSelectedCategory,
    handleSelectOccasion,
    handleShuffleOutfit,
    handleToggleSaveOutfit,
    handleMatchOutfitClick,
    handleCreateSubmit,
    handleUpdateSubmit,
    handleDeleteConfirm,
    handleAddGarmentSubmit,
  };
}
