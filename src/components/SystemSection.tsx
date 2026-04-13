import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

type LocaleText = { en: string; ru: string };

type SystemCard = {
  number: string;
  title: string;
  bullets: string[];
  intro: string;
  outro: string;
};

const stageTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

const sideCardTransition = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1] as const,
};

const SystemSection = () => {
  const locale = useLanguage();

  const tx = (value?: LocaleText | null) => {
    if (!value) return "";
    return t(value, locale);
  };

  const system = translations.system;
  const steps = system.steps;
  const pool = system.pool;

  const cards = useMemo<SystemCard[]>(
    () => [
      {
        number: steps[0]?.number ?? "01",
        title: tx(steps[0]?.title),
        bullets: (steps[0]?.bullets ?? []).map((bullet) => tx(bullet)).filter(Boolean),
        intro: tx((steps[0] as { description?: LocaleText })?.description),
        outro: tx((steps[0] as { footer?: LocaleText })?.footer),
      },
      {
        number: steps[1]?.number ?? "02",
        title: tx(steps[1]?.title),
        bullets: (steps[1]?.bullets ?? []).map((bullet) => tx(bullet)).filter(Boolean),
        intro: tx((steps[1] as { description?: LocaleText })?.description),
        outro: tx((steps[1] as { footer?: LocaleText })?.footer),
      },
      {
        number: steps[2]?.number ?? "03",
        title: tx(steps[2]?.title),
        bullets: (steps[2]?.bullets ?? []).map((bullet) => tx(bullet)).filter(Boolean),
        intro: tx((steps[2] as { description?: LocaleText })?.description),
        outro: tx((steps[2] as { footer?: LocaleText })?.footer),
      },
      {
        number: "04",
        title: tx(pool?.title),
        bullets: (pool?.bullets ?? []).map((bullet) => tx(bullet)).filter(Boolean),
        intro: tx((pool as { body?: LocaleText })?.body),
        outro: tx((pool as { footer?: LocaleText })?.footer),
      },
    ],
    [locale],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = cards[activeIndex] ?? cards[0];

  return (
    <section id="system" className="section-padding overflow-hidden bg-white text-black">
      <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-500 md:text-base">
            {tx(system.label)}
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.92] tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
            {tx(system.title)}
          </h2>
        </div>

        <div className="mt-12 space-y-6 md:mt-14 xl:hidden">
          {cards.map((card) => (
            <div
              key={card.number}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:p-8"
            >
              <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400 md:text-base">
                {card.number}
              </div>

              <h3 className="mt-4 text-2xl font-semibold leading-[1.02] text-slate-950 md:text-4xl">
                <span className="gradient-text">{card.title}</span>
              </h3>

              {card.intro ? (
                <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg">
                  {card.intro}
                </p>
              ) : null}

              {card.bullets.length > 0 ? (
                <ul className="mt-6 space-y-4">
                  {card.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 text-base leading-relaxed text-slate-900 md:text-lg"
                    >
                      <span className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {card.outro ? (
                <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
                  {card.outro}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-16 hidden xl:grid xl:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.7fr)_minmax(300px,0.9fr)] xl:gap-8 2xl:gap-10">
          <div className="flex flex-col gap-6">
            {[0, 1].map((index) => {
              const card = cards[index];
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={card.number}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  transition={sideCardTransition}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`group rounded-[30px] border p-7 text-left transition-all duration-300 ${
                    isActive
                      ? "border-slate-300 bg-slate-50 shadow-[0_20px_56px_rgba(15,23,42,0.10)]"
                      : "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400">
                      {card.number}
                    </div>

                    <div
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                        isActive
                          ? "border-slate-300 bg-white text-slate-600"
                          : "border-slate-200 bg-slate-50 text-slate-400"
                      }`}
                    >
                      {locale === "en" ? "Focus" : "Фокус"}
                    </div>
                  </div>

                  <div className="mt-5 text-[1.75rem] font-semibold leading-[1.02] text-slate-950">
                    <span className="gradient-text">{card.title}</span>
                  </div>

                  {card.bullets[0] ? (
                    <p className="mt-5 text-lg leading-relaxed text-slate-700">
                      {card.bullets[0]}
                    </p>
                  ) : null}

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {locale === "en" ? "Inspect" : "Подробнее"}
                    </div>

                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]" : "bg-slate-300"
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="relative min-h-[790px]">
            <div className="absolute inset-0 rounded-[38px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),rgba(255,255,255,0)_38%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={`${locale}-${activeCard.number}`}
                initial={{ opacity: 0, y: 18, scale: 0.988 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.988 }}
                transition={stageTransition}
                className="relative flex h-full flex-col rounded-[38px] border border-slate-200 bg-white p-10 shadow-[0_34px_100px_rgba(15,23,42,0.10)] 2xl:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="text-base font-semibold tracking-[0.24em] uppercase text-slate-400">
                    {activeCard.number}
                  </div>

                  <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {locale === "en" ? "Center inspection" : "Центральный блок"}
                  </div>
                </div>

                <h3 className="mt-6 max-w-[18ch] text-[2.65rem] font-semibold leading-[0.94] tracking-tight text-slate-950 2xl:text-[3.1rem]">
                  <span className="gradient-text">{activeCard.title}</span>
                </h3>

                {activeCard.intro ? (
                  <p className="mt-8 max-w-[52rem] text-xl leading-relaxed text-slate-700 2xl:text-[1.35rem]">
                    {activeCard.intro}
                  </p>
                ) : null}

                {activeCard.bullets.length > 0 ? (
                  <ul className="mt-10 grid gap-5">
                    {activeCard.bullets.map((bullet, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx, duration: 0.28 }}
                        className="flex items-start gap-5 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 text-xl leading-relaxed text-slate-900 2xl:text-[1.28rem]"
                      >
                        <span className="mt-[0.72rem] h-2.5 w-2.5 shrink-0 rounded-full bg-slate-950" />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : null}

                {activeCard.outro ? (
                  <p className="mt-10 max-w-[52rem] text-lg leading-relaxed text-slate-600 2xl:text-[1.2rem]">
                    {activeCard.outro}
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-6">
            {[2, 3].map((index) => {
              const card = cards[index];
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={card.number}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  transition={sideCardTransition}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`group rounded-[30px] border p-7 text-left transition-all duration-300 ${
                    isActive
                      ? "border-slate-300 bg-slate-50 shadow-[0_20px_56px_rgba(15,23,42,0.10)]"
                      : "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400">
                      {card.number}
                    </div>

                    <div
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                        isActive
                          ? "border-slate-300 bg-white text-slate-600"
                          : "border-slate-200 bg-slate-50 text-slate-400"
                      }`}
                    >
                      {locale === "en" ? "Focus" : "Фокус"}
                    </div>
                  </div>

                  <div className="mt-5 text-[1.75rem] font-semibold leading-[1.02] text-slate-950">
                    <span className="gradient-text">{card.title}</span>
                  </div>

                  {card.bullets[0] ? (
                    <p className="mt-5 text-lg leading-relaxed text-slate-700">
                      {card.bullets[0]}
                    </p>
                  ) : null}

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {locale === "en" ? "Inspect" : "Подробнее"}
                    </div>

                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]" : "bg-slate-300"
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemSection;