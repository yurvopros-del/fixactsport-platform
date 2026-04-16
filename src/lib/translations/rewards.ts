export const rewards = {
  kicker: {
    en: "Season Results",
    ru: "Результаты сезона",
  },

  title: {
    en: "FixAct Sport Grant and Progression System",
    ru: "Гранты и система продвижения ФиксАкт Спорт",
  },

  subtitle: {
    en: "This is not just prize money. It is a visible result of your level, your position in the season ranking, and your place inside a fair competitive system.",
    ru: "Это не просто призовые. Это видимый результат твоего уровня, твоего места в сезонном рейтинге и твоего положения внутри честной соревновательной системы.",
  },

  table: {
    headers: [
      { en: "Ranking status", ru: "Статус в рейтинге" },
      { en: "Grant amount", ru: "Размер гранта" },
    ],

    rows: [
      {
        status: {
          en: "Season 2026 winner (1st place)",
          ru: "Победитель сезона 2026 (1 место)",
        },
        grant: {
          en: "50,000 ₽",
          ru: "50 000 ₽",
        },
      },
      {
        status: {
          en: "Second place in Season 2026 (2nd place)",
          ru: "Второе место в сезоне 2026 (2 место)",
        },
        grant: {
          en: "25,000 ₽",
          ru: "25 000 ₽",
        },
      },
      {
        status: {
          en: "Third place in Season 2026 (3rd place)",
          ru: "Третье место в сезоне 2026 (3 место)",
        },
        grant: {
          en: "10,000 ₽",
          ru: "10 000 ₽",
        },
      },
      {
        status: {
          en: "Season finalists (places 4–50)",
          ru: "Финалисты сезона (4–50 места)",
        },
        grant: {
          en: "5,000 ₽",
          ru: "5 000 ₽",
        },
      },
    ],
  },

  b2b: {
    badge: {
      en: "20%",
      ru: "20%",
    },

    title: {
      en: "For partner organizations (B2B)",
      ru: "Информация для партнерских организаций (B2B)",
    },

    body: {
      en: "Football clubs and academies receive 20% of the cost of every completed attestation of their players. These funds are directed to the development of the club’s material and technical base.",
      ru: "Футбольные клубы и академии получают 20% от стоимости каждой проведённой аттестации своих воспитанников. Эти средства направляются на развитие материально-технической базы клуба.",
    },
  },

  voluntary: {
    en: "Voluntary principle: participation in attestation on the FixAct Sport platform is strictly voluntary. The decision to participate is made independently by the participant or the participant’s legal representatives.",
   ru: "Принцип добровольности: аттестация на платформе ФиксАкт Спорт проводится исключительно на добровольной основе. Решение об участии принимается участником самостоятельно либо его законными представителями.",
  },

  advantages: {
    title: {
      en: "Why this matters",
      ru: "Почему это важно",
    },

    bullets: [
  {
    en: "Only what is performed on video within the time limit counts.",
    ru: "Считается только то, что выполнено на видео в установленное время.",
  },
  {
    en: "Up to three attempts are allowed. One result is selected.",
    ru: "Доступно до трёх попыток. В зачёт идёт один результат.",
  },
  {
    en: "The result is recorded and cannot be changed afterwards.",
    ru: "Результат фиксируется и не может быть изменён после выполнения.",
  },
      {
    en: "Each attestation is part of the same scale. That is what makes comparison fair.",
    ru: "Каждая аттестация — стандартизированная шкала. Места определяются по результату.",
  },
]
  },

  disclaimer: {
    en: "The Operator may update the terms of the grant program and distribution rules to preserve fairness, integrity of the ranking model, and sustainable operation of the platform.",
    ru: "Оператор вправе обновлять условия грантовой программы и правила распределения для сохранения справедливости, целостности рейтинговой модели и устойчивой работы платформы.",
  },
} as const;