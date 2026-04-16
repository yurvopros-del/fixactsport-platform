import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { BETA_FORM_URL } from "@/lib/constants";
import RewardPrizeCard from "@/features/landing/rewards/components/RewardPrizeCard";
import RewardStage from "@/features/landing/rewards/components/RewardStage";
import {
  bridgeCopy,
  cardStatuses,
  medalThemes,
  placeBadges,
  rewardSlidesByLocale,
  type LandingLocale,
} from "@/features/landing/rewards/rewards.content";

const isAccessibilityModeEnabled = () =>
  document.documentElement.getAttribute("data-accessibility") === "high-visibility";

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

const RewardsSection = () => {
  const locale = useLanguage() as LandingLocale;
  const tr = translations.rewards;
  const copy = bridgeCopy[locale];

  const rewardSlides = useMemo(() => rewardSlidesByLocale[locale], [locale]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [accessibilityMode, setAccessibilityMode] = useState(isAccessibilityModeEnabled());

  useEffect(() => {
    const sync = () => {
      setAccessibilityMode(isAccessibilityModeEnabled());
    };

    window.addEventListener("fixact-accessibility-change", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("fixact-accessibility-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
    setDirection(1);
  }, [locale]);

  useEffect(() => {
    if (accessibilityMode) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % rewardSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [accessibilityMode, rewardSlides.length]);

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
      className="relative overflow-hidden bg-[#F8FAFC] text-slate-950 pt-20 pb-20 md:pt-28 md:pb-28 xl:pt-32 xl:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            className="label"
            initial={accessibilityMode ? false : { opacity: 0, y: 18 }}
            whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: accessibilityMode ? 0 : 0.45, ease: easeStandard }}
          >
            {t(tr.kicker, locale)}
          </motion.div>

          <motion.h2
            className="mx-auto mt-6 max-w-5xl heading-lg"
            initial={accessibilityMode ? false : { opacity: 0, y: 28 }}
            whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: accessibilityMode ? 0 : 0.7, delay: accessibilityMode ? 0 : 0.05, ease: easeStandard }}
          >
            {t(tr.title, locale)}
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-4xl body-lg"
            initial={accessibilityMode ? false : { opacity: 0, y: 24 }}
            whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: accessibilityMode ? 0 : 0.65, delay: accessibilityMode ? 0 : 0.12, ease: easeStandard }}
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
          {copy.title ? (
            <motion.h3
              className="mx-auto mt-6 max-w-3xl heading-md"
              initial={accessibilityMode ? false : { opacity: 0, y: 22 }}
              whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: accessibilityMode ? 0 : 0.6, ease: easeStandard }}
            >
              {copy.title}
            </motion.h3>
          ) : null}

          <motion.p
            className="mx-auto mt-8 max-w-2xl body-md"
            initial={accessibilityMode ? false : { opacity: 0, y: 22 }}
            whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: accessibilityMode ? 0 : 0.6, delay: accessibilityMode ? 0 : 0.08, ease: easeStandard }}
          >
            {copy.body}
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={accessibilityMode ? false : { opacity: 0, y: 18 }}
            whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: accessibilityMode ? 0 : 0.55, delay: accessibilityMode ? 0 : 0.14, ease: easeStandard }}
          >
            <motion.a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              whileHover={accessibilityMode ? undefined : { y: -2 }}
              whileTap={accessibilityMode ? undefined : { y: 0, scale: 0.99 }}
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
                initial={accessibilityMode ? false : { opacity: 0, y: 24 }}
                whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: accessibilityMode ? 0 : 0.5,
                  delay: accessibilityMode ? 0 : idx * 0.06,
                  ease: easeStandard,
                }}
                whileHover={accessibilityMode ? undefined : { y: -4, scale: 1.01 }}
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

          <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] xl:items-stretch">
            <motion.div
              initial={accessibilityMode ? false : { opacity: 0, y: 24 }}
              whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: accessibilityMode ? 0 : 0.55, ease: easeStandard }}
              whileHover={accessibilityMode ? undefined : { y: -3, scale: 1.004 }}
              className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_56px_rgba(15,23,42,0.09)] md:p-7 xl:p-8"
            >
              <div className="label">{copy.partnerLabel}</div>

              <div className="mt-5 flex items-start gap-4 md:gap-5">
                <div className="shrink-0">
                  <div className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                    {t(tr.b2b.badge, locale)}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="heading-sm text-slate-950">
                    {t(tr.b2b.title, locale)}
                  </div>

                  <p className="mt-4 max-w-[62ch] body-md">
                    {t(tr.b2b.body, locale)}
                  </p>
                </div>
              </div>

              <div className="mt-7 h-px w-full bg-slate-200" />

              <div className="mt-7 label">{copy.rulesLabel}</div>

              <p className="mt-4 max-w-[70ch] body-md">
                {t(tr.voluntary, locale)}
              </p>
            </motion.div>

            <motion.div
              initial={accessibilityMode ? false : { opacity: 0, y: 24 }}
              whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: accessibilityMode ? 0 : 0.55, delay: accessibilityMode ? 0 : 0.06, ease: easeStandard }}
              whileHover={accessibilityMode ? undefined : { y: -3, scale: 1.004 }}
              className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_56px_rgba(15,23,42,0.09)] md:p-7 xl:p-8"
            >
              <div className="label">{copy.whyLabel}</div>

              <div className="mt-5 grid gap-3">
                {tr.advantages.bullets.map((bullet, idx) => (
                  <motion.div
                    key={idx}
                    initial={accessibilityMode ? false : { opacity: 0, x: 10 }}
                    whileInView={accessibilityMode ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{
                      duration: accessibilityMode ? 0 : 0.38,
                      delay: accessibilityMode ? 0 : 0.12 + idx * 0.04,
                      ease: easeStandard,
                    }}
                    whileHover={accessibilityMode ? undefined : { y: -2 }}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 body-md text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                  >
                    {t(bullet, locale)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-[920px] text-center"
          initial={accessibilityMode ? false : { opacity: 0, y: 16 }}
          whileInView={accessibilityMode ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: accessibilityMode ? 0 : 0.5, ease: easeStandard }}
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