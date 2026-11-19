import { LuStar } from "react-icons/lu";
import { testimonials } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

export function Testimonials() {
  return (
    <section className="border-b border-hairline bg-canvas py-6 md:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="reveal">
          <SectionHead
            kicker="Kata mereka"
            title="Disukai yang sibuk"
            description="Ribuan pelanggan mempercayakan pakaian mereka kepada kami setiap minggu."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`flex min-h-[265px] flex-col overflow-hidden reveal stagger-${
                index + 1
              } ${
                testimonial.accent
                  ? "rounded-lg border border-accent bg-primary p-4 text-white shadow-medium"
                  : "card card-elevated"
              }`}
            >
              <div
                aria-label="5 dari 5 bintang"
                className={`mb-4 flex gap-0.5 ${
                  testimonial.accent ? "text-white/90" : "text-warning"
                }`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <LuStar
                    key={index}
                    aria-hidden="true"
                    className="fill-current text-sm"
                  />
                ))}
              </div>
              <p
                className={`t-body-lg flex-1 leading-relaxed ${
                  testimonial.accent ? "text-white" : "text-body"
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div
                className={`mt-auto flex items-center gap-2.5 border-t pt-4 text-[13px] ${
                  testimonial.accent
                    ? "border-white/20 text-white/80"
                    : "border-hairline text-muted"
                }`}
              >
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full text-[15px] font-semibold ${
                    testimonial.accent
                      ? "bg-white/15 text-white"
                      : "bg-accent-soft text-accent"
                  }`}
                >
                  {testimonial.initial}
                </div>
                <span>
                  <b
                    className={`block font-semibold ${
                      testimonial.accent ? "text-white" : "text-ink"
                    }`}
                  >
                    {testimonial.name}
                  </b>
                  {testimonial.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
