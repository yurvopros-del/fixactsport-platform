import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { useNavigate, useLocation } from "react-router-dom";
import logoRu from "@/assets/fixact-sport-logo.svg";
import logoEn from "@/assets/logo-en.svg";
import { BETA_FORM_URL } from "@/lib/constants";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const locale = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const logo = locale === "en" ? logoEn : logoRu;

  const isHomeRoute = useMemo(() => {
    return (
      location.pathname === "/" ||
      location.pathname === "/ru" ||
      location.pathname === "/ru/"
    );
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (!isHomeRoute) {
        setPastHero(true);
        return;
      }

      const hero = document.getElementById("hero");
      if (!hero) {
        setPastHero(window.scrollY > 120);
        return;
      }

      const headerHeight = window.innerWidth >= 768 ? 96 : 84;
      const cutoff = Math.max(hero.offsetHeight - headerHeight - 40, 120);
      setPastHero(window.scrollY >= cutoff);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHomeRoute]);

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

    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
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

  const isLightMode = menuOpen || pastHero || !isHomeRoute;

  const headerBackground = isLightMode
    ? "rgba(248, 250, 252, 0.86)"
    : "linear-gradient(to bottom, rgba(7, 11, 18, 0.38), rgba(7, 11, 18, 0.14))";

  const headerBorderColor = isLightMode
    ? "rgba(148, 163, 184, 0.22)"
    : scrolled
      ? "rgba(255, 255, 255, 0.10)"
      : "transparent";

  const headerShadow = isLightMode
    ? "0 14px 40px rgba(15, 23, 42, 0.08)"
    : scrolled
      ? "0 14px 40px rgba(2, 6, 23, 0.18)"
      : "none";

  const desktopLinkClass = isLightMode
    ? "text-sm uppercase tracking-[0.08em] text-slate-700 transition-colors duration-300 hover:text-sky-600"
    : "text-sm uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 hover:text-cyan-300";

  const desktopLangClass = isLightMode
    ? "text-sm uppercase tracking-[0.08em] text-slate-700 transition-colors duration-300 hover:text-sky-600"
    : "text-sm uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 hover:text-cyan-300";

  const desktopCtaClass = isLightMode
    ? "gradient-btn rounded px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_16px_36px_rgba(37,99,235,0.22)] transition-all duration-300 hover:opacity-95 hover:shadow-[0_20px_44px_rgba(37,99,235,0.28)]"
    : "gradient-btn rounded px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_16px_36px_rgba(37,99,235,0.30)] transition-all duration-300 hover:opacity-95 hover:shadow-[0_20px_44px_rgba(37,99,235,0.34)]";

  const mobileButtonClass = isLightMode
    ? "inline-flex h-11 w-11 items-center justify-center rounded border border-slate-300/70 bg-white/78 text-slate-900 backdrop-blur-md transition-all duration-300 hover:bg-white"
    : "inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 bg-black/15 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/24";

  const mobilePanelClass = isLightMode
    ? "fixed inset-x-0 top-[84px] z-50 border-b border-slate-200 bg-[rgba(248,250,252,0.96)] shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:hidden"
    : "fixed inset-x-0 top-[84px] z-50 border-b border-white/10 bg-[rgba(7,11,18,0.96)] shadow-[0_24px_80px_rgba(2,6,23,0.28)] md:hidden";

  const mobileItemClass = isLightMode
    ? "flex min-h-[52px] items-center rounded-2xl border border-slate-200 bg-white px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition-colors duration-300 hover:bg-slate-50 hover:text-sky-600"
    : "flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/8 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-50 transition-colors duration-300 hover:bg-white/12 hover:text-cyan-300";

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="fixed inset-x-0 top-0 z-50 !bg-transparent border-b transition-all duration-300"
        style={{
          background: headerBackground,
          borderColor: headerBorderColor,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: headerShadow,
          isolation: "isolate",
          zIndex: 50,
        }}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 md:px-8 xl:px-12">
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

          <nav className="hidden items-center gap-6 md:flex">
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
              className={desktopLangClass}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              className={desktopCtaClass}
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
            className={`${mobileButtonClass} md:hidden`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {!isHomeRoute ? <div className="h-[84px] md:h-[96px]" /> : null}

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label={locale === "en" ? "Close menu overlay" : "Закрыть оверлей меню"}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] md:hidden"
          />

          <div className={mobilePanelClass}>
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-5">
              <button
                type="button"
                onClick={() => jumpTo("system")}
                className={mobileItemClass}
              >
                {t(translations.nav.system, locale)}
              </button>

              <button
                type="button"
                onClick={() => jumpTo("rewards")}
                className={mobileItemClass}
              >
                {t(translations.nav.rewards, locale)}
              </button>

              <button
                type="button"
                onClick={switchLang}
                className={mobileItemClass}
              >
                {locale === "en" ? "RU" : "EN"}
              </button>

              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="beta-access"
                onClick={() => setMenuOpen(false)}
                className="gradient-btn inline-flex min-h-[52px] items-center justify-center rounded-2xl px-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition-opacity duration-300 hover:opacity-90"
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