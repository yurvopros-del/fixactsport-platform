import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const PartnersSection = () => {
  const locale = useLanguage();
  const tr = translations.rewards;

  return (
    <section id="partners" className="bg-white py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-center">
          <div>
            <div className="label text-slate-500">
              {locale === "en" ? "Coaches and clubs" : "Тренерам и клубам"}
            </div>
            <h2 className="mt-6 heading-lg">{t(tr.b2b.title, locale)}</h2>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
            <div className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
              {t(tr.b2b.badge, locale)}
            </div>
            <p className="mt-6 body-lg text-slate-700">{t(tr.b2b.body, locale)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
