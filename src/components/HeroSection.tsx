import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { heroSlides } from "@/lib/translations/hero";
import { BETA_FORM_URL } from "@/lib/constants";
import slide1 from "@/assets/hero/hero_01.avif";
import slide2 from "@/assets/hero/hero_02.avif";
import slide3 from "@/assets/hero/hero_03.avif";
import slide4 from "@/assets/hero/hero_04.avif";
import slide5 from "@/assets/hero/hero_05.avif";

const SLIDE_IMAGES = [slide1, slide2, slide3, slide4, slide5];

const imageTransition = {
  duration: 0.9,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

const normalHeroHeadlineStyle = {
  textShadow: [
    "0 1px 0 rgba(255,255,255,0.92)",
    "0 2px 4px rgba(255,255,255,0.42)",
    "0 8px 18px rgba(15,23,42,0.24)",
    "0 18px 34px rgba(15,23,42,0.18)",
  ].join(", "),
  filter: "drop-shadow(0 8px 20px rgba(15,23,42,0.16))",
} as const;

const isAccessibilityModeEnabled = () =>
  document.documentElement.getAttribute("data-accessibility") === "high-visibility";

const HeroSection = () => {
  const locale = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [accessibilityMode, setAccessibilityMode] = useState(() =>
    isAccessibilityModeEnabled(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextIndex = (currentSlide + 1) % SLIDE_IMAGES.length;
    const img = new window.Image();
    img.src = SLIDE_IMAGES[nextIndex];
  }, [currentSlide]);

  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      setAccessibilityMode(isAccessibilityModeEnabled());
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-accessibility"],
    });

    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const slideImage = SLIDE_IMAGES[currentSlide];
  const slideText = heroSlides[currentSlide];

  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${
        accessibilityMode ? "bg-background" : "bg-[hsl(222,28%,8%)]"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={
            accessibilityMode
              ? { opacity: 0.18, scale: 1.03, filter: "none" }
: { opacity: 0.34, scale: 1.05, filter: "blur(10px) brightness(0.64) contrast(1.03) saturate(0.98)" }
          }
          animate={
            accessibilityMode
              ? { opacity: 0.28, scale: 1, filter: "none" }
: { opacity: 1, scale: 1, filter: "blur(0px) brightness(0.64) contrast(1.03) saturate(0.98)" }
          }
          exit={
            accessibilityMode
              ? { opacity: 0, scale: 0.98, filter: "none" }
: { opacity: 0, scale: 0.97, filter: "blur(4px) brightness(0.64) contrast(1.03) saturate(0.98)" }          }
          transition={imageTransition}
        >
          <img
            src={slideImage}
            alt=""
            className={`absolute inset-0 h-full w-full ${
              accessibilityMode
                ? "object-contain"
                : "object-cover animate-[hero-breathe_15s_ease-in-out_infinite_0.9s]"
            }`}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

   {!accessibilityMode ? (
  <>
    <div className="absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-black/64 via-black/28 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-t from-black/48 via-black/18 to-transparent" />
    <div className="absolute inset-y-0 left-0 z-[1] w-[18vw] min-w-[72px] bg-gradient-to-r from-black/24 to-transparent" />
    <div className="absolute inset-y-0 right-0 z-[1] w-[18vw] min-w-[72px] bg-gradient-to-l from-black/24 to-transparent" />
    <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.14)_0%,rgba(2,6,23,0.18)_38%,rgba(0,0,0,0.28)_100%)]" />
  </>
) : (
        <>
          <div className="absolute inset-0 z-[1] bg-white/78" />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),rgba(248,250,252,0.92)_65%)]" />
        </>
      )}

      <div className="relative z-10 content-max text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${locale}-${currentSlide}-${accessibilityMode ? "a11y" : "default"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: easeStandard }}
          >
            <motion.h1
              className={`mb-6 text-[28px] font-extrabold uppercase tracking-[-0.02em] leading-[1.12] md:text-5xl md:leading-[1.02] ${
                accessibilityMode ? "text-slate-950" : "drop-shadow-[0_6px_22px_rgba(0,0,0,0.42)]"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: easeStandard }}
            >
              {accessibilityMode ? (
                <span>{t(slideText.headline, locale)}</span>
              ) : (
                <span className="gradient-text">{t(slideText.headline, locale)}</span>
              )}
            </motion.h1>

            <motion.p
              className={`mx-auto mb-10 max-w-3xl whitespace-pre-line body-lg ${
                accessibilityMode
                  ? "text-slate-700"
                  : "text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease: easeStandard }}
            >
              {t(slideText.tagline, locale)}
            </motion.p>

            <motion.a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className="gradient-btn inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(37,99,235,0.18)] transition-opacity hover:opacity-95"
            >
              {t(translations.hero.cta, locale)}
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "gradient-btn w-6"
                : accessibilityMode
                  ? "bg-slate-300 hover:bg-slate-400"
                  : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`${t(translations.hero.slideLabel, locale)} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;