import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { useNavigate, useLocation } from "react-router-dom";
import logoRu from "@/assets/fixact-sport-logo.svg";
import logoEn from "@/assets/logo-en.svg";
import { BETA_FORM_URL } from "@/lib/constants";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const locale = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const logo = locale === "en" ? logoEn : logoRu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = import.meta.env.BASE_URL;

  const goHome = () => {
    if (locale === "ru") {
      window.location.assign(`${base}ru/`);
      return;
    }

    navigate("/");
  };

  const jumpTo = (id: "system" | "rewards") => {
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
    if (locale === "en") {
      window.location.assign(`${base}ru/`);
    } else {
      window.location.assign(`${base}?lang=en`);
    }
  };

  const navTextClass =
    "text-sm tracking-[0.08em] uppercase text-white hover:text-white transition-colors";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`relative transition-all duration-300 ${
          scrolled
            ? "border-b border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.22)]"
            : "border-b border-white/8"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(74,78,84,0.97) 0%, rgba(52,55,60,0.96) 42%, rgba(36,38,42,0.95) 100%)",
          backdropFilter: "blur(14px) saturate(125%)",
          WebkitBackdropFilter: "blur(14px) saturate(125%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 14%, rgba(255,255,255,0) 34%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.24) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.24) 80%, rgba(255,255,255,0) 100%)",
          }}
        />

        <div className="relative content-max h-14 md:h-[72px] flex items-center justify-between">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-3"
            aria-label={locale === "en" ? "FIXACT SPORT — home" : "ФиксАкт Спорт — главная"}
          >
            <img
              src={logo}
              alt={locale === "en" ? "FIXACT SPORT" : "ФиксАкт Спорт"}
              className="h-6 md:h-7 w-auto"
            />
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => jumpTo("system")}
              className={navTextClass}
            >
              {t(translations.nav.system, locale)}
            </button>

            <button
              type="button"
              onClick={() => jumpTo("rewards")}
              className={navTextClass}
            >
              {t(translations.nav.rewards, locale)}
            </button>

            <button
              type="button"
              onClick={switchLang}
              className={navTextClass}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={navTextClass}
            >
              {t(translations.nav.cta, locale)}
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={switchLang}
              className={navTextClass}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={navTextClass}
            >
              {t(translations.nav.joinMobile, locale)}
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;