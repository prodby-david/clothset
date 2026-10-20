import { BadgeProps } from "@/shared/types/ui.types";

export default function Badge({
  children,
  className = "",
  variant = "accent",
  dot = false,
  ...props
}: BadgeProps) {
  const variantStyles = {
    accent: "bg-pale-sage text-forest",
    secondary: "bg-sage/15 text-forest",
    neutral: "bg-cream text-muted-gray border border-warm-gray",
    outline: "border border-sage text-forest",
  };

  const dotStyles = {
    accent: "bg-forest",
    secondary: "bg-sage",
    neutral: "bg-muted-gray",
    outline: "bg-forest",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${dotStyles[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
