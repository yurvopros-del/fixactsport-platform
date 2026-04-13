import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const PhilosophySection = () => {
  const locale = useLanguage();
  const tr = translations.philosophy;

  return (
    <section className="section-padding bg-[#F8FAFC] text-slate-950">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 md:text-base">
            {locale === "en" ? "Positioning" : "Позиционирование"}
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.92] tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
            <span className="gradient-text">{t(tr.headline1, locale)}</span>
          </h2>

          <h3 className="mx-auto mt-5 max-w-5xl text-2xl font-semibold leading-[1.04] text-slate-950 md:text-4xl xl:text-5xl">
            {t(tr.headline2, locale)}
          </h3>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-[1.35rem]">
            {t(tr.body, locale)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;