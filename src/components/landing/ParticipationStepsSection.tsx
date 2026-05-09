import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Participant path",
    title: "How the attestation path works",
    body: "A clear route from application to verified result and season ranking. The participant understands each step in advance.",
    steps: [
      {
        title: "Open the app",
        body: "Install FixAct Sport and start the participant path inside the platform.",
      },
      {
        title: "Create a profile",
        body: "One profile connects the participant, attestation history, verified results, and ranking position.",
      },
      {
        title: "Select a season",
        body: "Choose an available season and review the task conditions before continuing.",
      },
      {
        title: "Confirm participation",
        body: "Confirm entry into the selected attestation path according to the stated terms.",
      },
      {
        title: "Complete the task",
        body: "Perform the football task according to the published rules and technical requirements.",
      },
      {
        title: "Upload the video",
        body: "Send the recorded video through the platform for verification.",
      },
      {
        title: "Pass verification",
        body: "The submitted material is reviewed before the result affects the ranking.",
      },
      {
        title: "Receive ranking position",
        body: "After verification, the confirmed result may be counted in the season ranking.",
      },
    ],
  },
  ru: {
    kicker: "Путь участника",
    title: "Как проходит аттестационный путь",
    body: "Понятный маршрут от заявки до подтверждённого результата и рейтинга сезона. Участник заранее понимает каждый шаг.",
    steps: [
      {
        title: "Открыть приложение",
        body: "Установить ФиксАкт Спорт и начать путь участника внутри платформы.",
      },
      {
        title: "Создать профиль",
        body: "Один профиль связывает участника, историю аттестаций, подтверждённые результаты и место в рейтинге.",
      },
      {
        title: "Выбрать сезон",
        body: "Выбрать доступный сезон и заранее ознакомиться с условиями задания.",
      },
      {
        title: "Подтвердить участие",
        body: "Оформить участие в выбранном аттестационном пути по установленным условиям.",
      },
      {
        title: "Выполнить задание",
        body: "Выполнить футбольное задание по опубликованным правилам и техническим требованиям.",
      },
      {
        title: "Загрузить видео",
        body: "Отправить записанный видеоматериал через платформу для проверки.",
      },
      {
        title: "Пройти проверку",
        body: "Материал проверяется до того, как результат влияет на рейтинг.",
      },
      {
        title: "Получить место в рейтинге",
        body: "После проверки подтверждённый результат может быть учтён в рейтинге сезона.",
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
      className="relative overflow-hidden bg-[#F8FAFC] py-20 text-slate-950 md:py-28 xl:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-end xl:gap-16">
          <div className="max-w-3xl">
            <div className="label text-slate-500">{copy.kicker}</div>

            <h2 className="mt-6 max-w-[13ch] heading-lg text-slate-950 md:max-w-[14ch] xl:max-w-[15ch]">
              {copy.title}
            </h2>
          </div>

          <p className="max-w-[48rem] body-lg text-slate-700 xl:pb-2">
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
                  className={`group relative min-h-[226px] overflow-hidden rounded-[30px] border bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.045)] transition-transform duration-300 hover:-translate-y-1 md:p-7 ${
                    isFinal
                      ? "border-emerald-200 shadow-[0_14px_38px_rgba(16,185,129,0.10)]"
                      : "border-slate-200"
                  }`}
                >
                  <div className="relative flex items-start justify-between gap-5">
                    <div className="inline-block bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text pb-2 pr-1 text-[46px] font-black leading-[1.16] tracking-[-0.075em] text-transparent transition-transform duration-300 group-hover:scale-[1.025] md:text-[54px]">
                      {index + 1}
                    </div>

                    <div
                      aria-hidden="true"
                      className={`mt-3 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ring-1 ${
                        isFinal
                          ? "bg-emerald-50 ring-emerald-200"
                          : "bg-slate-50 ring-slate-200 group-hover:bg-emerald-50 group-hover:ring-emerald-200"
                      }`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          isFinal
                            ? "bg-emerald-500"
                            : "bg-slate-300 group-hover:bg-emerald-500"
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="relative mt-5 max-w-[14ch] text-[23px] font-black leading-[1.02] tracking-[-0.035em] text-slate-950 md:text-[25px]">
                    {step.title}
                  </h3>

                  <p className="relative mt-5 max-w-[34ch] text-[15px] leading-relaxed text-slate-600">
                    {step.body}
                  </p>

                  <div
                    aria-hidden="true"
                    className={`absolute bottom-0 left-6 right-6 h-[3px] rounded-full transition-all duration-300 group-hover:left-5 group-hover:right-5 ${
                      isFinal
                        ? "bg-emerald-500"
                        : "bg-slate-200 group-hover:bg-emerald-500"
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