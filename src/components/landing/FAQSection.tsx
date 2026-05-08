import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "FAQ",
    title: "Questions along the participant path",
    items: [
      {
        q: "Where does participation begin?",
        a: "Participation begins with the app: the participant registers, chooses an available season, and follows the rules of the task.",
      },
      {
        q: "Why is video verification needed?",
        a: "Verification protects the ranking and makes sure that results are compared under common rules.",
      },
      {
        q: "How does a participant enter the ranking?",
        a: "After the result is uploaded and verified, it can be counted in the season ranking.",
      },
      {
        q: "Are grants guaranteed?",
        a: "No. Grant support depends on the participant’s final place in the season ranking and the program rules.",
      },
    ],
  },
  ru: {
    kicker: "FAQ",
    title: "Вопросы по пути участника",
    items: [
      {
        q: "С чего начинается участие?",
        a: "Участие начинается с приложения: участник регистрируется, выбирает доступный сезон и следует правилам задания.",
      },
      {
        q: "Зачем нужна проверка видео?",
        a: "Проверка защищает рейтинг и помогает сравнивать результаты по единым правилам.",
      },
      {
        q: "Как участник попадает в рейтинг?",
        a: "После загрузки и проверки результат может быть учтён в рейтинге сезона.",
      },
      {
        q: "Гранты гарантированы?",
        a: "Нет. Грантовая поддержка зависит от итогового места участника в рейтинге сезона и правил программы.",
      },
    ],
  },
} as const;

const FAQSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="faq" className="bg-white py-20 text-slate-950 md:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="text-center">
          <div className="label text-slate-500">{copy.kicker}</div>
          <h2 className="mt-6 heading-lg">{copy.title}</h2>
        </div>

        <div className="mt-12 grid gap-4">
          {copy.items.map((item) => (
            <article
              key={item.q}
              className="rounded-[26px] border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="heading-sm text-slate-950">{item.q}</h3>
              <p className="mt-4 body-md text-slate-700">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
