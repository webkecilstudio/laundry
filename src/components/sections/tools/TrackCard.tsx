import type { IScannerControls } from "@zxing/browser";
import type { DecodeHintType } from "@zxing/library";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LuScanBarcode, LuX } from "react-icons/lu";
import type { DemoOrder } from "../../../lib/demoOrder";
import { Button } from "../../ui/Button";
import type { ResultDialogContent } from "../../ui/ResultDialog";
import { buildTrackDialog } from "./orderDialogs";

type TrackCardProps = {
  order: DemoOrder;
  onShowDialog: (dialog: ResultDialogContent) => void;
  notify: (message: string) => void;
};

export function TrackCard({ order, onShowDialog, notify }: TrackCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [scanning, setScanning] = useState(false);

  const trackOrder = (raw: string) => {
    const value = raw.trim().toUpperCase();
    if (!value) {
      notify("Masukkan nomor order atau scan barcode dulu.");
      inputRef.current?.focus();
      return;
    }
    if (value !== order.code.toUpperCase()) {
      notify(`Order tidak ditemukan. Untuk demo gunakan ${order.code}.`);
      inputRef.current?.focus();
      return;
    }
    onShowDialog(buildTrackDialog(order));
  };

  const handleTrack = () => trackOrder(inputRef.current?.value ?? "");

  useEffect(() => {
    if (!scanning) return;
    let cancelled = false;

    void (async () => {
      try {
        const [{ BrowserMultiFormatReader, BarcodeFormat }, zxingLibrary] =
          await Promise.all([
            import("@zxing/browser"),
            import("@zxing/library"),
          ]);
        if (cancelled) return;

        const hints = new Map<DecodeHintType, any>();
        hints.set(zxingLibrary.DecodeHintType.POSSIBLE_FORMATS, [
          BarcodeFormat.CODE_39,
          BarcodeFormat.CODE_128,
          BarcodeFormat.EAN_13,
          BarcodeFormat.EAN_8,
        ]);

        const reader = new BrowserMultiFormatReader(hints, {
          delayBetweenScanAttempts: 200,
        });

        const controls = await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current ?? undefined,
          (result, _error, scanControls) => {
            if (!result || cancelled) return;
            const text = result.getText();
            scanControls.stop();
            controlsRef.current = null;
            setScanning(false);
            if (inputRef.current) inputRef.current.value = text;
            trackOrder(text);
          },
        );

        if (cancelled) controls.stop();
        else controlsRef.current = controls;
      } catch {
        if (cancelled) return;
        setScanning(false);
        notify("Kamera tidak dapat diakses. Masukkan kode manual saja.");
      }
    })();

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning]);

  const stopScan = () => setScanning(false);

  return (
    <div id="lacak" className="card">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <LuScanBarcode aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            Lacak pesanan
          </h3>
          <p className="t-body-sm mt-0.5 text-muted">
            Scan barcode atau masukkan kode order untuk cek status terbaru.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <label htmlFor="orderId" className="label">
          Scan barcode atau masukkan kode
        </label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            id="orderId"
            defaultValue={order.code}
            placeholder="Contoh: BB-2048"
            autoComplete="off"
            className="input min-w-0 flex-1"
          />
          <button
            type="button"
            onClick={() => setScanning(true)}
            aria-label="Scan barcode dengan kamera"
            className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-lg border border-hairline bg-surface text-accent transition duration-200 hover:bg-accent-soft"
          >
            <LuScanBarcode aria-hidden="true" className="text-lg" />
          </button>
        </div>
      </div>

      <Button
        onClick={handleTrack}
        variant="secondary"
        className="mt-4 w-full"
      >
        Cek Pesanan
      </Button>

      {scanning
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Scan barcode"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            >
              <div className="w-full max-w-sm rounded-xl border border-hairline bg-surface p-4 shadow-overlay">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold text-ink">Scan barcode</h4>
                  <button
                    type="button"
                    onClick={stopScan}
                    aria-label="Tutup scan"
                    className="grid h-8 w-8 place-items-center rounded-full border border-hairline bg-surface text-muted transition duration-200 hover:bg-surface-soft hover:text-ink"
                  >
                    <LuX aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 overflow-hidden rounded-lg border border-hairline bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="t-body-sm mt-2.5 text-muted">
                  Arahkan kamera ke barcode pesanan. Kode akan terisi otomatis
                  lalu langsung dicek.
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
