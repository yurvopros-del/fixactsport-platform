export const system = {
  label: {
    en: "Project essence",
    ru: "Суть проекта",
  },

  title: {
    en: "How it works",
    ru: "Как это работает",
  },

  hook: {
    en: "Video, review, common rules, and a ranking position.",
    ru: "Видео, проверка, единые условия и место в рейтинге.",
  },

  flow: [
    {
      id: "expert-verification",
      number: "01",
      title: {
        en: "VIDEO REVIEW",
        ru: "ПРОВЕРКА ВИДЕО",
      },
      short: {
        en: "The submitted performance is checked.",
        ru: "Загруженное выступление проверяется.",
      },
      details: {
        title: {
          en: "VIDEO REVIEW",
          ru: "ПРОВЕРКА ВИДЕО",
        },
        description: {
          en: "The video is reviewed before the result can enter the season ranking.",
          ru: "Видео проверяется до того, как результат попадёт в рейтинг сезона.",
        },
        bullets: [
          {
            en: "Video authenticity",
            ru: "Достоверность видео",
          },
          {
            en: "Task execution",
            ru: "Выполнение задания",
          },
          {
            en: "No outside interference",
            ru: "Без постороннего вмешательства",
          },
        ],
      },
    },
    {
      id: "one-standard",
      number: "02",
      title: {
        en: "COMMON CONDITIONS",
        ru: "ЕДИНЫЕ УСЛОВИЯ",
      },
      short: {
        en: "The task format is the same for everyone.",
        ru: "Формат задания одинаков для всех.",
      },
      details: {
        title: {
          en: "COMMON CONDITIONS",
          ru: "ЕДИНЫЕ УСЛОВИЯ",
        },
        description: {
          en: "Participants are compared only inside a common format, task, and age group.",
          ru: "Участники сравниваются только внутри общего формата, задания и возрастной группы.",
        },
        bullets: [
          {
            en: "One task",
            ru: "Одно задание",
          },
          {
            en: "One age group",
            ru: "Одна возрастная группа",
          },
          {
            en: "One review logic",
            ru: "Одна логика проверки",
          },
        ],
      },
    },
    {
      id: "clear-ranking",
      number: "03",
      title: {
        en: "SEASON RANKING",
        ru: "РЕЙТИНГ СЕЗОНА",
      },
      short: {
        en: "A stronger performance gives a higher place.",
        ru: "Более сильное выступление даёт более высокое место.",
      },
      details: {
        title: {
          en: "SEASON RANKING",
          ru: "РЕЙТИНГ СЕЗОНА",
        },
        description: {
          en: "After review, the participant's result can be counted in the season ranking.",
          ru: "После проверки результат участника может быть учтён в рейтинге сезона.",
        },
        bullets: [
          {
            en: "Recorded result",
            ru: "Зафиксированный результат",
          },
          {
            en: "Ranking position",
            ru: "Место в рейтинге",
          },
          {
            en: "Season outcome",
            ru: "Итог сезона",
          },
        ],
      },
    },
  ],

  comparison: [
    {
      eyebrow: {
        en: "WHY THE RESULT CAN BE TRUSTED",
        ru: "ПОЧЕМУ РЕЗУЛЬТАТУ МОЖНО ДОВЕРЯТЬ",
      },
      title: {
        en: "REVIEW BEFORE RANKING",
        ru: "ПРОВЕРКА ДО РЕЙТИНГА",
      },
      body: {
        en: "The submitted video is reviewed before it affects the ranking.",
        ru: "Загруженное видео проверяется до того, как влияет на рейтинг.",
      },
    },
    {
      eyebrow: {
        en: "BASIS OF COMPARISON",
        ru: "ОСНОВА СРАВНЕНИЯ",
      },
      title: {
        en: "SAME TASK FORMAT",
        ru: "ОДИН ФОРМАТ ЗАДАНИЯ",
      },
      body: {
        en: "Participants are compared inside the same task logic and age group.",
        ru: "Участники сравниваются внутри одного задания и своей возрастной группы.",
      },
    },
    {
      eyebrow: {
        en: "HOW THE PLACE IS FORMED",
        ru: "КАК ФОРМИРУЕТСЯ МЕСТО",
      },
      title: {
        en: "RANKING RESULT",
        ru: "МЕСТО В РЕЙТИНГЕ",
      },
      body: {
        en: "The better the verified performance, the higher the ranking position.",
        ru: "Чем сильнее проверенное выступление, тем выше место в рейтинге.",
      },
    },
  ],
} as const;