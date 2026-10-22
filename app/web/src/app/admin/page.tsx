import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminDashboardView from "@/features/admin/components/AdminDashboardView";
import { ADMIN_TOKEN_COOKIE } from "@/features/admin/lib/admin-cookies";

export const metadata: Metadata = {
  title: "Admin Dashboard | Clothset",
  description: "Manage system wardrobe templates and tier rules.",
};

async function AdminPageContent() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  return <AdminDashboardView />;
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <Loader2 className="w-8 h-8 animate-spin text-forest dark:text-sage" />
        </div>
      }
    >
      <AdminPageContent />
    </Suspense>
  );
}
