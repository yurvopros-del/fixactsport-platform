import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const NEW_KEY = "fixact_sport_privacy_consent";

type ConsentValue = "accepted" | "declined";

const fallbackText = {
  en: "This website uses cookies to keep the FixAct Sport platform working correctly and to improve the service.",
  ru: "Этот сайт использует файлы cookie для корректной работы платформы ФиксАкт Спорт и улучшения сервиса.",
};

const fallbackPrivacyLink = {
  en: "Privacy Policy",
  ru: "Политика конфиденциальности",
};

const fallbackCookieLink = {
  en: "Cookie Policy",
  ru: "Политика Cookie",
};

const fallbackAnd = {
  en: "and",
  ru: "и",
};

const fallbackDecline = {
  en: "Decline",
  ru: "Отклонить",
};

const fallbackAccept = {
  en: "Accept",
  ru: "Принять",
};

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage errors
  }
}

export function getPrivacyConsent(): ConsentValue | null {
  const value = safeGetItem(NEW_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

const CookieBanner = () => {
  const locale = useLanguage();
  const [visible, setVisible] = useState(false);

  const bannerCopy = useMemo(() => {
    const source = translations as unknown as {
      privacyBanner?: {
        text?: typeof fallbackText;
        privacyLink?: typeof fallbackPrivacyLink;
        cookieLink?: typeof fallbackCookieLink;
        and?: typeof fallbackAnd;
        decline?: typeof fallbackDecline;
        accept?: typeof fallbackAccept;
      };
      cookieBanner?: {
        text?: typeof fallbackText;
        learnMore?: typeof fallbackPrivacyLink;
        ok?: typeof fallbackAccept;
      };
    };

    return {
      text: source.privacyBanner?.text ?? source.cookieBanner?.text ?? fallbackText,
      privacyLink:
        source.privacyBanner?.privacyLink ??
        source.cookieBanner?.learnMore ??
        fallbackPrivacyLink,
      cookieLink: source.privacyBanner?.cookieLink ?? fallbackCookieLink,
      and: source.privacyBanner?.and ?? fallbackAnd,
      decline: source.privacyBanner?.decline ?? fallbackDecline,
      accept: source.privacyBanner?.accept ?? source.cookieBanner?.ok ?? fallbackAccept,
    };
  }, []);

  useEffect(() => {
    if (safeGetItem(NEW_KEY)) return;

    setVisible(true);
  }, []);

  const handleAccept = () => {
    safeSetItem(NEW_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    safeSetItem(NEW_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  const privacyPath = locale === "ru" ? "/ru/privacy-policy" : "/privacy-policy";
  const cookiePath = locale === "ru" ? "/ru/cookie-policy" : "/cookie-policy";

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-4 sm:bottom-6">
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-4 rounded-[24px] border border-slate-200 bg-white/98 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
        <p className="max-w-[680px] text-sm font-medium leading-6 text-slate-700">
          {t(bannerCopy.text, locale)}{" "}
          <Link
            to={privacyPath}
            className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[hsl(var(--gradient-mid))]"
          >
            {t(bannerCopy.privacyLink, locale)}
          </Link>{" "}
          {t(bannerCopy.and, locale)}{" "}
          <Link
            to={cookiePath}
            className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[hsl(var(--gradient-mid))]"
          >
            {t(bannerCopy.cookieLink, locale)}
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold uppercase tracking-[0.1em] text-slate-600 transition-colors hover:border-slate-500 hover:text-slate-950"
          >
            {t(bannerCopy.decline, locale)}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="gradient-btn inline-flex min-h-[42px] items-center justify-center rounded-xl px-5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(99,102,241,0.26)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t(bannerCopy.accept, locale)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
