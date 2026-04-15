import { useState, useEffect, useCallback } from "react";
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

const HeroSection = () => {
  const locale = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sweepKey, setSweepKey] = useState(0);

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
    const timer = setInterval(() => {
      setSweepKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const slideImage = SLIDE_IMAGES[currentSlide];
const slideText = heroSlides[currentSlide];

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(240,6%,6%)] via-[hsl(217,20%,12%)] to-[hsl(260,15%,10%)]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0.3, scale: 1.05, filter: "blur(12px) brightness(0.45)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(0.45)" }}
          exit={{ opacity: 0, scale: 0.97, filter: "blur(4px) brightness(0.45)" }}
          transition={imageTransition}
        >
          <img
            src={slideImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover animate-[hero-breathe_15s_ease-in-out_infinite_0.9s]"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/0 via-background/30 to-background" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      <motion.div
        key={`sweep-${sweepKey}`}
        className="pointer-events-none absolute inset-0 z-[2]"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
        }}
      />

      <div className="relative z-10 content-max text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="mb-5 text-4xl font-semibold tracking-tight text-foreground md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl"
              style={{
                textShadow:
                  "0 1px 0 rgba(255,255,255,0.08), 0 6px 18px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <span className="gradient-text">{t(slideText.headline, locale)}</span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-12 max-w-3xl whitespace-pre-line text-lg leading-relaxed tracking-[0.01em] text-white/90 md:mb-14 md:text-xl lg:text-2xl"
              style={{
                textShadow: "0 4px 14px rgba(0,0,0,0.28)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.37 }}
            >
              {t(slideText.tagline, locale)}
            </motion.p>

            <motion.a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              className="inline-block rounded px-10 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-opacity hover:opacity-90 md:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.52 }}
            >
              <span className="gradient-btn inline-block rounded px-10 py-4">
                {t(translations.hero.cta, locale)}
              </span>
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
              i === currentSlide ? "gradient-btn w-6" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`${t(translations.hero.slideLabel, locale)} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;