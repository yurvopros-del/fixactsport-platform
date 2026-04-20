export const system = {
  label: {
    en: "System detail",
    ru: "Детализация системы",
  },

  title: {
    en: "How the result is fixed",
    ru: "Как фиксируется результат",
  },

  hook: {
    en: "The result is fixed by a clear system.",
    ru: "Результат фиксируется по понятной системе.",
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
        ru: "Каждое видео — проверено.",
      },
      details: {
        title: {
          en: "EXPERT VERIFICATION",
          ru: "ЭКСПЕРТНАЯ ПРОВЕРКА",
        },
        description: {
          en: "Each video is reviewed before any result is fixed.",
          ru: "Видео проходит обязательную проверку до фиксации результата.",
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
            ru: "Без вмешательств",
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
          en: "Comparison works only where the format and rules are identical.",
          ru: "Сравнение возможно только там, где формат и правила едины.",
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
      id: "fair-comparison",
      number: "03",
      title: {
        en: "FAIR COMPARISON",
        ru: "ЧЕСТНОЕ СРАВНЕНИЕ",
      },
      short: {
        en: "Better performance means a higher place.",
        ru: "Лучшее выступление — значит выше рейтинг.",
      },
      details: {
        title: {
          en: "FAIR COMPARISON",
          ru: "ЧЕСТНОЕ СРАВНЕНИЕ",
        },
        description: {
          en: "When the conditions are equal, the result becomes clear and trusted.",
          ru: "Когда условия равны, результат воспринимается без сомнений.",
        },
        bullets: [
          {
            en: "One age group",
            ru: "Один возраст",
          },
          {
            en: "Equal conditions",
            ru: "Равные условия",
          },
          {
            en: "Clear result",
            ru: "Понятный результат",
          },
        ],
      },
    },
  ],

  comparison: {
    title: {
      en: "FAIR COMPARISON",
      ru: "ЧЕСТНОЕ СРАВНЕНИЕ",
    },
    body: {
      en: "Equal conditions.\nOne age group.\nOne standard.",
      ru: "Равные условия.\nОдин возраст.\nОдин стандарт.",
    },
  },
} as const;