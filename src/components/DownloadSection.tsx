import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { BETA_FORM_URL } from "@/lib/constants";

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

const DownloadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const locale = useLanguage();

  const bodyLines = t(translations.download.body, locale)
    .split("\n")
    .filter(Boolean);

  return (
    <section
      id="download"
      ref={ref}
      className="relative overflow-hidden bg-[#F8FAFC] pt-20 pb-20 md:pt-28 md:pb-28 xl:pt-32 xl:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="content-max">
                <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-slate-950 md:text-6xl md:leading-[0.92] xl:text-7xl xl:leading-[0.92]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeStandard }}
          >
            {t(translations.download.headline1, locale)}
            {t(translations.download.headline2, locale)?.trim() ? (
              <>
                <br />
                <span className="gradient-text">
                  {t(translations.download.headline2, locale)}
                </span>
              </>
            ) : null}
          </motion.h2>

          <motion.div
            className="mt-6 space-y-1 heading-sm text-slate-800"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: easeStandard }}
          >
            {bodyLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.18 + idx * 0.06,
                  ease: easeStandard,
                }}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-center gap-4 md:mt-10 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: easeStandard }}
          >
            <motion.a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className="gradient-btn inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(37,99,235,0.18)] transition-opacity hover:opacity-95 sm:w-auto sm:px-10"
            >
              {t(translations.download.ios, locale)}
            </motion.a>

            <motion.a
              href="#system"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 shadow-[0_10px_26px_rgba(15,23,42,0.06)] transition-colors hover:bg-slate-50 sm:w-auto sm:px-10"
            >
              {locale === "en" ? "How it works" : "Как это работает"}
            </motion.a>
          </motion.div>

          {t(translations.download.betaNote, locale)?.trim() ? (
            <motion.p
              className="mt-6 body-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.34, ease: easeStandard }}
            >
              {t(translations.download.betaNote, locale)}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;