import { Metadata } from "next";
import SignInView from "@/features/auth/components/SignInView";

export const metadata: Metadata = {
  title: "Sign In — Clothset",
  description: "Sign in to access your digital wardrobe and closets",
};

export default function SignInPage() {
  return <SignInView />;
}
