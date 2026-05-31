import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

import visualA from "@/assets/infographics/snow-leopard/A.avif";
import visualB from "@/assets/infographics/snow-leopard/B.avif";
import visualC from "@/assets/infographics/snow-leopard/C.avif";
import visualD from "@/assets/infographics/snow-leopard/D.avif";
import visualE from "@/assets/infographics/snow-leopard/E.avif";
import visualF from "@/assets/infographics/snow-leopard/F.avif";
import visualG from "@/assets/infographics/snow-leopard/G.avif";
import visualH from "@/assets/infographics/snow-leopard/H.avif";

type Locale = "en" | "ru";

const visuals = [visualA, visualB, visualC, visualD, visualE, visualF, visualG, visualH];
const content = {
  ru: {
    kicker: "Визуальная схема",
    title: "Маршрут на одном экране.",
    body:
      "Схема помогает быстро увидеть связку: заявка, группа, видео, проверка и результат. Детали остаются в чеклисте участия.",
    points: [
      "Заявка",
      "Группа по возрасту и сезону",
      "Видео задания",
      "Проверенный результат",
    ],
    badge: "ФиксАкт Спорт",
    imageLabel: "Визуальная схема аттестации",
    prev: "Предыдущее изображение",
    next: "Следующее изображение",
    goTo: "Перейти к изображению",
  },
  en: {
    kicker: "Visual route",
    title: "The path on one screen.",
    body:
      "The visual keeps the route easy to scan: application, group, video, review, and result. The participation checklist carries the details.",
    points: [
      "Application",
      "Age and season group",
      "Task video",
      "Reviewed result",
    ],
    badge: "FixAct Sport",
    imageLabel: "Attestation flow visual",
    prev: "Previous image",
    next: "Next image",
    goTo: "Go to image",
  },
} as const;

const AttestationFlowVisualSection = () => {
  const locale = useLanguage() as Locale;
  const copy = content[locale] ?? content.ru;
  const [current, setCurrent] = useState(0);

  const currentImage = useMemo(() => visuals[current], [current]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % visuals.length);
    }, 7500);

    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + visuals.length) % visuals.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % visuals.length);
  };

  return (
    <section
      id="attestation-flow"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 text-slate-950 md:py-28 xl:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,hsl(var(--gradient-start)/0.12),transparent_34%),radial-gradient(circle_at_86%_14%,hsl(var(--gradient-end)/0.10),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.98))]"
      />

      <div className="relative mx-auto grid w-full max-w-[1720px] items-center gap-12 px-6 md:px-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] xl:gap-16 xl:px-16 2xl:gap-20">
        <div className="mx-auto max-w-3xl text-center xl:mx-0 xl:text-left">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 md:text-sm">
            {copy.kicker}
          </div>

          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 md:text-6xl xl:text-7xl">
            {copy.title}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-slate-650 md:text-lg xl:max-w-2xl">
            {copy.body}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:max-w-2xl">
            {copy.points.map((point, index) => (
              <div
                key={point}
                className="rounded-2xl border border-slate-200 bg-white/86 px-5 py-4 text-left shadow-[0_18px_50px_rgba(15,23,42,0.055)] backdrop-blur"
              >
                <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-[15px] font-semibold leading-snug text-slate-900 md:text-base">
                  {point}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-[0_18px_48px_rgba(15,23,42,0.07)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--gradient-mid))] shadow-[0_0_18px_hsl(var(--gradient-mid)/0.45)]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
              {copy.badge}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] xl:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[44px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--gradient-mid)/0.18),transparent_62%)] blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/72 p-3 shadow-[0_34px_110px_rgba(15,23,42,0.14)] backdrop-blur-xl md:rounded-[44px] md:p-4">
            <div className="relative aspect-square overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#ffffff_0%,#eef7ff_100%)] md:rounded-[34px]">
              <img
                key={currentImage}
                src={currentImage}
                alt={copy.imageLabel}
                decoding="async"
                loading={current === 0 ? "eager" : "lazy"}
                fetchPriority={current === 0 ? "high" : "auto"}
                className="h-full w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/50 to-transparent" />

              <button
                type="button"
                onClick={goPrev}
                aria-label={copy.prev}
                className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/55 text-4xl font-light leading-none text-slate-700 shadow-[0_16px_42px_rgba(15,23,42,0.16)] backdrop-blur-md transition hover:scale-105 hover:bg-white/80 md:flex"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label={copy.next}
                className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/55 text-4xl font-light leading-none text-slate-700 shadow-[0_16px_42px_rgba(15,23,42,0.16)] backdrop-blur-md transition hover:scale-105 hover:bg-white/80 md:flex"
              >
                ›
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 px-1 pb-1">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {String(current + 1).padStart(2, "0")} / {String(visuals.length).padStart(2, "0")}
              </div>

              <div className="flex items-center gap-2">
                {visuals.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`${copy.goTo} ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-8 bg-slate-950"
                        : "w-2.5 bg-slate-300 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttestationFlowVisualSection;
