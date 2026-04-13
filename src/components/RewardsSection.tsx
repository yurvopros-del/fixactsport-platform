import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

import reward1Ru from "@/Reward slider/Avif/1.avif";
import reward2Ru from "@/Reward slider/Avif/2.avif";
import reward3Ru from "@/Reward slider/Avif/3.avif";
import reward4Ru from "@/Reward slider/Avif/4.avif";
import reward5Ru from "@/Reward slider/Avif/5.avif";

import reward1En from "@/Reward slider/Avif/1en.avif";
import reward2En from "@/Reward slider/Avif/2en.avif";
import reward3En from "@/Reward slider/Avif/3en.avif";
import reward4En from "@/Reward slider/Avif/4en.avif";
import reward5En from "@/Reward slider/Avif/5en.avif";

const REWARD_SLIDES_RU = [reward1Ru, reward2Ru, reward3Ru, reward4Ru, reward5Ru];
const REWARD_SLIDES_EN = [reward1En, reward2En, reward3En, reward4En, reward5En];

const REWARD_ROWS = {
  ru: [
    {
      status: "Победитель сезона 2026 (1 место)",
      grant: "50 000 ₽",
    },
    {
      status: "Второе место в сезоне 2026 (2 место)",
      grant: "25 000 ₽",
    },
    {
      status: "Третье место в сезоне 2026 (3 место)",
      grant: "10 000 ₽",
    },
    {
      status: "Финалисты сезона (4–50 места)",
      grant: "5 000 ₽",
    },
  ],
  en: [
    {
      status: "Season 2026 winner (1st place)",
      grant: "50,000 ₽",
    },
    {
      status: "Second place in Season 2026 (2nd place)",
      grant: "25,000 ₽",
    },
    {
      status: "Third place in Season 2026 (3rd place)",
      grant: "10,000 ₽",
    },
    {
      status: "Season finalists (places 4–50)",
      grant: "5,000 ₽",
    },
  ],
} as const;

const REWARD_TABLE_HEADERS = {
  ru: {
    status: "Статус в рейтинге",
    grant: "Размер гранта",
  },
  en: {
    status: "Ranking status",
    grant: "Grant amount",
  },
} as const;

const B2B_COPY = {
  ru: {
    title: "Информация для партнерских организаций (B2B):",
    body:
      "Партнерское вознаграждение: Футбольные клубы и академии получают 20% от стоимости каждой проведенной аттестации своих воспитанников. Данные средства направляются на развитие материально-технической базы клуба.",
    kicker: "20%",
  },
  en: {
    title: "Information for partner organizations (B2B):",
    body:
      "Partner reward: Football clubs and academies receive 20% of the cost of each completed attestation of their players. These funds are directed to the development of the club’s material and technical base.",
    kicker: "20%",
  },
} as const;

const slideTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

