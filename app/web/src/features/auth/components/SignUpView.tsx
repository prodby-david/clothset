"use client";

import AuthCard from "../ui/AuthCard";
import SignUpForm from "../ui/SignUpForm";

export default function SignUpView() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start curating and organizing your personal wardrobe"
    >
      <SignUpForm />
    </AuthCard>
  );
}
