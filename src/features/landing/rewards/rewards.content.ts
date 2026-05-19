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
  en: "Season 2026 / Grants",
  ru: "Сезон 2026 / гранты",
};

export const stageStatement: Record<LandingLocale, string> = {
  en: "Ranking position determines the grant amount.",
  ru: "Место в рейтинге определяет размер гранта.",
};

export const bridgeCopy = {
  en: {
    kicker: "",
    title: "For partner organizations",
    body:
      "Clubs and academies may receive 20% from completed attestations of their players, under the program terms.",
    partnerLabel: "Partner support",
    rulesLabel: "Participation terms",
    whyLabel: "Season grants",
  },
  ru: {
    kicker: "",
    title: "Для партнёрских организаций",
    body:
      "Клубы и академии могут получать 20% от проведённых аттестаций своих воспитанников — по условиям программы.",
    partnerLabel: "Поддержка партнёров",
    rulesLabel: "Условия участия",
    whyLabel: "Гранты сезона",
  },
} as const;

export const placeBadges: Record<LandingLocale, string[]> = {
  en: ["1st place", "2nd place", "3rd place", "Places 4–50"],
  ru: ["1 место", "2 место", "3 место", "4–50 места"],
};

export const cardStatuses: Record<LandingLocale, string[]> = {
  en: [
    "Season 2026 winner",
    "Second place in Season 2026",
    "Third place in Season 2026",
    "Season finalists",
  ],
  ru: [
    "Победитель сезона 2026",
    "Второе место в сезоне 2026",
    "Третье место в сезоне 2026",
    "Финалисты сезона",
  ],
};

export const cardFooters: Record<LandingLocale, string[]> = {
  en: [
    "Top result of the season",
    "Second position",
    "Third position",
    "Final ranking group",
  ],
  ru: [
    "Главный результат сезона",
    "Вторая позиция",
    "Третья позиция",
    "Финальная группа рейтинга",
  ],
};

export const medalThemes = [
  {
    shell:
      "border-yellow-300 bg-[linear-gradient(180deg,#FFFDF3_0%,#FFFFFF_46%,#FFF8DA_100%)] shadow-[0_16px_34px_rgba(180,140,40,0.10)]",
    number:
      "bg-[linear-gradient(180deg,#FFF2A8_0%,#E6B92E_28%,#A86604_68%,#4F2D00_100%)]",
    amountShadow: "0 5px 12px rgba(120,78,8,0.10)",
  },
  {
    shell:
      "border-slate-500 bg-[linear-gradient(180deg,#EEF2F7_0%,#FFFFFF_38%,#D8E0EA_100%)] shadow-[0_18px_38px_rgba(51,65,85,0.14)]",
    number:
      "bg-[linear-gradient(180deg,#F1F5F9_0%,#A8B5C6_24%,#56677D_62%,#111827_100%)]",
    amountShadow: "0 5px 12px rgba(31,41,55,0.12)",
  },
  {
    shell:
      "border-amber-400 bg-[linear-gradient(180deg,#FFF7ED_0%,#FFFFFF_44%,#FFE4C4_100%)] shadow-[0_16px_34px_rgba(180,83,9,0.11)]",
    number:
      "bg-[linear-gradient(180deg,#FED7AA_0%,#D9822B_30%,#91400E_68%,#431407_100%)]",
    amountShadow: "0 5px 12px rgba(124,45,18,0.11)",
  },
  {
    shell:
      "border-slate-500 bg-[linear-gradient(180deg,#F1F5F9_0%,#FFFFFF_38%,#D5DDE8_100%)] shadow-[0_18px_38px_rgba(15,23,42,0.11)]",
    number:
      "bg-[linear-gradient(180deg,#F8FAFC_0%,#A3AFBF_25%,#56677D_64%,#1E293B_100%)]",
    amountShadow: "0 5px 12px rgba(71,85,105,0.11)",
  },
] as const;

export const imageTransition = {
  duration: 0.85,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "5%" : "-5%",
    opacity: 0.32,
    scale: 1.012,
    filter: "blur(8px)",
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-4%" : "4%",
    opacity: 0,
    scale: 0.996,
    filter: "blur(5px)",
  }),
};