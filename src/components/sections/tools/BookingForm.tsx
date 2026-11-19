import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { LuArrowRight, LuCalendarDays } from "react-icons/lu";
import type { PriceCalculator } from "../../../hooks/usePriceCalculator";
import {
  pickupSlots,
  type PickupSlot,
} from "../../../lib/data";
import {
  formatIDR,
  formatPickupDate,
  initialPickupDate,
  todayISO,
} from "../../../lib/utils";
import { Button } from "../../ui/Button";
import {
  DialogDetails,
  DialogRow,
  DialogStatus,
  type ResultDialogContent,
} from "../../ui/ResultDialog";

type FieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
};

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
    </div>
  );
}

const initialDate = initialPickupDate();
const initialSlot =
  pickupSlots.find(
    (slot) =>
      !(initialDate === todayISO() && slot.start <= new Date().getHours()),
  ) ?? pickupSlots[0];

type BookingFormProps = {
  calculator: PriceCalculator;
  onShowDialog: (dialog: ResultDialogContent) => void;
};

export function BookingForm({
  calculator,
  onShowDialog,
}: BookingFormProps) {
  const [pickupDate, setPickupDate] = useState(initialDate);
  const [slot, setSlot] = useState(String(initialSlot.start));

  const isToday = pickupDate === todayISO();
  const currentHour = new Date().getHours();

  const isSlotDisabled = (item: PickupSlot) =>
    isToday && item.start <= currentHour;

  useEffect(() => {
    const currentSlot = pickupSlots.find(
      (item) => String(item.start) === slot,
    );
    if (currentSlot && isSlotDisabled(currentSlot)) {
      const nextSlot = pickupSlots.find((item) => !isSlotDisabled(item));
      if (nextSlot) setSlot(String(nextSlot.start));
    }
  }, [pickupDate, slot]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const orderId = `BB-${String(Date.now()).slice(-4)}`;
    const selectedSlot =
      pickupSlots.find((item) => String(item.start) === slot)?.label ?? "";
    const { rule, qty, subtotal, discount, total, freeShip } = calculator;

    onShowDialog({
      kicker: "Pickup berhasil dijadwalkan",
      title: `Pesanan ${orderId}`,
      content: (
        <>
          <DialogStatus>
            Kurir akan menghubungi kamu sebelum datang menjemput pakaian.
          </DialogStatus>
          <DialogDetails>
            <DialogRow label="Nomor order" value={orderId} />
            <DialogRow label="Nama" value={value("name")} />
            <DialogRow label="WhatsApp" value={value("phone")} />
            <DialogRow label="Alamat pickup" value={value("address")} />
            <DialogRow
              label="Jadwal pickup"
              value={`${formatPickupDate(pickupDate)}, ${selectedSlot}`}
            />
            <DialogRow label="Layanan" value={rule.label} />
            <DialogRow label="Jumlah" value={`${qty} ${rule.unit}`} />
            <DialogRow label="Subtotal" value={formatIDR(subtotal)} />
            {discount ? (
              <DialogRow
                label="Diskon pelanggan baru"
                value={`−${formatIDR(discount)}`}
              />
            ) : null}
            <DialogRow label="Estimasi total" value={formatIDR(total)} />
            <DialogRow
              label="Antar-jemput"
              value={freeShip ? "Gratis (radius 3 km)" : "Dikonfirmasi admin"}
            />
            {value("promo") ? (
              <DialogRow label="Kode promo" value={value("promo")} />
            ) : null}
            {value("note") ? (
              <DialogRow label="Catatan" value={value("note")} />
            ) : null}
          </DialogDetails>
        </>
      ),
    });
  };

  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <LuCalendarDays aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            Booking pickup
          </h3>
          <p className="t-body-sm mt-0.5 text-muted">
            Kurir kami datang ke depan pintumu
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3.5">
        <Field label="Nama lengkap" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Nama kamu"
            className="input"
          />
        </Field>
        <Field label="Nomor WhatsApp" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="(\+62|62|0)8[0-9 \-]{8,15}"
            title="Contoh: 0812-3456-7890"
            placeholder="08xx-xxxx-xxxx"
            className="input"
          />
        </Field>
        <Field label="Alamat pickup" htmlFor="address">
          <textarea
            id="address"
            name="address"
            required
            autoComplete="street-address"
            placeholder="Jalan, nomor, kelurahan, patokan"
            className="input"
          />
        </Field>
        <Field label="Tanggal pickup" htmlFor="pickupDate">
          <input
            id="pickupDate"
            name="pickupDate"
            type="date"
            required
            min={todayISO()}
            value={pickupDate}
            onChange={(event) => setPickupDate(event.target.value)}
            className="input"
          />
        </Field>
        <Field label="Jam pickup" htmlFor="slot">
          <select
            id="slot"
            name="slot"
            value={slot}
            onChange={(event) => setSlot(event.target.value)}
            className="input"
          >
            {pickupSlots.map((item) => (
              <option
                key={item.start}
                value={item.start}
                disabled={isSlotDisabled(item)}
              >
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Kode promo / referral (opsional)" htmlFor="promo">
          <input id="promo" name="promo" autoComplete="off" className="input" />
        </Field>
        <Field label="Catatan (opsional)" htmlFor="note">
          <input
            id="note"
            name="note"
            placeholder="Misal: titip ke satpam"
            className="input"
          />
        </Field>

        <div className="rounded-lg bg-surface-soft p-3.5 text-sm">
          <div className="flex justify-between gap-3 text-muted">
            <span>Pesanan</span>
            <span className="text-right font-medium text-ink">
              {calculator.rule.label} · {calculator.qty}{" "}
              {calculator.rule.unit} · {formatIDR(calculator.total)}
            </span>
          </div>
        </div>

        <Button type="submit" className="mt-0.5 w-full">
          Kirim Booking <LuArrowRight aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}
