type MedalTheme = {
  shell: string;
  number: string;
  amountShadow: string;
};

interface RewardPrizeCardProps {
  status: string;
  amount: string;
  badge: string;
  theme: MedalTheme;
  footerLabel: string;
  featured?: boolean;
}

const RewardPrizeCard = ({
  status,
  amount,
  badge,
  theme,
  footerLabel,
  featured = false,
}: RewardPrizeCardProps) => {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-[30px] border p-6 transition-transform duration-300 md:p-7 ${
        theme.shell
      } ${featured ? "md:-translate-y-3 md:p-8" : ""}`}
    >
      <div className="relative flex h-full min-h-[260px] flex-col md:min-h-[286px]">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-xs">
            {badge}
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            2026
          </div>
        </div>

        <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center md:mt-9">
          <div
            className={`inline-block whitespace-nowrap bg-clip-text pr-[0.12em] text-[3.18rem] font-black leading-none text-transparent ${theme.number} md:text-[3.7rem] xl:text-[3.95rem]`}
          >
            {amount}
          </div>

          <div
            className="mt-5 max-w-[18rem] text-center text-base font-semibold leading-snug text-slate-950"
            style={{ textShadow: theme.amountShadow }}
          >
            {status}
          </div>

          <div className="mt-4 max-w-[18rem] text-center text-sm font-medium leading-snug text-slate-600">
            {footerLabel}
          </div>
        </div>

        <div className="mt-7">
          <div className="h-px w-full bg-slate-200/80" />
        </div>
      </div>
    </div>
  );
};

export default RewardPrizeCard;