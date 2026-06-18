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
        a: "Players and their families first — and also coaches, clubs, and academies that want to understand a participant's level early. From children to adult amateurs.",
      },
      {
        q: "How does an attempt work?",
        a: "You complete a published task and record it on video. The video is reviewed under shared rules, and the result can be compared with participants of the same age group and season.",
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
        q: "What do the ranking and grants give?",
        a: "A reviewed result enters the season ranking in its age group. The higher your place, the larger the grant — under the program terms.",
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
        a: "В первую очередь игроки и их семьи. А также тренеры, клубы и академии, которым важно заранее понять уровень участника. От детей до взрослых любителей.",
      },
      {
        q: "Как проходит попытка?",
        a: "Вы выполняете опубликованное задание и записываете его на видео. Видео проверяют по единым правилам, а результат можно сравнить с участниками своего возраста и сезона.",
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
        q: "Что дают рейтинг и гранты?",
        a: "Проверенный результат входит в рейтинг сезона в своей возрастной группе. Чем выше место — тем больше грант, по условиям программы.",
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
