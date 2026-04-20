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

const normalizeStepTitle = (value: string, locale: string) => {
  if (locale === "ru" && value === "ЭКСПЕРТНЫЙ КОНТРОЛЬ") {
    return "ЭКСПЕРТНАЯ ПРОВЕРКА";
  }

  if (locale === "en" && value === "EXPERT CONTROL") {
    return "EXPERT VERIFICATION";
  }

  return value;
};

const normalizeComparisonBody = (value: string, locale: string) => {
  if (locale === "ru") {
    return value.replace("Без мнений. Только цифры.", "Без случайностей. Понятная система.");
  }

  return value.replace("No opinions. Just numbers.", "No randomness. A clear system.");
};

const normalizeMeasuredItems = (items: string[], locale: string) => {
  const trimmed = items.map((item) => item.trim()).filter(Boolean);

  return trimmed.slice(0, 3).map((item) => {
    if (locale === "ru") {
      if (item === "проверка достоверности видеоматериалов") {
        return "Достоверность видеоматериала";
      }

      if (item === "оценка сертифицированными специалистами") {
        return "Проверка специалистами";
      }

      if (item === "исключение монтажа, ускорения и вмешательств") {
        return "Исключение вмешательств";
      }
    }

    if (locale === "en") {
      if (item === "verification of video authenticity") {
        return "Video authenticity";
      }

      if (item === "assessment by certified specialists") {
        return "Expert review";
      }

      if (item === "exclusion of editing, speed changes, and interference") {
        return "No edits or interference";
      }
    }

    return item;
  });
};

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
        const rawTitle = tx(item.title);
        const rawDetailTitle = tx(item.details.title);
        const rawBullets = item.details.bullets.map((bullet) => tx(bullet)).filter(Boolean);

        return {
          id: item.id,
          number: item.number,
          title: normalizeStepTitle(rawTitle, locale),
          short: tx(item.short),
          detailTitle: normalizeStepTitle(rawDetailTitle, locale),
          description: tx(item.details.description),
          bullets: normalizeMeasuredItems(rawBullets, locale),
          footer: tx(
            ("footer" in item.details ? item.details.footer : undefined) as LocaleText | undefined,
          ),
        };
      }),
    [locale, system],
  );

  const comparison = {
    title: tx(system.comparison.title),
    body: normalizeComparisonBody(tx(system.comparison.body), locale),
  };

  const activeStep = flow[activeIndex] ?? flow[0];

  return (
    <section
      id="system"
      className="overflow-hidden bg-white text-black pt-20 pb-16 md:pt-28 md:pb-24 xl:pt-32 xl:pb-28"
    >
      <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-20">
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
            className="mx-auto mt-7 max-w-3xl body-lg text-slate-700"
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

            const activeCardClass = accessibilityMode
              ? "border-slate-300 bg-white text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              : "border-slate-200 bg-[linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.96),rgba(30,64,175,0.84))] text-white shadow-[0_28px_80px_rgba(15,23,42,0.14)]";

            return (
              <motion.button
                key={step.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                transition={cardTransition}
                whileHover={{ y: -4, scale: 1.008 }}
                whileTap={{ y: 0, scale: 0.996 }}
                className={`group relative overflow-hidden rounded-[30px] border p-5 text-left transition-all duration-300 md:p-6 xl:p-7 ${
                  isActive
                    ? activeCardClass
                    : "border-slate-200 bg-white text-slate-950 shadow-[0_14px_40px_rgba(15,23,42,0.05)] hover:border-slate-300 hover:shadow-[0_20px_56px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 ${
                    accessibilityMode
                      ? "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),rgba(255,255,255,0)_46%)]"
                      : isActive
                        ? "bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.22),rgba(15,23,42,0)_44%)]"
                        : "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),rgba(255,255,255,0)_46%)]"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        accessibilityMode
                          ? "text-slate-400"
                          : isActive
                            ? "text-white/55"
                            : "text-slate-400"
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
                      } ${
                        isActive
                          ? "opacity-100"
                          : "opacity-60 md:opacity-0 md:group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  <h3
                    className={`mt-4 text-[1.35rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[1.55rem] ${
                      accessibilityMode
                        ? "text-slate-950"
                        : isActive
                          ? "text-white"
                          : "text-slate-950"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-relaxed md:text-[0.98rem] ${
                      accessibilityMode
                        ? "text-slate-600"
                        : isActive
                          ? "text-white/72"
                          : "text-slate-600"
                    }`}
                  >
                    {step.short}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10">
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),rgba(255,255,255,0)_34%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(248,250,252,0.92))] xl:block" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${locale}-${activeStep.id}`}
                initial={{ opacity: 0, y: 18, scale: 0.988 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.988 }}
                transition={stageTransition}
                className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)] xl:gap-8 xl:p-10 2xl:p-12"
              >
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {activeStep.number}
                    </div>

                    <motion.div
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.18, ease: easeFast }}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs"
                    >
                      {locale === "en" ? "System detail" : "Детализация системы"}
                    </motion.div>
                  </div>

<div className="mt-10 max-w-[820px] xl:mt-14 xl:ml-6 2xl:ml-10">
  <h3
    className="max-w-[10ch] text-[4.15rem] font-extrabold leading-[0.84] tracking-[-0.055em] md:text-[5.35rem] xl:text-[6.4rem]"
  >
    <span className="gradient-text">{activeStep.detailTitle}</span>
  </h3>

  <p
    className="mt-8 max-w-[24ch] text-[1.32rem] font-semibold leading-[1.08] text-slate-950 md:text-[1.55rem] xl:text-[1.72rem]"
  >
    {activeStep.short}
  </p>

  <p
    className="mt-5 max-w-[34ch] text-[1.08rem] leading-[1.65] text-slate-600 md:text-[1.16rem] xl:text-[1.22rem]"
  >
    {activeStep.description}
  </p>
</div>

                  {activeStep.footer ? (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.34, delay: 0.08, ease: easeStandard }}
                      className="mt-8 max-w-[46ch] rounded-[24px] border border-slate-200 bg-white px-5 py-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)] md:px-6"
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
                    className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5 md:p-6 xl:p-7"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs">
                      {locale === "en" ? "What is measured" : "Что учитывается"}
                    </div>

                    <div className="mt-5 grid gap-3.5">
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
                          className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-white px-4 py-4"
                        >
                          <div className="min-w-[2rem] text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            {String(idx + 1).padStart(2, "0")}
                          </div>

                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-950">
                              {bullet}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: 0.05, ease: easeStandard }}
                    className={`mt-5 rounded-[28px] border border-slate-200 p-5 text-slate-950 md:p-6 xl:p-7 ${
                      accessibilityMode
                        ? "bg-white shadow-[0_12px_34px_rgba(15,23,42,0.04)]"
                        : "bg-[linear-gradient(135deg,rgba(15,23,42,0.04),rgba(59,130,246,0.06))] shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                    }`}
                  >
                    <h4 className="text-[1.35rem] font-semibold leading-[1.04] tracking-[-0.03em] text-slate-950 md:text-[1.6rem]">
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