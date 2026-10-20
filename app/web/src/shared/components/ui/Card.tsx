import React from "react";
import { CardProps } from "@/shared/types/ui.types";

export default function Card({
  children,
  className = "",
  ref,
  ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`bg-surface border border-warm-gray rounded-2xl shadow-xs transition-all hover:shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
