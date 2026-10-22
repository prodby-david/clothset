"use client";

import React from "react";
import { Shield } from "lucide-react";
import AdminLoginForm from "../ui/AdminLoginForm";

export default function AdminLoginView() {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center p-4 sm:p-6 text-charcoal">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal">
            Clothset Admin Console
          </h1>
          <p className="text-xs text-muted-gray max-w-xs">
            Restricted administrative access for platform configuration and wardrobe template catalogs.
          </p>
        </div>

        <div className="bg-surface border border-warm-gray rounded-2xl p-6 sm:p-8 shadow-xs">
          <AdminLoginForm />
        </div>

        <div className="text-center">
          <p className="text-[11px] text-muted-gray">
            Clothset Platform Management &bull; Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
