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
    <section id="download" className="section-padding" ref={ref}>
      <div className="content-max text-center">
        <motion.h2
          className="heading-xl text-foreground mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {t(translations.download.headline1, locale)}
          <br />
          <span className="gradient-text">{t(translations.download.headline2, locale)}</span>
        </motion.h2>

        <motion.p
          className="body-text max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t(translations.download.body, locale)}
        </motion.p>

        <motion.div
          className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="beta-access"
            className="gradient-btn w-full max-w-full rounded px-6 py-4 text-center text-sm font-semibold tracking-[0.1em] uppercase text-foreground transition-opacity hover:opacity-90 [overflow-wrap:anywhere] sm:w-auto sm:max-w-none sm:px-10"
          >
            {t(translations.download.ios, locale)}
          </a>
          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="beta-access"
            className="w-full max-w-full rounded border border-border px-6 py-4 text-center text-sm font-semibold tracking-[0.1em] uppercase text-foreground transition-colors hover:bg-secondary [overflow-wrap:anywhere] sm:w-auto sm:max-w-none sm:px-10"
          >
            {t(translations.download.android, locale)}
          </a>
        </motion.div>

        <motion.p
          className="body-text text-muted-foreground text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t(translations.download.betaNote, locale)}
        </motion.p>
      </div>
    </section>
  );
};

export default DownloadSection;
