import { useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { Button } from "../../ui/Button";
import {
  DialogDetails,
  DialogRow,
  DialogStatus,
  DialogTimeline,
  type ResultDialogContent,
} from "../../ui/ResultDialog";

type TrackCardProps = {
  onShowDialog: (dialog: ResultDialogContent) => void;
  notify: (message: string) => void;
};

export function TrackCard({ onShowDialog, notify }: TrackCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTrack = () => {
    const value = inputRef.current?.value.trim() ?? "";
    if (!value) {
      notify("Masukkan nomor order terlebih dahulu.");
      inputRef.current?.focus();
      return;
    }

    const orderId = value.toUpperCase();
    onShowDialog({
      kicker: "Data demo",
      title: `Order ${orderId}`,
      content: (
        <>
          <DialogStatus>
            Sedang dicuci · Estimasi selesai besok, pukul 16.00
          </DialogStatus>
          <DialogDetails>
            <DialogRow label="Nomor order" value={orderId} />
            <DialogRow label="Pelanggan" value="Dina Pratama" />
            <DialogRow label="Layanan" value="Reguler (2–3 hari)" />
            <DialogRow label="Jumlah" value="4 kg" />
            <DialogRow label="Pickup" value="Hari ini, 10.00–12.00" />
          </DialogDetails>
          <DialogTimeline
            items={[
              { label: "Pickup diterima", meta: "09.42", state: "done" },
              {
                label: "Sedang dicuci",
                meta: "Berlangsung",
                state: "current",
              },
              { label: "Siap diantar", meta: "Berikutnya" },
            ]}
          />
        </>
      ),
    });
  };

  return (
    <div id="lacak" className="card">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <LuSearch aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            Lacak pesanan
          </h3>
          <p className="t-body-sm mt-0.5 text-muted">
            Kirim nomor order, tim kami balas status terbaru lewat WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <label htmlFor="orderId" className="label">
          Nomor order
        </label>
        <input
          ref={inputRef}
          id="orderId"
          placeholder="Contoh: BB-2048"
          autoComplete="off"
          className="input"
        />
      </div>

      <Button
        onClick={handleTrack}
        variant="secondary"
        className="mt-4 w-full"
      >
        Cek Pesanan
      </Button>
    </div>
  );
}
