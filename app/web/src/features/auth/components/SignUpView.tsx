"use client";

import LandingHeader from "@/features/landing/ui/LandingHeader";
import AuthCard from "../ui/AuthCard";
import SignUpForm from "../ui/SignUpForm";

export default function SignUpView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <AuthCard
          title="Create your account"
          subtitle="Start curating and organizing your personal wardrobe"
        >
          <SignUpForm />
        </AuthCard>
      </main>
    </div>
  );
}
