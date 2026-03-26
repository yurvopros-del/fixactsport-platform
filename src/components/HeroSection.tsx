import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

import { BETA_FORM_URL } from "@/lib/constants";
import slide1 from "@/assets/hero/hero_01.avif";
import slide2 from "@/assets/hero/hero_02.avif";
import slide3 from "@/assets/hero/hero_03.avif";
import slide4 from "@/assets/hero/hero_04.avif";
import slide5 from "@/assets/hero/hero_05.avif";
import slide6 from "@/assets/hero/hero_06.avif";
import slide7 from "@/assets/hero/hero_07.avif";
import slide8 from "@/assets/hero/hero_08.avif";

const SLIDE_IMAGES = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

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
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const slideImage = SLIDE_IMAGES[currentSlide];
  const slideText = translations.heroSlides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0.4, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={imageTransition}
        >
          <img
            src={slideImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(0.78) contrast(1.08)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.28) 100%)",
        }}
      />

      <motion.div
        key={`sweep-${sweepKey}`}
        className="absolute inset-0 z-[2] pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
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
              className="heading-xl text-white mb-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <span className="gradient-text">
                {t(slideText.headline, locale)}
              </span>
            </motion.h1>

            <motion.p
              className="text-white/85 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-[1.6]"
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
              className="gradient-btn inline-flex justify-center rounded px-8 py-4 text-sm font-semibold tracking-[0.1em] uppercase text-white hover:opacity-90 transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.52 }}
            >
              {t(translations.hero.cta, locale)}
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "gradient-btn w-6"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`${t(translations.hero.slideLabel, locale)} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;