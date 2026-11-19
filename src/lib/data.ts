import type { IconType } from "react-icons";
import {
  LuAward,
  LuCircleCheckBig,
  LuClock,
  LuDroplet,
  LuMapPin,
  LuMessageCircleQuestion,
  LuShirt,
  LuShieldCheck,
  LuTag,
  LuTruck,
  LuZap,
} from "react-icons/lu";

export type ServiceId = "reguler" | "express" | "premium";
export type ServiceUnit = "kg" | "pcs";

export type ServiceRule = {
  label: string;
  price: number;
  unit: ServiceUnit;
  min: number;
};

export type Estimate = {
  rule: ServiceRule;
  qty: number;
  subtotal: number;
  discount: number;
  freeShip: boolean;
  total: number;
};

export type NavLink = {
  href: string;
  label: string;
  icon: IconType;
};

export type ServiceItem = {
  icon: IconType;
  title: string;
  description: string;
};

export type Plan = {
  id: ServiceId;
  name: string;
  price: number;
  unit: ServiceUnit;
  eta: string;
  features: string[];
  featured?: boolean;
};

export type Benefit = {
  icon: IconType;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  initial: string;
  accent?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type PickupSlot = {
  start: number;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "#layanan", label: "Layanan", icon: LuShirt },
  { href: "#harga", label: "Harga", icon: LuTag },
  { href: "#booking", label: "Booking", icon: LuZap },
  { href: "#lacak", label: "Lacak", icon: LuClock },
  { href: "#faq", label: "FAQ", icon: LuMessageCircleQuestion },
  { href: "#kontak", label: "Kontak", icon: LuMapPin },
];

export const services: ServiceItem[] = [
  {
    icon: LuShirt,
    title: "Laundry kiloan",
    description: "Praktis untuk pakaian sehari-hari dengan harga bersahabat",
  },
  {
    icon: LuZap,
    title: "Laundry express",
    description: "Selesai dalam 6 jam untuk kebutuhan yang mendesak",
  },
  {
    icon: LuDroplet,
    title: "Cuci & setrika",
    description: "Pakaian rapi dan siap dipakai tanpa repot",
  },
  {
    icon: LuAward,
    title: "Dry cleaning",
    description: "Perawatan khusus untuk jas, kebaya, dan bahan premium",
  },
];

export const plans: Plan[] = [
  {
    id: "reguler",
    name: "Reguler",
    price: 7000,
    unit: "kg",
    eta: "Siap dalam 2–3 hari kerja",
    features: ["Cuci dan keringkan", "Lipat rapi", "Min. 3 kg"],
  },
  {
    id: "express",
    name: "Express",
    price: 12000,
    unit: "kg",
    eta: "Siap dalam 6 jam",
    features: ["Prioritas pengerjaan", "Cuci dan keringkan", "Lipat atau setrika"],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 35000,
    unit: "pcs",
    eta: "Untuk pakaian kesayangan",
    features: ["Dry cleaning", "Perawatan bahan khusus", "Packaging premium"],
  },
];

export const serviceRules: Record<ServiceId, ServiceRule> = {
  reguler: {
    label: "Reguler (2–3 hari)",
    price: 7000,
    unit: "kg",
    min: 3,
  },
  express: {
    label: "Express (6 jam)",
    price: 12000,
    unit: "kg",
    min: 1,
  },
  premium: {
    label: "Premium (dry cleaning)",
    price: 35000,
    unit: "pcs",
    min: 1,
  },
};

export const FREE_SHIP_MIN = 35000;
export const FIRST_DISCOUNT = 0.2;

export function calculateEstimate(
  service: ServiceId,
  quantity: number | string,
  firstOrder = false,
): Estimate {
  const rule = serviceRules[service];
  const qty = Math.max(rule.min, Number(quantity) || 0);
  const subtotal = Math.round(qty * rule.price);
  const discount = firstOrder ? Math.round(subtotal * FIRST_DISCOUNT) : 0;

  return {
    rule,
    qty,
    subtotal,
    discount,
    freeShip: subtotal >= FREE_SHIP_MIN,
    total: subtotal - discount,
  };
}

export const benefits: Benefit[] = [
  {
    icon: LuCircleCheckBig,
    title: "Standar kualitas tinggi",
    description: "Deterjen premium dan mesin modern",
  },
  {
    icon: LuClock,
    title: "Tepat waktu",
    description: "Update status pesanan lewat WhatsApp",
  },
  {
    icon: LuShieldCheck,
    title: "Higienis",
    description: "Mesin dibersihkan setiap hari",
  },
  {
    icon: LuTruck,
    title: "Antar-jemput",
    description: "Gratis ongkir di area terdekat",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sejak pakai BersihBersih, hari Minggu saya kembali jadi hari istirahat. Hasilnya wangi dan lipatannya rapi banget.",
    name: "Alia Putri",
    location: "Jakarta Selatan",
    initial: "A",
  },
  {
    quote:
      "Pickup-nya tepat waktu, customer service-nya responsif. Sangat membantu untuk anak kos seperti saya.",
    name: "Raka Aditya",
    location: "Depok",
    initial: "R",
    accent: true,
  },
  {
    quote:
      "Saya kirim jas untuk dry clean, hasilnya aman dan siap dipakai lagi. Packaging-nya juga premium.",
    name: "Maya Sari",
    location: "Bandung",
    initial: "M",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Apakah ada layanan antar-jemput?",
    answer:
      "Ada. Gratis untuk radius 3 km dari outlet kami dengan minimum transaksi Rp35.000. Di luar area tersebut, tersedia biaya antar yang transparan.",
  },
  {
    question: "Berapa lama proses laundry?",
    answer:
      "Layanan reguler selesai 2–3 hari kerja, sedangkan express selesai sekitar 6 jam. Estimasi pasti akan kami konfirmasi saat pakaian diterima.",
  },
  {
    question: "Apakah pakaian dipisah dengan pelanggan lain?",
    answer:
      "Ya, setiap pesanan diberi barcode dan diproses secara terpisah untuk menjaga keamanan dan kebersihan pakaian.",
  },
  {
    question: "Bagaimana jika ada pakaian yang rusak atau hilang?",
    answer:
      "Kami memiliki garansi layanan. Hubungi customer care maksimal 24 jam setelah pesanan diterima agar kami dapat segera membantu.",
  },
];

export const pickupSlots: PickupSlot[] = [
  { start: 8, label: "08.00–10.00" },
  { start: 10, label: "10.00–12.00" },
  { start: 13, label: "13.00–15.00" },
  { start: 16, label: "16.00–18.00" },
];
