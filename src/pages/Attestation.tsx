import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";

const PAYMENT_RETURN_URL = "https://fixactsport.org/payment/return";

const content = {
  ru: {
    docTitle: "Услуга и стоимость — Официальная онлайн-аттестация FixAct Sport",
    eyebrow: "Услуга и стоимость",
    serviceName: "Официальная спортивная онлайн-аттестация FixAct Sport",
    subtitle:
      "Одна платная попытка официальной онлайн-аттестации футбольного навыка с проверкой результата. Единая услуга без корзины и каталога товаров.",
    priceLabel: "Стоимость участия",
    priceValue: "2 000 ₽",
    priceUnit: "за одну попытку",
    payCta: "Оплатить официальную аттестацию",
    payDisabledNote:
      "Оплата официальной аттестации выполняется в приложении FixAct Sport после подтверждения актуальных правил.",
    includesTitle: "Что входит в услугу",
    includes: [
      "Оплата одной попытки официальной онлайн-аттестации.",
      "Видеофиксация футбольного навыка по опубликованному заданию.",
      "Передача результата на проверку по единым правилам.",
      "Фиксация проверенного результата в системе FixAct Sport.",
    ],
    conditionsTitle: "Условия участия",
    conditions: [
      "Одна оплаченная попытка соответствует одной официальной аттестации.",
      "К участию в Public Reward Rules v1 допускаются совершеннолетние спортсмены 18+.",
      "Результат зависит от прохождения проверки по условиям задания.",
      "Правила проверки одинаковы для всех участников.",
      "Платёж является оплатой услуги, не является ставкой и не формирует призовой фонд.",
    ],
    payFlowTitle: "Как проходит оплата",
    payFlow: [
      "Пользователь нажимает «Оплатить официальную аттестацию».",
      "Платёж создаётся через ЮKassa.",
      "Пользователь переходит на защищённую страницу оплаты ЮKassa.",
      `После оплаты пользователь возвращается на ${PAYMENT_RETURN_URL}.`,
    ],
    pendingTitle: "Оплата в приложении",
    pendingBody:
      "Эта публичная страница описывает услугу и условия. Платёж создаётся только из приложения FixAct Sport после проверки активного соревнования и принятия закреплённой версии правил.",
    paymentTermsTitle: "Условия оплаты",
    paymentTerms: [
      "Стоимость услуги — 2 000 ₽ за одну попытку официальной онлайн-аттестации.",
      "Оплата производится онлайн через платёжного провайдера ЮKassa на защищённой странице оплаты.",
      "Доступ к попытке аттестации открывается после успешного завершения платежа.",
    ],
    refundTermsTitle: "Условия возврата",
    refundTerms: [
      "Если платёж не завершён, доступ к попытке аттестации не открывается, а списание средств не производится.",
      "При ошибочном или подлежащем возврату платеже возврат оформляется по правилам сервиса и платёжного провайдера ЮKassa.",
      "Запрос на возврат направляется через контакты оператора, указанные ниже.",
    ],
    termsTitle: "Пользовательские условия",
    termsBody:
      "Оплачивая услугу, пользователь соглашается с условиями официальной онлайн-аттестации и закреплёнными правилами соревнования. В одном раунде допускается до 500 уникальных участников; набор закрывается при принятии 500-го участника или через 365 календарных дней с опубликованной даты открытия — по более раннему событию. Услуга оказывается оператором на сайте fixactsport.org.",
    legalTitle: "Реквизиты оператора",
    legal: {
      operator: "ООО «ЦТТ «Эталон»",
      inn: "ИНН 1102081498",
      ogrn: "ОГРН 1191121001752",
      kpp: "КПП 771401001",
      site: "Сайт: fixactsport.org",
      contactLabel: "Контакт для обращений и возвратов:",
      contactValue: "Telegram @DjamalG",
      email: "admin@verdico.ru",
    },
    backHome: "На главную",
  },
  en: {
    docTitle: "Service & Price — FixAct Sport official online attestation",
    eyebrow: "Service & Price",
    serviceName: "FixAct Sport official sports online attestation",
    subtitle:
      "One paid attempt of the official online attestation of a football skill, with a reviewed result. A single service — no cart and no product catalog.",
    priceLabel: "Participation price",
    priceValue: "2 000 ₽",
    priceUnit: "per attempt",
    payCta: "Pay for the official attestation",
    payDisabledNote:
      "Payment for the official attestation is completed in the FixAct Sport app after the current rules are confirmed.",
    includesTitle: "What the service includes",
    includes: [
      "Payment for one attempt of the official online attestation.",
      "Video recording of a football skill for the published task.",
      "Submission of the result for review under shared rules.",
      "The reviewed result is recorded in the FixAct Sport system.",
    ],
    conditionsTitle: "Participation terms",
    conditions: [
      "One paid attempt equals one official attestation.",
      "Public Reward Rules v1 are open only to adult athletes aged 18+.",
      "The result depends on passing the review against the task conditions.",
      "Review rules are the same for every participant.",
      "The payment buys the service; it is not a stake and does not form a participant-funded prize pool.",
    ],
    payFlowTitle: "How payment works",
    payFlow: [
      "The user clicks “Pay for the official attestation”.",
      "The payment is created through YooKassa.",
      "The user is taken to the secure YooKassa payment page.",
      `After payment, the user returns to ${PAYMENT_RETURN_URL}.`,
    ],
    pendingTitle: "Payment in the app",
    pendingBody:
      "This public page describes the service and terms. A payment is created only from the FixAct Sport app after the active competition and its pinned rules version are confirmed.",
    paymentTermsTitle: "Payment terms",
    paymentTerms: [
      "The service price is 2 000 ₽ per attempt of the official online attestation.",
      "Payment is made online through the YooKassa provider on a secure payment page.",
      "Access to the attestation attempt opens after the payment is completed successfully.",
    ],
    refundTermsTitle: "Refund terms",
    refundTerms: [
      "If the payment is not completed, the attestation attempt does not open and no funds are charged.",
      "For an erroneous or refundable payment, the refund is processed under the rules of the service and the YooKassa provider.",
      "A refund request is sent through the operator contacts listed below.",
    ],
    termsTitle: "User terms",
    termsBody:
      "By paying for the service, the user accepts the official online attestation terms and the competition's pinned rules. A round accepts at most 500 unique eligible participants and closes at the earlier of the 500th accepted participant or 365 calendar days from the published opening date. The service is provided by the operator on fixactsport.org.",
    legalTitle: "Operator details",
    legal: {
      operator: "LLC «CTT «Etalon» (ООО «ЦТТ «Эталон»)",
      inn: "INN 1102081498",
      ogrn: "OGRN 1191121001752",
      kpp: "KPP 771401001",
      site: "Website: fixactsport.org",
      contactLabel: "Contact for requests and refunds:",
      contactValue: "Telegram @DjamalG",
      email: "admin@verdico.ru",
    },
    backHome: "Back home",
  },
} as const;

