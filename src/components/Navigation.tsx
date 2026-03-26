import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { useNavigate, useLocation } from "react-router-dom";
import logoRu from "@/assets/fixact-sport-logo.svg";
import logoEn from "@/assets/logo-en.svg";
import { BETA_FORM_URL } from "@/lib/constants";

type HoverKey = "system" | "rewards" | "lang" | "cta" | "mobileCta" | null;

const GRADIENT_TEXT_STYLE = {
  backgroundImage: "linear-gradient(135deg, #16D5FF 0%, #4F7BFF 45%, #B04DFF 100%)",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  color: "transparent",
};

const WHITE_TEXT_STYLE = {
  color: "#FFFFFF",
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<HoverKey>(null);

  const locale = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const logo = locale === "en" ? logoEn : logoRu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const itemClass =
    "text-sm tracking-[0.08em] uppercase transition-all duration-200";

  const barShadow = scrolled
    ? "0 10px 24px rgba(15, 23, 42, 0.12)"
    : "0 4px 10px rgba(15, 23, 42, 0.06)";

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 left-0 right-0 z-50"
    >
      <div
        className="relative border-b"
        style={{
          background: "linear-gradient(180deg, #545A61 0%, #44484E 42%, #383C41 100%)",
          borderColor: "rgba(255,255,255,0.16)",
          boxShadow: barShadow,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 18%, rgba(255,255,255,0) 42%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.26) 20%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.26) 80%, rgba(255,255,255,0) 100%)",
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
              onMouseEnter={() => setHovered("system")}
              onMouseLeave={() => setHovered(null)}
              className={itemClass}
              style={hovered === "system" ? GRADIENT_TEXT_STYLE : WHITE_TEXT_STYLE}
            >
              {t(translations.nav.system, locale)}
            </button>

            <button
              type="button"
              onClick={() => jumpTo("rewards")}
              onMouseEnter={() => setHovered("rewards")}
              onMouseLeave={() => setHovered(null)}
              className={itemClass}
              style={hovered === "rewards" ? GRADIENT_TEXT_STYLE : WHITE_TEXT_STYLE}
            >
              {t(translations.nav.rewards, locale)}
            </button>

            <button
              type="button"
              onClick={switchLang}
              onMouseEnter={() => setHovered("lang")}
              onMouseLeave={() => setHovered(null)}
              className={itemClass}
              style={hovered === "lang" ? GRADIENT_TEXT_STYLE : WHITE_TEXT_STYLE}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered("cta")}
              onMouseLeave={() => setHovered(null)}
              className={itemClass}
              style={hovered === "cta" ? GRADIENT_TEXT_STYLE : WHITE_TEXT_STYLE}
            >
              {t(translations.nav.cta, locale)}
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={switchLang}
              onMouseEnter={() => setHovered("lang")}
              onMouseLeave={() => setHovered(null)}
              className={itemClass}
              style={hovered === "lang" ? GRADIENT_TEXT_STYLE : WHITE_TEXT_STYLE}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered("mobileCta")}
              onMouseLeave={() => setHovered(null)}
              className={itemClass}
              style={hovered === "mobileCta" ? GRADIENT_TEXT_STYLE : WHITE_TEXT_STYLE}
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