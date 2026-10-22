export const CLOSET_TYPES = [
  {
    id: "capsule",
    title: "Essential Wardrobe",
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
    description: "Personalized wardrobe with custom capacity",
    icon: "folder",
    defaultMaxSize: 75,
  },
] as const;
