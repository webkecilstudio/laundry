export const WA_NUMBER = "6281234567890";

export const waUrl = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const WA_MESSAGE =
  "Halo BersihBersih, saya mau tanya layanan laundry.";

export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const pad = (value: number) => String(value).padStart(2, "0");

export const isoDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const initialPickupDate = () => {
  const now = new Date();
  return isoDate(now.getHours() >= 16 ? new Date(now.getTime() + 864e5) : now);
};

export const todayISO = () => isoDate(new Date());

export const formatPickupDate = (value: string) =>
  new Date(`${value}T00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
