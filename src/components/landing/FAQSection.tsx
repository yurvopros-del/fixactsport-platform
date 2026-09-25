import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "FAQ",
    title: "Clear answers before you apply",
    subtitle:
      "Short answers to the main questions before applying: who takes part, how an attempt works, and what participation does not guarantee.",
    items: [
      {
        q: "Who can participate?",
        a: "Public Reward Rules v1 are for adult athletes aged 18+ in the adults_18_plus category.",
      },
      {
        q: "How does an attempt work?",
        a: "The 2,000 ₽ payment buys one official attestation service. You record one official 29–32 second submission, and three independent judges evaluate it under shared rules.",
      },
      {
        q: "Do I need to travel anywhere?",
        a: "No. You can apply and complete the task from your own city — all you need is a ball, a safe space, a camera, and access to the platform. No flights or expensive trips.",
      },
      {
        q: "How is the result checked?",
        a: "Your uploaded video is reviewed against the task conditions — only then does the result enter season comparison and the ranking.",
      },
      {
        q: "How are ranking and rewards determined?",
        a: "Published final scores are ranked in descending order. Equal scores share a rank; time, registration order, athlete ID and randomness do not break ties. Monetary rewards start only at a cohort of 100 eligible participants.",
      },
      {
        q: "When does entry close?",
        a: "At the earlier of the 500th accepted unique eligible participant or 365 calendar days from the published opening date.",
      },
      {
        q: "Who can receive a cash reward?",
        a: "Cash eligibility is checked at the actual payout date and requires Russian tax residency; citizenship alone is not the test. Real payout execution is not enabled by publishing these terms.",
      },
      {
        q: "Does this guarantee selection by a club?",
        a: "No. FixAct Sport does not guarantee selection, trials, or a club or academy decision. But a clear result is easier to show a coach or academy — the decision stays with them.",
      },
    ],
  },
  ru: {
    kicker: "FAQ",
    title: "Понятные ответы до заявки",
    subtitle:
      "Короткие ответы на главные вопросы перед заявкой: кто участвует, как проходит попытка и чего участие не гарантирует.",
    items: [
      {
        q: "Кто может участвовать?",
        a: "Публичные правила вознаграждений V1 действуют для совершеннолетних спортсменов 18+ в категории adults_18_plus.",
      },
      {
        q: "Как проходит попытка?",
        a: "Платёж 2 000 ₽ оплачивает одну услугу официальной аттестации. Участник отправляет одну официальную запись длительностью 29–32 секунды, которую оценивают три независимых судьи по единым правилам.",
      },
      {
        q: "Нужно ли куда-то ехать?",
        a: "Нет. Подать заявку и выполнить задание можно из своего города — нужны мяч, безопасное место, камера и доступ к платформе. Без перелётов и дорогих поездок.",
      },
      {
        q: "Как проверяется результат?",
        a: "Загруженное видео проверяют по условиям задания — и только после этого результат попадает в сравнение и рейтинг сезона.",
      },
      {
        q: "Как определяются рейтинг и вознаграждения?",
        a: "Опубликованные итоговые баллы ранжируются по убыванию. Равные баллы дают общее место; время, порядок регистрации, идентификатор и случайность не разрывают ничью. Денежные вознаграждения начинаются только при когорте от 100 допущенных участников.",
      },
      {
        q: "Когда закрывается набор?",
        a: "По более раннему событию: принят 500-й уникальный допущенный участник или прошло 365 календарных дней с опубликованной даты открытия.",
      },
      {
        q: "Кто может получить денежное вознаграждение?",
        a: "Право на выплату проверяется на фактическую дату выплаты и требует налогового резидентства России; гражданство само по себе не является критерием. Публикация условий не включает техническое исполнение реальных выплат.",
      },
      {
        q: "Гарантирует ли это отбор в клуб?",
        a: "Нет. ФиксАкт Спорт не гарантирует отбор, просмотр или решение клуба либо академии. Но понятный результат проще показать тренеру или академии — решение остаётся за ними.",
      },
    ],
  },
} as const;

const FAQSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="faq" className="bg-[#F8FAFC] py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[920px] px-5 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="label text-slate-500">{copy.kicker}</div>
          <h2 className="mt-6 heading-lg">{copy.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl body-md text-slate-600">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16">
          {copy.items.map((item) => (
            <article
              key={item.q}
              className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5 md:p-7"
            >
              <h3 className="heading-sm text-slate-950">{item.q}</h3>
              <p className="mt-3 body-md text-slate-700">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
