import { useState } from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";
import logoImage from "@/assets/fixact-sport-logo.svg";
const betaImage1 = "/Beta image/1.avif";
const betaImage2 = "/Beta image/2.avif";
const betaImage3 = "/Beta image/3.avif";
const betaImage4 = "/Beta image/4.avif";
const betaImage5 = "/Beta image/5.avif";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const AGE_OPTIONS = {
  ru: ["До 12 лет", "13–15 лет", "16–18 лет", "19–24 года", "25+ лет"],
  en: ["Under 12", "13–15", "16–18", "19–24", "25+"],
} as const;

const PARTICIPANT_OPTIONS = {
  ru: ["Я сам", "Мой ребенок", "Я тренер", "Я представляю клуб / академию"],
  en: ["Myself", "My child", "I am a coach", "I represent a club / academy"],
} as const;

const LEVEL_OPTIONS = {
  ru: ["Профессионально", "Академия / спортивная школа", "Любительски", "Начинающий"],
  en: ["Professional", "Academy / sports school", "Amateur", "Beginner"],
} as const;

const PRIORITY_OPTIONS = {
  ru: [
    "Честная и понятная оценка навыков",
    "Возможность заявить о себе",
    "Участие в соревнованиях",
    "Контроль прогресса",
    "Возможность для ребенка получить шанс",
  ],
  en: [
    "Fair and clear skill evaluation",
    "A chance to get noticed",
    "Participation in competitions",
    "Progress tracking",
    "A chance for a child to get an opportunity",
  ],
} as const;

const TAPE_IMAGES = [
  betaImage1,
  betaImage2,
  betaImage3,
  betaImage4,
  betaImage5,
] as const;

