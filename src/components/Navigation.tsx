import { useEffect, useState } from "react";
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
  const locale = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const logo = locale === "en" ? logoEn : logoRu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
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

  const headerBackground = menuOpen
    ? "#0F3D3E"
    : scrolled
      ? "rgba(15, 61, 62, 0.92)"
      : "linear-gradient(to bottom, rgba(15, 61, 62, 0.78), rgba(15, 61, 62, 0.52))";

  const headerBorderColor =
    menuOpen || scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.08)";

  const desktopLinkClass =
    "text-sm uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 hover:text-emerald-300";

  const desktopLangClass =
    "text-sm uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 hover:text-emerald-300";

  const desktopCtaClass =
    "gradient-btn rounded px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_16px_36px_rgba(37,99,235,0.30)] transition-all duration-300 hover:opacity-95 hover:shadow-[0_20px_44px_rgba(37,99,235,0.34)]";

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
          boxShadow:
            scrolled || menuOpen ? "0 14px 40px rgba(7, 29, 30, 0.18)" : "none",
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
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 bg-white/10 text-slate-50 backdrop-blur-md transition-all duration-300 hover:bg-white/14 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <div className="h-[84px] md:h-[96px]" />

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label={locale === "en" ? "Close menu overlay" : "Закрыть оверлей меню"}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] md:hidden"
          />

          <div className="fixed inset-x-0 top-[84px] z-50 border-b border-white/10 bg-[#0F3D3E] shadow-[0_24px_80px_rgba(7,29,30,0.28)] md:hidden">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-5">
              <button
                type="button"
                onClick={() => jumpTo("system")}
                className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/8 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-50 transition-colors duration-300 hover:bg-white/12 hover:text-emerald-200"
              >
                {t(translations.nav.system, locale)}
              </button>

              <button
                type="button"
                onClick={() => jumpTo("rewards")}
                className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/8 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-50 transition-colors duration-300 hover:bg-white/12 hover:text-emerald-200"
              >
                {t(translations.nav.rewards, locale)}
              </button>

              <button
                type="button"
                onClick={switchLang}
                className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/8 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-50 transition-colors duration-300 hover:bg-white/12 hover:text-emerald-200"
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