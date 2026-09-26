import { useLanguage } from "@/hooks/useLanguage";

const content = {
  en: {
    kicker: "Coming soon",
    title: "Electronic gift certificate",
    body: "Soon it will be possible to gift the official attestation service to an adult athlete or friend.",
    status: "In development",
  },
  ru: {
    kicker: "Скоро",
    title: "Электронный подарочный сертификат",
    body: "Скоро появится возможность подарить услугу официальной аттестации совершеннолетнему спортсмену или другу.",
    status: "В разработке",
  },
} as const;

const GiftCertificateSection = () => {
  const locale = useLanguage();
  const copy = locale === "en" ? content.en : content.ru;

  return (
    <section id="gift-certificate" className="bg-slate-50 py-20 text-slate-950 md:py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-16 2xl:px-20">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8 xl:p-10">
          <div className="label text-slate-500">{copy.kicker}</div>
          <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div>
              <h2 className="heading-md text-slate-950">{copy.title}</h2>
              <p className="mt-4 max-w-3xl body-md text-slate-700">{copy.body}</p>
            </div>
            <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              {copy.status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCertificateSection;
