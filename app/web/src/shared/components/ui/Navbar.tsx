import Link from "next/link";
import { LogOut, Shirt } from "lucide-react";
import Button from "./Button";
import { NavbarProps } from "@/shared/types/ui.types";

export default function Navbar({ userEmail, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-warm-gray/70 bg-cream/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-semibold text-charcoal tracking-tight group"
        >
          <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Shirt className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight">Clothset</span>
        </Link>

        <div className="flex items-center gap-3">
          {userEmail ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-gray bg-surface/90 px-3 py-1 rounded-full border border-warm-gray shadow-xs">
                {userEmail}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-gray hover:text-rose-600 gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
