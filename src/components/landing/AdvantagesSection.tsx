import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Advantages",
    title: "Play where you are. Show your level where it can be seen.",
    body: "FixAct Sport removes distance between a player and an opportunity: no expensive travel is needed to show technique, ball control, and the hunger to compete.",
    items: [
      {
        title: "No expensive travel",
        body: "Show your level from your own city — without flights, hotels, and extra family costs.",
      },
      {
        title: "Almost anywhere in the world",
        body: "With a ball, space, and a camera, a player can complete the attestation where they train.",
      },
      {
        title: "A chance to be noticed",
        body: "The video and result become a clear signal for academies, clubs, and coaches.",
      },
      {
        title: "Not only for insiders",
        body: "Not every player has an agent, connections, or access to a major academy. Here, ball control speaks first.",
      },
      {
        title: "Clear comparison",
        body: "A player sees their place among participants of the same age group and season.",
      },
      {
        title: "Grants for results",
        body: "A strong ranking position can open the path to grant support.",
      },
    ],
  },
  ru: {
    kicker: "Преимущества",
    title: "Играй там, где ты есть. Показывай уровень там, где тебя могут увидеть.",
    body: "ФиксАкт Спорт убирает лишнюю дорогу между игроком и шансом: не нужно ехать на дорогой турнир, чтобы показать технику, контроль мяча и готовность бороться за место.",
    items: [
      {
        title: "Без дорогих поездок",
        body: "Показать уровень можно из своего города — без перелётов, гостиниц и лишних расходов для семьи.",
      },
      {
        title: "Почти из любой точки мира",
        body: "Если есть мяч, пространство и камера — игрок может пройти аттестацию там, где тренируется.",
      },
      {
        title: "Шанс быть замеченным",
        body: "Видео и результат становятся понятным сигналом для академий, клубов и тренеров.",
      },
      {
        title: "Не только для “своих”",
        body: "Не у каждого есть агент, связи или сильная академия. Здесь первым говорит уровень владения мячом.",
      },
      {
        title: "Понятное сравнение",
        body: "Игрок видит своё место среди участников своего возраста и сезона.",
      },
      {
        title: "Гранты за результат",
        body: "Сильное место в рейтинге может открыть путь к грантовой поддержке.",
      },
    ],
  },
} as const;

const AdvantagesSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="advantages" className="relative overflow-hidden bg-white py-20 text-slate-950 md:py-28 xl:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start xl:gap-16">
          <div className="max-w-3xl">
            <div className="label text-slate-500">{copy.kicker}</div>

            <h2 className="mt-6 max-w-[13ch] heading-lg text-slate-950 md:max-w-[14ch] xl:max-w-[15ch]">
              {copy.title}
            </h2>

            <p className="mt-6 max-w-2xl body-lg text-slate-700">
              {copy.body}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:gap-5">
            {copy.items.map((item) => (
              <article
                key={item.title}
                className="group relative rounded-[26px] border border-slate-200 bg-[#F8FAFC] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition-transform duration-300 hover:-translate-y-0.5 md:p-6"
              >
                <div className="flex gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 transition-colors duration-300 group-hover:bg-emerald-100">
                    <CheckCircle2
                      size={19}
                      strokeWidth={2.4}
                      className="text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.18rem] font-black leading-[1.05] tracking-[-0.025em] text-slate-950 md:text-[1.28rem]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600 md:text-base">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;