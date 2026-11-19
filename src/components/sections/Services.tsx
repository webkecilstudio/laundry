import { services } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

export function Services() {
  return (
    <section
      id="layanan"
      className="border-b border-hairline bg-canvas py-6 md:py-10 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="reveal">
          <SectionHead
            kicker="Layanan kami"
            title="Semua yang kamu butuhkan"
            description="Dari cucian harian sampai pakaian spesial, kami rawat dengan standar yang sama: bersih, teliti, dan tepat waktu."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={`card card-elevated group min-h-[190px] reveal stagger-${
                (index % 4) + 1
              }`}
            >
              <div className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent transition duration-200 group-hover:bg-primary group-hover:text-white">
                <Icon aria-hidden="true" className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="t-body-sm mt-1.5 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
