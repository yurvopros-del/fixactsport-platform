import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, t } from "@/lib/translations";

const Footer = () => {
  const locale = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-[#F8FAFC] py-14">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 xl:px-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <span className="text-xs font-medium tracking-[0.12em] text-slate-500">
            {t(translations.footer.operator, locale)}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-6">
            <Link
              to={locale === "ru" ? "/ru/user-agreement" : "/user-agreement"}
              className="text-xs uppercase tracking-[0.1em] text-slate-500 transition-colors hover:text-[hsl(var(--gradient-mid))]"
            >
              {t(translations.footer.terms, locale)}
            </Link>

            <span className="hidden md:inline text-slate-300">|</span>

            <Link
              to={locale === "ru" ? "/ru/privacy-policy" : "/privacy-policy"}
              className="text-xs uppercase tracking-[0.1em] text-slate-500 transition-colors hover:text-[hsl(var(--gradient-mid))]"
            >
              {t(translations.footer.privacy, locale)}
            </Link>

            <span className="hidden md:inline text-slate-300">|</span>

            <Link
              to={locale === "ru" ? "/ru/cookie-policy" : "/cookie-policy"}
              className="text-xs uppercase tracking-[0.1em] text-slate-500 transition-colors hover:text-[hsl(var(--gradient-mid))]"
            >
              {t(translations.footer.cookiePolicy, locale)}
            </Link>

            <span className="hidden md:inline text-slate-300">|</span>

            <Link
              to={locale === "ru" ? "/ru/beta-testing" : "/beta-testing"}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-slate-500 transition-colors hover:text-[hsl(var(--gradient-mid))]"
            >
              <span className="text-[10px] leading-none px-1 py-0.5 rounded border border-slate-300 font-medium">
                β
              </span>
              {t(translations.footer.beta, locale)}
            </Link>

            <span className="hidden md:inline text-slate-300">|</span>

            <a
              href="https://t.me/DjamalG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.1em] text-slate-500 transition-colors hover:text-[hsl(var(--gradient-mid))]"
            >
              {t(translations.footer.contact, locale)}
            </a>
          </div>

          <span className="text-xs font-medium tracking-[0.15em] uppercase text-slate-500">
            © {new Date().getFullYear()}{" "}
            {locale === "en" ? "Fixact Sport" : "ФиксАкт Спорт"}.{" "}
            {t(translations.footer.rights, locale)}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;