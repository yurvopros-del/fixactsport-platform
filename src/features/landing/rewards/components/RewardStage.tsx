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
    <div className="mt-12 md:mt-14">
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent md:h-32" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent md:h-32" />
          <div className="absolute left-0 top-1/2 h-[62%] w-40 -translate-y-1/2 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent blur-xl md:w-56 xl:w-72" />
          <div className="absolute right-0 top-1/2 h-[62%] w-40 -translate-y-1/2 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent blur-xl md:w-56 xl:w-72" />
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.08),rgba(15,23,42,0)_72%)] blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[2200px] px-2 md:px-4 xl:px-6">
          <div className="relative aspect-[21/9] min-h-[300px] w-full md:min-h-[430px] xl:min-h-[560px] 2xl:min-h-[640px]">
            <div className="pointer-events-none absolute left-6 top-6 z-[3] text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:left-8 md:top-8 md:text-xs xl:left-12 xl:top-10">
              {stageLabel[locale]}
            </div>

            <div className="pointer-events-none absolute bottom-4 left-4 z-[3] text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 md:bottom-6 md:left-8 md:text-base xl:left-12">
              {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>

            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={`${locale}-${currentSlide}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={imageTransition}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={currentImage}
                  alt=""
                  decoding="async"
                  loading="eager"
                  className="max-h-[90%] max-w-[94%] rounded-[22px] md:max-h-[92%] md:max-w-[92%] md:rounded-[26px] xl:rounded-[30px] object-contain drop-shadow-[0_28px_90px_rgba(15,23,42,0.18)]"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={onPrev}
              aria-label={locale === "en" ? "Previous reward slide" : "Предыдущий слайд грантов"}
              className="group absolute left-3 top-1/2 z-[4] hidden -translate-y-1/2 md:left-6 md:flex xl:left-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/70 bg-white/75 text-[30px] font-light text-slate-500 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-slate-400 group-hover:bg-white group-hover:text-slate-900 md:h-14 md:w-14 md:text-[38px] xl:h-16 xl:w-16 xl:text-[44px]">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label={locale === "en" ? "Next reward slide" : "Следующий слайд грантов"}
              className="group absolute right-3 top-1/2 z-[4] hidden -translate-y-1/2 md:right-6 md:flex xl:right-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/70 bg-white/75 text-[30px] font-light text-slate-500 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-slate-400 group-hover:bg-white group-hover:text-slate-900 md:h-14 md:w-14 md:text-[38px] xl:h-16 xl:w-16 xl:text-[44px]">
                ›
              </span>
            </button>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardStage;