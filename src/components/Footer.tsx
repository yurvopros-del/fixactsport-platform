import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const Footer = () => {
  const locale = useLanguage();

  return (
    <footer className="border-t border-border py-12">
      <div className="content-max flex flex-col items-center gap-6">
        <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground">
          {t(translations.footer.operator, locale)}
        </span>

        <div className="flex max-w-full flex-col items-center justify-center gap-3 text-center sm:flex-wrap sm:flex-row sm:gap-4 md:gap-6">
          <Link
            to={locale === "ru" ? "/ru/user-agreement" : "/user-agreement"}
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground [overflow-wrap:anywhere]"
          >
            {t(translations.footer.terms, locale)}
          </Link>
          <span className="hidden text-muted-foreground/40 sm:inline">|</span>
          <Link
            to={locale === "ru" ? "/ru/privacy-policy" : "/privacy-policy"}
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground [overflow-wrap:anywhere]"
          >
            {t(translations.footer.privacy, locale)}
          </Link>
          <span className="hidden text-muted-foreground/40 sm:inline">|</span>
          <Link
            to={locale === "ru" ? "/ru/cookie-policy" : "/cookie-policy"}
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground [overflow-wrap:anywhere]"
          >
            {t(translations.footer.cookiePolicy, locale)}
          </Link>
          <span className="hidden text-muted-foreground/40 sm:inline">|</span>
          <Link
            to={locale === "ru" ? "/ru/beta-testing" : "/beta-testing"}
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground [overflow-wrap:anywhere]"
          >
            <span className="text-[10px] leading-none px-1 py-0.5 rounded border border-muted-foreground/30 font-medium">
              β
            </span>
            {t(translations.footer.beta, locale)}
          </Link>
          <span className="hidden text-muted-foreground/40 sm:inline">|</span>
          <a
            href="https://t.me/DjamalG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground [overflow-wrap:anywhere]"
          >
            {t(translations.footer.contact, locale)}
          </a>
        </div>

        <span className="text-center text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground [overflow-wrap:anywhere]">
© {new Date().getFullYear()} {locale === "en" ? "Fixact Sport" : "ФиксАкт Спорт"}. {t(translations.footer.rights, locale)}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
