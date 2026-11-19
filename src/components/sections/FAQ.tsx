import { LuPlus } from "react-icons/lu";
import { faqs } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

export function FAQ() {
  return (
    <section
      id="faq"
      className="border-b border-hairline bg-canvas py-6 md:py-10 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="reveal">
          <SectionHead
            kicker="Pertanyaan umum"
            title="Masih penasaran?"
            center
          />
        </div>
        <div className="mx-auto grid max-w-[820px] gap-2.5">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className={`group rounded-lg border border-hairline bg-surface px-5 py-4 transition duration-200 hover:border-hairline-strong reveal stagger-${
                (index % 4) + 1
              }`}
            >
              <summary className="flex list-none cursor-pointer items-center justify-between gap-4 font-semibold text-ink transition duration-200 hover:text-accent [&::-webkit-details-marker]:hidden">
                {faq.question}
                <LuPlus
                  aria-hidden="true"
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="t-body-sm mt-3 max-w-[700px] text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
