import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Participation protocol",
    title: "How to join",
    body: "A clear route from the app to the season ranking. No guessing, no hidden steps.",
    steps: [
      {
        title: "Download the app",
        body: "Install FixAct Sport and enter the participant path.",
      },
      {
        title: "Register",
        body: "Create one profile for participation, results, and ranking.",
      },
      {
        title: "Choose a season",
        body: "Select an available season and review the task conditions.",
      },
      {
        title: "Pay for participation",
        body: "Confirm your place in the season before performing the task.",
      },
      {
        title: "Complete the task",
        body: "Perform the football task according to the stated rules.",
      },
      {
        title: "Upload the result",
        body: "Send the recorded result through the platform.",
      },
      {
        title: "Pass verification",
        body: "The submitted result is checked before it affects the ranking.",
      },
      {
        title: "Enter the ranking",
        body: "After verification, the result can be counted in the season ranking.",
      },
    ],
  },
  ru: {
    kicker: "Протокол участника",
    title: "Как поучаствовать",
    body: "Понятный путь от приложения до рейтинга сезона. Без догадок и скрытых шагов.",
    steps: [
      {
        title: "Скачать приложение",
        body: "Установить ФиксАкт Спорт и войти в путь участника.",
      },
      {
        title: "Зарегистрироваться",
        body: "Создать один профиль для участия, результатов и рейтинга.",
      },
      {
        title: "Выбрать сезон",
        body: "Выбрать доступный сезон и ознакомиться с условиями задания.",
      },
      {
        title: "Оплатить участие",
        body: "Подтвердить место в сезоне до выполнения задания.",
      },
      {
        title: "Выполнить задание",
        body: "Выполнить футбольное задание по установленным правилам.",
      },
      {
        title: "Загрузить результат",
        body: "Отправить записанный результат через платформу.",
      },
      {
        title: "Пройти проверку",
        body: "Результат проверяется до того, как влияет на рейтинг.",
      },
      {
        title: "Попасть в рейтинг",
        body: "После проверки результат может быть учтён в рейтинге сезона.",
      },
    ],
  },
} as const;

const ParticipationStepsSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section
      id="participation"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef7ff_46%,#f8fafc_100%)] py-20 text-slate-950 md:py-28 xl:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,hsl(var(--gradient-start)/0.16),transparent_34%),radial-gradient(circle_at_84%_14%,hsl(var(--gradient-end)/0.10),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.66),rgba(255,255,255,0.16),rgba(255,255,255,0.66))]"
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="label text-slate-500">{copy.kicker}</div>

          <h2 className="mt-6 heading-lg text-slate-950">{copy.title}</h2>

          <p className="mx-auto mt-6 max-w-3xl body-lg text-slate-700">
            {copy.body}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[1480px] md:mt-16">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5 2xl:gap-6">
            {copy.steps.map((step, index) => {
              const isFinal = index === copy.steps.length - 1;

              return (
                <article
                  key={step.title}
                  className={`group relative min-h-[226px] overflow-hidden rounded-[30px] border bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_26px_76px_rgba(37,99,235,0.14)] md:p-7 ${
                    isFinal
                      ? "border-blue-200 shadow-[0_24px_76px_rgba(37,99,235,0.12)]"
                      : "border-slate-200"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,hsl(var(--gradient-start)/0.12),transparent_38%),radial-gradient(circle_at_92%_0%,hsl(var(--gradient-end)/0.10),transparent_40%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,hsl(var(--gradient-mid)/0.055))]" />
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="inline-block bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text pb-2 pr-1 text-[46px] font-black leading-[1.16] tracking-[-0.075em] text-transparent transition-transform duration-300 group-hover:scale-[1.035] md:text-[54px]">
                      {index + 1}
                    </div>

                    <div className="mt-7 h-px flex-1 bg-gradient-to-r from-[hsl(var(--gradient-start)/0.22)] via-[hsl(var(--gradient-mid)/0.18)] to-transparent" />
                  </div>

                  <h3 className="relative mt-5 max-w-[13ch] text-[23px] font-black leading-[1.02] tracking-[-0.035em] text-slate-950 md:text-[25px]">
                    {step.title}
                  </h3>

                  <p className="relative mt-5 max-w-[34ch] text-[15px] leading-relaxed text-slate-600">
                    {step.body}
                  </p>

                  <div
                    aria-hidden="true"
                    className={`absolute bottom-0 left-6 right-6 h-[3px] rounded-full transition-all duration-300 group-hover:left-5 group-hover:right-5 ${
                      isFinal
                        ? "bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))]"
                        : "bg-gradient-to-r from-[hsl(var(--gradient-start)/0.34)] via-[hsl(var(--gradient-mid)/0.28)] to-[hsl(var(--gradient-end)/0.18)] group-hover:from-[hsl(var(--gradient-start))] group-hover:via-[hsl(var(--gradient-mid))] group-hover:to-[hsl(var(--gradient-end))]"
                    }`}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationStepsSection;