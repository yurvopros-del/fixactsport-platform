import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { BETA_FORM_URL } from "@/lib/constants";

const copy = {
  ru: {
    kicker: "Заявка на сезон 2026",
    title: "Начните с заявки",
    body: "Оставьте заявку на участие в сезоне ФиксАкт Спорт. После этого вы получите следующий шаг: регистрация, оплата участия и прохождение аттестации.",
    cta: "Подать заявку",
    proofTitle: "Что будет дальше",
    proofItems: [
      {
        title: "Один маршрут",
        body: "Заявка ведёт к регистрации, оплате участия, аттестации и результату.",
      },
      {
        title: "Понятные условия",
        body: "Стоимость, порядок участия и дальнейшие действия фиксируются до прохождения.",
      },
      {
        title: "Для участников и организаций",
        body: "Форма подходит для участников, родителей, академий, клубов и партнёров.",
      },
    ],
    footnote: "Без лишней переписки: заявка, участие, результат.",
  },
  en: {
    kicker: "Season 2026 application",
    title: "Start with an application",
    body: "Apply to join the FixAct Sport season. After that, you receive the next step: registration, participation payment, and attestation.",
    cta: "Apply now",
    proofTitle: "What happens next",
    proofItems: [
      {
        title: "One route",
        body: "The application leads to registration, participation payment, attestation, and result.",
      },
      {
        title: "Clear terms",
        body: "Cost, participation order, and next steps are confirmed before completion.",
      },
      {
        title: "For participants and organizations",
        body: "The form is suitable for participants, parents, academies, clubs, and partners.",
      },
    ],
    footnote: "Less correspondence: application, participation, result.",
  },
} as const;

const ContactsSection = () => {
  const locale = useLanguage();
  const content = locale === "en" ? copy.en : copy.ru;

  return (
    <section
      id="contacts"
      className="relative overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,#EEF3F8_0%,#F8FAFC_34%,#FFFFFF_100%)] py-20 md:py-28 xl:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.22),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[70vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,224,198,0.16),rgba(0,224,198,0)_66%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(15,23,42,0.045),rgba(15,23,42,0)_72%)]" />

      <div className="content-max relative">
        <div className="mb-8 flex items-center gap-4 md:mb-10">
          <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.18))]" />
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
            {locale === "en" ? "Final step" : "Финальный шаг"}
          </div>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(15,23,42,0.18),transparent)]" />
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_34px_110px_rgba(15,23,42,0.10)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#00E0C6,#605BFF,#B45CFF)]" />
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,224,198,0.14),rgba(0,224,198,0)_68%)]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(96,91,255,0.09),rgba(96,91,255,0)_70%)]" />

          <div className="relative grid gap-10 p-6 md:grid-cols-[0.95fr_1.05fr] md:items-center md:p-10 xl:p-14">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 md:text-sm">
                {content.kicker}
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl xl:text-6xl">
                {content.title}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                {content.body}
              </p>

              <div className="mt-8">
                <a
                  href={BETA_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="beta-access"
                  className="inline-flex w-full max-w-full items-center justify-center gap-3 rounded border border-slate-950 bg-slate-950 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_28px_rgba(15,23,42,0.16)] transition-colors hover:bg-slate-800 sm:w-auto sm:px-8"
                >
                  {content.cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                {content.footnote}
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 md:p-6">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                {content.proofTitle}
              </div>

              <div className="space-y-3">
                {content.proofItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.035)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[hsl(var(--gradient-mid))]"
                      size={22}
                      aria-hidden="true"
                    />

                    <div className="min-w-0">
                      <div className="text-base font-semibold text-slate-950">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
