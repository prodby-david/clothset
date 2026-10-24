"use client";

import Link from "next/link";
import { Shirt, Menu, X } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import ThemeToggle from "@/shared/components/ui/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LandingHeaderProps } from "../types/landing.types";
import { useLandingNav } from "../hooks/useLandingNav";

export default function LandingHeader({ className = "" }: LandingHeaderProps) {
  const { user } = useAuth();
  const {
    mobileMenuOpen,
    toggleMenu,
    closeMenu,
    getLinkClass,
    getMobileLinkClass,
  } = useLandingNav();

  return (
    <header
      className={`sticky top-3 z-40 max-w-5xl w-[calc(100%-2rem)] mx-auto bg-surface/90 backdrop-blur-md border border-warm-gray rounded-2xl shadow-xs transition-colors ${className}`}
    >
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-charcoal hover:opacity-90 transition-opacity"
          aria-label="Clothset Home"
        >
          <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center shadow-xs">
            <Shirt className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight">Clothset</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/features" className={getLinkClass("/features")}>
            Features
          </Link>
          <Link href="/how-it-works" className={getLinkClass("/how-it-works")}>
            How It Works
          </Link>
          <Link href="/pricing" className={getLinkClass("/pricing")}>
            Pricing
          </Link>
          <Link href="/faq" className={getLinkClass("/faq")}>
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          {user ? (
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="text-sm h-9 px-4 shadow-xs">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <Button variant="primary" size="sm" className="text-sm h-9 px-4 shadow-xs">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMenu}
            className="p-1.5 text-charcoal hover:bg-cream rounded-xl border border-warm-gray transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/98 backdrop-blur-md border-t border-warm-gray px-4 pt-3 pb-5 rounded-b-2xl flex flex-col gap-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5 font-medium text-sm">
            <Link
              href="/"
              onClick={closeMenu}
              className={getMobileLinkClass("/")}
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={closeMenu}
              className={getMobileLinkClass("/features")}
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              onClick={closeMenu}
              className={getMobileLinkClass("/how-it-works")}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              onClick={closeMenu}
              className={getMobileLinkClass("/pricing")}
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              onClick={closeMenu}
              className={getMobileLinkClass("/faq")}
            >
              FAQ
            </Link>
          </nav>
          <div className="pt-2 border-t border-warm-gray flex flex-col gap-2">
            {user ? (
              <Link href="/dashboard" onClick={closeMenu}>
                <Button variant="primary" size="sm" className="w-full justify-center text-sm h-9">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up" onClick={closeMenu}>
                <Button variant="primary" size="sm" className="w-full justify-center text-sm h-9">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
