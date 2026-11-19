import { LuArrowRight } from "react-icons/lu";
import { WA_MESSAGE, waUrl } from "../../lib/utils";
import { BrandLogo } from "../ui/BrandLogo";
import { Button } from "../ui/Button";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerLinks: FooterGroup[] = [
  {
    title: "Jelajahi",
    links: [
      { label: "Layanan", href: "#layanan" },
      { label: "Daftar harga", href: "#harga" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Kontak", href: "#kontak" },
      { label: "Lacak pesanan", href: "#lacak" },
    ],
  },
  {
    title: "Ikuti kami",
    links: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "WhatsApp", href: waUrl(WA_MESSAGE), external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-[230px] text-[13px] text-muted">
              Laundry modern untuk hidup yang lebih ringan.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-ink">{group.title}</h4>
              <div className="mt-3 grid gap-2">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener" : undefined}
                    className="text-[13px] text-muted transition duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-hairline pt-5 text-xs text-muted">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Created by <strong className="text-ink">Webkecil Studio</strong>
            </span>
            <a
              href="tel:+6282313153539"
              className="transition duration-200 hover:text-ink"
            >
              (+62 823-1315-3539)
            </a>
            <Button
              href="https://webkecilstudio.github.io/catalogue/"
              target="_blank"
              rel="noopener"
              size="sm"
            >
              Lihat katalog <LuArrowRight aria-hidden="true" />
            </Button>
          </div>
          <span>
            © {new Date().getFullYear()} BersihBersih · Blega dan sekitarnya
          </span>
        </div>
      </div>
    </footer>
  );
}
