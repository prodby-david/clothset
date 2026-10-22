import type { BadgeProps } from "@/shared/types/ui.types";

const VARIANT_STYLES = {
  accent: "bg-pale-sage text-forest dark:text-sage",
  secondary: "bg-sage/15 text-forest dark:text-sage",
  neutral: "bg-cream text-muted-gray border border-warm-gray",
  outline: "border border-sage text-forest dark:text-sage",
};

const DOT_STYLES = {
  accent: "bg-forest dark:bg-sage",
  secondary: "bg-sage",
  neutral: "bg-muted-gray",
  outline: "bg-forest dark:bg-sage",
};

export default function Badge({
  children,
  className = "",
  variant = "accent",
  dot = false,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${DOT_STYLES[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
