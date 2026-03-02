import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import podiumImg from "@/assets/podium.png";

const AllocationSection = () => {
  const locale = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const a = translations.allocation;
  const tiers = a.tiers.slice(0, 4);

  return (
    <section ref={ref} className="bg-black bg-grid-overlay py-24 md:py-32 lg:py-40">
      <div className="content-max text-center">
        {/* Kicker */}
        <motion.div
          className="text-xs tracking-[0.1em] uppercase text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          {t(a.kicker, locale)}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-foreground"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
        >
          {t(a.title, locale)}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-base md:text-lg mx-auto max-w-[720px] text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18, ease: "linear" }}
        >
          {t(a.subtitle, locale)}
        </motion.p>

        {/* Podium image */}
        <motion.div
          className="mt-12 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: "linear" }}
        >
          <img
            src={podiumImg}
            alt="FixAct Sport podium"
            className="w-full max-w-[1100px] h-auto"
            loading="lazy"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          className="mt-12 md:mt-16 max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease: "linear" }}
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-[10px] uppercase tracking-[0.15em] font-medium text-muted-foreground">
                  {t(a.tableHeaders.status, locale)}
                </th>
                <th className="pb-3 text-[10px] uppercase tracking-[0.15em] font-medium text-muted-foreground text-right">
                  {t(a.tableHeaders.grant, locale)}
                </th>
                <th className="pb-3 text-[10px] uppercase tracking-[0.15em] font-medium text-muted-foreground pl-8">
                  {t(a.tableHeaders.benefit, locale)}
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-4 text-sm text-secondary-foreground">
                    {t(tier.title, locale)}
                  </td>
                  <td className="py-4 text-sm font-bold text-foreground text-right tabular-nums">
                    {t(tier.amount, locale)}
                  </td>
                  <td className="py-4 text-sm text-secondary-foreground pl-8">
                    {t(tier.descriptor, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* B2B block */}
        <motion.div
          className="mt-12 md:mt-16 max-w-[720px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.42, ease: "linear" }}
        >
          <h3 className="text-lg md:text-xl font-bold text-foreground">
            {t(a.b2bTitle, locale)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t(a.b2bBody, locale)}
          </p>

          {/* 20% badge */}
          <div className="mt-6 flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-black text-xl text-foreground"
              style={{
                background: "linear-gradient(135deg, #B8860B, #DAA520)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              20%
            </div>
          </div>
        </motion.div>

        {/* Voluntary */}
        <motion.p
          className="mt-12 md:mt-16 max-w-[720px] mx-auto text-sm leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.48, ease: "linear" }}
        >
          {t(a.voluntary, locale)}
        </motion.p>

        {/* Advantages */}
        <motion.div
          className="mt-10 max-w-[720px] mx-auto text-left"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.52, ease: "linear" }}
        >
          <h3 className="text-base font-bold text-foreground mb-4">
            {t(a.advantagesTitle, locale)}
          </h3>
          <ul className="space-y-2">
            {a.advantagesBullets.map((bullet, i) => (
              <li key={i} className="text-sm leading-relaxed text-muted-foreground flex gap-2">
                <span className="text-muted-foreground/60 select-none">•</span>
                <span>{t(bullet, locale)}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="mt-12 text-[11px] tracking-[0.03em] text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: "linear" }}
        >
          {t(a.disclaimer, locale)}
        </motion.p>
      </div>
    </section>
  );
};

export default AllocationSection;
