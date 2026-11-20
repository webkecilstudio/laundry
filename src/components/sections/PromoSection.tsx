import { LuArrowRight } from "react-icons/lu";
import promoImage from "../../assets/promo.jpg";
import { Button } from "../ui/Button";

export function PromoSection() {
  return (
    <section className="border-b border-hairline bg-surface py-6 md:py-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] gap-4 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative isolate flex min-h-[320px] flex-col justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-tertiary to-[#EA580C] p-6 text-white shadow-medium md:p-8 reveal stagger-1">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-28 -z-10 h-64 w-64 rounded-full border border-white/25"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-20 -z-10 h-44 w-44 rounded-full border border-white/25"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-canvas">
              Penawaran terbatas
            </span>
            <span className="t-code rounded-full border border-dashed border-white/45 px-2.5 py-1 text-[11px] font-semibold">
              Kode: NEW20
            </span>
          </div>
          <div className="mt-5 grid items-center gap-4 sm:grid-cols-[auto_1fr]">
            <div className="font-display text-[64px] font-extrabold leading-none tracking-[-6px] text-white md:text-[82px]">
              20<span className="align-top text-[0.45em] tracking-[-2px]">%</span>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold leading-none tracking-tight text-white">
                Laundry bareng lebih hemat
              </h2>
              <p className="t-body-sm mt-2 max-w-[470px] text-white/85">
                Ajak teman atau keluarga, potong hingga Rp25.000 untuk pesanan
                berikutnya.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {["Pelanggan baru", "Pickup gratis 3 km"].map((perk) => (
                <span
                  key={perk}
                  className="rounded-full border border-white/25 px-2.5 py-1.5 text-xs font-semibold text-white"
                >
                  {perk}
                </span>
              ))}
            </div>
            <Button href="#booking" variant="white">
              Ambil promo <LuArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="min-h-[220px] overflow-hidden rounded-[20px] border border-hairline bg-surface shadow-medium lg:min-h-0 reveal stagger-2">
          <img
            src={promoImage}
            alt="Tumpukan handuk dan pakaian bersih"
            className="h-full min-h-[220px] w-full object-cover saturate-[0.82]"
          />
        </div>
      </div>
    </section>
  );
}
