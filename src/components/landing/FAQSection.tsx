import { useLanguage } from "@/hooks/useLanguage";

import participantKazan from "@/assets/faq/people/participant-kazan.avif";
import parentMoscow from "@/assets/faq/people/parent-moscow.avif";
import coachKrasnodar from "@/assets/faq/people/coach-krasnodar.avif";
import academySpb from "@/assets/faq/people/academy-spb.avif";

const content = {
  en: {
    kicker: "FAQ",
    title: "Questions along the participant path",
    subtitle:
      "The same participant path, explained through the people who will actually use the platform: participants, parents, coaches, and partner academies.",
    items: [
      {
        q: "Where does participation begin?",
        a: "Participation begins with the app: the participant registers, chooses an available season, and follows the rules of the task.",
      },
      {
        q: "Why is video verification needed?",
        a: "Verification protects the ranking and makes sure that results are compared under common rules.",
      },
      {
        q: "How does a participant enter the ranking?",
        a: "After the result is uploaded and verified, it can be counted in the season ranking.",
      },
      {
        q: "Are grants guaranteed?",
        a: "No. Grant support depends on the participant’s final place in the season ranking and the program rules.",
      },
    ],
  },
  ru: {
    kicker: "FAQ",
    title: "Вопросы по пути участника",
    subtitle:
      "Тот же путь участника — через вопросы людей, для которых создаётся платформа: участников, родителей, тренеров и футбольных академий.",
    items: [
      {
        q: "С чего начинается участие?",
        a: "Участие начинается с приложения: участник регистрируется, выбирает доступный сезон и следует правилам задания.",
      },
      {
        q: "Зачем нужна проверка видео?",
        a: "Проверка защищает рейтинг и помогает сравнивать результаты по единым правилам.",
      },
      {
        q: "Как участник попадает в рейтинг?",
        a: "После загрузки и проверки результат может быть учтён в рейтинге сезона.",
      },
      {
        q: "Гранты гарантированы?",
        a: "Нет. Грантовая поддержка зависит от итогового места участника в рейтинге сезона и правил программы.",
      },
    ],
  },
} as const;

const personas = {
  en: [
    {
      name: "Artyom",
      city: "Kazan",
      role: "Participant",
      image: participantKazan,
      tone: "from-[#E8F7FF] via-white to-[#F1F5FF]",
    },
    {
      name: "Elena",
      city: "Moscow",
      role: "Parent",
      image: parentMoscow,
      tone: "from-[#FFF3E8] via-white to-[#FFF8EE]",
    },
    {
      name: "Sergey",
      city: "Krasnodar",
      role: "Coach",
      image: coachKrasnodar,
      tone: "from-[#EFFFF5] via-white to-[#F4FFF8]",
    },
    {
      name: "Dmitry",
      city: "Saint Petersburg",
      role: "Academy representative",
      image: academySpb,
      tone: "from-[#F2EEFF] via-white to-[#F8F6FF]",
    },
  ],
  ru: [
    {
      name: "Артём",
      city: "Казань",
      role: "Участник",
      image: participantKazan,
      tone: "from-[#E8F7FF] via-white to-[#F1F5FF]",
    },
    {
      name: "Елена",
      city: "Москва",
      role: "Родитель",
      image: parentMoscow,
      tone: "from-[#FFF3E8] via-white to-[#FFF8EE]",
    },
    {
      name: "Сергей",
      city: "Краснодар",
      role: "Тренер",
      image: coachKrasnodar,
      tone: "from-[#EFFFF5] via-white to-[#F4FFF8]",
    },
    {
      name: "Дмитрий",
      city: "Санкт-Петербург",
      role: "Представитель академии",
      image: academySpb,
      tone: "from-[#F2EEFF] via-white to-[#F8F6FF]",
    },
  ],
} as const;

const FAQSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;
  const personaSet = locale === "en" ? personas.en : personas.ru;

  return (
    <section id="faq" className="bg-[#F8FAFC] py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="label text-slate-500">{copy.kicker}</div>
          <h2 className="mt-6 heading-lg">{copy.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl body-md text-slate-600">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:gap-6">
          {copy.items.map((item, index) => {
            const persona = personaSet[index % personaSet.length];

            return (
              <article
                key={item.q}
                className={[
                  "group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-gradient-to-br p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition-transform duration-300 hover:-translate-y-0.5 md:p-6",
                  persona.tone,
                  index % 2 === 1 ? "md:ml-auto md:max-w-[1040px]" : "md:mr-auto md:max-w-[1040px]",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-white/70 blur-3xl" />

                <div className="relative grid gap-6 md:grid-cols-[320px_1fr] md:items-center md:gap-8">
                  <div className="flex items-center gap-5 md:gap-6">
                    <div className="shrink-0">
                      <div className="h-24 w-24 overflow-hidden rounded-[28px] border border-white/80 bg-slate-100 shadow-[0_18px_42px_rgba(15,23,42,0.18)] md:h-32 md:w-32">
                        <img
                          src={persona.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="text-lg font-bold text-slate-950 md:text-xl">
                        {persona.name}
                      </div>

                      <div className="mt-1 text-sm font-semibold leading-snug text-slate-600 md:text-base">
                        {persona.city}
                      </div>

                      <div className="mt-2 inline-flex max-w-full rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-[11px] font-semibold leading-tight text-slate-600 md:text-xs">
                        {persona.role}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 rounded-[24px] border border-white/75 bg-white/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur md:p-6">
                    <h3 className="heading-sm text-slate-950">{item.q}</h3>
                    <p className="mt-4 body-md text-slate-700">{item.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;