const RewardsSection = () => {
  const locale = useLanguage();
  const tr = translations.rewards;

  const rewardSlides = useMemo(
    () => (locale === "en" ? REWARD_SLIDES_EN : REWARD_SLIDES_RU),
    [locale],
  );

  const rewardRows = locale === "en" ? REWARD_ROWS.en : REWARD_ROWS.ru;
  const tableHeaders = locale === "en" ? REWARD_TABLE_HEADERS.en : REWARD_TABLE_HEADERS.ru;
  const b2bCopy = locale === "en" ? B2B_COPY.en : B2B_COPY.ru;

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

  const currentImage = rewardSlides[currentSlide];

  return (
    <section
      id="rewards"
      className="section-padding overflow-hidden bg-[#F8FAFC] text-slate-950"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-500 md:text-base">
            {t(tr.kicker, locale)}
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.92] tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
            {t(tr.title, locale)}
          </h2>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-xl">
            {t(tr.subtitle, locale)}
          </p>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative w-full overflow-hidden bg-slate-950 shadow-[0_34px_120px_rgba(15,23,42,0.22)]">
          <div className="relative h-[280px] w-full md:h-[400px] xl:h-[500px] 2xl:h-[560px]">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={`bg-${locale}-${currentSlide}`}
                custom={direction}
                initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.85 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.85 }}
                transition={slideTransition}
                className="absolute inset-0"
              >
                <img
                  src={currentImage}
                  alt=""
                  decoding="async"
                  loading="eager"
                  className="h-full w-full scale-110 object-cover object-center blur-2xl opacity-55"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_44%,rgba(2,6,23,0.32)_100%)]" />
            <div className="pointer-events-none absolute inset-0 z-[6] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-24 bg-gradient-to-b from-black/18 to-transparent md:h-32" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-24 bg-gradient-to-t from-black/22 to-transparent md:h-32" />

            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={`main-${locale}-${currentSlide}`}
                custom={direction}
                initial={{ x: direction > 0 ? "100%" : "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: direction > 0 ? "-100%" : "100%" }}
                transition={slideTransition}
                className="absolute inset-0 z-10"
              >
                <img
                  src={currentImage}
                  alt=""
                  decoding="async"
                  loading="eager"
                  className="h-full w-full object-contain object-center"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={goToPrevSlide}
              aria-label={locale === "en" ? "Previous reward slide" : "Предыдущий слайд грантов"}
              className="group absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 md:left-6 md:inline-flex xl:left-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/6 text-[40px] font-light text-white/45 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white/12 group-hover:text-white">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label={locale === "en" ? "Next reward slide" : "Следующий слайд грантов"}
              className="group absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 md:right-6 md:inline-flex xl:right-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/6 text-[40px] font-light text-white/45 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white/12 group-hover:text-white">
                ›
              </span>
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-6">
              {rewardSlides.map((_, idx) => (
                <button
                  key={`${locale}-dot-${idx}`}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`${locale === "en" ? "Go to reward slide" : "Перейти к слайду грантов"} ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "w-10 bg-white shadow-[0_0_20px_rgba(255,255,255,0.45)]"
                      : "w-2.5 bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-[1600px] px-6 md:px-10 xl:px-16">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.9fr)]">
          <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8 xl:p-10">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {locale === "en" ? "Season support structure" : "Структура сезонной поддержки"}
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-950 md:text-[1.3rem]">
                  {locale === "en"
                    ? "Clear grant distribution by final seasonal position"
                    : "Понятное распределение грантов по итоговой позиции в сезоне"}
                </div>
              </div>

              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:inline-flex">
                {locale === "en" ? "Season 2026" : "Сезон 2026"}
              </div>
            </div>

            <div className="mt-6 hidden grid-cols-[minmax(0,1.8fr)_minmax(180px,0.7fr)] gap-8 md:grid">
              <div className="text-base font-semibold tracking-wide text-slate-500">
                {tableHeaders.status}
              </div>
              <div className="text-base font-semibold tracking-wide text-slate-500">
                {tableHeaders.grant}
              </div>
            </div>

            <div className="mt-2">
              {rewardRows.map((row, idx) => (
                <div
                  key={idx}
                  className="group border-b border-slate-200 last:border-b-0"
                >
                  <div className="grid gap-4 py-6 transition-colors duration-200 md:grid-cols-[minmax(0,1.8fr)_minmax(180px,0.7fr)] md:items-center md:gap-8 group-hover:bg-slate-50/65">
                    <div className="rounded-2xl px-0 md:px-3 md:py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:hidden">
                        {tableHeaders.status}
                      </div>
                      <div className="mt-1 text-base font-medium leading-relaxed text-slate-950 md:mt-0 md:text-[1.2rem]">
                        {row.status}
                      </div>
                    </div>

                    <div className="rounded-2xl px-0 md:px-3 md:py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:hidden">
                        {tableHeaders.grant}
                      </div>
                      <div className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold leading-relaxed text-slate-950 md:mt-0 md:text-[1.15rem]">
                        {row.grant}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[26px] border border-slate-200 bg-slate-50 p-5 md:p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                {locale === "en" ? "Program note" : "Примечание по программе"}
              </div>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                {t(tr.voluntary, locale)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8 xl:p-10">
              <div className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                    <div className="text-2xl font-extrabold leading-none text-cyan-300">
                      {b2bCopy.kicker}
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {locale === "en" ? "Partner economics" : "Экономика партнера"}
                  </div>
                  <div className="mt-3 text-xl font-semibold leading-snug text-slate-950 md:text-[1.45rem]">
                    {b2bCopy.title}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                    {b2bCopy.body}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8 xl:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                {locale === "en" ? "Why it matters" : "Почему это важно"}
              </div>

              <div className="mt-4 grid gap-4">
                {tr.advantages.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 text-base leading-relaxed text-slate-700 md:text-lg"
                  >
                    {t(bullet, locale)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm tracking-wide text-slate-500">
          {t(tr.disclaimer, locale)}
        </p>
      </div>
    </section>
  );
};

export default RewardsSection;