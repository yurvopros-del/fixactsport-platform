import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import podiumAvif from "@/assets/podium.avif";

const RewardsSection = () => {
  const locale = useLanguage();
  const tr = translations.rewards;

  return (
    <section id="rewards" className="section-padding bg-surface">
      <div className="content-max">
        <div className="text-center">
          <div className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            {t(tr.kicker, locale)}
          </div>

          <h2 className="heading-lg mt-4">{t(tr.title, locale)}</h2>

          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t(tr.subtitle, locale)}
          </p>
        </div>

        <div className="mt-8 md:mt-10 flex justify-center">
          <div className="w-full max-w-[900px]">
            <div className="w-full aspect-[16/10] rounded-2xl bg-[#0f0f0f] border border-border overflow-hidden flex items-center justify-center">
              <img
                src={podiumAvif}
                alt=""
                decoding="async"
                loading="lazy"
                className="block w-full h-full object-contain"
                />
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {tr.table.headers.map((h, idx) => (
                    <th
                      key={idx}
                      className="text-left py-4 pr-4 text-xs md:text-sm font-semibold tracking-wide text-muted-foreground"
                    >
                      {t(h, locale)}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
               {tr.table.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx === tr.table.rows.length - 1 ? "" : "border-b border-border"}
                >
                  <td className="py-5 pr-4 text-sm md:text-[1.05rem] font-medium text-foreground">
                    {t(row.status, locale)}
                  </td>
                  <td className="py-5 pr-4 text-sm md:text-[1.05rem] text-foreground">
                     {t(row.grant, locale)}
                  </td>
                  <td className="py-5 pr-4 text-sm md:text-[1.05rem] text-foreground/80">
                    {t(row.benefit, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 md:mt-12 rounded-2xl bg-[#0f0f0f] border border-border p-6 md:p-8">
          <div className="flex items-start gap-5">
            <div className="shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0f0f0f] border-2 border-[#00E0C6] flex items-center justify-center">
                <div className="text-[#00E0C6] font-extrabold text-lg md:text-xl leading-none">
                  {t(tr.b2b.badge, locale)}
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="text-sm md:text-base font-semibold text-foreground">
                {t(tr.b2b.title, locale)}
              </div>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(tr.b2b.body, locale)}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm md:text-base text-muted-foreground leading-relaxed max-w-4xl">
          <trim>{t(tr.voluntary, locale)}</trim>
        </p>

        <div className="mt-10">
          <div className="text-sm md:text-base font-semibold text-foreground">
            {t(tr.advantages.title, locale)}
          </div>
          <ul className="mt-4 space-y-3">
            {tr.advantages.bullets.map((b, idx) => (
              <li key={idx} className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {t(b, locale)}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-muted-foreground tracking-wide">
          {t(tr.disclaimer, locale)}
        </p>
      </div>
    </section>
  );
};

export default RewardsSection;
