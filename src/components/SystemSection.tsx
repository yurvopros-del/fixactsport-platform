import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

type LocaleText = { en: string; ru: string };

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

const stageTransition = {
  duration: 0.34,
  ease: easeStandard,
};

const cardTransition = {
  duration: 0.24,
  ease: easeStandard,
};

const isAccessibilityModeEnabled = () =>
  document.documentElement.getAttribute("data-accessibility") === "high-visibility";

const SystemSection = () => {
  const locale = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [accessibilityMode, setAccessibilityMode] = useState(() =>
    isAccessibilityModeEnabled(),
  );

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

  const tx = (value?: LocaleText | null) => {
    if (!value) return "";
    return t(value, locale);
  };

  const system = translations.system as typeof translations.system;

  const flow = useMemo(
    () =>
      system.flow.map((item) => {
        const bullets = item.details.bullets
          .map((bullet) => tx(bullet))
          .filter(Boolean)
          .slice(0, 3);

        return {
          id: item.id,
          number: item.number,
          title: tx(item.title),
          short: tx(item.short),
          detailTitle: tx(item.details.title),
          description: tx(item.details.description),
          bullets,
          footer: tx(
            ("footer" in item.details ? item.details.footer : undefined) as
              | LocaleText
              | undefined,
          ),
        };
      }),
    [locale, system],
  );

  const comparisonSource = system.comparison[activeIndex] ?? system.comparison[0];

  const comparison = {
    eyebrow: tx(comparisonSource.eyebrow),
    title: tx(comparisonSource.title),
    body: tx(comparisonSource.body),
  };

  const activeStep = flow[activeIndex] ?? flow[0];

  return (
    <section
      id="system"
      className="relative overflow-hidden bg-white pt-20 pb-16 text-slate-950 md:pt-28 md:pb-24 xl:pt-32 xl:pb-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),rgba(59,130,246,0)_68%)] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="label text-slate-500"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: easeStandard }}
          >
            {tx(system.label)}
          </motion.div>

          <motion.h2
            className="mt-6 heading-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: easeStandard }}
          >
            {tx(system.title)}
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-3xl body-lg text-slate-700 md:mt-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: easeStandard }}
          >
            {tx(system.hook)}
          </motion.p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5 xl:gap-6">
          {flow.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={step.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                transition={cardTransition}
                whileHover={{ y: -3, scale: 1.004 }}
                whileTap={{ y: 0, scale: 0.996 }}
                className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 md:p-6 xl:p-7 ${
                  isActive
                    ? "border-slate-300 bg-white text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
                    : "border-slate-200 bg-white/86 text-slate-950 shadow-[0_12px_34px_rgba(15,23,42,0.045)] hover:border-slate-300 hover:bg-white hover:shadow-[0_18px_48px_rgba(15,23,42,0.075)]"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${
                    isActive
                      ? "bg-[linear-gradient(90deg,hsl(var(--gradient-start)),hsl(var(--gradient-mid)),hsl(var(--gradient-end)))]"
                      : "bg-slate-100"
                  }`}
                />

                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),rgba(255,255,255,0)_48%)]"
                      : "opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),rgba(255,255,255,0)_48%)]"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        isActive ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {step.number}
                    </div>

                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        index === 0
                          ? "bg-red-500"
                          : index === 1
                            ? "bg-yellow-400"
                            : "bg-green-500"
                      } ${isActive ? "opacity-100 scale-100" : "opacity-55 scale-90"}`}
                    />
                  </div>

                  <h3 className="mt-4 text-[1.28rem] font-semibold leading-[1.04] tracking-[-0.028em] text-slate-950 md:text-[1.42rem] xl:text-[1.5rem]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[0.98rem]">
                    {step.short}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10">
          <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_88px_rgba(15,23,42,0.075)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.065),rgba(255,255,255,0)_36%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] bg-[linear-gradient(180deg,rgba(248,250,252,0.92),rgba(248,250,252,0.78))] xl:block" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${locale}-${activeStep.id}`}
                initial={{ opacity: 0, y: 16, scale: 0.992 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.992 }}
                transition={stageTransition}
                className="relative grid gap-7 p-6 md:p-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] xl:gap-8 xl:p-10 2xl:p-12"
              >
                <div className="min-w-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {activeStep.number}
                    </div>

                    <motion.div
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.18, ease: easeFast }}
                      className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs"
                    >
                      {locale === "en" ? "System detail" : "Детализация системы"}
                    </motion.div>
                  </div>

                  <div className="mt-8 max-w-[780px] xl:mt-10 xl:ml-4 2xl:ml-6">
                    <h3 className="max-w-[13ch] text-[2.05rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[2.8rem] md:max-w-[14ch] md:text-[4.35rem] md:leading-[0.92] xl:text-[5rem]">
                      <span className={accessibilityMode ? "text-slate-950" : "gradient-text"}>
                        {activeStep.detailTitle}
                      </span>
                    </h3>

                    <p className="mt-6 max-w-[32ch] text-[1.12rem] font-semibold leading-[1.18] text-slate-950 md:mt-7 md:text-[1.38rem] xl:text-[1.48rem]">
                      {activeStep.short}
                    </p>

                    <p className="mt-5 max-w-[46ch] text-[1.02rem] leading-[1.68] text-slate-600 md:text-[1.1rem]">
                      {activeStep.description}
                    </p>
                  </div>

                  {activeStep.footer ? (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.34, delay: 0.08, ease: easeStandard }}
                      className="mt-7 max-w-[52ch] rounded-[22px] border border-slate-200 bg-slate-50/80 px-5 py-5 md:px-6"
                    >
                      <p className="text-sm leading-relaxed text-slate-600 md:text-[1rem]">
                        {activeStep.footer}
                      </p>
                    </motion.div>
                  ) : null}
                </div>

                <div className="min-w-0 xl:pl-2">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, ease: easeStandard }}
                    className="rounded-[26px] border border-slate-200 bg-slate-50/88 p-5 md:p-6 xl:p-7"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs">
                      {locale === "en" ? "What is measured" : "Что учитывается"}
                    </div>

                    <div className="mt-5 grid gap-3">
                      {activeStep.bullets.map((bullet, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.05 * idx,
                            duration: 0.28,
                            ease: easeStandard,
                          }}
                          className="flex items-start gap-4 rounded-[18px] border border-slate-200 bg-white px-4 py-4 shadow-[0_8px_22px_rgba(15,23,42,0.035)]"
                        >
                          <div className="min-w-[2rem] text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            {String(idx + 1).padStart(2, "0")}
                          </div>

                          <span className="text-sm font-medium leading-relaxed text-slate-950">
                            {bullet}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: 0.05, ease: easeStandard }}
                    className="mt-5 rounded-[26px] border border-slate-200 bg-white p-5 text-slate-950 shadow-[0_12px_34px_rgba(15,23,42,0.045)] md:p-6 xl:p-7"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs">
                      {comparison.eyebrow}
                    </div>

                    <h4 className="mt-4 text-[1.28rem] font-semibold leading-[1.08] tracking-[-0.028em] text-slate-950 md:text-[1.48rem]">
                      {comparison.title}
                    </h4>

                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 md:text-[0.98rem]">
                      {comparison.body}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemSection;

