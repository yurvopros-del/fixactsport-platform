import reward1Ru from "@/Reward slider/High resolution avif/1.avif";
import reward2Ru from "@/Reward slider/High resolution avif/2.avif";
import reward3Ru from "@/Reward slider/High resolution avif/3.avif";
import reward4Ru from "@/Reward slider/High resolution avif/4.avif";
import reward5Ru from "@/Reward slider/High resolution avif/5.avif";

import reward1En from "@/Reward slider/High resolution avif/1en.avif";
import reward2En from "@/Reward slider/High resolution avif/2en.avif";
import reward3En from "@/Reward slider/High resolution avif/3en.avif";
import reward4En from "@/Reward slider/High resolution avif/4en.avif";
import reward5En from "@/Reward slider/High resolution avif/5en.avif";

export type LandingLocale = "en" | "ru";

export const rewardSlidesByLocale: Record<LandingLocale, string[]> = {
  ru: [reward1Ru, reward2Ru, reward3Ru, reward4Ru, reward5Ru],
  en: [reward1En, reward2En, reward3En, reward4En, reward5En],
};

export const stageLabel: Record<LandingLocale, string> = {
  en: "Season 2026 / Ranking Board",
  ru: "Сезон 2026 / Рейтинговая таблица",
};

export const stageStatement: Record<LandingLocale, string> = {
  en: "Result recorded. Position confirmed. You are in the ranking table.",
  ru: "Результат — зафиксирован. Место — определено. Вы в рейтинговой таблице!",
};

export const bridgeCopy = {
  en: {
  kicker: "",
  title: "Result recorded. Position confirmed.",
  body: "You are in the ranking table.",
  partnerLabel: "Partner support",
  rulesLabel: "Participation terms",
  whyLabel: "Why this matters",
},
  ru: {
  kicker: "",
title: "Желаем уверенного результата в аттестации!",
partnerLabel: "Поддержка партнёров",
rulesLabel: "Условия участия",
whyLabel: "Почему это важно",
},
} as const;

export const placeBadges: Record<LandingLocale, string[]> = {
  en: ["1st", "2nd", "3rd", "Top 50"],
  ru: ["1 место", "2 место", "3 место", "Топ-50"],
};

export const cardStatuses: Record<LandingLocale, string[]> = {
  en: [
    "Season winner",
    "Second place",
    "Third place",
    "Season finalists",
  ],
  ru: [
    "Победитель сезона",
    "Второе место",
    "Третье место",
    "Финалисты сезона",
  ],
};

export const medalThemes = [
  {
    shell: "border-yellow-200 bg-white shadow-[0_12px_30px_rgba(180,140,40,0.12)]",
    number: "bg-[linear-gradient(180deg,#E8C55E,#AE7B14)]",
    glow: "bg-transparent",
    amountShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  {
    shell: "border-slate-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)]",
    number: "bg-[linear-gradient(180deg,#CBD5E1,#64748B)]",
    glow: "bg-transparent",
    amountShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  {
    shell: "border-amber-300 bg-white shadow-[0_10px_26px_rgba(180,83,9,0.10)]",
    number: "bg-[linear-gradient(180deg,#C97A2B,#7C3F12)]",
    glow: "bg-transparent",
    amountShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  {
    shell: "border-slate-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)]",
    number: "bg-[linear-gradient(180deg,#94A3B8,#475569)]",
    glow: "bg-transparent",
    amountShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
] as const;

export const imageTransition = {
  duration: 0.85,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "7%" : "-7%",
    opacity: 0.32,
    scale: 1.02,
    filter: "blur(10px)",
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-5%" : "5%",
    opacity: 0,
    scale: 0.988,
    filter: "blur(6px)",
  }),
};