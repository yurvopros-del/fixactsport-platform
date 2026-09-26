export const rewards = {
  kicker: {
    en: "Public Reward Rules v1",
    ru: "Публичные правила вознаграждений V1",
  },
  title: {
    en: "Contractual rewards funded by FixAct Sport",
    ru: "Договорные вознаграждения за спортивный результат",
  },
  subtitle: {
    en: "The 2,000 ₽ participant payment buys the official attestation service. It is not a stake and does not form a participant-funded prize pool.",
    ru: "Платёж 2 000 ₽ — это оплата услуги официальной аттестации. Он не является ставкой и не формирует призовой фонд из средств участников.",
  },
  facts: [
    {
      title: { en: "Who can enter", ru: "Кто участвует" },
      body: {
        en: "Adults aged 18+ in the adults_18_plus category.",
        ru: "Совершеннолетние спортсмены 18+ в категории adults_18_plus.",
      },
    },
    {
      title: { en: "Round size", ru: "Размер раунда" },
      body: {
        en: "No more than 500 unique eligible participants.",
        ru: "Не более 500 уникальных допущенных участников.",
      },
    },
    {
      title: { en: "When entry closes", ru: "Когда закрывается набор" },
      body: {
        en: "At the earlier of the 500th accepted participant or 365 calendar days from the published opening date.",
        ru: "По более раннему событию: принят 500-й участник или прошло 365 календарных дней с опубликованной даты открытия.",
      },
    },
    {
      title: { en: "Minimum reward cohort", ru: "Минимум для вознаграждений" },
      body: {
        en: "Fewer than 100 eligible participants means no monetary reward.",
        ru: "Если допущенных участников меньше 100, денежное вознаграждение не выплачивается.",
      },
    },
  ],
  table: {
    headers: [
      { en: "Eligible cohort", ru: "Итоговая когорта" },
      { en: "Reward-bearing ranks", ru: "Вознаграждаемые места" },
      { en: "Gross amounts by position", ru: "Валовые суммы по позициям" },
      { en: "Maximum envelope", ru: "Максимальная сумма" },
    ],
    rows: [
      {
        cohort: { en: "100–199", ru: "100–199" },
        ranks: { en: "1–5", ru: "1–5" },
        amounts: {
          en: "11,000; 8,000; 6,000; 5,000; 5,000 ₽",
          ru: "11 000; 8 000; 6 000; 5 000; 5 000 ₽",
        },
        envelope: { en: "35,000 ₽", ru: "35 000 ₽" },
      },
      {
        cohort: { en: "200–299", ru: "200–299" },
        ranks: { en: "1–10", ru: "1–10" },
        amounts: {
          en: "25,000; 15,000; 10,000; 8,000; 7,000 ₽; ranks 6–10: 6,000 ₽ each",
          ru: "25 000; 15 000; 10 000; 8 000; 7 000 ₽; места 6–10 — по 6 000 ₽",
        },
        envelope: { en: "95,000 ₽", ru: "95 000 ₽" },
      },
      {
        cohort: { en: "300–399", ru: "300–399" },
        ranks: { en: "1–15", ru: "1–15" },
        amounts: {
          en: "40,000; 25,000; 15,000 ₽; ranks 4–5: 10,000 ₽ each; ranks 6–15: 6,000 ₽ each",
          ru: "40 000; 25 000; 15 000 ₽; места 4–5 — по 10 000 ₽; места 6–15 — по 6 000 ₽",
        },
        envelope: { en: "160,000 ₽", ru: "160 000 ₽" },
      },
      {
        cohort: { en: "400–499", ru: "400–499" },
        ranks: { en: "1–20", ru: "1–20" },
        amounts: {
          en: "55,000; 30,000; 20,000 ₽; ranks 4–5: 12,500 ₽ each; ranks 6–10: 7,000 ₽ each; ranks 11–20: 6,000 ₽ each",
          ru: "55 000; 30 000; 20 000 ₽; места 4–5 — по 12 500 ₽; места 6–10 — по 7 000 ₽; места 11–20 — по 6 000 ₽",
        },
        envelope: { en: "225,000 ₽", ru: "225 000 ₽" },
      },
      {
        cohort: { en: "500", ru: "500" },
        ranks: { en: "1–25", ru: "1–25" },
        amounts: {
          en: "65,000; 40,000; 25,000 ₽; ranks 4–5: 15,000 ₽ each; ranks 6–10: 10,000 ₽ each; ranks 11–15: 7,000 ₽ each; ranks 16–25: 5,000 ₽ each",
          ru: "65 000; 40 000; 25 000 ₽; места 4–5 — по 15 000 ₽; места 6–10 — по 10 000 ₽; места 11–15 — по 7 000 ₽; места 16–25 — по 5 000 ₽",
        },
        envelope: { en: "295,000 ₽", ru: "295 000 ₽" },
      },
    ],
  },
  ranking: {
    en: "Ranking follows the published final score in descending order. Equal scores share a rank (for example 1, 2, 2, 4); time, registration order, athlete ID and randomness are not tie-breakers. A tied group shares the combined position pool under the published rules.",
    ru: "Рейтинг строится по опубликованному итоговому баллу по убыванию. При равных баллах спортсмены делят место (например, 1, 2, 2, 4); время, порядок регистрации, идентификатор и случайность не используются. Связанная группа делит сумму соответствующих позиций по опубликованным правилам.",
  },
  residency: {
    en: "Cash reward eligibility is checked at the actual payout date and requires Russian tax residency. Citizenship alone is not the test. Published amounts are gross before withholding.",
    ru: "Право на денежную выплату проверяется на фактическую дату выплаты и требует налогового резидентства России. Гражданство само по себе не является критерием. Все суммы указаны до удержания НДФЛ.",
  },
  payoutStatus: {
    en: "Publishing these terms does not itself enable technical execution of real payouts. Real payouts remain disabled until a separate controlled activation.",
    ru: "Публикация этих условий сама по себе не включает техническое исполнение реальных выплат. Реальные выплаты остаются отключены до отдельной контролируемой активации.",
  },
  disclaimer: {
    en: "The published reward schedule cannot be reduced after entry opens. Any later change requires a new rules version and does not alter an already-started round.",
    ru: "После открытия набора опубликованное расписание вознаграждений нельзя уменьшить. Любое последующее изменение требует новой версии правил и не меняет уже начатый раунд.",
  },
} as const;
