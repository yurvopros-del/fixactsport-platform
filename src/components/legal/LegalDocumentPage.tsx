import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";

type LegalDocumentType = "privacy" | "cookies" | "agreement";

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalCopy = {
  docTitle: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

const OPERATOR = {
  ru: {
    label: "Реквизиты оператора",
    operatorLabel: "Оператор",
    operator: "ООО «ЦТТ «Эталон»",
    detailsLabel: "Регистрационные данные",
    details: ["ИНН 1102081498", "ОГРН 1191121001752", "КПП 771401001"],
    siteLabel: "Сайт",
    site: "fixactsport.org",
    contactLabel: "Контакт",
    email: "admin@verdico.ru",
    contactText: "Telegram @DjamalG",
  },
  en: {
    label: "Operator details",
    operatorLabel: "Operator",
    operator: "LLC «CTT «Etalon» (ООО «ЦТТ «Эталон»)",
    detailsLabel: "Registration details",
    details: ["INN 1102081498", "OGRN 1191121001752", "KPP 771401001"],
    siteLabel: "Website",
    site: "fixactsport.org",
    contactLabel: "Contact",
    email: "admin@verdico.ru",
    contactText: "Telegram @DjamalG",
  },
} as const;

const copy: Record<LegalDocumentType, { en: LegalCopy; ru: LegalCopy }> = {
  agreement: {
    ru: {
      docTitle: "Пользовательское соглашение — FixAct Sport",
      eyebrow: "Правовая информация",
      title: "Пользовательское соглашение",
      subtitle:
        "Условия использования платформы ФиксАкт Спорт и оказания услуги официальной спортивной онлайн-аттестации на сайте fixactsport.org.",
      sections: [
        {
          heading: "1. Общие положения",
          paragraphs: [
            "Настоящее соглашение регулирует использование сервиса ФиксАкт Спорт на сайте fixactsport.org и порядок оказания услуги официальной спортивной онлайн-аттестации. Услуга оказывается оператором, реквизиты которого указаны ниже.",
            "Используя сервис и оплачивая услугу, пользователь подтверждает, что ознакомился с условиями и принимает их.",
          ],
        },
        {
          heading: "2. Услуга и стоимость",
          bullets: [
            "Услуга: официальная спортивная онлайн-аттестация FixAct Sport.",
            "Стоимость: 2 000 ₽ за одну попытку.",
            "Это единая фиксированная услуга — без корзины и каталога товаров.",
          ],
        },
        {
          heading: "3. Что получает пользователь",
          bullets: [
            "После успешной оплаты пользователю открывается доступ к одной попытке официальной онлайн-аттестации.",
            "Пользователь выполняет опубликованное задание и проходит видеофиксацию футбольного навыка.",
            "Результат передаётся на проверку по единым правилам и зависит от прохождения этой проверки.",
          ],
        },
        {
          heading: "4. Оплата",
          bullets: [
            "Оплата производится онлайн через платёжного провайдера ЮKassa (приём платежей будет доступен после завершения подключения ЮKassa).",
            "Доступ к попытке аттестации открывается после успешного завершения платежа.",
            "Если платёж не завершён, доступ к попытке не открывается.",
          ],
        },
        {
          heading: "5. Возврат",
          bullets: [
            "При ошибочном или подлежащем возврату платеже возврат оформляется по правилам сервиса и процедуре платёжного провайдера ЮKassa.",
            "Запрос на возврат направляется через контакт оператора, указанный ниже.",
          ],
        },
      ],
    },
    en: {
      docTitle: "User Agreement — FixAct Sport",
      eyebrow: "Legal information",
      title: "User Agreement",
      subtitle:
        "Terms of use for the FixAct Sport platform and the official sports online attestation service on fixactsport.org.",
      sections: [
        {
          heading: "1. General",
          paragraphs: [
            "This agreement governs the use of the FixAct Sport service on fixactsport.org and the provision of the official sports online attestation service. The service is provided by the operator whose details are listed below.",
            "By using the service and paying for it, the user confirms that they have read and accept these terms.",
          ],
        },
        {
          heading: "2. Service and price",
          bullets: [
            "Service: FixAct Sport official sports online attestation.",
            "Price: 2 000 ₽ per attempt.",
            "This is a single fixed service — no cart and no product catalog.",
          ],
        },
        {
          heading: "3. What the user receives",
          bullets: [
            "After a successful payment, the user gets access to one attempt of the official online attestation.",
            "The user completes the published task and records a video of the football skill.",
            "The result is submitted for review under shared rules and depends on passing that review.",
          ],
        },
        {
          heading: "4. Payment",
          bullets: [
            "Payment is made online through the YooKassa provider (payment acceptance becomes available after the YooKassa connection is completed).",
            "Access to the attestation attempt opens after the payment is completed successfully.",
            "If the payment is not completed, the attempt does not open.",
          ],
        },
        {
          heading: "5. Refund",
          bullets: [
            "For an erroneous or refundable payment, the refund is processed under the rules of the service and the YooKassa provider procedure.",
            "A refund request is sent through the operator contact listed below.",
          ],
        },
      ],
    },
  },
  privacy: {
    ru: {
      docTitle: "Политика конфиденциальности — FixAct Sport",
      eyebrow: "Правовая информация",
      title: "Политика конфиденциальности",
      subtitle:
        "Как оператор обрабатывает персональные данные пользователей платформы ФиксАкт Спорт на сайте fixactsport.org.",
      sections: [
        {
          heading: "1. Общие положения",
          paragraphs: [
            "Оператор обрабатывает персональные данные пользователей в объёме, необходимом для оказания услуги официальной спортивной онлайн-аттестации и работы сервиса.",
          ],
        },
        {
          heading: "2. Какие данные обрабатываются",
          bullets: [
            "Контактные данные: адрес электронной почты для связи.",
            "Учётные данные: сведения аккаунта пользователя.",
            "Платёжные данные: обрабатываются платёжным провайдером ЮKassa при оплате.",
            "Данные аттестации: заявка, видеоматериалы задания и результаты проверки.",
          ],
        },
        {
          heading: "3. Цели обработки",
          bullets: [
            "Оказание услуги и работа аккаунта пользователя.",
            "Проведение оплаты и обработка обращений в поддержку.",
            "Исполнение требований законодательства.",
          ],
        },
        {
          heading: "4. Платёжные данные",
          bullets: [
            "Платежи обрабатываются платёжным провайдером ЮKassa (после завершения подключения).",
            "FixAct Sport не хранит данные банковских карт пользователей.",
          ],
        },
        {
          heading: "5. Обращения",
          paragraphs: [
            "По вопросам обработки персональных данных пользователь может обратиться к оператору через контакт, указанный ниже.",
          ],
        },
      ],
    },
    en: {
      docTitle: "Privacy Policy — FixAct Sport",
      eyebrow: "Legal information",
      title: "Privacy Policy",
      subtitle:
        "How the operator processes personal data of FixAct Sport users on fixactsport.org.",
      sections: [
        {
          heading: "1. General",
          paragraphs: [
            "The operator processes users' personal data to the extent needed to provide the official sports online attestation service and to operate the service.",
          ],
        },
        {
          heading: "2. What data is processed",
          bullets: [
            "Contact data: an email address for communication.",
            "Account data: information about the user's account.",
            "Payment data: processed by the YooKassa provider during payment.",
            "Attestation data: the request, task video, and review results.",
          ],
        },
        {
          heading: "3. Purposes of processing",
          bullets: [
            "Providing the service and operating the user account.",
            "Processing payments and handling support requests.",
            "Complying with legal requirements.",
          ],
        },
        {
          heading: "4. Payment data",
          bullets: [
            "Payments are processed by the YooKassa provider (after the connection is completed).",
            "FixAct Sport does not store users' bank card data.",
          ],
        },
        {
          heading: "5. Contact",
          paragraphs: [
            "For questions about personal data processing, the user can contact the operator via the contact listed below.",
          ],
        },
      ],
    },
  },
  cookies: {
    ru: {
      docTitle: "Политика Cookie — FixAct Sport",
      eyebrow: "Правовая информация",
      title: "Политика Cookie",
      subtitle:
        "Информация о файлах cookie и аналогичных технологиях на сайте fixactsport.org.",
      sections: [
        {
          heading: "1. Что такое cookie",
          paragraphs: [
            "Cookie — небольшие файлы, которые сайт сохраняет в браузере пользователя. Сайт может использовать технические cookie, а также функциональные и аналитические cookie, если они применяются.",
          ],
        },
        {
          heading: "2. Для чего используются",
          bullets: [
            "Обеспечение работы сайта и сохранение сессии.",
            "Сохранение выбранного языка и настроек интерфейса.",
            "Аналитика использования сайта — при её применении.",
          ],
        },
        {
          heading: "3. Управление cookie",
          paragraphs: [
            "Пользователь может ограничить или отключить cookie в настройках своего браузера. Отключение отдельных cookie может повлиять на работу части функций сайта.",
          ],
        },
      ],
    },
    en: {
      docTitle: "Cookie Policy — FixAct Sport",
      eyebrow: "Legal information",
      title: "Cookie Policy",
      subtitle:
        "Information about cookies and similar technologies on fixactsport.org.",
      sections: [
        {
          heading: "1. What cookies are",
          paragraphs: [
            "Cookies are small files a website stores in the user's browser. The site may use technical cookies, as well as functional and analytics cookies where applicable.",
          ],
        },
        {
          heading: "2. What they are used for",
          bullets: [
            "Operating the site and keeping the session.",
            "Storing the selected language and interface settings.",
            "Site usage analytics, where applied.",
          ],
        },
        {
          heading: "3. Managing cookies",
          paragraphs: [
            "The user can restrict or disable cookies in their browser settings. Disabling some cookies may affect part of the site's functionality.",
          ],
        },
      ],
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
  const operator = OPERATOR[lang];

  useEffect(() => {
    const previous = document.title;
    document.title = text.docTitle;
    return () => {
      document.title = previous;
    };
  }, [text.docTitle]);

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

          <div className="mt-10 space-y-5">
            {text.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-5 md:p-7"
              >
                <h2 className="text-lg font-bold tracking-tight text-slate-950 md:text-xl">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-7 text-slate-700 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-700 md:text-base"
                      >
                        <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--gradient-mid))]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* Operator requisites */}
          <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5 md:p-7">
            <h2 className="text-lg font-bold tracking-tight text-slate-950">
              {operator.label}
            </h2>

            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {operator.operatorLabel}
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-950">
                  {operator.operator}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {operator.detailsLabel}
                </dt>
                <dd className="mt-2 space-y-1 text-base font-semibold text-slate-950">
                  {operator.details.map((detail) => (
                    <div key={detail}>{detail}</div>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {operator.siteLabel}
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-950">
                  {operator.site}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {operator.contactLabel}
                </dt>
                <dd className="mt-2 space-y-1 text-base font-semibold text-slate-950">
                  <div>
                    <a
                      href="mailto:admin@verdico.ru"
                      className="text-[hsl(var(--gradient-mid))] underline underline-offset-4"
                    >
                      {operator.email}
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://t.me/DjamalG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[hsl(var(--gradient-mid))] underline underline-offset-4"
                    >
                      {operator.contactText}
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-8">
            <Link
              to={locale === "ru" ? "/ru/attestation" : "/attestation"}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-slate-900"
            >
              {locale === "ru" ? "Услуга и стоимость →" : "Service & Price →"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
