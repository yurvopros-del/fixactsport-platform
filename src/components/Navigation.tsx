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
        window.location.assign(`${base}#${id}`);
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

  const headerIsTransparent = isHomeRoute && !scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          headerIsTransparent
            ? "bg-transparent border-transparent"
            : "bg-background/90 backdrop-blur-md border-b border-border"
        }`}
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
              className="text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(translations.nav.system, locale)}
            </button>

            <button
              type="button"
              onClick={() => jumpTo("rewards")}
              className="text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(translations.nav.rewards, locale)}
            </button>

            <button
              type="button"
              onClick={switchLang}
              className="text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="beta-access"
              className="gradient-btn rounded px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
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
            className={`inline-flex h-11 w-11 items-center justify-center rounded border backdrop-blur md:hidden ${
              headerIsTransparent
                ? "border-white/15 bg-black/20 text-white"
                : "border-border bg-background/90 text-foreground"
            }`}
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
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] md:hidden"
          />

          <div className="fixed inset-x-0 top-[84px] z-50 border-b border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:hidden">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-5">
              <button
                type="button"
                onClick={() => jumpTo("system")}
                className="flex min-h-[52px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900"
              >
                {t(translations.nav.system, locale)}
              </button>

              <button
                type="button"
                onClick={() => jumpTo("rewards")}
                className="flex min-h-[52px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900"
              >
                {t(translations.nav.rewards, locale)}
              </button>

              <button
                type="button"
                onClick={switchLang}
                className="flex min-h-[52px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-slate-900"
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