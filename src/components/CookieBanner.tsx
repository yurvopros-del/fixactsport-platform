import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const OLD_KEY = "everlegends_cookie_ack";
const NEW_KEY = "everlegends_privacy_consent";

type ConsentValue = "accepted" | "declined";

const fallbackText = {
  en: "This website uses cookies and processes data to operate the FixAct Sport platform and improve functionality.",
  ru: "Этот сайт использует файлы cookie и обрабатывает данные для работы платформы FixAct Sport и улучшения функциональности.",
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

    if (safeGetItem(OLD_KEY)) {
      safeSetItem(NEW_KEY, "accepted");
      return;
    }

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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/96 shadow-[0_-10px_40px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div className="content-max flex flex-col items-start gap-3 py-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-xs leading-relaxed text-neutral-600">
          {t(bannerCopy.text, locale)}{" "}
          <Link
            to={privacyPath}
            className="text-neutral-900 underline underline-offset-2 transition-colors hover:text-[hsl(var(--gradient-mid))]"
          >
            {t(bannerCopy.privacyLink, locale)}
          </Link>{" "}
          {t(bannerCopy.and, locale)}{" "}
          <Link
            to={cookiePath}
            className="text-neutral-900 underline underline-offset-2 transition-colors hover:text-[hsl(var(--gradient-mid))]"
          >
            {t(bannerCopy.cookieLink, locale)}
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded border border-neutral-300 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900"
          >
            {t(bannerCopy.decline, locale)}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="gradient-btn rounded px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-95"
          >
            {t(bannerCopy.accept, locale)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;