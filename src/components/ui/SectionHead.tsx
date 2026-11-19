type SectionHeadProps = {
  kicker: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionHead({
  kicker,
  title,
  description,
  center = false,
}: SectionHeadProps) {
  return (
    <div
      className={
        center
          ? "mb-6 flex flex-col items-center text-center md:mb-8"
          : "mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between"
      }
    >
      <div>
        <div className="t-overline text-accent">{kicker}</div>
        <h2 className="t-headline mt-2 text-ink">{title}</h2>
      </div>
      {description ? (
        <p
          className={`t-body max-w-[460px] text-muted ${center ? "mt-3" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
