import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { useNavigate, useLocation } from "react-router-dom";
import logoRu from "@/assets/fixact-sport-logo.svg";
import logoEn from "@/assets/logo-en.svg";
import { BETA_FORM_URL } from "@/lib/constants";

const ACCESSIBILITY_STORAGE_KEY = "fixact-accessibility-mode";
const HERO_SWITCH_Y = 120;

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

const readAccessibilityMode = () => {
  try {
    return window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY) === "high-visibility";
  } catch {
    return false;
  }
};

const writeAccessibilityMode = (enabled: boolean) => {
  try {
    window.localStorage.setItem(
      ACCESSIBILITY_STORAGE_KEY,
      enabled ? "high-visibility" : "default",
    );
  } catch {
    // ignore storage errors
  }

  document.documentElement.setAttribute(
    "data-accessibility",
    enabled ? "high-visibility" : "default",
  );

  window.dispatchEvent(
    new CustomEvent("fixact-accessibility-change", {
      detail: { enabled },
    }),
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const locale = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const logo = locale === "en" ? logoEn : logoRu;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > HERO_SWITCH_Y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setAccessibilityMode(readAccessibilityMode());
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleAccessibilityMode = () => {
    const next = !accessibilityMode;
    setAccessibilityMode(next);
    writeAccessibilityMode(next);
  };

  const base = import.meta.env.BASE_URL;

  const goHome = () => {
    setMenuOpen(false);

    if (locale === "ru") {
      window.location.assign(`${base}ru/`);
      return;
    }

    navigate("/");
  };

  const jumpTo = (id: "system" | "rewards") => {
    setMenuOpen(false);

    const isHomeEn = location.pathname === "/";
    const isHomeRu = location.pathname === "/ru" || location.pathname === "/ru/";

    if (!isHomeEn && !isHomeRu) {
      if (locale === "ru") {
        window.location.assign(`${base}ru/#${id}`);
      } else {
        navigate("/");
        window.setTimeout(() => {
          window.location.hash = `#${id}`;
        }, 0);
      }
      return;
    }

    window.location.hash = `#${id}`;
  };

  const switchLang = () => {
    setMenuOpen(false);

    if (locale === "en") {
      window.location.assign(`${base}ru/`);
    } else {
      window.location.assign(`${base}?lang=en`);
    }
  };

  const isLightHeader = scrolled || menuOpen;

  const headerStyle = useMemo(() => {
    if (menuOpen) {
      return {
        background: "rgba(255,255,255,0.96)",
        borderColor: "rgba(15, 23, 42, 0.08)",
        boxShadow: "0 18px 48px rgba(15, 23, 42, 0.14)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      };
    }

    if (scrolled) {
      return {
        background: "rgba(255,255,255,0.82)",
        borderColor: "rgba(15, 23, 42, 0.08)",
        boxShadow: "0 14px 40px rgba(15, 23, 42, 0.10)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      };
    }

    return {
      background: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    };
  }, [menuOpen, scrolled]);

  const desktopLinkClass = isLightHeader
    ? "text-sm uppercase tracking-[0.08em] text-slate-900 transition-colors duration-200 hover:text-[hsl(var(--gradient-mid))]"
    : "text-sm uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:text-[hsl(var(--gradient-mid))]";

  const mobileToggleClass = isLightHeader
    ? "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/12 bg-white/78 text-slate-900 backdrop-blur-md transition-colors hover:bg-white md:hidden"
    : "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/14 md:hidden";

  const ctaClass =
    "gradient-btn rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(37,99,235,0.18)] transition-opacity duration-200 hover:opacity-95";

  const accessibilityToggleClass = isLightHeader
    ? "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-900/14 bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-900 transition-colors duration-200 hover:bg-white"
    : "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-white/14";

  const accessibilityToggleText =
    locale === "en"
      ? accessibilityMode
        ? "Standard view"
        : "Accessible view"
      : accessibilityMode
        ? "Обычная версия"
        : "Версия для слабовидящих";

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: easeStandard }}
        className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
        style={headerStyle}
      >
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between px-6 py-4 md:px-10 xl:px-16">
          <motion.button
            type="button"
            onClick={goHome}
            aria-label={locale === "en" ? "Go to homepage" : "Перейти на главную"}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0, scale: 0.995 }}
            transition={{ duration: 0.18, ease: easeFast }}
            className="shrink-0"
          >
            <img
              src={logo}
              alt={locale === "en" ? "FixAct Sport" : "ФиксАкт Спорт"}
              className="block h-auto w-[150px] max-w-full md:w-[190px] xl:w-[220px]"
            />
          </motion.button>

          <nav className="hidden items-center gap-4 md:flex xl:gap-6">
            <motion.button
              type="button"
              onClick={() => jumpTo("system")}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className={desktopLinkClass}
            >
              {t(translations.nav.system, locale)}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => jumpTo("rewards")}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className={desktopLinkClass}
            >
              {t(translations.nav.rewards, locale)}
            </motion.button>

            <motion.button
              type="button"
              onClick={switchLang}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className={desktopLinkClass}
            >
              {locale === "en" ? "RU" : "EN"}
            </motion.button>

            <motion.button
              type="button"
              onClick={toggleAccessibilityMode}
              aria-pressed={accessibilityMode}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className={accessibilityToggleClass}
            >
              {accessibilityToggleText}
            </motion.button>

            <motion.a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className={ctaClass}
            >
              {t(translations.nav.cta, locale)}
            </motion.a>
          </nav>

          <motion.button
            type="button"
            aria-label={
              menuOpen
                ? locale === "en"
                  ? "Close menu"
                  : "Закрыть меню"
                : locale === "en"
                  ? "Open menu"
                  : "Открыть меню"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: easeFast }}
            className={mobileToggleClass}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label={locale === "en" ? "Close menu overlay" : "Закрыть оверлей меню"}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: easeStandard }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[3px] md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: easeStandard }}
              className="fixed inset-x-0 top-[84px] z-50 border-b border-white/10 bg-black/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-3 px-4 py-5">
                <motion.button
                  type="button"
                  onClick={() => jumpTo("system")}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.995 }}
                  transition={{ duration: 0.18, ease: easeFast }}
                  className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(translations.nav.system, locale)}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => jumpTo("rewards")}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.995 }}
                  transition={{ duration: 0.18, ease: easeFast }}
                  className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(translations.nav.rewards, locale)}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={switchLang}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.995 }}
                  transition={{ duration: 0.18, ease: easeFast }}
                  className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {locale === "en" ? "RU" : "EN"}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={toggleAccessibilityMode}
                  aria-pressed={accessibilityMode}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.995 }}
                  transition={{ duration: 0.18, ease: easeFast }}
                  className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {accessibilityToggleText}
                </motion.button>

                <motion.a
                  href={BETA_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="beta-access"
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.99 }}
                  transition={{ duration: 0.18, ease: easeFast }}
                  className="gradient-btn inline-flex min-h-[52px] items-center justify-center rounded-2xl px-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_16px_36px_rgba(37,99,235,0.18)] transition-opacity hover:opacity-95"
                >
                  {t(translations.nav.joinMobile, locale)}
                </motion.a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navigation;