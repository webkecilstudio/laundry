import { LuArrowRight, LuCircleCheckBig, LuClock } from "react-icons/lu";
import { Button } from "../ui/Button";

const stats = [
  { value: "6 jam", label: "layanan express" },
  { value: "3 km", label: "pickup gratis" },
  { value: "20%", label: "diskon pelanggan baru" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, var(--color-primary-soft), transparent 45%), radial-gradient(circle at 0% 100%, var(--color-secondary-soft), transparent 40%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div className="animate-[hero-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="t-overline text-accent">
            Laundry modern, hidup lebih ringan
          </div>
          <h1 className="t-display mt-3 max-w-[620px] text-balance text-ink">
            Waktumu terlalu berharga untuk cucian
          </h1>
          <p className="t-body-lg mt-4 max-w-[560px] text-muted">
            Serahkan pakaian kotormu pada kami. Dicuci bersih, wangi, dilipat
            rapi, lalu diantar kembali ke pintu rumah.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Button href="#booking" size="lg">
              Jadwalkan pickup <LuArrowRight aria-hidden="true" />
            </Button>
            <Button href="#harga" variant="secondary" size="lg">
              Lihat daftar harga
            </Button>
          </div>
          <div className="mt-8 grid max-w-[520px] grid-cols-3 gap-3 border-t border-hairline pt-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-xl font-bold tracking-tight text-ink">
                  {stat.value}
                </div>
                <div className="t-caption mt-0.5 text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-[hero-in_0.6s_cubic-bezier(0.22,1,0.36,1)_0.12s_both]">
          <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-overlay">
            <img
              src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1400&q=85"
              alt="Ilustrasi mesin cuci dan pakaian bersih"
              className="h-[300px] w-full object-cover md:h-[380px] lg:h-[430px]"
            />
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-subtle backdrop-blur">
            <LuClock
              aria-hidden="true"
              className="text-[#EA580C] dark:text-tertiary"
            />
            Pickup hari ini
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-lg border border-hairline bg-surface p-3.5 shadow-large sm:left-6">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-success-soft text-[#16A34A] dark:text-[#86EFAC]">
              <LuCircleCheckBig aria-hidden="true" />
            </span>
            <span className="text-[13px] leading-snug">
              <strong className="block text-sm font-semibold text-ink">
                Pesanan #BB-2048
              </strong>
              <span className="text-muted">Selesai &amp; siap diantar</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
