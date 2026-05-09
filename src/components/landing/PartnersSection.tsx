import { useLanguage } from "@/hooks/useLanguage";
import academyCutout from "@/assets/partners/academy-cutout.png";

const content = {
  en: {
    kicker: "Coaches • Clubs • Academies",
    title: "See the player before the first viewing.",
    body:
      "Before a trial, training session, or direct decision, a coach needs a clean first signal: how the participant controls the ball, keeps balance, preserves technique, and completes the task.",
    badge: "Attestation signal",
    imageAltMain: "Football academy and FixAct Sport mascot",
    items: [
      {
        title: "Verified signal",
        body:
          "Not a verbal claim and not a random highlight. The result appears after the participant completes the attestation path.",
      },
      {
        title: "Football context",
        body:
          "Age group, season, task conditions, and ranking position help a coach understand what the result actually means.",
      },
      {
        title: "For viewing and selection",
        body:
          "FixAct Sport does not replace the coach. It helps notice technique, balance, tempo, and discipline earlier.",
      },
      {
        title: "Partner interest",
        body:
          "A coach, club, or academy may receive up to 20% partner interest for participants or certificates from its own channel, under the programme terms.",
      },
    ],
    note:
      "The final sporting decision remains with the coach or club. The platform gives a cleaner first signal: who completed the path, what was confirmed, and where the result stands.",
  },
  ru: {
    kicker: "Тренерам • клубам • академиям",
    title: "Видеть игрока ДО просмотра!",
    body:
      "До отбора, тренировки и личного решения тренеру нужен первый честный сигнал: как участник владеет мячом, держит равновесие, сохраняет технику и выполняет задание.",
    badge: "Аттестационный сигнал",
    imageAltMain: "Футбольная академия и барс ФиксАкт Спорт",
    items: [
      {
        title: "Проверенный сигнал",
        body:
          "Не обещание и не случайная нарезка. Результат появляется после прохождения участником аттестационного пути.",
      },
      {
        title: "Футбольный контекст",
        body:
          "Возрастная группа, сезон, условия задания и место в рейтинге помогают тренеру понять, что именно показывает результат.",
      },
      {
        title: "Для просмотра и отбора",
        body:
          "ФиксАкт Спорт не заменяет тренера. Он помогает раньше заметить технику, устойчивость, темп и дисциплину.",
      },
      {
        title: "Партнёрская программа",
        body:
          "Тренер, клуб или академия могут получить до 20% партнёрского вознаградждения по участникам или сертификатам из своего контура — по условиям программы.",
      },
    ],
    note:
      "Итоговое спортивное решение остаётся за тренером или клубом. Платформа даёт более чистый первый сигнал: кто прошёл путь, что подтверждено и каков результат.",
  },
} as const;

const PartnersSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section
      id="partners"
      className="relative scroll-mt-28 overflow-hidden bg-white py-20 text-slate-950 md:py-28 xl:py-32"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-16">
          <div className="max-w-3xl">
            <div className="label text-slate-500">{copy.kicker}</div>

            <h2 className="mt-6 max-w-[12ch] heading-lg text-slate-950 md:max-w-[13ch]">
              {copy.title}
            </h2>

            <p className="mt-6 max-w-2xl body-lg text-slate-700">{copy.body}</p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {copy.badge}
            </div>
          </div>

          <div className="flex justify-center xl:justify-end">
            <img
              src={academyCutout}
              alt={copy.imageAltMain}
              decoding="async"
              loading="lazy"
              className="pointer-events-none w-full max-w-[560px] object-contain md:max-w-[700px] xl:max-w-[760px]"
            />
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {copy.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative flex min-h-[282px] flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-[#F8FAFC] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  aria-hidden="true"
                  className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              <h3 className="mt-7 max-w-[13ch] text-[1.45rem] font-black leading-[1.02] tracking-[-0.035em] text-slate-950 md:text-[1.6rem]">
                {item.title}
              </h3>

              <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-slate-600 md:text-base">
                {item.body}
              </p>

              <div aria-hidden="true" className="mt-auto pt-7">
                <div className="h-[3px] rounded-full bg-slate-200 transition-colors duration-300 group-hover:bg-emerald-500" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 text-center md:p-7">
          <p className="mx-auto max-w-4xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            {copy.note}
          </p>
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;