export default function BetaTesting() {
  const locale = useLanguage();
  const tr = translations.betaTestingPage;

  const [form, setForm] = useState({
    email: "",
    age: "",
    participantType: "",
    footballLevel: "",
    city: "",
    priority: "",
    consent: false,
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const ageOptions = locale === "ru" ? AGE_OPTIONS.ru : AGE_OPTIONS.en;
  const participantOptions =
    locale === "ru" ? PARTICIPANT_OPTIONS.ru : PARTICIPANT_OPTIONS.en;
  const levelOptions = locale === "ru" ? LEVEL_OPTIONS.ru : LEVEL_OPTIONS.en;
  const priorityOptions =
    locale === "ru" ? PRIORITY_OPTIONS.ru : PRIORITY_OPTIONS.en;

  const tapeCards = [...TAPE_IMAGES, ...TAPE_IMAGES];

  const supportContent =
    locale === "ru"
      ? {
          chips: ["Закрытый набор участников", "Поэтапный доступ по заявке"],
          railLabel: "Контролируемый вход",
          railTitle: "Кто получает ранний доступ",
          railIntro:
            "Ранний доступ получают те, кто хочет войти в систему в числе первых: игроки, родители, тренеры и футбольные организации.",
          sections: [
            {
              title: "Что происходит после подачи заявки",
              lines: [
                "Заявка фиксируется и попадает в список ожидания.",
                "Доступ открывается поэтапно, без случайного набора.",
                "Приглашение направляется на указанную электронную почту.",
              ],
            },
            {
              title: "Почему важно войти сейчас",
              lines: [
                "Первые участники раньше входят в рабочую среду платформы.",
                "Они раньше получают доступ к новым механизмам оценки.",
                "Они раньше участвуют в структурированной системе сравнения.",
              ],
            },
          ],
          successTitle: "Ваша заявка принята",
          successBody:
            "Здравствуйте! Ваша заявка на закрытый бета-доступ ФиксАкт Спорт принята. Вы добавлены в список ожидания. Мы открываем доступ поэтапно и свяжемся с вами по этой электронной почте.",
        }
      : {
          chips: ["Closed participant intake", "Staged access by request"],
          railLabel: "Controlled entry",
          railTitle: "Who receives early access",
          railIntro:
            "Early access is intended for those who want to enter the system first: players, parents, coaches, and football organizations.",
          sections: [
            {
              title: "What happens after submission",
              lines: [
                "Your application is recorded and placed into the waiting list.",
                "Access is opened in stages rather than randomly.",
                "An invitation is sent to the email address you provide.",
              ],
            },
            {
              title: "Why it matters to enter now",
              lines: [
                "Early participants enter the working environment of the platform sooner.",
                "They receive earlier access to new evaluation mechanics.",
                "They participate sooner in the structured comparison system.",
              ],
            },
          ],
          successTitle: "Your application has been accepted",
          successBody:
            "Hello! Your application for closed beta access to FixAct Sport has been accepted. You have been added to the waiting list. We open access in stages and will contact you at this email address.",
        };

  const handleChange = (
    key: keyof typeof form,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.email.trim()) {
      setError(
        locale === "ru"
          ? "Укажите, пожалуйста, вашу электронную почту."
          : "Please enter your email.",
      );
      return;
    }

    if (
      !form.age ||
      !form.participantType ||
      !form.footballLevel ||
      !form.city.trim()
    ) {
      setError(
        locale === "ru"
          ? "Заполните обязательные поля формы."
          : "Please complete the required fields.",
      );
      return;
    }

    if (!form.consent) {
      setError(
        locale === "ru"
          ? "Необходимо согласие на обработку персональных данных."
          : "Consent is required.",
      );
      return;
    }

    if (!captchaToken) {
      setError(
        locale === "ru"
          ? "Подтвердите, что вы не робот."
          : "Please complete the captcha.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://functions.yandexcloud.net/d4e3vp083rq86otr96dt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            age: form.age,
            participantType: form.participantType,
            footballLevel: form.footballLevel,
            city: form.city,
            priority: form.priority,
            consent: form.consent,
            locale,
            captchaToken,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Request failed");
      }

      setSuccess(true);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : locale === "ru"
            ? "Не удалось отправить заявку. Попробуйте еще раз."
            : "Failed to submit. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,64,175,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(190,24,93,0.08),transparent_28%)]" />

        <div className="mx-auto w-full max-w-[1760px] px-6 py-10 md:px-10 md:py-14 xl:px-16 xl:py-16">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(500px,0.92fr)_minmax(320px,0.68fr)] xl:items-start xl:gap-8 2xl:grid-cols-[minmax(0,0.95fr)_minmax(540px,0.95fr)_minmax(340px,0.7fr)]">
            <div className="relative z-10 pt-2">
              <img
                src={logoImage}
                alt="FixAct Sport"
                className="h-auto w-[176px] md:w-[212px] xl:w-[232px]"
                decoding="async"
                loading="eager"
              />

              <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500 md:text-xs">
                {t(tr.kicker, locale)}
              </div>

              <h1 className="mt-4 max-w-[11ch] text-4xl font-semibold leading-[0.92] tracking-tight text-black md:text-6xl xl:text-[66px]">
                {t(tr.title, locale)}
              </h1>

              <p className="mt-5 max-w-[640px] text-base leading-relaxed text-neutral-600 md:text-lg xl:max-w-[560px]">
                {t(tr.subtitle, locale)}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {supportContent.chips.map((chip) => (
                  <div
                    key={chip}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                  >
                    {chip}
                  </div>
                ))}
              </div>

              <div className="mt-8 hidden xl:block">
                <div className="relative h-[540px] overflow-hidden rounded-[34px] border border-neutral-200 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.10),rgba(255,255,255,1)_62%)] shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
                  <div className="absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white via-white/95 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white via-white/95 to-transparent" />

                  <div className="beta-prize-tape flex flex-col gap-4 px-4 py-4">
                    {tapeCards.map((imageSrc, idx) => (
                      <div
                        key={`beta-tape-card-${idx}`}
                        className="overflow-hidden rounded-[26px] border border-neutral-200 bg-white p-[10px] shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
                      >
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.10),rgba(255,255,255,1)_62%)]">
                          <img
                            src={imageSrc}
                            alt={locale === "ru" ? "Призовой визуал" : "Prize visual"}
                            className="block h-full w-full object-contain"
                            decoding="async"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <style>{`
                  @keyframes betaPrizeTape {
                    0% {
                      transform: translateY(0);
                    }
                    100% {
                      transform: translateY(-50%);
                    }
                  }

                  .beta-prize-tape {
                    animation: betaPrizeTape 32s linear infinite;
                  }
                `}</style>
              </div>
            </div>

            <div className="relative z-10 rounded-[34px] border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8 xl:p-9">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                {t(tr.formLabel, locale)}
              </div>

              {!success ? (
                <form
                  className="mt-7 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleSubmit();
                  }}
                >
                  <div>
                    <label
                      htmlFor="beta-email"
                      className="block text-sm font-semibold text-black md:text-base"
                    >
                      {t(tr.emailLabel, locale)}
                    </label>
                    <input
                      id="beta-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="name@example.com"
                      className="mt-3 h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-base text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="beta-age"
                      className="block text-sm font-semibold text-black md:text-base"
                    >
                      {t(tr.ageLabel, locale)}
                    </label>
                    <select
                      id="beta-age"
                      name="age"
                      value={form.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      className="mt-3 h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-base text-black outline-none transition-colors focus:border-neutral-500"
                    >
                      <option value="" disabled>
                        {t(tr.selectPlaceholder, locale)}
                      </option>
                      {ageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="beta-participant"
                      className="block text-sm font-semibold text-black md:text-base"
                    >
                      {t(tr.participantLabel, locale)}
                    </label>
                    <select
                      id="beta-participant"
                      name="participantType"
                      value={form.participantType}
                      onChange={(e) =>
                        handleChange("participantType", e.target.value)
                      }
                      className="mt-3 h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-base text-black outline-none transition-colors focus:border-neutral-500"
                    >
                      <option value="" disabled>
                        {t(tr.selectPlaceholder, locale)}
                      </option>
                      {participantOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="beta-level"
                      className="block text-sm font-semibold text-black md:text-base"
                    >
                      {t(tr.levelLabel, locale)}
                    </label>
                    <select
                      id="beta-level"
                      name="footballLevel"
                      value={form.footballLevel}
                      onChange={(e) =>
                        handleChange("footballLevel", e.target.value)
                      }
                      className="mt-3 h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-base text-black outline-none transition-colors focus:border-neutral-500"
                    >
                      <option value="" disabled>
                        {t(tr.selectPlaceholder, locale)}
                      </option>
                      {levelOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="beta-city"
                      className="block text-sm font-semibold text-black md:text-base"
                    >
                      {t(tr.cityLabel, locale)}
                    </label>
                    <input
                      id="beta-city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="mt-3 h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-base text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="beta-priority"
                      className="block text-sm font-semibold text-black md:text-base"
                    >
                      {t(tr.priorityLabel, locale)}
                    </label>
                    <select
                      id="beta-priority"
                      name="priority"
                      value={form.priority}
                      onChange={(e) => handleChange("priority", e.target.value)}
                      className="mt-3 h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-base text-black outline-none transition-colors focus:border-neutral-500"
                    >
                      <option value="" disabled>
                        {t(tr.selectPlaceholder, locale)}
                      </option>
                      {priorityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-[28px] border border-neutral-300 bg-neutral-50 p-5">
                    <SmartCaptcha
                      sitekey="ysc1_KwlYAPNRLl9VY5NvCoJeryWA67MsKBh7Ea7YzQmb9d1cd87b"
                      onSuccess={(token) => setCaptchaToken(token)}
                    />
                  </div>

                  <label className="flex items-start gap-3 rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-black"
                    />
                    <span className="text-sm leading-relaxed text-neutral-700 md:text-base">
                      {t(tr.consentLabel, locale)}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "..." : t(tr.submitLabel, locale)}
                  </button>

                  {error ? (
                    <div className="text-sm font-medium text-red-600">{error}</div>
                  ) : null}

                  <p className="text-sm leading-relaxed text-neutral-500">
                    {t(tr.backendNote, locale)}
                  </p>
                </form>
              ) : (
                <div className="mt-7 rounded-[28px] border border-emerald-200 bg-emerald-50 p-6">
                  <div className="text-xl font-semibold text-black md:text-2xl">
                    {supportContent.successTitle}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">
                    {supportContent.successBody}
                  </p>
                </div>
              )}
            </div>

            <div className="relative z-10">
              <div className="rounded-[34px] border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  {supportContent.railLabel}
                </div>

                <h2 className="mt-4 text-2xl font-semibold leading-tight text-black md:text-[30px]">
                  {supportContent.railTitle}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-neutral-700">
                  {supportContent.railIntro}
                </p>

                <div className="mt-8 space-y-7">
                  {supportContent.sections.map((section) => (
                    <div key={section.title}>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        {section.title}
                      </div>

                      <ul className="mt-4 space-y-3">
                        {section.lines.map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-4 text-base leading-relaxed text-neutral-700"
                          >
                            <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-black" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}