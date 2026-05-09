import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Advantages",
    title: "What changes for the participant",
    body: "FixAct Sport turns level from an impression into a verified result: clear for the participant, the coach, the club, and the family.",
    items: [
      {
        title: "Unified rules",
        body: "Every participant follows the same clear path: task, video, verification, and ranking position.",
      },
      {
        title: "Verified result",
        body: "The participant receives not just an attempt, but a confirmed result that can be shown to a coach, club, and family.",
      },
      {
        title: "Focus on technique",
        body: "The system looks beyond reputation: ball control, balance, tempo, and execution matter.",
      },
      {
        title: "Clear route",
        body: "From application to ranking, every step is explained in advance. The participant understands what to do and why.",
      },
      {
        title: "Support for strong results",
        body: "A strong verified result may open the path to seasonal grant support and greater visibility.",
      },
    ],
  },
  ru: {
    kicker: "Преимущества",
    title: "Что меняется для участника",
    body: "ФиксАкт Спорт переводит уровень из впечатления в подтверждённый результат: понятный для участника, тренера, клуба и родителей.",
    items: [
      {
        title: "Единые правила",
        body: "Участник проходит понятный путь: задание, видео, проверка и место в рейтинге.",
      },
      {
        title: "Подтверждённый результат",
        body: "Участник получает не просто попытку, а подтверждённый результат, который можно показать тренеру, клубу и семье.",
      },
      {
        title: "Фокус на технике",
        body: "Система смотрит не на громкое имя, а на владение мячом, устойчивость, темп и исполнение.",
      },
      {
        title: "Понятная траектория",
        body: "От заявки до рейтинга каждый шаг заранее объяснён. Участник понимает, что делать и зачем.",
      },
      {
        title: "Поощрительная система",
        body: "Сильный подтверждённый результат может открыть путь к сезонной грантовой поддержке и большей видимости.",
      },
    ],
  },
} as const;

const cardLayout = [
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-4",
] as const;

const AdvantagesSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="advantages" className="bg-white py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-end xl:gap-16">
          <div className="max-w-3xl">
            <div className="label text-slate-500">{copy.kicker}</div>

            <h2 className="mt-6 max-w-[12ch] heading-lg md:max-w-[13ch] xl:max-w-[14ch]">
              {copy.title}
            </h2>
          </div>

          <p className="max-w-[46rem] body-lg text-slate-700 xl:pb-2">
            {copy.body}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.items.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.045)] transition-transform duration-300 hover:-translate-y-1 md:p-7 ${
                cardLayout[index] ?? ""
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              <h3 className="mt-6 text-[1.35rem] font-semibold leading-[1.05] tracking-[-0.025em] text-slate-950 md:text-[1.55rem]">
                {item.title}
              </h3>

              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-slate-600 md:text-base">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;