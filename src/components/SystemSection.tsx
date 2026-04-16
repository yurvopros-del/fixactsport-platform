import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

type LocaleText = { en: string; ru: string };

type DetailBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] };

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
        footer: tx(
          ("footer" in item.details ? item.details.footer : undefined) as LocaleText | undefined,
        ),
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
    <section
      id="system"
      className="overflow-hidden bg-white text-black pt-20 pb-20 md:pt-28 md:pb-28 xl:pt-32 xl:pb-32"
    >
      <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="label"
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
            className="mx-auto mt-8 max-w-3xl body-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: easeStandard }}
          >
            {tx(system.hook)}
          </motion.p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6 xl:gap-6">
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
                whileTap={{ y: 0, scale: 0.995 }}
                className={`group rounded-[28px] border p-5 text-left transition-all duration-300 md:p-6 xl:p-7 ${
                  isActive
                    ? "border-slate-300 bg-slate-50 shadow-[0_22px_60px_rgba(15,23,42,0.10)]"
                    : "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_20px_54px_rgba(15,23,42,0.09)]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="label text-slate-400">{step.number}</div>
                </div>

                <h3 className="mt-3 heading-sm">
                  <span className="gradient-text">{step.title}</span>
                </h3>

                <p className="mt-3 body-md text-slate-700">{step.short}</p>
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
                    <div className="label text-slate-400">{activeStep.number}</div>

                    <motion.div
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.18, ease: easeFast }}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs"
                    >
                      {locale === "en" ? "System detail" : "Детализация системы"}
                    </motion.div>
                  </div>

                  <h3 className="mt-5 max-w-[18ch] heading-md leading-[0.94]">
                    <span className="gradient-text">{activeStep.detailTitle}</span>
                  </h3>

                  <div className="mt-6 space-y-4">
                    {detailBlocks.map((block, index) => {
                      if (block.type === "paragraph") {
                        return (
                          <motion.div
                            key={`paragraph-${index}`}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: index * 0.04,
                              ease: easeStandard,
                            }}
                            whileHover={{ y: -2 }}
                            className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 transition-colors duration-200 hover:bg-slate-100 md:px-6"
                          >
                            <p className="body-md text-slate-700 md:text-lg xl:text-[1.18rem]">
                              {block.text}
                            </p>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={`list-${index}`}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.04,
                            ease: easeStandard,
                          }}
                          whileHover={{ y: -2 }}
                          className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 transition-colors duration-200 hover:bg-slate-100 md:px-6"
                        >
                          {block.title ? (
                            <p className="body-md font-semibold text-slate-900">{block.title}</p>
                          ) : null}

                          <ul className={`${block.title ? "mt-4" : ""} grid gap-3`}>
                            {block.items.map((item, itemIndex) => (
                              <motion.li
                                key={itemIndex}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.04 * itemIndex,
                                  duration: 0.24,
                                  ease: easeStandard,
                                }}
                                whileHover={{ y: -2 }}
                                className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-white px-4 py-4 body-md text-slate-900 transition-colors duration-200 hover:bg-slate-50 md:text-lg"
                              >
                                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>

                  {activeStep.footer ? (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.34, delay: 0.08, ease: easeStandard }}
                      whileHover={{ y: -2 }}
                      className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 transition-colors duration-200 hover:bg-slate-100 md:px-6"
                    >
                      <p className="body-md text-slate-600 md:text-lg">{activeStep.footer}</p>
                    </motion.div>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, ease: easeStandard }}
                    whileHover={{ y: -3, scale: 1.004 }}
                    className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:p-6 xl:p-7"
                  >
                    <div className="label">
                      {locale === "en" ? "What is measured" : "Что учитывается"}
                    </div>

                    <ul className="mt-5 grid gap-4">
                      {activeStep.bullets.map((bullet, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.05 * idx,
                            duration: 0.28,
                            ease: easeStandard,
                          }}
                          whileHover={{ y: -2 }}
                          className="flex items-start gap-4 rounded-[22px] border border-slate-200 bg-white px-4 py-4 body-md text-slate-900 transition-colors duration-200 hover:bg-slate-50 md:text-lg"
                        >
                          <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: 0.05, ease: easeStandard }}
                    whileHover={{ y: -3, scale: 1.004 }}
                    className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.09)] md:p-6 xl:p-7"
                  >
                    <div className="label">
                      {locale === "en" ? "Why it matters" : "Почему это важно"}
                    </div>

                    <h4 className="mt-4 heading-sm">
                      <span className="gradient-text">{comparison.title}</span>
                    </h4>

                    <p className="mt-4 whitespace-pre-line body-md text-slate-700 md:text-lg">
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