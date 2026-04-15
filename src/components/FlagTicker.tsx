const FLAGS = [
  { iso: "us", code: "USA" }, { iso: "br", code: "BRA" }, { iso: "gb", code: "GBR" }, { iso: "jp", code: "JPN" },
  { iso: "ng", code: "NGA" }, { iso: "in", code: "IND" }, { iso: "de", code: "GER" }, { iso: "kr", code: "KOR" },
  { iso: "mx", code: "MEX" }, { iso: "au", code: "AUS" }, { iso: "ke", code: "KEN" }, { iso: "fr", code: "FRA" },
  { iso: "ru", code: "RUS" }, { iso: "cn", code: "CHN" }, { iso: "sa", code: "KSA" }, { iso: "za", code: "RSA" },
  { iso: "ar", code: "ARG" }, { iso: "ca", code: "CAN" }, { iso: "it", code: "ITA" }, { iso: "es", code: "ESP" },
  { iso: "pl", code: "POL" }, { iso: "tr", code: "TUR" }, { iso: "se", code: "SWE" }, { iso: "no", code: "NOR" },
  { iso: "nl", code: "NED" }, { iso: "pt", code: "POR" }, { iso: "co", code: "COL" }, { iso: "eg", code: "EGY" },
  { iso: "ph", code: "PHI" }, { iso: "th", code: "THA" }, { iso: "jm", code: "JAM" }, { iso: "gh", code: "GHA" },
  { iso: "ch", code: "SUI" }, { iso: "at", code: "AUT" }, { iso: "hr", code: "CRO" }, { iso: "rs", code: "SRB" },
  { iso: "ua", code: "UKR" }, { iso: "cz", code: "CZE" }, { iso: "ro", code: "ROU" }, { iso: "hu", code: "HUN" },
  { iso: "il", code: "ISR" }, { iso: "ae", code: "UAE" }, { iso: "id", code: "INA" }, { iso: "vn", code: "VIE" },
  { iso: "cl", code: "CHI" }, { iso: "pe", code: "PER" }, { iso: "ma", code: "MAR" }, { iso: "dk", code: "DEN" },
  { iso: "fi", code: "FIN" }, { iso: "ie", code: "IRL" },
];

const FALLBACK_FLAG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='24'><rect width='100%' height='100%' fill='%23111111'/></svg>";

interface FlagTickerProps {
  direction?: "left" | "right";
}

const FlagTicker = ({ direction = "left" }: FlagTickerProps) => {
  const animationClass =
    direction === "left" ? "animate-flag-scroll-left" : "animate-flag-scroll-right";

  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Gradient accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gradient-mid)/0.2)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gradient-mid)/0.2)] to-transparent" />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Scrolling flags */}
      <div className={`flex whitespace-nowrap ${animationClass}`}>
        {[...FLAGS, ...FLAGS].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-5 select-none"
            aria-hidden="true"
          >
            <img
              src={`https://flagcdn.com/w40/${item.iso}.png`}
              srcSet={`https://flagcdn.com/w80/${item.iso}.png 2x`}
              alt={item.code}
              className="w-7 h-5 object-cover rounded-sm shadow-sm border border-white/10"
              loading="eager"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = FALLBACK_FLAG;
              }}
            />
            <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground opacity-70">
              {item.code}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlagTicker;