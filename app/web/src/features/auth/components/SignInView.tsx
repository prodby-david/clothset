import LandingHeader from "@/features/landing/ui/LandingHeader";
import AuthCard from "../ui/AuthCard";
import SignInForm from "../ui/SignInForm";

export default function SignInView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <AuthCard
          title="Welcome back"
          subtitle="Sign in to curate and manage your outfits"
        >
          <SignInForm />
        </AuthCard>
      </main>
    </div>
  );
}
