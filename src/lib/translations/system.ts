export const system = {
  label: {
    en: "Project essence",
    ru: "Суть проекта",
  },

  title: {
    en: "How the system works",
    ru: "Как устроена система",
  },

  hook: {
    en: "A participant’s level is shown through a clear, common, and verifiable process.",
    ru: "Уровень участника показывается через понятный, единый и проверяемый процесс.",
  },

  flow: [
    {
      id: "expert-verification",
      number: "01",
      title: {
        en: "EXPERT VERIFICATION",
        ru: "ЭКСПЕРТНАЯ ПРОВЕРКА",
      },
      short: {
        en: "Every video is verified.",
        ru: "Каждое видео проходит проверку.",
      },
      details: {
        title: {
          en: "EXPERT VERIFICATION",
          ru: "ЭКСПЕРТНАЯ ПРОВЕРКА",
        },
        description: {
          en: "Each submitted video is reviewed before it can affect the season ranking.",
          ru: "Каждое загруженное видео проходит проверку до того, как результат может повлиять на рейтинг сезона.",
        },
        bullets: [
          {
            en: "Video authenticity",
            ru: "Достоверность видео",
          },
          {
            en: "Expert review",
            ru: "Проверка специалистами",
          },
          {
            en: "No interference",
            ru: "Без вмешательства",
          },
        ],
      },
    },
    {
      id: "one-standard",
      number: "02",
      title: {
        en: "ONE STANDARD",
        ru: "ЕДИНЫЙ СТАНДАРТ",
      },
      short: {
        en: "The conditions are the same for everyone.",
        ru: "Условия одинаковы для всех.",
      },
      details: {
        title: {
          en: "ONE STANDARD",
          ru: "ЕДИНЫЙ СТАНДАРТ",
        },
        description: {
          en: "Comparison only works when the format, task, and rules are common for all participants.",
          ru: "Сравнение возможно только тогда, когда формат, задание и правила едины для всех участников.",
        },
        bullets: [
          {
            en: "One format",
            ru: "Один формат",
          },
          {
            en: "One standard",
            ru: "Один стандарт",
          },
          {
            en: "One approach",
            ru: "Один подход",
          },
        ],
      },
    },
    {
      id: "clear-ranking",
      number: "03",
      title: {
        en: "CLEAR RANKING",
        ru: "ПОНЯТНЫЙ РЕЙТИНГ",
      },
      short: {
        en: "A stronger performance leads to a higher place.",
        ru: "Более сильное выступление даёт более высокое место.",
      },
      details: {
        title: {
          en: "CLEAR RANKING",
          ru: "ПОНЯТНЫЙ РЕЙТИНГ",
        },
        description: {
          en: "When the conditions are equal, the participant’s place in the ranking becomes understandable.",
          ru: "Когда условия равны, место участника в рейтинге становится понятным.",
        },
        bullets: [
          {
            en: "One age group",
            ru: "Одна возрастная группа",
          },
          {
            en: "Equal conditions",
            ru: "Равные условия",
          },
          {
            en: "Clear ranking",
            ru: "Понятный рейтинг",
          },
        ],
      },
    },
  ],

  comparison: {
    title: {
      en: "OUR PRINCIPLES",
      ru: "НАШИ ПРИНЦИПЫ",
    },
    body: {
      en: "Equal conditions.\nOne age group.\nOne standard.",
      ru: "Равные условия.\nОдна возрастная группа.\nЕдиный стандарт.",
    },
  },
} as const;
