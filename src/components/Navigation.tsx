import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { BETA_FORM_URL } from "@/lib/constants";
import logoRu from "@/assets/logos/fixact-sport-logo-display.png";
import logoEn from "@/assets/logos/logo-en-display.png";
import flagRu from "@/assets/flags/ru.svg";
import flagUs from "@/assets/flags/us.svg";

const ACCESSIBILITY_STORAGE_KEY = "fixact-accessibility-mode";
const HERO_SWITCH_Y = 120;
const HEADER_OFFSET = 92;

const easeStandard = [0.22, 1, 0.36, 1] as const;
const easeFast = [0.2, 0.8, 0.2, 1] as const;

type SectionId =
  | "system"
  | "advantages"
  | "participation"
  | "rewards"
  | "partners"
  | "faq"
  | "contacts";

type NavKey = SectionId;

const NAV_ITEMS: Array<{ id: SectionId; key: NavKey }> = [
  { id: "system", key: "system" },
  { id: "advantages", key: "advantages" },
  { id: "participation", key: "participation" },
  { id: "rewards", key: "rewards" },
  { id: "partners", key: "partners" },
  { id: "faq", key: "faq" },
  { id: "contacts", key: "contacts" },
];

const writeAccessibilityMode = (enabled: boolean) => {
  try {
    window.localStorage.setItem(
      ACCESSIBILITY_STORAGE_KEY,
      enabled ? "high-visibility" : "default",
    );
  } catch {
    // Storage can be unavailable in some browsers; root state still applies below.
  }

  document.documentElement.setAttribute(
    "data-accessibility",
    enabled ? "high-visibility" : "default",
  );
};

const scrollToSection = (id: SectionId) => {
  const element = document.getElementById(id);

  if (!element) {
    window.location.hash = `#${id}`;
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.history.replaceState(null, "", `#${id}`);
  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const locale = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeRoute =
    location.pathname === "/" ||
    location.pathname === "/ru" ||
    location.pathname === "/ru/";

 const logo = locale === "en" ? logoEn : logoRu;
const currentLanguageFlag = locale === "en" ? flagUs : flagRu;
const languageToggleLabel =
  locale === "en" ? "Переключить на русский язык" : "Switch to English";
const base = import.meta.env.BASE_URL;


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > HERO_SWITCH_Y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const enabled =
        window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY) === "high-visibility";

      setAccessibilityMode(enabled);

      document.documentElement.setAttribute(
        "data-accessibility",
        enabled ? "high-visibility" : "default",
      );
    } catch {
      setAccessibilityMode(false);
      document.documentElement.setAttribute("data-accessibility", "default");
    }
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

  const goHome = () => {
    setMenuOpen(false);

    if (locale === "ru") {
      window.location.assign(`${base}ru/`);
      return;
    }

    navigate("/");
  };

  const jumpTo = (id: SectionId) => {
    setMenuOpen(false);

    const isHomeEn = location.pathname === "/";
    const isHomeRu = location.pathname === "/ru" || location.pathname === "/ru/";

    if (!isHomeEn && !isHomeRu) {
      if (locale === "ru") {
        window.location.assign(`${base}ru/#${id}`);
      } else {
        navigate("/");
        window.setTimeout(() => scrollToSection(id), 80);
      }

      return;
    }

    window.setTimeout(() => scrollToSection(id), 0);
  };

  const switchLang = () => {
    setMenuOpen(false);

    if (locale === "en") {
      window.location.assign(`${base}ru/`);
    } else {
      window.location.assign(`${base}?lang=en`);
    }
  };

  const isLightHeader = !isHomeRoute || scrolled || menuOpen || accessibilityMode;

  const headerStyle = useMemo(() => {
    if (menuOpen || accessibilityMode || !isHomeRoute) {
      return {
        background: "rgba(255,255,255,0.98)",
        borderColor: "rgba(15,23,42,0.10)",
        boxShadow: "0 10px 28px rgba(15,23,42,0.10)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      };
    }

    if (scrolled) {
      return {
        background: "rgba(255,255,255,0.94)",
        borderColor: "rgba(15,23,42,0.08)",
        boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      };
    }

    return {
      background: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    };
  }, [accessibilityMode, isHomeRoute, menuOpen, scrolled]);

  const desktopLinkClass = isLightHeader
    ? "whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-900 transition-colors duration-200 hover:text-[hsl(var(--gradient-mid))] 2xl:text-xs"
    : "whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:text-[hsl(var(--gradient-mid))] 2xl:text-xs";

  const mobileToggleClass = isLightHeader
    ? "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/12 bg-white text-slate-900 shadow-sm transition-colors hover:bg-slate-50 xl:hidden"
    : "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/10 text-white transition-colors hover:bg-white/14 xl:hidden";

  const ctaClass =
    "gradient-btn inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-opacity duration-200 hover:opacity-95 2xl:px-5 2xl:text-xs";

  const accessibilityLabel =
    locale === "en"
      ? accessibilityMode
        ? "Standard view"
        : "Accessible view"
      : accessibilityMode
        ? "Обычная версия"
        : "Версия для слабовидящих";

  const accessibilityToggleClass = isLightHeader
    ? "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-900/14 bg-white text-base font-black text-slate-900 shadow-sm transition-colors duration-200 hover:bg-slate-50"
    : "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/18 bg-white/10 text-base font-black text-white transition-colors duration-200 hover:bg-white/14";

  const mobilePanelClass = accessibilityMode
    ? "fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto bg-white text-slate-950 shadow-[0_18px_48px_rgba(15,23,42,0.14)] xl:hidden sm:top-[78px]"
    : "fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto bg-[#07101f] text-white shadow-[0_18px_54px_rgba(0,0,0,0.55)] xl:hidden sm:top-[78px]";

  const mobileItemClass = accessibilityMode
    ? "flex min-h-[56px] w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.1em] text-slate-950 transition-colors hover:text-slate-700"
    : "flex min-h-[56px] w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:text-white/75";

    const mobileControlClass = accessibilityMode
  ? "flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 px-3 text-center text-xl font-black uppercase tracking-[0.08em] text-slate-950"
  : "flex min-h-[52px] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] px-3 text-center text-xl font-black uppercase tracking-[0.08em] text-white";

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: easeStandard }}
        className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
        style={headerStyle}
      >
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 sm:py-4 md:px-10 xl:px-10 2xl:px-16">
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
              className="block h-auto w-[118px] max-w-full sm:w-[138px] xl:w-[166px] 2xl:w-[206px]"
            />
          </motion.button>

          <nav className="hidden min-w-0 items-center justify-center gap-3 xl:flex 2xl:gap-5">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => jumpTo(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.99 }}
                transition={{ duration: 0.18, ease: easeFast }}
                className={desktopLinkClass}
              >
                {t(translations.nav[item.key], locale)}
              </motion.button>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center justify-end gap-2 xl:flex 2xl:gap-3">
         <motion.button
  type="button"
  onClick={switchLang}
