import { benefits } from "../../lib/data";

export function WhyUs() {
  return (
    <section className="border-b border-hairline bg-canvas py-6 md:py-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="reveal">
          <div className="t-overline text-accent">Kenapa BersihBersih</div>
          <h2 className="t-headline mt-2 max-w-[460px] text-ink">
            Bukan cuma bersih. Kami peduli
          </h2>
          <p className="t-body mt-3 max-w-[480px] text-muted">
            Setiap pakaian diproses dengan perhatian dan sistem yang rapi,
            supaya kamu bisa menikmati waktu untuk hal-hal yang lebih penting.
          </p>
          <div className="mt-6 grid gap-x-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={`flex gap-3 border-t border-hairline py-4 reveal stagger-${
                  (index % 4) + 1
                }`}
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="text-lg" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                  <p className="t-body-sm mt-0.5 text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-large reveal stagger-2">
          <img
            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=900&q=85"
            alt="Pakaian bersih yang dilipat rapi"
            className="h-[330px] w-full object-cover lg:h-[445px]"
          />
        </div>
      </div>
    </section>
  );
}
