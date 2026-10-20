import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingCta from "@/features/landing/ui/LandingCta";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import LandingPricing from "../ui/LandingPricing";
import PricingComparisonMatrix from "../ui/PricingComparisonMatrix";
import PageTransition from "@/shared/components/ui/PageTransition";

export default function PricingView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1">
        <PageTransition>
          <LandingPricing />
          <PricingComparisonMatrix />
          <LandingCta />
        </PageTransition>
      </main>
      <LandingFooter />
    </div>
  );
}