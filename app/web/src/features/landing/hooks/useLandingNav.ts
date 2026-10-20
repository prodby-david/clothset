"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export function useLandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const getLinkClass = (href: string) =>
    pathname === href
      ? "text-forest font-semibold"
      : "text-muted-gray hover:text-charcoal transition-colors";

  const getMobileLinkClass = (href: string) =>
    pathname === href
      ? "px-3.5 py-2 rounded-xl bg-pale-sage text-forest font-semibold"
      : "px-3.5 py-2 rounded-xl hover:bg-surface text-charcoal transition-colors";

  return {
    mobileMenuOpen,
    toggleMenu,
    closeMenu,
    getLinkClass,
    getMobileLinkClass,
  };
}
