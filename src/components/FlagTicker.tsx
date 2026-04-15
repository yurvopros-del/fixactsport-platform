import us from "@/assets/flags/us.svg";
import br from "@/assets/flags/br.svg";
import gb from "@/assets/flags/gb.svg";
import jp from "@/assets/flags/jp.svg";
import ng from "@/assets/flags/ng.svg";
import ind from "@/assets/flags/in.svg";
import de from "@/assets/flags/de.svg";
import kr from "@/assets/flags/kr.svg";
import mx from "@/assets/flags/mx.svg";
import au from "@/assets/flags/au.svg";
import ke from "@/assets/flags/ke.svg";
import fr from "@/assets/flags/fr.svg";
import ru from "@/assets/flags/ru.svg";
import cn from "@/assets/flags/cn.svg";
import sa from "@/assets/flags/sa.svg";
import za from "@/assets/flags/za.svg";
import ar from "@/assets/flags/ar.svg";
import ca from "@/assets/flags/ca.svg";
import it from "@/assets/flags/it.svg";
import es from "@/assets/flags/es.svg";
import pl from "@/assets/flags/pl.svg";
import tr from "@/assets/flags/tr.svg";
import se from "@/assets/flags/se.svg";
import no from "@/assets/flags/no.svg";
import nl from "@/assets/flags/nl.svg";
import pt from "@/assets/flags/pt.svg";
import co from "@/assets/flags/co.svg";
import eg from "@/assets/flags/eg.svg";
import ph from "@/assets/flags/ph.svg";
import th from "@/assets/flags/th.svg";
import jm from "@/assets/flags/jm.svg";
import gh from "@/assets/flags/gh.svg";
import ch from "@/assets/flags/ch.svg";
import at from "@/assets/flags/at.svg";
import hr from "@/assets/flags/hr.svg";
import rs from "@/assets/flags/rs.svg";
import ua from "@/assets/flags/ua.svg";
import cz from "@/assets/flags/cz.svg";
import ro from "@/assets/flags/ro.svg";
import hu from "@/assets/flags/hu.svg";
import il from "@/assets/flags/il.svg";
import ae from "@/assets/flags/ae.svg";
import id from "@/assets/flags/id.svg";
import vn from "@/assets/flags/vn.svg";
import cl from "@/assets/flags/cl.svg";
import pe from "@/assets/flags/pe.svg";
import ma from "@/assets/flags/ma.svg";
import dk from "@/assets/flags/dk.svg";
import fi from "@/assets/flags/fi.svg";
import ie from "@/assets/flags/ie.svg";

const FLAGS = [
  us, br, gb, jp, ng, ind, de, kr, mx, au, ke, fr, ru, cn, sa, za,
  ar, ca, it, es, pl, tr, se, no, nl, pt, co, eg, ph, th, jm, gh,
  ch, at, hr, rs, ua, cz, ro, hu, il, ae, id, vn, cl, pe, ma, dk, fi, ie
];

interface FlagTickerProps {
  direction?: "left" | "right";
}

const FlagTicker = ({ direction = "left" }: FlagTickerProps) => {
  const animationClass =
    direction === "left" ? "animate-flag-scroll-left" : "animate-flag-scroll-right";

  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gradient-mid)/0.2)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gradient-mid)/0.2)] to-transparent" />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Scrolling flags */}
      <div className={`flex whitespace-nowrap ${animationClass}`}>
        {[...FLAGS, ...FLAGS].map((src, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-4 select-none"
            aria-hidden="true"
          >
            <img
              src={src}
              alt=""
              className="w-7 h-5 object-cover rounded-sm shadow-sm border border-white/10"
              loading="eager"
              decoding="async"
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlagTicker;