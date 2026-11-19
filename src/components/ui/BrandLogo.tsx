import logo from "../../webkecilstudio.png";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      className={`flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight text-ink ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg border border-hairline bg-white">
        <img
          src={logo}
          alt="Webkecil Studio"
          className="h-full w-full object-cover"
        />
      </span>
      <span>BersihBersih</span>
    </a>
  );
}
