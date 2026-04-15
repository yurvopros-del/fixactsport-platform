import { nav } from "./nav";
import { hero, heroSlides } from "./hero";
import { philosophy } from "./philosophy";
import { system } from "./system";
import { rewards } from "./rewards";
import { download } from "./download";
import { footer } from "./footer";
import { cookieBanner } from "./cookie-banner";
import { cookiePage, privacyPage, userAgreementPage } from "./legal-pages";
import { betaTestingPage } from "./beta-testing";
import type { Locale, LocaleText } from "./types";

export type { Locale, LocaleText } from "./types";

export const translations = {
  nav,
  hero,
  heroSlides,
  philosophy,
  system,
  rewards,
  download,
  footer,
  cookieBanner,
  cookiePage,
  privacyPage,
  userAgreementPage,
  betaTestingPage,
} as const;

export function t(value: LocaleText, locale: Locale): string {
  return value[locale];
}