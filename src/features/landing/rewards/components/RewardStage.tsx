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
    <div className="mt-10 md:mt-12">
      <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 md:px-10 xl:px-16">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.07)] md:rounded-[34px]">
          <div className="pointer-events-none absolute left-5 top-5 z-[5] max-w-[58vw] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:left-8 md:top-7 md:text-xs">
            {stageLabel[locale]}
          </div>

          <div className="pointer-events-none absolute right-5 top-5 z-[5] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 md:right-8 md:top-7 md:text-xs">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>

          <div className="relative h-[clamp(280px,76vw,430px)] w-full bg-[#F8FAFC] md:h-[clamp(430px,44vw,660px)]">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={`${locale}-${currentSlide}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={imageTransition}
                className="absolute inset-0 flex items-center justify-center px-3 pb-12 pt-14 md:px-16 md:pb-16 md:pt-16 xl:px-20"
              >
                <img
                  src={currentImage}
                  alt=""
                  decoding="async"
                  loading="eager"
                  className="h-full max-h-full w-full max-w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={onPrev}
              aria-label={
                locale === "en" ? "Previous reward slide" : "Предыдущий слайд грантов"
              }
              className="group absolute left-3 top-1/2 z-[6] hidden -translate-y-1/2 md:flex xl:left-5"
            >
              <span className="flex h-14 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-[3.2rem] font-extralight leading-none text-slate-400 transition-all duration-300 group-hover:border-slate-400 group-hover:text-slate-900 xl:h-16 xl:w-12 xl:text-[4rem]">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label={
                locale === "en" ? "Next reward slide" : "Следующий слайд грантов"
              }
              className="group absolute right-3 top-1/2 z-[6] hidden -translate-y-1/2 md:flex xl:right-5"
            >
              <span className="flex h-14 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-[3.2rem] font-extralight leading-none text-slate-400 transition-all duration-300 group-hover:border-slate-400 group-hover:text-slate-900 xl:h-16 xl:w-12 xl:text-[4rem]">
                ›
              </span>
            </button>

            <div className="absolute bottom-5 left-1/2 z-[6] flex -translate-x-1/2 items-center gap-2 md:bottom-7">
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
    </div>
  );
};

export default RewardStage;