type MedalTheme = {
  shell: string;
  number: string;
  glow: string;
  amountShadow: string;
};

interface RewardPrizeCardProps {
  status: string;
  amount: string;
  badge: string;
  theme: MedalTheme;
  featured?: boolean;
}

const RewardPrizeCard = ({
  status,
  amount,
  badge,
  theme,
  featured = false,
}: RewardPrizeCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border p-6 md:p-7 ${
        theme.shell
      } ${featured ? "md:-translate-y-3 md:p-8" : ""}`}
    >
      <div className={`pointer-events-none absolute inset-0 opacity-90 ${theme.glow}`} />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-xs">
            {badge}
          </div>

          <div className="rounded-full border border-slate-200/70 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 backdrop-blur-sm">
            2026
          </div>
        </div>

        <div className="mt-6 overflow-visible">
          <div
            className={`inline-block whitespace-nowrap bg-clip-text pr-[0.12em] text-[3.2rem] font-black leading-none text-transparent ${theme.number} md:text-[4rem]`}
            style={{
              filter: "drop-shadow(0 3px 10px rgba(255,255,255,0.28))",
            }}
          >
            {amount}
          </div>

          <div
            className="mt-5 text-sm font-medium leading-relaxed text-slate-900 md:text-base"
            style={{ textShadow: theme.amountShadow }}
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardPrizeCard;