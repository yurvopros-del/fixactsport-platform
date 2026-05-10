import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const CONSENT_KEY = "fixact_sport_privacy_consent";

type ConsentValue = "accepted" | "declined";
type Locale = "en" | "ru";

const copy: Record<
  Locale,
  {
    text: string;
    privacyLink: string;
    cookieLink: string;
    and: string;
    decline: string;
    accept: string;
  }
> = {
  en: {
    text: "This website uses cookies to keep the FixAct Sport platform working correctly and to improve the service.",
    privacyLink: "Privacy Policy",
    cookieLink: "Cookie Policy",
    and: "and",
    decline: "Decline",
    accept: "Accept",
  },
  ru: {
    text: "Этот сайт использует файлы cookie для корректной работы платформы ФиксАкт Спорт и улучшения сервиса.",
    privacyLink: "Политика конфиденциальности",
    cookieLink: "Политика Cookie",
    and: "и",
    decline: "Отклонить",
    accept: "Принять",
  },
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
  const value = safeGetItem(CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

const CookieBanner = () => {
  const locale = useLanguage();
  const [visible, setVisible] = useState(false);

  const lang: Locale = locale === "ru" ? "ru" : "en";
  const text = copy[lang];

  useEffect(() => {
    if (safeGetItem(CONSENT_KEY)) return;

    setVisible(true);
  }, []);

  const handleAccept = () => {
    safeSetItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    safeSetItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  const privacyPath = locale === "ru" ? "/ru/privacy-policy" : "/privacy-policy";
  const cookiePath = locale === "ru" ? "/ru/cookie-policy" : "/cookie-policy";

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-4 sm:bottom-6">
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-4 rounded-[24px] border border-white bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)] ring-1 ring-slate-900/10 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
        <p className="max-w-[680px] text-sm font-semibold leading-6 text-slate-800">
          {text.text}{" "}
          <Link
            to={privacyPath}
            className="font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[hsl(var(--gradient-mid))]"
          >
            {text.privacyLink}
          </Link>{" "}
          {text.and}{" "}
          <Link
            to={cookiePath}
            className="font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[hsl(var(--gradient-mid))]"
          >
            {text.cookieLink}
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold uppercase tracking-[0.1em] text-slate-600 transition-colors hover:border-slate-500 hover:text-slate-950"
          >
            {text.decline}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="gradient-btn inline-flex min-h-[42px] items-center justify-center rounded-xl px-5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(99,102,241,0.26)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {text.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
