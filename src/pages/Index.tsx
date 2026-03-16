import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FlagTicker from "@/components/FlagTicker";
import PhilosophySection from "@/components/PhilosophySection";
import SystemSection from "@/components/SystemSection";
import RewardsSection from "@/components/RewardsSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { reportHorizontalOverflow } from "@/lib/debugOverflow";

export default function Index() {
  // keep hook call so locale stays computed (even if not used here)
  useLanguage();

  useEffect(() => {
    const runReport = () => {
      window.requestAnimationFrame(() => {
        reportHorizontalOverflow(`index:${window.innerWidth}`);
      });
    };

    runReport();
    window.addEventListener("resize", runReport);
    window.addEventListener("load", runReport);

    return () => {
      window.removeEventListener("resize", runReport);
      window.removeEventListener("load", runReport);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <FlagTicker direction="left" />
        <PhilosophySection />

        <section id="system">
          <SystemSection />
        </section>

        <FlagTicker direction="right" />

        <section id="rewards">
          <RewardsSection />
        </section>

        <DownloadSection />
        <Footer />
      </main>
    </div>
  );
}
