import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { BETA_FORM_URL } from "@/lib/constants";
import contactSnowLeopard from "@/assets/contact/contact-snow-leopard.png";

const copy = {
  ru: {
    kicker: "Контакт по сезону 2026",
    title: "Выберите следующий шаг",
    body: "Оставьте заявку, если хотите участвовать, уточнить маршрут для игрока или обсудить интерес клуба, академии либо партнёра. После обращения мы направим к подходящему следующему шагу.",
    cta: "Подать заявку",
    proofTitle: "После обращения",
    proofItems: [
      {
        title: "Для игрока или семьи",
        body: "Можно уточнить участие, возрастную группу, город и практический маршрут перед следующим действием.",
      },
      {
        title: "Для клуба или академии",
        body: "Можно обозначить интерес к сигналам участников, проверенным результатам или партнёрскому разговору.",
      },
      {
        title: "Подходящий маршрут",
        body: "Ответ подскажет, что актуально именно вам: заявка на участие, условия сезона или разговор о партнёрстве.",
      },
    ],
    footnote: "Один контакт для заявки, вопроса об участии или партнёрского интереса.",
  },
  en: {
    kicker: "Season 2026 contact",
    title: "Choose the next step",
    body: "Leave a request if you want to participate, ask about an athlete route, or discuss club, academy, or partner interest. After contact, we point you to the relevant next step.",
    cta: "Leave a request",
    proofTitle: "After you reach out",
    proofItems: [
      {
        title: "For a player or family",
        body: "You can clarify participation, age group, city, and the practical route before moving forward.",
      },
      {
        title: "For a club or academy",
        body: "You can raise interest in participant signals, reviewed results, or a partner conversation.",
      },
      {
        title: "Relevant next route",
        body: "The reply points to what fits your case: participation request, season terms, or a partner discussion.",
      },
    ],
    footnote: "One contact point for participation requests, athlete questions, and partner interest.",
  },
} as const;

const ContactsSection = () => {
  const locale = useLanguage();
  const content = locale === "en" ? copy.en : copy.ru;

  return (
    <section
      id="contacts"
      className="relative scroll-mt-[118px] overflow-hidden border-t border-slate-200/80 bg-[linear-gradient(180deg,#EEF3F8_0%,#F8FAFC_34%,#FFFFFF_100%)] py-20 md:scroll-mt-[112px] md:py-28 xl:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.18),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-[70vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,224,198,0.12),rgba(0,224,198,0)_68%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(15,23,42,0.03),rgba(15,23,42,0)_76%)]" />

      <div className="content-max relative">
        <div className="mb-8 flex items-center gap-4 md:mb-10">
          <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.14))]" />
          <div className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_8px_20px_rgba(15,23,42,0.03)]">
            {locale === "en" ? "Final step" : "Финальный шаг"}
          </div>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(15,23,42,0.14),transparent)]" />
        </div>

        <div className="relative overflow-visible rounded-[28px] border border-slate-200/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)] md:rounded-[34px] md:shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-[28px] bg-[linear-gradient(90deg,#00E0C6,#605BFF,#B45CFF)] md:rounded-t-[34px]" />
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,224,198,0.055),rgba(0,224,198,0)_76%)]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(96,91,255,0.04),rgba(96,91,255,0)_78%)]" />

          <div className="relative grid gap-9 p-5 sm:p-6 md:p-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-center xl:gap-12 xl:p-14">
            <div className="max-w-[560px]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 md:text-sm md:tracking-[0.22em]">
                {content.kicker}
              </div>

              <h2 className="mt-4 max-w-[620px] text-[34px] font-semibold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-[40px] md:text-5xl xl:text-[56px] xl:leading-[0.94]">
                {content.title}
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base md:text-lg">
                {content.body}
              </p>

              <div className="mt-7 md:mt-8">
                <a
                  href={BETA_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="beta-access"
                  className="inline-flex w-full max-w-full items-center justify-center gap-3 rounded border border-slate-950 bg-slate-950 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)] transition-colors hover:bg-slate-800 sm:w-auto sm:px-8"
                >
                  {content.cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                {content.footnote}
              </p>
            </div>

            <div className="relative xl:min-h-[500px]">
              <div className="relative z-10 rounded-[24px] border border-slate-200/60 bg-slate-50/72 p-4 sm:p-5 md:rounded-[28px] md:p-6 xl:mt-[72px] xl:max-w-[610px] xl:pr-[238px]">
                <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-sm">
                  {content.proofTitle}
                </div>

                <div className="space-y-3">
                  {content.proofItems.map((item) => (
                    <div
                      key={item.title}
                      className="grid grid-cols-[22px_1fr] gap-3 rounded-[20px] border border-slate-200/65 bg-white/96 p-4 shadow-[0_6px_18px_rgba(15,23,42,0.02)] sm:grid-cols-[24px_1fr] sm:gap-4"
                    >
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-[hsl(var(--gradient-mid))]"
                        size={20}
                        aria-hidden="true"
                      />

                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold leading-snug text-slate-950 sm:text-base">
                          {item.title}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute left-[304px] top-[72px] z-[19] hidden h-[2px] w-[132px] rounded-full bg-[linear-gradient(90deg,rgba(203,213,225,0),rgba(100,116,139,0.34),rgba(203,213,225,0.14))] xl:block 2xl:left-[326px]" />
              <div className="pointer-events-none absolute left-[304px] top-[73px] z-[18] hidden h-[12px] w-[132px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.05),rgba(15,23,42,0)_74%)] xl:block 2xl:left-[326px]" />

              <img
                src={contactSnowLeopard}
                alt=""
                aria-hidden="true"
                decoding="async"
                loading="lazy"
                className="pointer-events-none absolute left-[208px] top-[-138px] z-20 hidden h-[690px] w-auto max-w-none object-contain xl:block 2xl:left-[220px] 2xl:top-[-150px] 2xl:h-[735px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
