import { useEffect, useRef } from "react";

type OrderBarcodeProps = {
  value: string;
};

export function OrderBarcode({ value }: OrderBarcodeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let cancelled = false;

    void (async () => {
      try {
        const { default: JsBarcode } = await import("jsbarcode");
        if (cancelled || !svgRef.current) return;
        JsBarcode(svgRef.current, value, {
          format: "CODE39",
          lineColor: "#18181B",
          background: "#FFFFFF",
          width: 2,
          height: 48,
          fontSize: 14,
          font: "ui-monospace, SFMono-Regular, monospace",
          margin: 0,
          displayValue: false,
          valid: () => {},
        });
      } catch {
        // nilai di luar karakter CODE39 — biarkan kosong
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [value]);

  return (
    <svg
      ref={svgRef}
      role="img"
      aria-label={`Barcode ${value}`}
      className="max-w-full"
    />
  );
}
