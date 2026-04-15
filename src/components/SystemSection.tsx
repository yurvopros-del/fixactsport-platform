import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

type LocaleText = { en: string; ru: string };

type DetailBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] };

const stageTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

const cardTransition = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1] as const,
};

const splitDetailBlocks = (text: string): DetailBlock[] => {
  if (!text.trim()) return [];

  const sections = text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const blocks: DetailBlock[] = [];

  for (const section of sections) {
    const lines = section
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const bulletLines = lines.filter((line) => line.startsWith("—"));
    const nonBulletLines = lines.filter((line) => !line.startsWith("—"));

    if (bulletLines.length > 0) {
      const title = nonBulletLines.length > 0 ? nonBulletLines.join(" ") : undefined;
      blocks.push({
        type: "list",
        title,
        items: bulletLines.map((line) => line.replace(/^—\s*/, "").trim()),
      });
      continue;
    }

    blocks.push({
      type: "paragraph",
      text: lines.join(" "),
    });
  }

  return blocks;
};

const SystemSection = () => {
  const locale = useLanguage();

  const tx = (value?: LocaleText | null) => {
    if (!value) return "";
    return t(value, locale);
  };

  const system = translations.system as typeof translations.system;

  const flow = useMemo(
    () =>
      system.flow.map((item) => ({
        id: item.id,
        number: item.number,
        title: tx(item.title),
        short: tx(item.short),
        detailTitle: tx(item.details.title),
        description: tx(item.details.description),
        bullets: item.details.bullets.map((bullet) => tx(bullet)).filter(Boolean),
        footer: tx(("footer" in item.details ? item.details.footer : undefined) as LocaleText | undefined),
      })),
    [locale, system],
  );

  const comparison = {
    title: tx(system.comparison.title),
    body: tx(system.comparison.body),
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = flow[activeIndex] ?? flow[0];
  const detailBlocks = useMemo(
    () => splitDetailBlocks(activeStep.description),
    [activeStep.description],
  );

  return (
    <section id="system" className="section-padding overflow-hidden bg-white text-black">
      <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-500 md:text-base">
            {tx(system.label)}
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.92] tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
            {tx(system.title)}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
            {tx(system.hook)}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5 xl:gap-6">
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
                whileHover={{ y: -4, scale: 1.01 }}
                className={`group rounded-[28px] border p-5 text-left transition-all duration-300 md:p-6 xl:p-7 ${
                  isActive
                    ? "border-slate-300 bg-slate-50 shadow-[0_22px_60px_rgba(15,23,42,0.10)]"
                    : "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400">
                    {step.number}
                  </div>

                  <div
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                        : "bg-slate-300"
                    }`}
                  />
                </div>

                <h3 className="mt-4 text-[1.55rem] font-semibold leading-[1.02] text-slate-950 md:text-[1.75rem] xl:text-[2rem]">
                  <span className="gradient-text">{step.title}</span>
                </h3>

                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  {step.short}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10">
          <div className="relative rounded-[34px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)]">
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),rgba(255,255,255,0)_38%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${locale}-${activeStep.id}`}
                initial={{ opacity: 0, y: 18, scale: 0.988 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.988 }}
                transition={stageTransition}
                className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] xl:gap-10 xl:p-10 2xl:p-12"
              >
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-5">
                    <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400 md:text-base">
                      {activeStep.number}
                    </div>

                    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs">
                      {locale === "en" ? "System detail" : "Детализация системы"}
                    </div>
                  </div>

                  <h3 className="mt-6 max-w-[18ch] text-[2rem] font-semibold leading-[0.94] tracking-tight text-slate-950 md:text-[2.5rem] xl:text-[3rem]">
                    <span className="gradient-text">{activeStep.detailTitle}</span>
                  </h3>

                  <div className="mt-8 space-y-5">
                    {detailBlocks.map((block, index) => {
                      if (block.type === "paragraph") {
                        return (
                          <div
                            key={`paragraph-${index}`}
                            className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 md:px-6"
                          >
                            <p className="text-base leading-relaxed text-slate-700 md:text-lg xl:text-[1.18rem]">
                              {block.text}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`list-${index}`}
                          className="rounded-[26px] border border-slate-200 bg-white px-5 py-5 shadow-[0_12px_36px_rgba(15,23,42,0.05)] md:px-6"
                        >
                          {block.title ? (
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-xs">
                              {block.title}
                            </div>
                          ) : null}

                          <ul className={`${block.title ? "mt-4" : ""} grid gap-3`}>
                            {block.items.map((item, itemIndex) => (
                              <motion.li
                                key={itemIndex}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 * itemIndex, duration: 0.24 }}
                                className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-base leading-relaxed text-slate-900 md:text-lg"
                              >
                                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {activeStep.footer ? (
                    <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 md:px-6">
                      <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                        {activeStep.footer}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 md:p-6 xl:p-7">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-xs">
                      {locale === "en" ? "What is measured" : "Что учитывается"}
                    </div>

                    <ul className="mt-5 grid gap-4">
                      {activeStep.bullets.map((bullet, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.28 }}
                          className="flex items-start gap-4 rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-base leading-relaxed text-slate-900 md:text-lg"
                        >
                          <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] md:p-6 xl:p-7">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-xs">
                      {locale === "en" ? "Why it matters" : "Почему это важно"}
                    </div>

                    <h4 className="mt-4 text-xl font-semibold leading-tight text-slate-950 md:text-[1.5rem]">
                      <span className="gradient-text">{comparison.title}</span>
                    </h4>

                    <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-700 md:text-lg">
                      {comparison.body}
                    </p>
                  </div>
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