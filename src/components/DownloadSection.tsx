import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { BETA_FORM_URL } from "@/lib/constants";

const DownloadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const locale = useLanguage();

  return (
    <section id="download" className="section-padding bg-[#F8FAFC]" ref={ref}>
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <motion.h2
            className="text-4xl font-semibold leading-[0.92] tracking-tight text-slate-950 md:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t(translations.download.headline1, locale)}
            <br />
            <span className="gradient-text">{t(translations.download.headline2, locale)}</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-[1.35rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t(translations.download.body, locale)}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              className="gradient-btn inline-flex w-full max-w-full items-center justify-center rounded px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:max-w-none sm:px-10"
            >
              {t(translations.download.ios, locale)}
            </a>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              className="inline-flex w-full max-w-full items-center justify-center rounded border border-slate-300 bg-white px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] text-slate-800 transition-colors hover:bg-slate-50 sm:w-auto sm:max-w-none sm:px-10"
            >
              {t(translations.download.android, locale)}
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t(translations.download.betaNote, locale)}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;