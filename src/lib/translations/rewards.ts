export const rewards = {
  kicker: {
    en: "Season Results",
    ru: "Результаты сезона",
  },

  title: {
    en: "Season 2026 Grants",
    ru: "Гранты сезона 2026",
  },

  subtitle: {
    en: "The ranking position determines the grant amount.",
    ru: "Место в рейтинге определяет размер гранта.",
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
      en: "For clubs and academies",
      ru: "Клубам и академиям",
    },

    body: {
      en: "Partner organizations may receive 20% from completed attestations of their players, under the program terms.",
      ru: "Партнёрские организации могут получать 20% от проведённых аттестаций своих воспитанников — по условиям программы.",
    },
  },

  voluntary: {
    en: "Participation is voluntary. The participant or legal representative decides independently.",
    ru: "Участие добровольное. Решение принимает участник или его законный представитель.",
  },

  disclaimer: {
    en: "Grant terms and distribution rules may be updated before or during the season.",
    ru: "Условия грантов и правила распределения могут обновляться до начала или в ходе сезона.",
  },
} as const;