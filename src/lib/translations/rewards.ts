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
    en: "Season ranking determines the grant tier.",
    ru: "Чем выше место в рейтинге сезона — тем больше грант.",
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
          en: "30,000 ₽",
          ru: "30 000 ₽",
        },
      },
      {
        status: {
          en: "Second place in Season 2026 (2nd place)",
          ru: "Второе место в сезоне 2026 (2 место)",
        },
        grant: {
          en: "20,000 ₽",
          ru: "20 000 ₽",
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
      en: "Partners",
      ru: "Партнёры",
    },

    title: {
      en: "Separate partner terms",
      ru: "Отдельные партнёрские условия",
    },

    body: {
      en: "Partner terms are handled separately so this section stays focused on season grants and participant results.",
      ru: "Партнёрские условия вынесены отдельно, чтобы этот раздел оставался про гранты сезона и результаты участников.",
    },
  },

  voluntary: {
    en: "Participation is voluntary. The participant or legal representative decides independently.",
    ru: "Участие добровольное. Решение принимает участник или его законный представитель.",
  },

  disclaimer: {
    en: "Grant terms and distribution rules are governed by the program terms and may be updated before or during the season.",
    ru: "Условия грантов и правила распределения определяются правилами программы и могут обновляться до начала или в ходе сезона.",
  },
} as const;