aria-label={languageToggleLabel}
title={languageToggleLabel}
  whileTap={{ scale: 0.99 }}
  transition={{ duration: 0.14, ease: easeFast }}
  className={mobileControlClass}
>
  <span className="flex h-[19px] w-[26px] overflow-hidden rounded-[3px] ring-1 ring-slate-300">
    <img
src={currentLanguageFlag}      alt=""
      className="h-full w-full object-cover"
      draggable={false}
    />
  </span>
</motion.button>

            <motion.button
              type="button"
              onClick={toggleAccessibilityMode}
              aria-label={accessibilityLabel}
              title={accessibilityLabel}
              aria-pressed={accessibilityMode}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: easeFast }}
              className={accessibilityToggleClass}
            >
              A
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
          </div>

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
              transition={{ duration: 0.2, ease: easeStandard }}
              className={
                accessibilityMode
                  ? "fixed inset-0 z-40 bg-white/72 xl:hidden"
                  : "fixed inset-0 z-40 bg-black/70 xl:hidden"
              }
            />

            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: easeStandard }}
              className={mobilePanelClass}
            >
              <div className="mx-auto flex min-h-full w-full max-w-[720px] flex-col px-5 py-6">
                <div className={accessibilityMode ? "label text-slate-500" : "label text-white/45"}>
                  {locale === "en" ? "Navigation" : "Навигация"}
                </div>

                <div
                  className={
                    accessibilityMode
                      ? "mt-5 divide-y divide-slate-200 border-y border-slate-200"
                      : "mt-5 divide-y divide-white/10 border-y border-white/10"
                  }
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      whileTap={{ scale: 0.995 }}
                      transition={{ duration: 0.14, ease: easeFast }}
                      className={mobileItemClass}
                    >
                      <span>{t(translations.nav[item.key], locale)}</span>
                      <span className={accessibilityMode ? "text-slate-400" : "text-white/25"}>
                        →
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={switchLang}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.14, ease: easeFast }}
                    className={mobileControlClass}
                  >
                    {locale === "en" ? "RU" : "EN"}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={toggleAccessibilityMode}
                    aria-label={accessibilityLabel}
                    title={accessibilityLabel}
                    aria-pressed={accessibilityMode}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.14, ease: easeFast }}
                    className={mobileControlClass}
                  >
                   A
                  </motion.button>
                </div>

                <motion.a
                  href={BETA_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="beta-access"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.14, ease: easeFast }}
                  className="gradient-btn mt-5 inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl px-5 text-center text-sm font-bold uppercase tracking-[0.1em] text-white"
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
