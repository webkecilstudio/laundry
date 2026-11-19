import { useRef, useState } from "react";
import { usePriceCalculator } from "../../hooks/usePriceCalculator";
import type { ServiceId } from "../../lib/data";
import {
  ResultDialog,
  type ResultDialogContent,
} from "../ui/ResultDialog";
import { SectionHead } from "../ui/SectionHead";
import { Toast } from "../ui/Toast";
import { BookingForm } from "./tools/BookingForm";
import { CalculatorCard } from "./tools/CalculatorCard";
import { TrackCard } from "./tools/TrackCard";

type ToolsSectionProps = {
  service: ServiceId;
  setService: (service: ServiceId) => void;
};

export function ToolsSection({ service, setService }: ToolsSectionProps) {
  const [dialog, setDialog] = useState<ResultDialogContent | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef<number | null>(null);
  const calculator = usePriceCalculator(service, setService);

  const notify = (message: string) => {
    setToastMessage(message);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <section
      id="booking"
      className="border-b border-hairline bg-surface py-6 md:py-10 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="reveal">
          <SectionHead
            kicker="Beres dalam semenit"
            title="Mulai dari sini"
            description="Hitung estimasi biaya dan jadwalkan pickup sesuai waktu yang kamu mau."
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
          <div className="reveal stagger-1 flex flex-col gap-4">
            <CalculatorCard {...calculator} />
            <TrackCard onShowDialog={setDialog} notify={notify} />
          </div>
          <div className="reveal stagger-2">
            <BookingForm calculator={calculator} onShowDialog={setDialog} />
          </div>
        </div>
      </div>

      <Toast message={toastMessage} />
      <ResultDialog
        open={Boolean(dialog)}
        onClose={() => setDialog(null)}
        kicker={dialog?.kicker}
        title={dialog?.title}
      >
        {dialog?.content}
      </ResultDialog>
    </section>
  );
}
