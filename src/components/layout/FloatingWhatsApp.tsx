import { FaWhatsapp } from "react-icons/fa";
import { WA_MESSAGE, waUrl } from "../../lib/utils";

export function FloatingWhatsApp() {
  return (
    <a
      href={waUrl(WA_MESSAGE)}
      target="_blank"
      rel="noopener"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-success text-white shadow-large transition duration-200 hover:-translate-y-0.5 hover:scale-105 md:bottom-6 md:right-6"
    >
      <FaWhatsapp aria-hidden="true" className="text-[26px]" />
    </a>
  );
}
