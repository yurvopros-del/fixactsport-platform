import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Advantages",
    title: "Why FixAct Sport matters",
    body: "FixAct Sport helps a participant show level through a verified result, not through words.",
    items: [
      {
        title: "Fair ranking",
        body: "Participants are compared under common rules and a clear system.",
      },
      {
        title: "A chance to be seen",
        body: "A result becomes visible to coaches, clubs, and the football environment.",
      },
      {
        title: "Clear path",
        body: "From participation to ranking, every step is understandable.",
      },
      {
        title: "Support for strong results",
        body: "The best participants of the season may qualify for grant support.",
      },
      {
        title: "For different age groups",
        body: "The system is suitable for different age groups and levels of preparation.",
      },
    ],
  },
  ru: {
    kicker: "Преимущества",
    title: "Преимущества ФиксАкт Спорт",
    body: "ФиксАкт Спорт помогает участнику показать уровень не на словах, а через проверяемый результат.",
    items: [
      {
        title: "Честный рейтинг",
        body: "Участники сравниваются по единым правилам и понятной системе.",
      },
      {
        title: "Шанс быть замеченным",
        body: "Результат становится видимым для тренеров, клубов и спортивной среды.",
      },
      {
        title: "Понятная траектория",
        body: "От участия до рейтинга — каждый шаг прозрачен.",
      },
      {
        title: "Поддержка сильных результатов",
        body: "Лучшие участники сезона могут претендовать на грантовую поддержку.",
      },
      {
        title: "Для разных возрастных групп",
        body: "Система подходит разным возрастным группам и уровням подготовки.",
      },
    ],
  },
} as const;

const AdvantagesSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="advantages" className="bg-white py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="label text-slate-500">{copy.kicker}</div>
          <h2 className="mt-6 heading-lg">{copy.title}</h2>
          <p className="mx-auto mt-6 max-w-3xl body-lg text-slate-700">{copy.body}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {copy.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 heading-sm text-slate-950">{item.title}</h3>
              <p className="mt-4 body-md text-slate-700">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
