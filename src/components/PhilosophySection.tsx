import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const easeStandard = [0.22, 1, 0.36, 1] as const;

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
      <div className="content-max">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            className="label"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: easeStandard }}
          >
            {t(tr.headline1, locale)}
          </motion.div>

          <motion.h2
            className="mx-auto mt-6 max-w-4xl heading-lg"
            initial={{ opacity: 0, y: 34 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.05, ease: easeStandard }}
          >
            {t(tr.headline2, locale)}
          </motion.h2>

          <motion.div
            className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-slate-700 md:text-lg xl:text-[1.18rem]"
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.14, ease: easeStandard }}
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