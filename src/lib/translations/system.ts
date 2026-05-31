export const system = {
  label: {
    en: "System mechanics",
    ru: "Механика системы",
  },

  title: {
    en: "From task video to season ranking",
    ru: "От видео с заданием до рейтинга сезона",
  },

  hook: {
    en: "A published task is recorded on video, reviewed under common rules, indexed as a result, and compared inside an age group and season.",
    ru: "Опубликованное задание записывается на видео, проверяется по единым правилам, фиксируется как результат и сравнивается внутри возраста и сезона.",
  },

  flow: [
    {
      id: "expert-verification",
      number: "01",
      title: {
        en: "TASK VIDEO",
        ru: "ВИДЕО С ЗАДАНИЕМ",
      },
      short: {
        en: "The participant records the published task.",
        ru: "Участник записывает опубликованное задание.",
      },
      details: {
        title: {
          en: "TASK VIDEO",
          ru: "ВИДЕО С ЗАДАНИЕМ",
        },
        description: {
          en: "The entry begins with a task performed on video so the same action can be reviewed later.",
          ru: "Участие начинается с выполнения задания на видео, чтобы одно и то же действие можно было проверить позже.",
        },
        bullets: [
          {
            en: "Published task",
            ru: "Опубликованное задание",
          },
          {
            en: "Recorded performance",
            ru: "Записанное выполнение",
          },
          {
            en: "Review-ready video",
            ru: "Видео для проверки",
          },
        ],
      },
    },
    {
      id: "one-standard",
      number: "02",
      title: {
        en: "COMMON REVIEW",
        ru: "ЕДИНАЯ ПРОВЕРКА",
      },
      short: {
        en: "The video is checked under shared rules.",
        ru: "Видео проверяется по общим правилам.",
      },
      details: {
        title: {
          en: "COMMON REVIEW",
          ru: "ЕДИНАЯ ПРОВЕРКА",
        },
        description: {
          en: "The task, video, and review logic keep the result inside one comparison standard.",
          ru: "Задание, видео и логика проверки удерживают результат внутри одного стандарта сравнения.",
        },
        bullets: [
          {
            en: "One task",
            ru: "Одно задание",
          },
          {
            en: "One review logic",
            ru: "Одна логика проверки",
          },
          {
            en: "One result format",
            ru: "Один формат результата",
          },
        ],
      },
    },
    {
      id: "clear-ranking",
      number: "03",
      title: {
        en: "INDEX AND RANKING",
        ru: "ИНДЕКС И РЕЙТИНГ",
      },
      short: {
        en: "The reviewed result enters its age group and season.",
        ru: "Проверенный результат входит в свой возраст и сезон.",
      },
      details: {
        title: {
          en: "INDEX AND RANKING",
          ru: "ИНДЕКС И РЕЙТИНГ",
        },
        description: {
          en: "After review, the measured result can be indexed and placed in the season ranking for the participant's age group.",
          ru: "После проверки измеренный результат может войти в индекс и рейтинг сезона для своей возрастной группы.",
        },
        bullets: [
          {
            en: "Measured result",
            ru: "Измеренный результат",
          },
          {
            en: "Age group",
            ru: "Возрастная группа",
          },
          {
            en: "Season ranking",
            ru: "Рейтинг сезона",
          },
        ],
      },
    },
  ],

  comparison: [
    {
      eyebrow: {
        en: "STARTING POINT",
        ru: "ТОЧКА СТАРТА",
      },
      title: {
        en: "TASK BEFORE RESULT",
        ru: "ЗАДАНИЕ ДО РЕЗУЛЬТАТА",
      },
      body: {
        en: "The result begins with a defined task, not with a random highlight.",
        ru: "Результат начинается с заданного упражнения, а не со случайного фрагмента.",
      },
    },
    {
      eyebrow: {
        en: "REVIEW STANDARD",
        ru: "СТАНДАРТ ПРОВЕРКИ",
      },
      title: {
        en: "VIDEO UNDER COMMON RULES",
        ru: "ВИДЕО ПО ОБЩИМ ПРАВИЛАМ",
      },
      body: {
        en: "The video is checked inside the same task and result logic.",
        ru: "Видео проверяется внутри одной логики задания и результата.",
      },
    },
    {
      eyebrow: {
        en: "SEASON CONTEXT",
        ru: "КОНТЕКСТ СЕЗОНА",
      },
      title: {
        en: "AGE GROUP RANKING",
        ru: "РЕЙТИНГ ВОЗРАСТНОЙ ГРУППЫ",
      },
      body: {
        en: "The indexed result is compared within its age group and season.",
        ru: "Индексированный результат сравнивается внутри своего возраста и сезона.",
      },
    },
  ],
} as const;
