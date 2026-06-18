import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { BETA_FORM_URL } from "@/lib/constants";
import { getPrivacyConsent } from "@/components/CookieBanner";

// Mobile/tablet-only sticky apply pill (<xl, where the nav CTA is hidden).
// Appears after the hero leaves the viewport, hides over the final CTA zone,
// and stays hidden until cookie consent is handled. Layering: z-30 (below the
// mobile menu overlay z-40 and the cookie banner z-80), so it can never cover them.
const MobileStickyCta = () => {
  const locale = useLanguage();
  const [pastHero, setPastHero] = useState(false);
  const [nearFinal, setNearFinal] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  // Cookie consent gate. CookieBanner can't be edited in this boundary and sets
  // consent in the same tab (no `storage` event), so poll lightly until handled,
  // then stop. Also re-check when the tab regains focus/visibility.
  useEffect(() => {
    const hasConsent = () => getPrivacyConsent() !== null;
    if (hasConsent()) {
      setConsentGiven(true);
      return;
    }
    const recheck = () => {
      if (hasConsent()) {
        setConsentGiven(true);
        window.clearInterval(intervalId);
        window.removeEventListener("focus", recheck);
        document.removeEventListener("visibilitychange", recheck);
      }
    };
    const intervalId = window.setInterval(recheck, 800);
    window.addEventListener("focus", recheck);
    document.addEventListener("visibilitychange", recheck);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", recheck);
      document.removeEventListener("visibilitychange", recheck);
    };
  }, []);

  // Show once the hero-end sentinel has scrolled above the viewport.
  useEffect(() => {
    const el = document.querySelector('[data-sticky-sentinel="hero-end"]');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Hide while the final CTA zone (Download/Contacts/Footer) is in view.
  useEffect(() => {
    const el = document.querySelector('[data-sticky-sentinel="final-zone"]');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearFinal(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visible = consentGiven && pastHero && !nearFinal;
  const label = locale === "en" ? "Apply Now" : "Подать заявку";

  return (
    <div
      aria-hidden={!visible}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pt-2 transition-all duration-300 ease-out xl:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <a
        href={BETA_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="beta-access"
        tabIndex={visible ? 0 : -1}
        className={`gradient-btn inline-flex min-h-[48px] items-center justify-center rounded-full px-7 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_16px_40px_rgba(37,99,235,0.34)] ring-1 ring-white/25 backdrop-blur-md transition-transform duration-200 active:scale-[0.98] ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {label}
      </a>
    </div>
  );
};

export default MobileStickyCta;
