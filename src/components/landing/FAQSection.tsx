import { useLanguage } from "@/hooks/useLanguage";

import participantKazan from "@/assets/faq/people/participant-kazan.avif";
import parentMoscow from "@/assets/faq/people/parent-moscow.avif";
import coachKrasnodar from "@/assets/faq/people/coach-krasnodar.avif";
import academySpb from "@/assets/faq/people/academy-spb.avif";

const content = {
  en: {
    kicker: "FAQ",
    title: "Clear answers before you apply",
    subtitle:
      "Practical answers for players, parents, coaches, and academies: what FixAct Sport is, what is checked, and what participation does not guarantee.",
    items: [
      {
        q: "What is FixAct Sport?",
        a: "FixAct Sport is a football attestation platform where a participant records a task on video and receives a reviewed result that can be compared inside a season.",
      },
      {
        q: "Who can participate?",
        a: "The platform is designed for players and families, and it also supports coaches, clubs, and academies that want a clearer first signal about participants.",
      },
      {
        q: "What is football attestation here?",
        a: "It is a structured task completed on video. The focus is on the participant's execution, result, and comparison under the program rules.",
      },
      {
        q: "How is the result checked?",
        a: "The submitted video is reviewed against the task conditions before the result can be used for season comparison.",
      },
      {
        q: "Does participation guarantee selection by a club?",
        a: "No. FixAct Sport does not guarantee club selection, trials, or academy decisions. It provides a cleaner signal that a coach or academy may review.",
      },
      {
        q: "How do rankings and grants work?",
        a: "A reviewed result can enter the season ranking for the relevant group. Grant support depends on ranking position and the program terms.",
      },
      {
        q: "Can a player participate from another city?",
        a: "Yes, the format is built for remote participation where the player has a ball, safe space, camera, and access to the platform.",
      },
      {
        q: "What can a club or academy see?",
        a: "A club or academy can read the participant's task context, submitted video signal, reviewed result, and ranking context. The sporting decision remains theirs.",
      },
    ],
  },
  ru: {
    kicker: "FAQ",
    title: "Понятные ответы до заявки",
    subtitle:
      "Практичные ответы для игроков, родителей, тренеров и академий: что такое ФиксАкт Спорт, что проверяется и чего участие не гарантирует.",
    items: [
      {
        q: "Что такое ФиксАкт Спорт?",
        a: "ФиксАкт Спорт — платформа футбольной аттестации: участник записывает задание на видео и получает проверенный результат, который можно сравнивать внутри сезона.",
      },
      {
        q: "Кто может участвовать?",
        a: "Платформа рассчитана на игроков и семьи, а также полезна тренерам, клубам и академиям, которым нужен более понятный первый сигнал об участнике.",
      },
      {
        q: "Что здесь означает футбольная аттестация?",
        a: "Это структурированное задание, выполненное на видео. В центре — выполнение, результат и сравнение по правилам программы.",
      },
      {
        q: "Как проверяется результат?",
        a: "Загруженное видео проверяется по условиям задания до того, как результат может использоваться для сравнения в сезоне.",
      },
      {
        q: "Участие гарантирует отбор в клуб?",
        a: "Нет. ФиксАкт Спорт не гарантирует отбор в клуб, просмотр или решение академии. Платформа даёт более чистый сигнал, который тренер или академия могут изучить.",
      },
      {
        q: "Как работают рейтинг и гранты?",
        a: "Проверенный результат может войти в рейтинг сезона для своей группы. Грантовая поддержка зависит от места в рейтинге и условий программы.",
      },
      {
        q: "Можно участвовать из другого города?",
        a: "Да. Формат рассчитан на удалённое участие, если у игрока есть мяч, безопасное пространство, камера и доступ к платформе.",
      },
      {
        q: "Что видит клуб или академия?",
        a: "Клуб или академия могут изучить контекст задания, видеосигнал участника, проверенный результат и место в рейтинге. Спортивное решение остаётся за ними.",
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
