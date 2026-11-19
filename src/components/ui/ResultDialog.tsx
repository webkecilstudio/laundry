import { useEffect, useRef, type ReactNode } from "react";
import { LuX } from "react-icons/lu";
import { Button } from "./Button";

export type ResultDialogContent = {
  kicker: string;
  title: string;
  content: ReactNode;
};

type ResultDialogProps = {
  open: boolean;
  onClose: () => void;
  kicker?: string;
  title?: string;
  children?: ReactNode;
};

export function ResultDialog({
  open,
  onClose,
  kicker,
  title,
  children,
}: ResultDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      const activeElement = document.activeElement;
      returnFocusRef.current =
        activeElement instanceof HTMLElement ? activeElement : null;
      wasOpenRef.current = true;
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        returnFocusRef.current?.focus();
      }
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="result-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="result-dialog m-auto w-[min(520px,calc(100%-32px))] max-h-[90vh] overflow-y-auto rounded-xl border border-hairline bg-surface p-0 text-body shadow-overlay backdrop:bg-black/50"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
          <div>
            <div className="t-overline text-accent">{kicker}</div>
            <h3
              id="result-dialog-title"
              className="mt-1 text-2xl font-semibold tracking-tight text-ink"
            >
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-muted transition duration-200 hover:bg-surface-soft hover:text-ink"
          >
            <LuX aria-hidden="true" />
          </button>
        </div>
        {children}
        <div className="mt-5 flex justify-end">
          <Button onClick={onClose}>Selesai</Button>
        </div>
      </div>
    </dialog>
  );
}

export function DialogStatus({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg bg-success-soft px-3.5 py-3 text-[13px] font-semibold text-[#16A34A] dark:text-[#86EFAC]">
      {children}
    </div>
  );
}

export function DialogDetails({ children }: { children: ReactNode }) {
  return <div className="my-4 grid gap-2.5">{children}</div>;
}

export function DialogRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex justify-between gap-[18px] border-b border-hairline pb-2.5 text-[13px]">
      <span className="text-muted">{label}</span>
      <span className="text-right font-semibold text-ink">{value}</span>
    </div>
  );
}

export type TimelineItem = {
  label: string;
  meta: string;
  state?: "done" | "current" | "upcoming";
};

export function DialogTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="mt-4 grid gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center justify-between gap-4 border-l-[3px] pl-3.5 text-[13px] ${
            item.state === "done" || item.state === "current"
              ? "border-accent text-ink"
              : "border-hairline text-muted"
          }`}
        >
          <b
            className={
              item.state === "current" ? "font-semibold text-accent" : ""
            }
          >
            {item.label}
          </b>
          <span className="text-xs">{item.meta}</span>
        </div>
      ))}
    </div>
  );
}
