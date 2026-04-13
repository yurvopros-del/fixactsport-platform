import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FlagTicker from "@/components/FlagTicker";
import PhilosophySection from "@/components/PhilosophySection";
import SystemSection from "@/components/SystemSection";
import RewardsSection from "@/components/RewardsSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";

const FOOTBALL_DIVIDER_ITEMS = Array.from({ length: 24 }, () => "⚽");

export default function Index() {
  useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <HeroSection />

        <div className="site-light bg-background text-foreground">
          <FlagTicker direction="left" />

          <PhilosophySection />

          <SystemSection />

          <section
            aria-label="Football divider"
            className="overflow-hidden border-y border-slate-200 bg-[#F8FAFC] py-4"
          >
            <div className="relative">
              <div className="animate-flag-scroll-left flex w-max items-center gap-8 whitespace-nowrap pl-8 text-2xl md:text-[1.75rem]">
                {[...FOOTBALL_DIVIDER_ITEMS, ...FOOTBALL_DIVIDER_ITEMS].map((item, index) => (
                  <span
                    key={`football-divider-${index}`}
                    className="inline-flex items-center justify-center opacity-80"
                    aria-hidden="true"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <RewardsSection />

          <FlagTicker direction="right" />

          <DownloadSection />

          <Footer />
        </div>
      </main>
    </div>
  );
}