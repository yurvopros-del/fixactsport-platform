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
      eyebrow: "Compliance information",
      title: "Privacy Policy",
      subtitle: "Personal data processing policy for the FixAct Sport platform.",
      statusTitle: "Document under legal review",
      statusBody:
        "This page is reserved for the current FixAct Sport privacy document. The previous text was removed from the live website to avoid outdated brand or legal references while the updated version is finalized.",
      operatorLabel: "Operator",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Website",
      siteValue: "fixactsport.org",
      noteTitle: "Publication status",
      noteBody:
        "The updated privacy policy will be published here after final legal review, in readable form and, where applicable, as a downloadable PDF.",
    },
    ru: {
      eyebrow: "Информация о комплаенсе",
      title: "Политика конфиденциальности",
      subtitle: "Политика обработки персональных данных платформы ФиксАкт Спорт.",
      statusTitle: "Документ проходит юридическую проверку",
      statusBody:
        "Эта страница зарезервирована для актуального документа ФиксАкт Спорт о конфиденциальности. Предыдущий текст удалён с сайта, чтобы исключить устаревшие брендовые или правовые ссылки до публикации обновлённой версии.",
      operatorLabel: "Оператор",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Сайт",
      siteValue: "fixactsport.org",
      noteTitle: "Статус публикации",
      noteBody:
        "Обновлённая политика конфиденциальности будет размещена здесь после финальной юридической проверки: в читаемом виде и, при необходимости, в формате PDF.",
    },
  },
  cookies: {
    en: {
      eyebrow: "Compliance information",
      title: "Cookie Policy",
      subtitle: "Information about cookies and similar technologies on the FixAct Sport website.",
      statusTitle: "Document under legal review",
      statusBody:
        "This page is reserved for the current FixAct Sport cookie policy. The previous text was removed from the live website while the updated version is finalized.",
      operatorLabel: "Operator",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Website",
      siteValue: "fixactsport.org",
      noteTitle: "Publication status",
      noteBody:
        "The updated cookie policy will be published here after final review, with factual information about cookies and similar technologies used on the website.",
    },
    ru: {
      eyebrow: "Информация о комплаенсе",
      title: "Политика Cookie",
      subtitle: "Информация о файлах cookie и аналогичных технологиях на сайте ФиксАкт Спорт.",
      statusTitle: "Документ проходит юридическую проверку",
      statusBody:
        "Эта страница зарезервирована для актуальной политики Cookie ФиксАкт Спорт. Предыдущий текст удалён с сайта до публикации обновлённой версии.",
      operatorLabel: "Оператор",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Сайт",
      siteValue: "fixactsport.org",
      noteTitle: "Статус публикации",
      noteBody:
        "Обновлённая политика Cookie будет размещена здесь после финальной проверки с фактической информацией о cookie и аналогичных технологиях сайта.",
    },
  },
  agreement: {
    en: {
      eyebrow: "Compliance information",
      title: "User Agreement",
      subtitle: "Terms of use for the FixAct Sport platform.",
      statusTitle: "Document under legal review",
      statusBody:
        "This page is reserved for the current FixAct Sport user agreement. The previous text was removed from the live website while the updated version is finalized.",
      operatorLabel: "Operator",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Website",
      siteValue: "fixactsport.org",
      noteTitle: "Publication status",
      noteBody:
        "The updated user agreement will be published here after final legal review, so platform terms are shown in one current and readable place.",
    },
    ru: {
      eyebrow: "Информация о комплаенсе",
      title: "Пользовательское соглашение",
      subtitle: "Условия использования платформы ФиксАкт Спорт.",
      statusTitle: "Документ проходит юридическую проверку",
      statusBody:
        "Эта страница зарезервирована для актуального пользовательского соглашения ФиксАкт Спорт. Предыдущий текст удалён с сайта до публикации обновлённой версии.",
      operatorLabel: "Оператор",
      operatorName: "ООО «ЦТ Эталон»",
      siteLabel: "Сайт",
      siteValue: "fixactsport.org",
      noteTitle: "Статус публикации",
      noteBody:
        "Обновлённое пользовательское соглашение будет размещено здесь после финальной юридической проверки, чтобы условия платформы были доступны в одном актуальном и читаемом месте.",
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

