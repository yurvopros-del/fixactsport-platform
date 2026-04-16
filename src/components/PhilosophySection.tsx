import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const locale = useLanguage();

  const tr = translations.philosophy;

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative overflow-hidden bg-white pt-20 pb-20 md:pt-28 md:pb-28 xl:pt-32 xl:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="content-max">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="heading-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t(tr.headline1, locale)}
          </motion.h2>

          <motion.h3
            className="mt-5 heading-md text-slate-700"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t(tr.headline2, locale)}
          </motion.h3>

          <motion.div
            className="mx-auto mt-6 max-w-3xl space-y-4 body-lg"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t(tr.body, locale)
              .split("\n")
              .filter(Boolean)
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;