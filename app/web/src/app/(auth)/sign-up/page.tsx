import { Metadata } from "next";
import SignUpView from "@/features/auth/components/SignUpView";

export const metadata: Metadata = {
  title: "Sign Up — Clothset",
  description: "Create an account to start curating your wardrobe",
};

export default function SignUpPage() {
  return <SignUpView />;
}
