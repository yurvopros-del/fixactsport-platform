export const system = {
  label: { en: "How It Works", ru: "Как это работает" },
  title: { en: "THE SYSTEM", ru: "СИСТЕМА" },
  steps: [
    {
      number: "01",
      title: {
        en: "DIGITAL ANALYSIS",
        ru: "ЦИФРОВОЙ АНАЛИЗ",
      },
      description: {
        en: "",
        ru: "Смотрим внимательно:\nкак поставлено движение\nдержит ли игрок темп\nнасколько разнообразна техника\nработает ли слабая нога\nесть ли устойчивость в движении\nЭто не один эпизод.\nЭто уровень.",
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
        en: "",
        ru: "",
      },
    },
    {
      number: "02",
      title: {
        en: "EXPERT CONTROL",
        ru: "ЭКСПЕРТНЫЙ КОНТРОЛЬ",
      },
      description: {
        en: "",
        ru: "А теперь — важнейший момент.\nКаждое видео проверяется.\nМонтаж, ускорение, любые вмешательства — исключаются.\nРезультат должен быть честным.",
      },
      bullets: [
        {
          en: "verification of video authenticity (editing, speed manipulation, digital interference)",
          ru: "проверка достоверности видеоматериалов (монтаж, ускорение, цифровые вмешательства)",
        },
      ],
      footer: {
        en: "",
        ru: "К оценке привлекаются сертифицированные судьи и арбитры.\nЧтобы не было сомнений — ни у участников, ни у клубов.",
      },
    },
    {
      number: "03",
      title: {
        en: "FIXACT SPORT ATTESTATION INDEX",
        ru: "АТТЕСТАЦИОННЫЙ ИНДЕКС",
      },
      description: {
        en: "",
        ru: "Это и есть твой реальный результат:\nуровень исполнения\nвариативность техники\nстабильность\nвыносливость\nпрогресс\nНе мнение.\nЦифры.",
      },
      bullets: [
        {
          en: "quantitative result assessment",
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
  ],
  pool: {
    title: {
      en: "FAIR COMPARISON",
      ru: "ЧЕСТНОЕ СРАВНЕНИЕ",
    },
    bullets: [],
    body: {
      en: "Players compete under equal conditions. One age group. Then everything becomes obvious. The stronger player comes out ahead.",
      ru: "Игроки выходят в равных условиях.\nОдна возрастная группа.\nИ здесь уже всё очевидно.\nКто сильнее — тот и впереди.",
    },
    footer: {
      en: "",
      ru: "",
    },
  },
} as const;