import { useLanguage } from "@/hooks/useLanguage";

import visualA from "@/assets/infographics/snow-leopard/A.avif";
import visualB from "@/assets/infographics/snow-leopard/B.avif";
import visualC from "@/assets/infographics/snow-leopard/C.avif";
import visualD from "@/assets/infographics/snow-leopard/D.avif";
import visualE from "@/assets/infographics/snow-leopard/E.avif";

const content = {
  en: {
    kicker: "How to participate",
    title: "Five practical steps to enter the season.",
    body:
      "The official path is fixed: confirm adult eligibility, review the rules, pay for attestation, record in the app, and receive the reviewed result.",
    steps: [
      {
        title: "Check eligibility",
        body: "Public Reward Rules v1 accept adult athletes aged 18+.",
        image: visualA,
      },
      {
        title: "Review the rules",
        body: "Read the service, round, ranking, reward and tax-residency terms before accepting them.",
        image: visualB,
      },
      {
        title: "Pay for attestation",
        body: "Pay 2,000 ₽ for the official attestation service; the fee is not a stake or a participant-funded prize pool.",
        image: visualC,
      },
      {
        title: "Record the official attempt",
        body: "Record and send one continuous 29–32 second official submission through the app.",
        image: visualD,
      },
      {
        title: "Receive result",
        body: "Three independent judges produce the final score; published results enter the shared-rank table.",
        image: visualE,
      },
    ],
  },
  ru: {
    kicker: "Как принять участие",
    title: "Пять практических шагов для входа в сезон.",
    body:
      "Официальный путь фиксирован: подтвердить совершеннолетие, прочитать правила, оплатить аттестацию, записать попытку в приложении и получить проверенный результат.",
    steps: [
      {
        title: "Проверить допуск",
        body: "Публичные правила вознаграждений V1 допускают спортсменов 18+.",
        image: visualA,
      },
      {
        title: "Прочитать правила",
        body: "До принятия ознакомьтесь с условиями услуги, раунда, рейтинга, вознаграждений и налогового резидентства.",
        image: visualB,
      },
      {
        title: "Оплатить аттестацию",
        body: "Оплатите 2 000 ₽ за услугу официальной аттестации; это не ставка и не взнос в призовой фонд.",
        image: visualC,
      },
      {
        title: "Записать официальную попытку",
        body: "Запишите и отправьте через приложение одну непрерывную официальную запись длительностью 29–32 секунды.",
        image: visualD,
      },
      {
        title: "Получить результат",
        body: "Три независимых судьи формируют итоговый балл; опубликованный результат входит в рейтинг с общими местами.",
        image: visualE,
      },
    ],
  },
} as const;

const stairClasses = [
  "xl:ml-0 xl:mr-44",
  "xl:ml-16 xl:mr-32",
  "xl:ml-32 xl:mr-20",
  "xl:ml-48 xl:mr-8",
  "xl:ml-64 xl:mr-0",
] as const;

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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.15),rgba(20,184,166,0)_68%)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 bottom-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),rgba(59,130,246,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start xl:gap-16">
          <div className="max-w-3xl xl:sticky xl:top-32">
            <div className="label text-slate-500">{copy.kicker}</div>

            <h2 className="mt-6 max-w-[13ch] heading-lg text-slate-950 md:max-w-[14ch] xl:max-w-[15ch]">
              {copy.title}
            </h2>

            <p className="mt-6 max-w-2xl body-lg text-slate-700">
              {copy.body}
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-14 bottom-24 hidden h-[calc(100%-9rem)] w-px -rotate-[16deg] origin-bottom bg-gradient-to-t from-cyan-300/0 via-cyan-300/45 to-violet-400/0 xl:block"
            />

            <div className="flex flex-col gap-4 md:gap-5 xl:flex-col-reverse xl:gap-5">
              {copy.steps.map((step, index) => {
                const isFinal = index === copy.steps.length - 1;

                return (
                  <article
                    key={step.title}
                    className={`group relative overflow-visible rounded-[32px] border px-4 py-5 shadow-[0_26px_74px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 md:px-6 md:py-6 ${stairClasses[index]} ${
                      isFinal
                        ? "border-emerald-200/80 bg-[linear-gradient(135deg,rgba(236,253,245,0.9),rgba(255,255,255,0.98))]"
                        : "border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.9)_100%)]"
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-5 left-0 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 opacity-75"
                    />

                    <div className="grid grid-cols-[116px_minmax(0,1fr)] items-center gap-4 md:grid-cols-[152px_minmax(0,1fr)] md:gap-7">
                      <div className="relative flex h-[116px] w-[116px] items-center justify-center md:h-[152px] md:w-[152px]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(59,130,246,0.11)_46%,rgba(255,255,255,0)_74%)] blur-xl transition-transform duration-300 group-hover:scale-110"
                        />

                        <img
                          src={step.image}
                          alt=""
                          decoding="async"
                          loading="lazy"
                          className="relative z-[1] h-[124%] w-[124%] object-contain drop-shadow-[0_24px_30px_rgba(15,23,42,0.18)] transition-transform duration-300 group-hover:scale-[1.035]"
                        />

                        <div className="absolute right-0 top-0 z-[2] inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#22D3EE_0%,#3B82F6_46%,#8B5CF6_100%)] px-2 text-[11px] font-black tracking-[-0.02em] text-white shadow-[0_10px_24px_rgba(59,130,246,0.28)] ring-4 ring-[#F8FAFC]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="min-w-0 pr-1">
                        <h3 className="text-[1.22rem] font-black leading-[1.05] tracking-[-0.03em] text-slate-950 md:text-[1.52rem]">
                          {step.title}
                        </h3>

                        <p className="mt-3 max-w-[46rem] text-[15px] leading-relaxed text-slate-600 md:text-[1.04rem]">
                          {step.body}
                        </p>
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className={`absolute bottom-0 left-6 right-6 h-[3px] rounded-full transition-all duration-300 group-hover:left-7 group-hover:right-7 ${
                        isFinal
                          ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                          : "bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-violet-500"
                      }`}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationStepsSection;
