export const DEMO_ORDER_CODE = "BB-2048";

export type DemoOrder = {
  code: string;
  name: string;
  phone: string;
  address: string;
  schedule: string;
  service: string;
  quantity: string;
  subtotal: number;
  discount: number;
  total: number;
  shipping: string;
  promo?: string;
  note?: string;
};

export const defaultDemoOrder: DemoOrder = {
  code: DEMO_ORDER_CODE,
  name: "Dina Pratama",
  phone: "0812-3456-7890",
  address: "Jl. Melati No. 12, Blega",
  schedule: "Hari ini, 10.00–12.00",
  service: "Reguler (2–3 hari)",
  quantity: "4 kg",
  subtotal: 28000,
  discount: 0,
  total: 28000,
  shipping: "Gratis (radius 3 km)",
};
