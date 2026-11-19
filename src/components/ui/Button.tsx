import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

const sizes = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-[38px] px-[18px] text-sm",
  lg: "h-[46px] px-5 text-sm",
} as const;

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "border border-accent bg-transparent text-accent hover:bg-accent-soft",
  ghost: "bg-transparent text-muted hover:bg-surface-soft hover:text-ink",
  white: "bg-white text-[#18181B] hover:bg-[#F4F4F5]",
  destructive: "bg-error text-white hover:bg-[#DC2626]",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | ({
        href: string;
      } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href">)
    | ({
        href?: undefined;
      } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>)
  );

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
