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
}: RewardPrizeCardProps) => {
  return (
    <div
      className={`group relative flex h-full overflow-hidden rounded-[22px] border p-4 transition-all duration-300 ease-out will-change-transform active:scale-[0.985] md:rounded-[30px] md:p-7 md:hover:-translate-y-1.5 md:hover:shadow-[0_26px_64px_rgba(15,23,42,0.14)] ${theme.shell}`}
    >
      <div className="relative flex h-full min-h-[162px] w-full flex-col md:min-h-[286px]">
        <div className="flex items-start justify-between gap-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 md:text-xs md:tracking-[0.18em]">
            {badge}
          </div>

          <div className="rounded-full border border-slate-300/80 bg-white/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-sm transition-colors duration-300 group-hover:border-slate-400/80 group-hover:bg-white md:px-3 md:text-[11px] md:tracking-[0.14em]">
            2026
          </div>
        </div>

        <div className="mt-3 flex flex-1 flex-col items-center justify-center text-center md:mt-9">
          <div
            className={`inline-block whitespace-nowrap bg-clip-text pr-[0.12em] text-[2.18rem] font-black leading-none text-transparent transition-transform duration-300 ease-out group-hover:scale-[1.025] group-active:scale-[0.99] ${theme.number} md:text-[3.7rem] xl:text-[3.95rem]`}
          >
            {amount}
          </div>

          <div
            className="mt-3 max-w-[18rem] text-center text-[13px] font-semibold leading-snug text-slate-950 md:mt-5 md:text-base"
            style={{ textShadow: theme.amountShadow }}
          >
            {status}
          </div>

          <div className="mt-2 max-w-[18rem] text-center text-[11px] font-medium leading-snug text-slate-600 md:mt-4 md:text-sm">
            {footerLabel}
          </div>
        </div>

        <div className="mt-4 md:mt-7">
          <div className="h-px w-full bg-slate-200/90 transition-colors duration-300 group-hover:bg-slate-300" />
        </div>
      </div>
    </div>
  );
};

export default RewardPrizeCard;

