export type Locale = "en" | "ru";

export const translations = {
  nav: {
    system: { en: "The System", ru: "Система" },
    rewards: { en: "Rewards", ru: "Награды" },
    cta: { en: "Request Beta Access", ru: "ЗАПРОСИТЬ Beta ДОСТУП" },
    joinMobile: { en: "Request Beta Access", ru: "Запросить доступ" },
  },
  hero: {
    headline1: { en: "WHERE MERIT IS", ru: "ГДЕ МАСТЕРСТВО —" },
    headline2: { en: "THE ONLY CURRENCY", ru: "ЕДИНСТВЕННАЯ ВАЛЮТА" },
    body: {
      en: "Athletic talent verified, ranked, and rewarded. No connections. No politics. Just performance.",
      ru: "Спортивный талант верифицирован, оценён и вознаграждён. Без связей. Без политики. Только результат.",
    },
    cta: { en: "Request Beta Access", ru: "Запросить доступ" },
    slideLabel: { en: "Slide", ru: "Слайд" },
  },
  heroSlides: [
    {
      headline: { en: "GLORY BELONGS TO THE FEARLESS", ru: "СЛАВА ПРИНАДЛЕЖИТ БЕССТРАШНЫМ" },
      tagline: { en: "Real prizes for real performance.", ru: "Реальные призы за реальные результаты." },
    },
    {
      headline: { en: "THE ARENA AWAITS", ru: "ТВОЙ ВЫХОД НА АРЕНУ!" },
      tagline: { en: "Thousands already record results worldwide.", ru: "Сильные результаты видят во всём мире." },
    },
    {
      headline: { en: "HEAD UP, GAME ON", ru: "УМНЫЙ КОНТРОЛЬ" },
      tagline: { en: "The ball obeys the composed. Control the chaos.", ru: "Думай головой. Мяч послушен, когда разум спокоен." },
    },
    {
      headline: { en: "AMBIDEXTROUS POWER", ru: "ТЕХНИЧЕСКАЯ ГАРМОНИЯ" },
      tagline: { en: "A true footballer has no weak foot. Only two weapons.", ru: "У футболиста нет «слабой» ноги. Есть вторая рабочая." },
    },
    {
      headline: { en: "THE CLASSICAL SCHOOL", ru: "ЧИСТОТА ШКОЛЫ" },
      tagline: { en: "Every touch is the signature of a master.", ru: "Каждое касание — как почерк мастера." },
    },
    {
      headline: { en: "TAKE YOUR PLACE IN THE RANKING", ru: "ЗАЙМИ СВОЁ МЕСТО В РЕЙТИНГЕ" },
      tagline: { en: "Verified. Recorded. Ranked.", ru: "Проверено. Оценено. Зафиксировано." },
    },
    {
      headline: { en: "CLAIM YOUR STATUS", ru: "ВРЕМЯ ПОКАЗАТЬ КЛАСС" },
      tagline: { en: "Your score is your verified technical ID. Step up.", ru: "Твой рейтинг — твои повышенные шансы пропуска в большой футбол." },
    },
    {
      headline: { en: "OWN THE TEMPO", ru: "ПОЙМАЙ СВОЙ РИТМ" },
      tagline: { en: "Find your flow. Command the pulse of the match.", ru: "Диктуй темп игры. Будь дирижером на поле." },
    },
  ],
  philosophy: {
    headline1: { en: "MASTERY. WORK. RESULTS.", ru: "МАСТЕРСТВО. ТРУД. РЕЗУЛЬТАТ." },
    headline2: { en: "", ru: "" },
    body: {
      en: "Fixact Sport is a digital environment where submitted results are recorded, technologically verified, and compared based on objective data. Only confirmed results are reflected in the ranking.",
      ru: "ФиксАкт Спорт создан как цифровая среда, где результаты фиксируются, проверяются и сравниваются на основе объективных данных. Здесь значение имеет только подтверждённый результат.",
    },
  },
  system: {
    label: { en: "How It Works", ru: "Как Это Работает" },
    title: { en: "THE SYSTEM", ru: "СИСТЕМА" },
    steps: [
      {
        number: "01",
        title: { en: "DIGITAL ANALYSIS", ru: "ЦИФРОВОЙ АНАЛИЗ" },
        description: {
          en: "Each test is processed automatically using computer vision and measurable parameters.",
          ru: "Каждый тест проходит автоматизированную обработку на основе компьютерного зрения и измеряемых параметров.",
        },
        bullets: [
          { en: "biomechanical correctness", ru: "биомеханическая корректность" },
          { en: "tempo stability", ru: "темповая стабильность" },
          { en: "technical variation", ru: "техническая вариативность" },
          { en: "weak-foot usage", ru: "использование слабой ноги" },
          { en: "dynamic resilience", ru: "динамическая устойчивость" },
        ],
      },
      {
        number: "02",
        title: { en: "EXPERT CONTROL", ru: "ЭКСПЕРТНЫЙ КОНТРОЛЬ" },
        description: {
          en: "The system uses a two-layer verification process for results.",
          ru: "Система использует двухконтурную проверку результатов.",
        },
        bullets: [
          {
            en: "verification of video material authenticity (editing, speed manipulation, digital interference)",
            ru: "контроль достоверности видеоматериалов (монтаж, ускорение, цифровые вмешательства)",
          },
          {
            en: "FixAct Sport aims for verification by certified sports referees and all-Russian category officials (VK) to ensure the highest level of trust and independence.",
            ru: "ФиксАкт Спорт стремится к верификации сертифицированными спортивными арбитрами и судьями всероссийских категорий (ВК) для обеспечения высшего уровня доверия и независимости.",
          },
        ],
        footer: {
          en: "The final metric is formed in accordance with a regulated verification protocol.",
          ru: "Формирование итогового показателя осуществляется в соответствии с регламентированным протоколом проверки.",
        },
      },
      {
        number: "03",
        title: { en: "ATTESTATION INDEX FIXACT SPORT", ru: "АТТЕСТАЦИОННЫЙ ИНДЕКС ФИКСАКТ СПОРТ" },
        description: {
          en: "The final index is calculated to 0.001 precision and is based on measurable performance indicators.",
          ru: "Итоговый индекс рассчитывается с точностью до 0,001 и формируется на основе измеряемых параметров.",
        },
        bullets: [
          { en: "quantitative output", ru: "количественный результат" },
          { en: "technical variation", ru: "техническая вариативность" },
          { en: "tempo stability", ru: "стабильность темпа" },
          { en: "fatigue resistance", ru: "устойчивость к утомлению" },
          { en: "progress dynamics", ru: "динамика прогресса" },
        ],
        footer: {
          en: "The index is used for objective evaluation of training level and development monitoring.",
          ru: "Индекс используется для объективной оценки уровня подготовки и мониторинга развития.",
        },
      },
    ],
    pool: {
      title: { en: "REGULATIONS FOR FORMING THE ATTESTATION GROUP", ru: "РЕГЛАМЕНТ ФОРМИРОВАНИЯ АТТЕСТАЦИОННОЙ ГРУППЫ" },
      body: { en: "Each attestation group is formed dynamically.", ru: "Каждая аттестационная группа формируется динамически." },
      bullets: [
        { en: "one group includes up to 500 participants", ru: "одна группа включает до 500 участников" },
        { en: "if exceeded, the next group is formed automatically", ru: "при превышении автоматически формируется следующая группа" },
        { en: "if underfilled, formation continues until the established minimum threshold is reached", ru: "при недоборе формирование продолжается до достижения установленного минимального порога" },
      ],
      footer: {
        en: "Distribution is performed automatically under an approved rating algorithm, excluding subjective influence.",
        ru: "Распределение осуществляется автоматически по утвержденному алгоритму расчета рейтинга, исключающему субъективное влияние.",
      },
    },
  },

  rewards: {
    kicker: { en: "Program", ru: "Программа" },

    title: { en: "FixAct Sport Grant & Incentive Program", ru: "Программа грантовой поддержки ФиксАкт Спорт" },
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
          benefit: { en: "Maximum support allocation", ru: "Максимальный уровень поддержки" },
        },
        {
          status: { en: "Tier 2", ru: "Уровень 2" },
          grant: { en: "25,000 ₽", ru: "25 000 ₽" },
          benefit: { en: "High support allocation", ru: "Высокий уровень поддержки" },
        },
        {
          status: { en: "Tier 3", ru: "Уровень 3" },
          grant: { en: "10,000 ₽", ru: "10 000 ₽" },
          benefit: { en: "Meaningful financial backing", ru: "Существенная финансовая поддержка" },
        },
        {
          status: { en: "Tier 4", ru: "Уровень 4" },
          grant: { en: "5,000 ₽", ru: "5 000 ₽" },
          benefit: { en: "Entry support allocation", ru: "Базовый уровень поддержки" },
        },
      ],
    },

    b2b: {
      title: { en: "For Partner Organizations (B2B):", ru: "Информация для партнерских организаций (B2B):" },
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
      title: { en: "The FixAct Sport Advantage:", ru: "Преимущества ФиксАкт Спорт:" },
      bullets: [
        { en: "High Odds: 1 in 10 participants receives financial backing.", ru: "Статистика: Каждый 10-й участник получает грант." },
        { en: "Data-Driven: grants are awarded based on verified, objective scores.", ru: "Объективность: Все баллы верифицированы ИИ и экспертами." },
        { en: "Continuous Cycles: a new fund begins as soon as the current group is filled.", ru: "Регулярность: Новый фонд открывается сразу после заполнения текущей группы." },
      ],
    },

    disclaimer: {
      en: "Disclaimer: Program conditions and allocation rules may be updated by the Operator to maintain integrity, compliance, and sustainability.",
      ru: "Дисклеймер: Условия программы и правила распределения могут обновляться Оператором в целях обеспечения добросовестности, соответствия требованиям и устойчивости.",
    },
  },

  download: {
    headline1: { en: "READY TO", ru: "ГОТОВ" },
    headline2: { en: "SUBMIT RESULTS?", ru: "ПРЕДСТАВИТЬ РЕЗУЛЬТАТ?" },
    body: {
      en: "Showcase your performance on the global stage.",
      ru: "Стань частью поколения победителей. Докажи силу на мировой арене.",
    },
    ios: { en: "Request Beta Access (iOS)", ru: "Запросить доступ (iOS)" },
    android: { en: "Request Beta Access (Android)", ru: "Запросить доступ (Android)" },
    betaNote: { en: "Closed beta. Selected participants receive early access.", ru: "Закрытая бета. Выбранные участники получают ранний доступ." },
  },
  footer: {
    rights: { en: "All rights reserved.", ru: "Все права защищены." },
    operator: { en: 'Operator: LLC "CTT Etalon"', ru: 'Оператор: ООО «ЦТТ Эталон»' },
    privacy: { en: "Privacy Policy", ru: "Политика конфиденциальности" },
    terms: { en: "User Agreement", ru: "Пользовательское соглашение" },
    contact: { en: "Contact", ru: "Контакты" },
    beta: { en: "Beta Testing", ru: "Бета-тестирование" },
    cookiePolicy: { en: "Cookie Policy", ru: "Политика Cookie" },
  },
  cookieBanner: {
    text: {
      en: "This website uses cookies to ensure platform functionality and analytics. By continuing to use Fixact Sport, you consent to cookie use.",
      ru: "Этот сайт использует файлы cookie для обеспечения работы платформы и аналитики. Продолжая использовать ФиксАкт Спорт, вы соглашаетесь на использование cookie.",
    },
    learnMore: { en: "Learn more", ru: "Подробнее" },
    ok: { en: "OK", ru: "OK" },
  },
  cookiePage: {
    title: { en: "Cookie Policy", ru: "Политика Cookie" },
    enVersion: { en: "English version", ru: "English version" },
    ruVersion: { en: "Русская версия", ru: "Русская версия" },
    download: { en: "Download PDF", ru: "Скачать PDF" },
  },
  privacyPage: {
    title: { en: "Privacy Policy", ru: "Политика конфиденциальности" },
    enVersion: { en: "English version", ru: "English version" },
    ruVersion: { en: "Русская версия", ru: "Русская версия" },
    download: { en: "Download PDF", ru: "Скачать PDF" },
  },
  userAgreementPage: {
    title: { en: "User Agreement", ru: "Пользовательское соглашение" },
    enVersion: { en: "English version", ru: "English version" },
    ruVersion: { en: "Русская версия", ru: "Русская версия" },
    download: { en: "Download PDF", ru: "Скачать PDF" },
  },
  betaTestingPage: {
    title: { en: "Beta Testing", ru: "Бета-тестирование" },
    enVersion: { en: "English version", ru: "English version" },
    ruVersion: { en: "Русская версия", ru: "Русская версия" },
    download: { en: "Download PDF", ru: "Скачать PDF" },
  },
  privacyBanner: {
    text: {
      en: "We process personal data to operate the Fixact Sport platform, provide analytical services, and improve functionality.",
      ru: "Мы обрабатываем персональные данные для работы платформы ФиксАкт Спорт, предоставления аналитических сервисов и улучшения функциональности.",
    },
    privacyLink: { en: "Privacy Policy", ru: "Политикой конфиденциальности" },
    and: { en: "and", ru: "и" },
    cookieLink: { en: "Cookie Policy", ru: "Политикой Cookie" },
    accept: { en: "Accept", ru: "Принять" },
    decline: { en: "Decline", ru: "Отклонить" },
  },
  notFound: {
    message: { en: "Oops! Page not found", ru: "Страница не найдена" },
    backHome: { en: "Return to Home", ru: "Вернуться на главную" },
  },
} as const;

export function t(obj: { en: string; ru: string }, locale: Locale): string {
  return obj[locale];
}