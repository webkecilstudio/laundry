import { LuCalculator } from "react-icons/lu";
import type { PriceCalculator } from "../../../hooks/usePriceCalculator";
import {
  FREE_SHIP_MIN,
  serviceRules,
  type ServiceId,
} from "../../../lib/data";
import { formatIDR } from "../../../lib/utils";

export function CalculatorCard({
  service,
  setService,
  rule,
  quantity,
  setQuantity,
  qty,
  firstOrder,
  setFirstOrder,
  subtotal,
  discount,
  freeShip,
  total,
}: PriceCalculator) {
  const quantityLabel =
    rule.unit === "kg" ? "Berat pakaian (kg)" : "Jumlah pakaian (pcs)";

  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <LuCalculator aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            Kalkulator harga
          </h3>
          <p className="t-body-sm mt-0.5 text-muted">
            Estimasi biaya tanpa kejutan
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3.5">
        <div className="grid gap-1.5">
          <label htmlFor="service" className="label">
            Pilih layanan
          </label>
          <select
            id="service"
            value={service}
            onChange={(event) =>
              setService(event.target.value as ServiceId)
            }
            className="input"
          >
            {Object.entries(serviceRules).map(([id, item]) => (
              <option key={id} value={id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="quantity" className="label">
            {quantityLabel}
          </label>
          <input
            id="quantity"
            type="number"
            min={rule.min}
            step={rule.unit === "kg" ? 0.5 : 1}
            inputMode="decimal"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            onBlur={() => setQuantity(qty)}
            className="input"
          />
          {rule.min > 1 ? (
            <p className="hint">
              Minimum {rule.min} {rule.unit} untuk layanan ini.
            </p>
          ) : null}
        </div>
      </div>

      <label className="mt-3.5 flex items-center gap-2 text-[13px] text-body">
        <input
          type="checkbox"
          checked={firstOrder}
          onChange={(event) => setFirstOrder(event.target.checked)}
          className="h-4 w-4 rounded accent-primary"
        />
        Ini pesanan pertama saya (diskon 20%)
      </label>

      <div
        aria-live="polite"
        className="mt-4 grid gap-1.5 rounded-lg bg-accent-soft p-3.5 text-sm"
      >
        <div className="flex justify-between gap-3 text-muted">
          <span>
            {qty} {rule.unit} × {formatIDR(rule.price)}
          </span>
          <span className="font-medium text-ink">{formatIDR(subtotal)}</span>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between gap-3 text-muted">
            <span>Diskon pesanan pertama</span>
            <span className="font-medium text-[#16A34A] dark:text-[#86EFAC]">
              −{formatIDR(discount)}
            </span>
          </div>
        ) : null}
        <div className="flex justify-between gap-3 text-muted">
          <span>Antar-jemput</span>
          <span className="font-medium text-ink">
            {freeShip ? "Gratis" : "Dikonfirmasi admin"}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 border-t border-accent/15 pt-2.5 text-ink">
          <span className="font-medium">Estimasi total</span>
          <strong className="font-display text-[22px] font-bold tracking-tight">
            {formatIDR(total)}
          </strong>
        </div>
      </div>

      <p className="hint mt-2">
        {freeShip
          ? "Gratis antar-jemput radius 3 km; di luar itu biaya dikonfirmasi admin."
          : `Tambah ${formatIDR(FREE_SHIP_MIN - subtotal)} lagi agar antar-jemput gratis (radius 3 km).`}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["6 jam", "express"],
          ["3 km", "pickup gratis"],
          ["20%", "diskon baru"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-lg border border-hairline bg-surface p-2.5 text-center text-[11px] text-muted"
          >
            <strong className="mb-0.5 block font-display text-[17px] font-bold text-accent">
              {value}
            </strong>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
