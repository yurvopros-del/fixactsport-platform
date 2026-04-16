export const system = {
  label: { en: "How It Works", ru: "Как это работает" },

  title: {
    en: "THE SYSTEM",
    ru: "СИСТЕМА",
  },

  hook: {
    en: "You show skill. We turn it into result.",
    ru: "Ты показываешь навык. Мы превращаем его в результат.",
  },

  flow: [
    {
      id: "capture",
      number: "01",
      title: {
        en: "CAPTURE",
        ru: "СНИМАЕШЬ",
      },
      short: {
        en: "Record a 60-second video",
        ru: "Снимаешь видео (60 секунд)",
      },
      details: {
        title: {
          en: "DIGITAL ANALYSIS",
          ru: "ЦИФРОВОЙ АНАЛИЗ",
        },
        description: {
          en: "This is where the system reads what you really show.\n\nWe measure:\n— execution level\n— technical variation\n— tempo stability\n— weak-foot usage\n— dynamic stability",
          ru: "Здесь система считывает то, что ты реально показываешь.\n\nМы фиксируем:\n— как поставлено движение\n— держит ли игрок темп\n— насколько разнообразна техника\n— работает ли слабая нога\n— есть ли устойчивость в движении",
        },
        bullets: [
          {
            en: "biomechanical correctness",
            ru: "биомеханическая корректность",
          },
          {
            en: "tempo stability",
            ru: "стабильность темпа",
          },
          {
            en: "technical variation",
            ru: "вариативность техники",
          },
          {
            en: "weak-foot usage",
            ru: "использование слабой ноги",
          },
          {
            en: "dynamic stability",
            ru: "динамическая устойчивость",
          },
        ],
        footer: {
          en: "Entry fee — 2000 ₽.",
          ru: "Стоимость участия — 2000 ₽.",
        },
      },
    },

    {
      id: "verify",
      number: "02",
      title: {
        en: "VERIFY",
        ru: "ПРОВЕРЯЕМ",
      },
      short: {
        en: "The result cannot be faked",
        ru: "Результат нельзя подделать.",
      },
      details: {
        title: {
          en: "EXPERT CONTROL",
          ru: "ЭКСПЕРТНЫЙ КОНТРОЛЬ",
        },
        description: {
          en: "Every video is checked.\n\nEditing, speed manipulation, and any digital interference are excluded.\nThe result must be fair.",
          ru: "Каждое видео проверяется.\n\nМонтаж, ускорение, любые вмешательства — исключаются.\nРезультат должен быть честным.",
        },
        bullets: [
          {
            en: "verification of video authenticity",
            ru: "проверка достоверности видеоматериалов",
          },
        ],
        footer: {
          en: "The review is conducted by experts.",
          ru: "Проверку проводят эксперты.",
        },
      },
    },

    {
      id: "result",
      number: "03",
      title: {
        en: "RESULT",
        ru: "ПОЛУЧАЕШЬ РЕЗУЛЬТАТ",
      },
      short: {
        en: "Your real level",
        ru: "Твой реальный уровень",
      },
      details: {
        title: {
          en: "ATTESTATION INDEX",
          ru: "АТТЕСТАЦИОННЫЙ ИНДЕКС",
        },
        description: {
          en: "This is your real result.\n\nWe record:\n— execution level\n— technical variation\n— stability\n— endurance\n— progress\n\nNo opinions.\nOnly numbers.",
          ru: "Это и есть твой реальный результат.\n\nМы фиксируем:\n— уровень исполнения\n— вариативность техники\n— стабильность\n— выносливость\n— прогресс\n\nБез случайностей.\nПонятная система.",
        },
        bullets: [
          {
            en: "quantitative assessment",
            ru: "количественная оценка результата",
          },
          {
            en: "technical variation",
            ru: "вариативность техники",
          },
          {
            en: "tempo stability",
            ru: "стабильность темпа",
          },
          {
            en: "fatigue resistance",
            ru: "устойчивость к утомлению",
          },
          {
            en: "progress dynamics",
            ru: "динамика прогресса",
          },
        ],
        footer: {
          en: "",
          ru: "",
        },
      },
    },
  ],

  comparison: {
    title: {
      en: "FAIR COMPARISON",
      ru: "ЧЕСТНОЕ СРАВНЕНИЕ",
    },
    body: {
      en: "Players compete under equal conditions.\nOne age group.\nThen everything becomes obvious.\nThe stronger one goes ahead.",
      ru: "Игроки выходят в равных условиях.\nОдна возрастная группа.\nИ здесь уже всё очевидно.\nКто сильнее — тот и впереди.",
    },
  },
} as const;