import React from "react";
import {
  Shirt,
  Briefcase,
  Award,
  SunSnow,
  Layers,
  Folder,
} from "lucide-react";

interface ClosetTypeIconProps {
  type?: string;
  className?: string;
}

export default function ClosetTypeIcon({
  type,
  className = "w-5 h-5",
}: ClosetTypeIconProps) {
  switch (type) {
    case "everyday":
      return <Shirt className={className} />;
    case "work":
      return <Briefcase className={className} />;
    case "formal":
      return <Award className={className} />;
    case "seasonal":
      return <SunSnow className={className} />;
    case "capsule":
      return <Layers className={className} />;
    default:
      return <Folder className={className} />;
  }
}
