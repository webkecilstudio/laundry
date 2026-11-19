import { LuCheck } from "react-icons/lu";
import { plans, type ServiceId } from "../../lib/data";
import { formatIDR } from "../../lib/utils";
import { Button } from "../ui/Button";
import { SectionHead } from "../ui/SectionHead";

type PricingProps = {
  onSelectService: (service: ServiceId) => void;
};

export function Pricing({ onSelectService }: PricingProps) {
  return (
    <section
      id="harga"
      className="border-b border-hairline bg-surface py-6 md:py-10 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="reveal">
          <SectionHead
            kicker="Harga transparan"
            title="Pilih yang paling pas"
            description="Tanpa biaya tersembunyi. Cek estimasi biaya secara langsung dengan kalkulator kami."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={`card relative flex flex-col reveal stagger-${index + 1} ${
                plan.featured
                  ? "border-2 border-accent shadow-medium"
                  : "card-elevated"
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-4 top-4 rounded-full bg-tertiary px-2.5 py-1 text-[11px] font-bold text-[#18181B]">
                  Paling populer
                </span>
              ) : null}
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5 font-display text-[33px] font-bold tracking-tight text-ink">
                {formatIDR(plan.price)}
                <small className="font-sans text-[13px] font-normal text-muted">
                  / {plan.unit}
                </small>
              </div>
              <p className="t-body-sm mt-1 text-muted">{plan.eta}</p>
              <ul className="my-4 grid gap-1.5 border-t border-hairline pt-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <LuCheck
                      aria-hidden="true"
                      className="shrink-0 text-accent"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="#booking"
                variant={plan.featured ? "primary" : "secondary"}
                onClick={() => onSelectService(plan.id)}
                className="mt-auto w-full"
              >
                Pilih {plan.name.toLowerCase()}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
