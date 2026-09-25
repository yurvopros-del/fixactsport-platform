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
    en: "An adult athlete records the published task, the video is reviewed under common rules, and the published result enters the V1 ranking.",
    ru: "Совершеннолетний спортсмен записывает опубликованное задание, видео проверяется по единым правилам, а опубликованный результат входит в рейтинг V1.",
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
        en: "The reviewed result enters the adults 18+ ranking.",
        ru: "Проверенный результат входит в рейтинг категории 18+.",
      },
      details: {
        title: {
          en: "INDEX AND RANKING",
          ru: "ИНДЕКС И РЕЙТИНГ",
        },
        description: {
          en: "After three independent scorecards are finalized, the published result enters the adults 18+ ranking by final score.",
          ru: "После завершения трёх независимых судейских карточек опубликованный результат входит в рейтинг 18+ по итоговому баллу.",
        },
        bullets: [
          {
            en: "Measured result",
            ru: "Измеренный результат",
          },
          {
            en: "Adults 18+",
            ru: "Категория 18+",
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
        en: "ADULT V1 RANKING",
        ru: "РЕЙТИНГ V1 ДЛЯ 18+",
      },
      body: {
        en: "Published final scores are compared in descending order; equal scores share a rank.",
        ru: "Опубликованные итоговые баллы сравниваются по убыванию; равные баллы дают общее место.",
      },
    },
  ],
} as const;
