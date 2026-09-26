import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const easeStandard = [0.22, 1, 0.36, 1] as const;

const RewardsSection = () => {
  const locale = useLanguage();
  const tr = translations.rewards;

  return (
    <section
      id="rewards"
      className="relative scroll-mt-24 overflow-hidden bg-transparent py-20 text-slate-950 md:py-28 xl:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            className="label"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: easeStandard }}
          >
            {t(tr.kicker, locale)}
          </motion.div>
          <motion.h2
            className="mx-auto mt-6 max-w-5xl heading-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: easeStandard }}
          >
            {t(tr.title, locale)}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-4xl body-lg text-slate-700"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: easeStandard }}
          >
            {t(tr.subtitle, locale)}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tr.facts.map((fact, index) => (
            <motion.article
              key={fact.title.en}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_38px_rgba(15,23,42,0.05)]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: easeStandard }}
            >
              <h3 className="text-lg font-black tracking-tight text-slate-950">
                {t(fact.title, locale)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-650">
                {t(fact.body, locale)}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
          <div className="hidden grid-cols-[0.7fr_0.8fr_2.4fr_0.9fr] gap-4 border-b border-slate-200 bg-slate-950 px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-white md:grid">
            {tr.table.headers.map((header) => (
              <div key={header.en}>{t(header, locale)}</div>
            ))}
          </div>
          <div className="divide-y divide-slate-200">
            {tr.table.rows.map((row) => (
              <article
                key={row.cohort.en}
                className="grid gap-3 px-5 py-6 md:grid-cols-[0.7fr_0.8fr_2.4fr_0.9fr] md:items-center md:gap-4 md:px-6"
              >
                {[
                  { header: tr.table.headers[0], value: row.cohort, className: "text-lg font-black text-slate-950" },
                  { header: tr.table.headers[1], value: row.ranks, className: "font-bold text-slate-900" },
                  { header: tr.table.headers[2], value: row.amounts, className: "text-sm leading-6 text-slate-700" },
                  { header: tr.table.headers[3], value: row.envelope, className: "font-black text-emerald-700" },
                ].map((cell) => (
                  <div key={cell.header.en}>
                    <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 md:hidden">
                      {t(cell.header, locale)}
                    </div>
                    <div className={`mt-1 md:mt-0 ${cell.className}`}>
                      {t(cell.value, locale)}
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[tr.ranking, tr.residency, tr.payoutStatus, tr.disclaimer].map((notice) => (
            <p
              key={notice.en}
              className="rounded-[22px] border border-slate-200 bg-[#F8FAFC] p-5 text-sm leading-6 text-slate-700"
            >
              {t(notice, locale)}
            </p>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/attestation"
            className="gradient-btn inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-95"
          >
            {locale === "en" ? "Service and participation terms" : "Услуга и условия участия"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
