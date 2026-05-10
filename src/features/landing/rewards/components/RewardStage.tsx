import { AnimatePresence, motion } from "framer-motion";
import {
  imageTransition,
  slideVariants,
  stageLabel,
  type LandingLocale,
} from "../rewards.content";

interface RewardStageProps {
  locale: LandingLocale;
  slides: string[];
  currentSlide: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

const RewardStage = ({
  locale,
  slides,
  currentSlide,
  direction,
  onPrev,
  onNext,
  onGoTo,
}: RewardStageProps) => {
  const currentImage = slides[currentSlide];

  return (
    <div className="mt-9 md:mt-12">
      <div className="relative mx-auto w-full max-w-[1180px] px-6 md:px-10 xl:px-0">
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-xs">
            {stageLabel[locale]}
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 md:text-xs">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto w-full overflow-visible">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-slate-950 shadow-[0_22px_58px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/10 md:aspect-auto md:rounded-[30px] md:shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={`${locale}-${currentSlide}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={imageTransition}
                  className="absolute inset-0 md:relative"
                >
                  <img
                    src={currentImage}
                    alt=""
                    decoding="async"
                    loading="eager"
                    className="block h-full w-full object-cover md:h-auto md:object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={onPrev}
              aria-label={locale === "en" ? "Previous reward slide" : "Предыдущий слайд грантов"}
              className="group absolute left-3 top-1/2 z-[6] hidden -translate-y-1/2 md:flex xl:-left-16"
            >
              <span className="flex h-16 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/82 text-[4rem] font-extralight leading-none text-slate-400 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-slate-400 group-hover:bg-white group-hover:text-slate-900">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label={locale === "en" ? "Next reward slide" : "Следующий слайд грантов"}
              className="group absolute right-3 top-1/2 z-[6] hidden -translate-y-1/2 md:flex xl:-right-16"
            >
              <span className="flex h-16 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/82 text-[4rem] font-extralight leading-none text-slate-400 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-slate-400 group-hover:bg-white group-hover:text-slate-900">
                ›
              </span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 md:mt-5">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onGoTo(index)}
                aria-label={
                  locale === "en"
                    ? `Go to reward slide ${index + 1}`
                    : `Перейти к слайду грантов ${index + 1}`
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-7 bg-slate-900"
                    : "w-2 bg-slate-300 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardStage;
