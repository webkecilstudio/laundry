import { LuArrowRight } from "react-icons/lu";
import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 text-center md:py-16">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/15"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/10"
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-6 reveal">
        <h2 className="font-display text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-white">
          Hari ini, biar kami yang cuci
        </h2>
        <p className="t-body-lg mx-auto mt-3 max-w-[520px] text-white/75">
          Lebih banyak waktu untuk kamu. Lebih sedikit cucian untuk dipikirkan.
        </p>
        <Button href="#booking" variant="white" size="lg" className="mt-6">
          Jadwalkan pickup sekarang <LuArrowRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
