import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";

type LegalDocumentType = "privacy" | "cookies" | "agreement";

type LegalCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  statusTitle: string;
  statusBody: string;
  operatorLabel: string;
  operatorName: string;
  siteLabel: string;
  siteValue: string;
  noteTitle: string;
  noteBody: string;
};

const copy: Record<LegalDocumentType, { en: LegalCopy; ru: LegalCopy }> = {
  privacy: {
    en: {
      eyebrow: "Legal information",
      title: "Privacy Policy",
      subtitle: "Personal data processing policy for the FixAct Sport platform.",
      statusTitle: "Document update in progress",
      statusBody:
        "The legal document is being updated for the FixAct Sport platform. The previous document has been removed from the live website to avoid incorrect brand and legal references.",
      operatorLabel: "Operator",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Website",
      siteValue: "fixactsport.org",
      noteTitle: "Availability",
      noteBody:
        "The updated document will be published here as a readable page and, where applicable, as a downloadable PDF after final legal review.",
    },
    ru: {
      eyebrow: "Правовая информация",
      title: "Политика конфиденциальности",
      subtitle: "Политика обработки персональных данных платформы ФиксАкт Спорт.",
      statusTitle: "Документ обновляется",
      statusBody:
        "Юридический документ обновляется для платформы ФиксАкт Спорт. Предыдущий документ удалён с сайта, чтобы исключить некорректные брендовые и правовые ссылки.",
      operatorLabel: "Оператор",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Сайт",
      siteValue: "fixactsport.org",
      noteTitle: "Публикация",
      noteBody:
        "Обновлённый документ будет размещён здесь в читаемом виде и, при необходимости, в формате PDF после финальной юридической проверки.",
    },
  },
  cookies: {
    en: {
      eyebrow: "Legal information",
      title: "Cookie Policy",
      subtitle: "Information about cookies and similar technologies on the FixAct Sport website.",
      statusTitle: "Document update in progress",
      statusBody:
        "The cookie policy is being updated for the FixAct Sport platform. The previous document has been removed from the live website.",
      operatorLabel: "Operator",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Website",
      siteValue: "fixactsport.org",
      noteTitle: "Availability",
      noteBody:
        "The updated cookie policy will be published here after final review.",
    },
    ru: {
      eyebrow: "Правовая информация",
      title: "Политика Cookie",
      subtitle: "Информация о файлах cookie и аналогичных технологиях на сайте ФиксАкт Спорт.",
      statusTitle: "Документ обновляется",
      statusBody:
        "Политика Cookie обновляется для платформы ФиксАкт Спорт. Предыдущий документ удалён с сайта.",
      operatorLabel: "Оператор",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Сайт",
      siteValue: "fixactsport.org",
      noteTitle: "Публикация",
      noteBody:
        "Обновлённая политика Cookie будет размещена здесь после финальной проверки.",
    },
  },
  agreement: {
    en: {
      eyebrow: "Legal information",
      title: "User Agreement",
      subtitle: "Terms of use for the FixAct Sport platform.",
      statusTitle: "Document update in progress",
      statusBody:
        "The user agreement is being updated for the FixAct Sport platform. The previous document has been removed from the live website.",
      operatorLabel: "Operator",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Website",
      siteValue: "fixactsport.org",
      noteTitle: "Availability",
      noteBody:
        "The updated user agreement will be published here after final legal review.",
    },
    ru: {
      eyebrow: "Правовая информация",
      title: "Пользовательское соглашение",
      subtitle: "Условия использования платформы ФиксАкт Спорт.",
      statusTitle: "Документ обновляется",
      statusBody:
        "Пользовательское соглашение обновляется для платформы ФиксАкт Спорт. Предыдущий документ удалён с сайта.",
      operatorLabel: "Оператор",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Сайт",
      siteValue: "fixactsport.org",
      noteTitle: "Публикация",
      noteBody:
        "Обновлённое пользовательское соглашение будет размещено здесь после финальной юридической проверки.",
    },
  },
};

interface LegalDocumentPageProps {
  type: LegalDocumentType;
}

export default function LegalDocumentPage({ type }: LegalDocumentPageProps) {
  const locale = useLanguage();
  const lang = locale === "ru" ? "ru" : "en";
  const text = copy[type][lang];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navigation />

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-20 pt-28 sm:px-6 md:pt-32">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {text.eyebrow}
            </p>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              {text.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              {text.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-5 md:p-7">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                {text.statusTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                {text.statusBody}
              </p>
            </section>

            <aside className="rounded-[24px] border border-slate-200 bg-white p-5 md:p-7">
              <dl className="space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {text.operatorLabel}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-slate-950">
                    {text.operatorName}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {text.siteLabel}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-slate-950">
                    {text.siteValue}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5 md:p-7">
            <h2 className="text-lg font-bold tracking-tight text-slate-950">
              {text.noteTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
              {text.noteBody}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

