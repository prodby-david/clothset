import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingCta from "@/features/landing/ui/LandingCta";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import LandingHowItWorks from "../ui/LandingHowItWorks";
import HowItWorksRoutine from "../ui/HowItWorksRoutine";
import HowItWorksDigitizeGuide from "../ui/HowItWorksDigitizeGuide";
import PageTransition from "@/shared/components/ui/PageTransition";

export default function HowItWorksView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1">
        <PageTransition>
          <LandingHowItWorks />
          <HowItWorksRoutine />
          <HowItWorksDigitizeGuide />
          <LandingCta />
        </PageTransition>
      </main>
      <LandingFooter />
    </div>
  );
}