import AuthCard from "../ui/AuthCard";
import SignInForm from "../ui/SignInForm";

export default function SignInView() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to curate and manage your outfits"
    >
      <SignInForm />
    </AuthCard>
  );
}
