import { FaWhatsapp } from "react-icons/fa";
import { LuClock, LuMapPin } from "react-icons/lu";
import { WA_MESSAGE, waUrl } from "../../lib/utils";
import { Button } from "../ui/Button";

const address =
  "Jl. Raya Blega, No. 01, Blega, Kabupaten Bangkalan, Jawa Timur 69161";

export function Contact() {
  return (
    <section
      id="kontak"
      className="border-b border-hairline bg-surface py-6 md:py-10 lg:py-14"
    >
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="reveal stagger-1">
          <div className="t-overline text-accent">Datang dan lihat</div>
          <h2 className="t-headline mt-2 text-ink">Kami dekat denganmu</h2>
          <p className="t-body mt-3 max-w-[480px] text-muted">
            Outlet utama BersihBersih ada di tengah kota. Mau datang langsung
            atau kami yang menjemput, sama-sama mudah.
          </p>
          <div className="mt-6 grid gap-3.5 text-sm text-muted">
            <div className="flex gap-3">
              <LuMapPin
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-base text-accent"
              />
              <div>
                <strong className="block text-ink">Alamat</strong>
                {address}
              </div>
            </div>
            <div className="flex gap-3">
              <LuClock
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-base text-accent"
              />
              <div>
                <strong className="block text-ink">Jam operasional</strong>
                Senin–Minggu, 08.00–20.00
              </div>
            </div>
            <div className="flex gap-3">
              <FaWhatsapp
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-base text-accent"
              />
              <div>
                <strong className="block text-ink">WhatsApp</strong>
                <a
                  href={waUrl(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener"
                  className="text-secondary underline-offset-2 hover:underline"
                >
                  +62 812-3456-7890
                </a>
              </div>
            </div>
          </div>
          <Button href="#booking" className="mt-6">
            Pesan pickup
          </Button>
        </div>
        <div className="min-h-[275px] overflow-hidden rounded-xl border border-hairline bg-surface-soft shadow-medium reveal stagger-2">
          <iframe
            title="Lokasi BersihBersih Laundry di Google Maps"
            src="https://www.google.com/maps?q=Jl.%20Raya%20Blega%20No.%2001%2C%20Blega%2C%20Kabupaten%20Bangkalan%2C%20Jawa%20Timur%2069161&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[275px] w-full border-0 transition duration-300 lg:h-[420px] dark:invert dark:hue-rotate-180 dark:brightness-90"
          />
        </div>
      </div>
    </section>
  );
}
