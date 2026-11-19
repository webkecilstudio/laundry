export function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-7 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-ink px-4 py-3 text-[13px] text-canvas shadow-overlay transition duration-200 ${
        message
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
