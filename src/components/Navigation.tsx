import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";
import { useNavigate, useLocation } from "react-router-dom";
import logoRu from "@/assets/fixact-sport-logo.svg";
import logoEn from "@/assets/logo-en.svg";
import { BETA_FORM_URL } from "@/lib/constants";
import { reportHorizontalOverflow } from "@/lib/debugOverflow";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.requestAnimationFrame(() => {
      reportHorizontalOverflow(`nav:${menuOpen ? "open" : "closed"}:${window.innerWidth}`);
    });
  }, [menuOpen]);

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

  const handleJumpTo = (id: "system" | "rewards") => {
    setMenuOpen(false);
    jumpTo(id);
  };

  const handleSwitchLang = () => {
    setMenuOpen(false);
    switchLang();
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="content-max flex h-14 items-center justify-between gap-3 md:h-[72px] md:gap-6">
        <button
          type="button"
          onClick={goHome}
          className="flex min-w-0 max-w-[calc(100vw-7rem)] items-center gap-3 md:max-w-none"
          aria-label={locale === "en" ? "FIXACT SPORT — home" : "ФиксАкт Спорт — главная"}
        >
          <img
            src={logo}
            alt={locale === "en" ? "FIXACT SPORT" : "ФиксАкт Спорт"}
            className="h-6 max-w-full w-auto md:h-7"
          />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => jumpTo("system")}
            className="text-sm tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {t(translations.nav.system, locale)}
          </button>

          <button
            type="button"
            onClick={() => jumpTo("rewards")}
            className="text-sm tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {t(translations.nav.rewards, locale)}
          </button>

          <button
            type="button"
            onClick={switchLang}
            className="text-sm tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {locale === "en" ? "RU" : "EN"}
          </button>

          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {t(translations.nav.cta, locale)}
          </a>
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-border bg-background/60 text-foreground transition-colors hover:bg-secondary md:hidden"
              aria-label={locale === "en" ? "Open menu" : "Открыть меню"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="top"
            className="border-b border-border bg-background/95 px-4 pt-14 pb-8 backdrop-blur supports-[backdrop-filter]:bg-background/90 md:hidden sm:px-6"
          >
            <SheetTitle className="sr-only">
              {locale === "en" ? "Navigation menu" : "Меню навигации"}
            </SheetTitle>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleJumpTo("system")}
                className="flex min-h-12 items-center rounded border border-border px-4 py-3 text-left text-sm tracking-[0.08em] uppercase text-foreground transition-colors hover:bg-secondary"
              >
                {t(translations.nav.system, locale)}
              </button>

              <button
                type="button"
                onClick={() => handleJumpTo("rewards")}
                className="flex min-h-12 items-center rounded border border-border px-4 py-3 text-left text-sm tracking-[0.08em] uppercase text-foreground transition-colors hover:bg-secondary"
              >
                {t(translations.nav.rewards, locale)}
              </button>

              <button
                type="button"
                onClick={handleSwitchLang}
                className="flex min-h-12 items-center rounded border border-border px-4 py-3 text-left text-sm tracking-[0.08em] uppercase text-foreground transition-colors hover:bg-secondary"
              >
                {locale === "en" ? "RU" : "EN"}
              </button>

              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="gradient-btn flex min-h-12 items-center justify-center rounded px-4 py-3 text-center text-sm font-semibold tracking-[0.08em] uppercase text-foreground transition-opacity hover:opacity-90"
              >
                {t(translations.nav.joinMobile, locale)}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default Navigation;
