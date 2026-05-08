import { useLanguage } from "@/hooks/useLanguage";

const ContactsSection = () => {
  const locale = useLanguage();

  return (
    <section
      id="contacts"
      className="bg-slate-950 py-20 text-white md:py-24 [:root[data-accessibility='high-visibility']_&]:bg-white [:root[data-accessibility='high-visibility']_&]:text-slate-950"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-8 xl:p-10 [:root[data-accessibility='high-visibility']_&]:border-slate-200 [:root[data-accessibility='high-visibility']_&]:bg-slate-50 [:root[data-accessibility='high-visibility']_&]:shadow-none">
          <div className="label text-white/55 [:root[data-accessibility='high-visibility']_&]:text-slate-500">
            {locale === "en" ? "Contacts" : "Контакты"}
          </div>

          <h2 className="mt-5 heading-md text-white [:root[data-accessibility='high-visibility']_&]:text-slate-950">
            {locale === "en"
              ? "Partnership, participation, and cooperation"
              : "Партнёрство, участие и сотрудничество"}
          </h2>

          <a
            href="mailto:hello@fixactsport.org"
            className="mt-6 inline-flex break-all text-xl font-semibold text-white underline decoration-white/30 underline-offset-8 transition-colors hover:text-white/80 md:text-2xl [:root[data-accessibility='high-visibility']_&]:text-slate-950 [:root[data-accessibility='high-visibility']_&]:decoration-slate-400 [:root[data-accessibility='high-visibility']_&]:hover:text-slate-700"
          >
            hello@fixactsport.org
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
