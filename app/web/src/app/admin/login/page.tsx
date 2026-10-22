import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminLoginView from "@/features/admin/components/AdminLoginView";
import { ADMIN_TOKEN_COOKIE } from "@/features/admin/lib/admin-cookies";

export const metadata: Metadata = {
  title: "Admin Sign In | Clothset",
  description: "Sign in to the Clothset Administrator Console",
};

async function AdminLoginPageContent() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (token) {
    redirect("/admin");
  }

  return <AdminLoginView />;
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <Loader2 className="w-8 h-8 animate-spin text-forest" />
        </div>
      }
    >
      <AdminLoginPageContent />
    </Suspense>
  );
}
