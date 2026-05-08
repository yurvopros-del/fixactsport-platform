import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { BETA_FORM_URL } from "@/lib/constants";
import RewardPrizeCard from "@/features/landing/rewards/components/RewardPrizeCard";
import RewardStage from "@/features/landing/rewards/components/RewardStage";
import {
  cardStatuses,
  medalThemes,
  placeBadges,
  rewardSlidesByLocale,
  type LandingLocale,
} from "@/features/landing/rewards/rewards.content";

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

const RewardsSection = () => {
  const locale = useLanguage() as LandingLocale;
  const tr = translations.rewards;

  const rewardSlides = useMemo(() => rewardSlidesByLocale[locale], [locale]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setCurrentSlide(0);
    setDirection(1);
  }, [locale]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % rewardSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [rewardSlides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide],
  );

  const goToPrevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + rewardSlides.length) % rewardSlides.length);
  }, [rewardSlides.length]);

  const goToNextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % rewardSlides.length);
  }, [rewardSlides.length]);

  const badges = placeBadges[locale];
  const shortStatuses = cardStatuses[locale];
  const rows = tr.table.rows;

  return (
    <section
      id="rewards"
      className="relative overflow-hidden bg-transparent text-slate-950 pt-20 pb-20 md:pt-28 md:pb-28 xl:pt-32 xl:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            className="label"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: easeStandard }}
          >
            {t(tr.kicker, locale)}
          </motion.div>

          <motion.h2
            className="mx-auto mt-6 max-w-5xl heading-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: easeStandard }}
          >
            {t(tr.title, locale)}
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-4xl body-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: easeStandard }}
          >
            {t(tr.subtitle, locale)}
          </motion.p>
        </div>
      </div>

      <RewardStage
        locale={locale}
        slides={rewardSlides}
        currentSlide={currentSlide}
        direction={direction}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
        onGoTo={goToSlide}
      />

      <div className="mx-auto mt-10 w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.14, ease: easeStandard }}
          >
            <motion.a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className="gradient-btn inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(37,99,235,0.18)] transition-opacity hover:opacity-95"
            >
              {locale === "en" ? "Apply Now" : "Оставить заявку"}
            </motion.a>
          </motion.div>
        </div>

        <div className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {rows.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: easeStandard,
                }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <RewardPrizeCard
                  status={shortStatuses[idx]}
                  amount={t(row.grant, locale)}
                  badge={badges[idx]}
                  theme={medalThemes[idx]}
                  featured={idx === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-[920px] text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeStandard }}
        >
          <p className="body-sm tracking-wide">
            {t(tr.disclaimer, locale)}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RewardsSection;
