export const rewards = {
  kicker: { en: "Program", ru: "Программа" },

  title: {
    en: "FixAct Sport Grant & Incentive Program",
    ru: "Программа грантовой поддержки ФиксАкт Спорт",
  },
  subtitle: {
    en: "For every group of 500 participants, the system unlocks a dedicated support fund. Your technical mastery is an asset that translates into tangible rewards.",
    ru: "Каждые 500 участников система формирует целевой фонд. Ваша техническая подготовка — это ваш актив, который конвертируется в реальную поддержку.",
  },

  table: {
    headers: [
      { en: "Ranking Status", ru: "Статус в рейтинге" },
      { en: "Grant Amount", ru: "Размер гранта" },
      { en: "Your Benefit", ru: "Ваша выгода" },
    ],
    rows: [
      {
        status: { en: "Tier 1", ru: "Уровень 1" },
        grant: { en: "50,000 ₽", ru: "50 000 ₽" },
        benefit: {
          en: "Maximum support allocation",
          ru: "Максимальный уровень поддержки",
        },
      },
      {
        status: { en: "Tier 2", ru: "Уровень 2" },
        grant: { en: "25,000 ₽", ru: "25 000 ₽" },
        benefit: {
          en: "High support allocation",
          ru: "Высокий уровень поддержки",
        },
      },
      {
        status: { en: "Tier 3", ru: "Уровень 3" },
        grant: { en: "10,000 ₽", ru: "10 000 ₽" },
        benefit: {
          en: "Meaningful financial backing",
          ru: "Существенная финансовая поддержка",
        },
      },
      {
        status: { en: "Tier 4", ru: "Уровень 4" },
        grant: { en: "5,000 ₽", ru: "5 000 ₽" },
        benefit: {
          en: "Entry support allocation",
          ru: "Базовый уровень поддержки",
        },
      },
    ],
  },

  b2b: {
    title: {
      en: "For Partner Organizations (B2B):",
      ru: "Информация для партнерских организаций (B2B):",
    },
    body: {
      en: "Partner Rewards: Football clubs and academies receive 20% of the fee for each completed assessment of their players. These funds are allocated to the development of the club's infrastructure.",
      ru: "Партнерское вознаграждение: Футбольные клубы и академии получают 20% от стоимости каждой проведенной аттестации своих воспитанников. Данные средства направляются на развитие материально-технической базы клуба.",
    },
    badge: { en: "20%", ru: "20%" },
  },

  voluntary: {
    en: "Voluntary Participation: Assessment on the FixAct Sport platform is strictly voluntary. The decision to participate is made independently by the participant's legal guardians.",
    ru: "Принцип добровольности: Аттестация на платформе ФиксАкт Спорт проводится исключительно на добровольной основе. Решение об участии принимается законными представителями участника самостоятельно.",
  },

  advantages: {
    title: {
      en: "The FixAct Sport Advantage:",
      ru: "Преимущества ФиксАкт Спорт:",
    },
    bullets: [
      {
        en: "High Odds: 1 in 10 participants receives financial backing.",
        ru: "Статистика: Каждый 10-й участник получает грант.",
      },
      {
        en: "Data-Driven: grants are awarded based on verified, objective scores.",
        ru: "Объективность: Все баллы верифицированы ИИ и экспертами.",
      },
      {
        en: "Continuous Cycles: a new fund begins as soon as the current group is filled.",
        ru: "Регулярность: Новый фонд открывается сразу после заполнения текущей группы.",
      },
    ],
  },

  disclaimer: {
    en: "Disclaimer: Program conditions and allocation rules may be updated by the Operator to maintain integrity, compliance, and sustainability.",
    ru: "Дисклеймер: Условия программы и правила распределения могут обновляться Оператором в целях обеспечения добросовестности, соответствия требованиям и устойчивости.",
  },
} as const;