import LandingHeader from "../ui/LandingHeader";
import LandingHeroContent from "../ui/LandingHeroContent";
import LandingCta from "../ui/LandingCta";
import LandingFooter from "../ui/LandingFooter";
import PageTransition from "@/shared/components/ui/PageTransition";

export default function LandingView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1">
        <PageTransition>
          <LandingHeroContent />
          <LandingCta />
        </PageTransition>
      </main>
      <LandingFooter />
    </div>
  );
}
