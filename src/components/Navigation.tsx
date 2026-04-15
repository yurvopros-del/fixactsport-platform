import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { useNavigate, useLocation } from "react-router-dom";
import logoRu from "@/assets/fixact-sport-logo.svg";
import logoEn from "@/assets/logo-en.svg";
import { BETA_FORM_URL } from "@/lib/constants";

const HERO_SWITCH_Y = 120;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    ? "inline-flex h-11 w-11 items-center justify-center rounded border border-slate-900/12 bg-white/78 text-slate-900 backdrop-blur-md transition-colors hover:bg-white md:hidden"
    : "inline-flex h-11 w-11 items-center justify-center rounded border border-white/18 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/14 md:hidden";

  const ctaClass =
    "gradient-btn rounded px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-opacity duration-200 hover:opacity-90";

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
        style={headerStyle}
      >
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between px-6 py-4 md:px-10 xl:px-16">
          <button
            type="button"
            onClick={goHome}
            aria-label={locale === "en" ? "Go to homepage" : "Перейти на главную"}
            className="shrink-0"
          >
            <img
              src={logo}
              alt={locale === "en" ? "FixAct Sport" : "ФиксАкт Спорт"}
              className="block h-auto w-[150px] max-w-full md:w-[190px] xl:w-[220px]"
            />
          </button>

          <nav className="hidden items-center gap-7 md:flex xl:gap-8">
            <button
              type="button"
              onClick={() => jumpTo("system")}
              className={desktopLinkClass}
            >
              {t(translations.nav.system, locale)}
            </button>

            <button
              type="button"
              onClick={() => jumpTo("rewards")}
              className={desktopLinkClass}
            >
              {t(translations.nav.rewards, locale)}
            </button>

            <button
              type="button"
              onClick={switchLang}
              className={desktopLinkClass}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              className={ctaClass}
            >
              {t(translations.nav.cta, locale)}
            </a>
          </nav>

          <button
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
            className={mobileToggleClass}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label={locale === "en" ? "Close menu overlay" : "Закрыть оверлей меню"}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] md:hidden"
          />

          <div className="fixed inset-x-0 top-[84px] z-50 border-b border-slate-900/8 bg-white/96 shadow-[0_24px_80px_rgba(15,23,42,0.16)] md:hidden">
            <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-3 px-4 py-5">
              <button
                type="button"
                onClick={() => jumpTo("system")}
                className="flex min-h-[52px] items-center rounded-2xl border border-slate-900/8 bg-slate-900/[0.03] px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition-colors hover:text-[hsl(var(--gradient-mid))]"
              >
                {t(translations.nav.system, locale)}
              </button>

              <button
                type="button"
                onClick={() => jumpTo("rewards")}
                className="flex min-h-[52px] items-center rounded-2xl border border-slate-900/8 bg-slate-900/[0.03] px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition-colors hover:text-[hsl(var(--gradient-mid))]"
              >
                {t(translations.nav.rewards, locale)}
              </button>

              <button
                type="button"
                onClick={switchLang}
                className="flex min-h-[52px] items-center rounded-2xl border border-slate-900/8 bg-slate-900/[0.03] px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition-colors hover:text-[hsl(var(--gradient-mid))]"
              >
                {locale === "en" ? "RU" : "EN"}
              </button>

              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="beta-access"
                onClick={() => setMenuOpen(false)}
                className="gradient-btn inline-flex min-h-[52px] items-center justify-center rounded-2xl px-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
              >
                {t(translations.nav.joinMobile, locale)}
              </a>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Navigation;