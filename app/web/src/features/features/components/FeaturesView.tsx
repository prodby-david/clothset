import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingCta from "@/features/landing/ui/LandingCta";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import LandingFeatures from "../ui/LandingFeatures";
import FeaturesAiSpotlight from "../ui/FeaturesAiSpotlight";
import FeaturesCapsuleComparison from "../ui/FeaturesCapsuleComparison";
import PageTransition from "@/shared/components/ui/PageTransition";

export default function FeaturesView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1">
        <PageTransition>
          <LandingFeatures />
          <FeaturesAiSpotlight />
          <FeaturesCapsuleComparison />
          <LandingCta />
        </PageTransition>
      </main>
      <LandingFooter />
    </div>
  );
}