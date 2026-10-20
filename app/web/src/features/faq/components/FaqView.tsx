import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingCta from "@/features/landing/ui/LandingCta";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import LandingFaq from "../ui/LandingFaq";
import FaqSupportBanner from "../ui/FaqSupportBanner";
import PageTransition from "@/shared/components/ui/PageTransition";

export default function FaqView() {
  return (
    <div className="min-h-screen flex flex-col text-charcoal">
      <LandingHeader />
      <main className="flex-1">
        <PageTransition>
          <LandingFaq />
          <FaqSupportBanner />
          <LandingCta />
        </PageTransition>
      </main>
      <LandingFooter />
    </div>
  );
}