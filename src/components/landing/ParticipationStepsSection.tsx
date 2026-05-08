import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Participation path",
    title: "How to join",
    body: "The route from first step to ranking should be clear before the participant enters the season.",
    steps: [
      "Download the app",
      "Register",
      "Choose a season",
      "Pay for participation",
      "Complete the task",
      "Upload the result",
      "Pass verification",
      "Enter the ranking",
    ],
  },
  ru: {
    kicker: "Путь участника",
    title: "Как поучаствовать",
    body: "Путь от первого шага до рейтинга должен быть понятен ещё до входа в сезон.",
    steps: [
      "Скачать приложение",
      "Зарегистрироваться",
      "Выбрать сезон",
      "Оплатить участие",
      "Выполнить задание",
      "Загрузить результат",
      "Пройти проверку",
      "Попасть в рейтинг",
    ],
  },
} as const;

const ParticipationStepsSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="participation" className="bg-slate-50 py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="label text-slate-500">{copy.kicker}</div>
          <h2 className="mt-6 heading-lg">{copy.title}</h2>
          <p className="mx-auto mt-6 max-w-3xl body-lg text-slate-700">{copy.body}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map((step, index) => (
            <article
              key={step}
              className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 heading-sm text-slate-950">{step}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParticipationStepsSection;
