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
  ru: "Сезон 2026 / Гранты",
};

export const stageStatement: Record<LandingLocale, string> = {
  en: "Result recorded. Position confirmed. You are in the ranking table.",
  ru: "Результат зафиксирован. Место определено. Вы в рейтинговой таблице.",
};

export const bridgeCopy = {
  en: {
    kicker: "",
    title: "Result recorded. Position confirmed.",
    body: "You are in the ranking table.",
    partnerLabel: "Partner support",
    rulesLabel: "Participation terms",
  },
  ru: {
    kicker: "",
    title: "Желаем уверенного результата в аттестации!",
    body: "Рейтинг сезона фиксирует подтверждённый результат участника.",
    partnerLabel: "Поддержка партнёров",
    rulesLabel: "Условия участия",
  },
} as const;

export const placeBadges: Record<LandingLocale, string[]> = {
  en: ["1st", "2nd", "3rd", "Places 4–50"],
  ru: ["1 место", "2 место", "3 место", "4–50 места"],
};

export const cardStatuses: Record<LandingLocale, string[]> = {
  en: ["Season winner", "Second place", "Third place", "Season finalists"],
  ru: ["Победитель сезона", "Второе место", "Третье место", "Финалисты сезона"],
};

export const cardFooters: Record<LandingLocale, string[]> = {
  en: [
    "Top result of Season 2026",
    "Silver position of the season",
    "Bronze mark of the season",
    "Final ranking group",
  ],
  ru: [
    "Главный результат сезона 2026",
    "Серебряная позиция сезона",
    "Бронзовый рубеж сезона",
    "Финальная группа рейтинга",
  ],
};

export const medalThemes = [
  {
    shell:
      "border-yellow-300 bg-[#FFFDF4] shadow-[0_12px_28px_rgba(180,140,40,0.08)]",
    number:
      "bg-[linear-gradient(180deg,#FFF0A3_0%,#E0B331_30%,#A76604_70%,#5F3700_100%)]",
    amountShadow: "0 4px 10px rgba(120,78,8,0.08)",
  },
  {
  shell:
    "border-slate-300 bg-[#F8FAFC] shadow-[0_12px_28px_rgba(100,116,139,0.08)]",
  number:
    "bg-[linear-gradient(180deg,#D7DEE8_0%,#9AA8BA_30%,#5F6F84_68%,#263241_100%)]",
  amountShadow: "0 4px 10px rgba(51,65,85,0.08)",
},
  {
    shell:
      "border-amber-300 bg-[#FFF8F1] shadow-[0_12px_28px_rgba(180,83,9,0.08)]",
    number:
      "bg-[linear-gradient(180deg,#FED7AA_0%,#D9822B_34%,#9A4A16_70%,#5A2408_100%)]",
    amountShadow: "0 4px 10px rgba(124,45,18,0.08)",
  },
  {
    shell:
      "border-slate-300 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]",
    number:
      "bg-[linear-gradient(180deg,#E2E8F0_0%,#94A3B8_34%,#64748B_70%,#334155_100%)]",
    amountShadow: "0 4px 10px rgba(71,85,105,0.08)",
  },
] as const;
export const imageTransition = {
  duration: 0.85,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "6%" : "-6%",
    opacity: 0.28,
    scale: 1.018,
    filter: "blur(10px)",
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
    scale: 0.992,
    filter: "blur(6px)",
  }),
};