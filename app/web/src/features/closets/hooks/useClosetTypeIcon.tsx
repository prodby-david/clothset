import {
  Shirt,
  Briefcase,
  Award,
  SunSnow,
  Layers,
  Folder,
} from "lucide-react";

export function useClosetTypeIcon() {
  const getIcon = (typeId: string) => {
    switch (typeId) {
      case "everyday":
        return <Shirt className="w-5 h-5" />;
      case "work":
        return <Briefcase className="w-5 h-5" />;
      case "formal":
        return <Award className="w-5 h-5" />;
      case "seasonal":
        return <SunSnow className="w-5 h-5" />;
      case "capsule":
        return <Layers className="w-5 h-5" />;
      default:
        return <Folder className="w-5 h-5" />;
    }
  };

  return { getIcon };
}