export default function Attestation() {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  useEffect(() => {
    const previous = document.title;
    document.title = copy.docTitle;
    return () => {
      document.title = previous;
    };
  }, [copy.docTitle]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navigation />

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-20 pt-28 sm:px-6 md:pt-32">
        {/* Hero: service + price + payment CTA */}
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            {copy.serviceName}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {copy.subtitle}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-6 md:p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {copy.priceLabel}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                  {copy.priceValue}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  {copy.priceUnit}
                </span>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-[52px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-300 px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white"
              >
                {copy.payCta}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {copy.payDisabledNote}
              </p>
            </div>
          </div>
        </section>

        {/* Includes + conditions */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">
              {copy.includesTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {copy.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700 md:text-base">
                  <CheckCircle2 className="mt-1 shrink-0 text-[hsl(var(--gradient-mid))]" size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">
              {copy.conditionsTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {copy.conditions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700 md:text-base">
                  <CheckCircle2 className="mt-1 shrink-0 text-[hsl(var(--gradient-mid))]" size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Payment flow */}
        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            {copy.payFlowTitle}
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.payFlow.map((step, index) => (
              <li
                key={step}
                className="rounded-[18px] border border-slate-200 bg-[#F8FAFC] p-4"
              >
                <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-800 md:text-base">
                  {step}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-amber-200 bg-amber-50 p-4">
            <ShieldCheck className="mt-0.5 shrink-0 text-amber-600" size={20} aria-hidden="true" />
            <div>
              <div className="text-sm font-bold text-slate-950">{copy.pendingTitle}</div>
              <p className="mt-1 text-sm leading-6 text-slate-700">{copy.pendingBody}</p>
            </div>
          </div>
        </section>

        {/* Payment + refund terms */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
            <h2 className="text-lg font-bold tracking-tight text-slate-950">
              {copy.paymentTermsTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {copy.paymentTerms.map((item) => (
                <li key={item} className="text-sm leading-7 text-slate-700 md:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
            <h2 className="text-lg font-bold tracking-tight text-slate-950">
              {copy.refundTermsTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {copy.refundTerms.map((item) => (
                <li key={item} className="text-sm leading-7 text-slate-700 md:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* User terms */}
        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
          <h2 className="text-lg font-bold tracking-tight text-slate-950">
            {copy.termsTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
            {copy.termsBody}
          </p>
        </section>

        {/* Legal / operator details */}
        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-6 md:p-7">
          <h2 className="text-lg font-bold tracking-tight text-slate-950">
            {copy.legalTitle}
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {locale === "en" ? "Operator" : "Оператор"}
              </dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">{copy.legal.operator}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {locale === "en" ? "Registration details" : "Регистрационные данные"}
              </dt>
              <dd className="mt-2 space-y-1 text-base font-semibold text-slate-950">
                <div>{copy.legal.inn}</div>
                <div>{copy.legal.ogrn}</div>
                <div>{copy.legal.kpp}</div>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {locale === "en" ? "Website" : "Сайт"}
              </dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">{copy.legal.site}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {copy.legal.contactLabel}
              </dt>
              <dd className="mt-2 space-y-1 text-base font-semibold text-slate-950">
                <div>
                  <a
                    href="mailto:admin@verdico.ru"
                    className="text-[hsl(var(--gradient-mid))] underline underline-offset-4"
                  >
                    {copy.legal.email}
                  </a>
                </div>
                <div>
                  <a
                    href="https://t.me/DjamalG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--gradient-mid))] underline underline-offset-4"
                  >
                    {copy.legal.contactValue}
                  </a>
                </div>
              </dd>
            </div>
          </dl>
        </section>

        <div className="mt-8">
          <Link
            to={locale === "ru" ? "/ru" : "/"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-slate-900"
          >
            ← {copy.backHome}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
