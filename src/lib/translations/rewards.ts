export const rewards = {
  kicker: {
    en: "Season Results",
    ru: "Результаты сезона",
  },

  title: {
    en: "FixAct Sport Grants",
    ru: "Гранты ФиксАкт Спорт",
  },

  subtitle: {
    en: "Grant support is linked to the participant’s place in the Season 2026 ranking.",
    ru: "Грантовая поддержка связана с местом участника в рейтинге сезона 2026.",
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
      en: "For coaches and clubs",
      ru: "Тренерам и клубам",
    },

    body: {
      en: "Partner reward: football clubs and academies receive 20% of the cost of each completed attestation of their players. These funds are directed to the development of the club’s material and technical base.",
      ru: "Партнёрское вознаграждение: футбольные клубы и академии получают 20% от стоимости каждой проведённой аттестации своих воспитанников. Эти средства направляются на развитие материально-технической базы клуба.",
    },
  },

  voluntary: {
    en: "Voluntary principle: participation in attestation on the FixAct Sport platform is strictly voluntary. The decision to participate is made independently by the participant or the participant’s legal representatives.",
    ru: "Принцип добровольности: аттестация на платформе ФиксАкт Спорт проводится исключительно на добровольной основе. Решение об участии принимается участником самостоятельно либо его законными представителями.",
  },

  disclaimer: {
    en: "The Operator may update the terms of the grant program and distribution rules to preserve fairness, integrity of the ranking model, and sustainable operation of the platform.",
    ru: "Оператор вправе обновлять условия грантовой программы и правила распределения для сохранения справедливости, целостности рейтинговой модели и устойчивой работы платформы.",
  },
} as const;
