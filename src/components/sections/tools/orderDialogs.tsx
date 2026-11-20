import type { DemoOrder } from "../../../lib/demoOrder";
import { formatIDR } from "../../../lib/utils";
import { OrderBarcode } from "../../ui/OrderBarcode";
import {
  DialogDetails,
  DialogRow,
  DialogStatus,
  DialogTimeline,
  type ResultDialogContent,
} from "../../ui/ResultDialog";

function DialogBarcode({ code }: { code: string }) {
  return (
    <div className="mt-3 flex flex-col items-center gap-1.5 rounded-lg border border-hairline bg-white px-4 py-3">
      <OrderBarcode value={code} />
      <span className="t-code text-[13px] font-semibold text-[#18181B]">
        {code}
      </span>
    </div>
  );
}

export function buildSuccessDialog(order: DemoOrder): ResultDialogContent {
  return {
    kicker: "Pickup berhasil dijadwalkan",
    title: `Pesanan ${order.code}`,
    content: (
      <>
        <DialogStatus>
          Kurir akan menghubungi kamu sebelum datang menjemput pakaian.
        </DialogStatus>
        <DialogBarcode code={order.code} />
        <DialogDetails>
          <DialogRow label="Nomor order" value={order.code} />
          <DialogRow label="Nama" value={order.name} />
          <DialogRow label="WhatsApp" value={order.phone} />
          <DialogRow label="Alamat pickup" value={order.address} />
          <DialogRow label="Jadwal pickup" value={order.schedule} />
          <DialogRow label="Layanan" value={order.service} />
          <DialogRow label="Jumlah" value={order.quantity} />
          <DialogRow label="Subtotal" value={formatIDR(order.subtotal)} />
          {order.discount ? (
            <DialogRow
              label="Diskon pelanggan baru"
              value={`−${formatIDR(order.discount)}`}
            />
          ) : null}
          <DialogRow label="Estimasi total" value={formatIDR(order.total)} />
          <DialogRow label="Antar-jemput" value={order.shipping} />
          {order.promo ? (
            <DialogRow label="Kode promo" value={order.promo} />
          ) : null}
          {order.note ? <DialogRow label="Catatan" value={order.note} /> : null}
        </DialogDetails>
      </>
    ),
  };
}

export function buildTrackDialog(order: DemoOrder): ResultDialogContent {
  return {
    kicker: "Data demo",
    title: `Order ${order.code}`,
    content: (
      <>
        <DialogStatus>
          Sedang dicuci · Estimasi selesai besok, pukul 16.00
        </DialogStatus>
        <DialogBarcode code={order.code} />
        <DialogDetails>
          <DialogRow label="Nomor order" value={order.code} />
          <DialogRow label="Pelanggan" value={order.name} />
          <DialogRow label="WhatsApp" value={order.phone} />
          <DialogRow label="Alamat pickup" value={order.address} />
          <DialogRow label="Layanan" value={order.service} />
          <DialogRow label="Jumlah" value={order.quantity} />
          <DialogRow label="Pickup" value={order.schedule} />
          <DialogRow label="Subtotal" value={formatIDR(order.subtotal)} />
          {order.discount ? (
            <DialogRow
              label="Diskon pelanggan baru"
              value={`−${formatIDR(order.discount)}`}
            />
          ) : null}
          <DialogRow label="Estimasi total" value={formatIDR(order.total)} />
          <DialogRow label="Antar-jemput" value={order.shipping} />
        </DialogDetails>
        <DialogTimeline
          items={[
            { label: "Pickup diterima", meta: "09.42", state: "done" },
            { label: "Sedang dicuci", meta: "Berlangsung", state: "current" },
            { label: "Siap diantar", meta: "Berikutnya" },
          ]}
        />
      </>
    ),
  };
}
