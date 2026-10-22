import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Clothset",
  description: "Clothset System Administration and Wardrobe Catalog Management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
