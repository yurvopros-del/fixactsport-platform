import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FlagTicker from "@/components/FlagTicker";
import PhilosophySection from "@/components/PhilosophySection";
import SystemSection from "@/components/SystemSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import ParticipationStepsSection from "@/components/landing/ParticipationStepsSection";
import AttestationFlowVisualSection from "@/components/landing/AttestationFlowVisualSection";
import RewardsSection from "@/components/RewardsSection";
import PartnersSection from "@/components/landing/PartnersSection";
import GiftCertificateSection from "@/components/landing/GiftCertificateSection";
import FAQSection from "@/components/landing/FAQSection";
import DownloadSection from "@/components/DownloadSection";
import ContactsSection from "@/components/landing/ContactsSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <HeroSection />

        <div className="site-light bg-background text-foreground px-4 sm:px-6">
          <FlagTicker direction="left" />

          <PhilosophySection />

          <SystemSection />

          <AdvantagesSection />

          <ParticipationStepsSection />

          <AttestationFlowVisualSection />

          <RewardsSection />

          <PartnersSection />

          <GiftCertificateSection />

          <FAQSection />

          <FlagTicker direction="right" />

          <DownloadSection />

          <ContactsSection />

          <Footer />
        </div>
      </main>
    </div>
  );
}

