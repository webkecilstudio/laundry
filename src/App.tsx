import { useState } from "react";
import { FloatingWhatsApp } from "./components/layout/FloatingWhatsApp";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { PromoBar } from "./components/layout/PromoBar";
import { Contact } from "./components/sections/Contact";
import { CTA } from "./components/sections/CTA";
import { FAQ } from "./components/sections/FAQ";
import { Hero } from "./components/sections/Hero";
import { Pricing } from "./components/sections/Pricing";
import { PromoSection } from "./components/sections/PromoSection";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { ToolsSection } from "./components/sections/ToolsSection";
import { WhyUs } from "./components/sections/WhyUs";
import { useReveal } from "./hooks/useReveal";
import type { ServiceId } from "./lib/data";

export default function App() {
  const [service, setService] = useState<ServiceId>("reguler");
  useReveal();

  return (
    <div className="min-h-screen bg-canvas">
      <PromoBar />
      <Header />
      <main>
        <Hero />
        <Services />
        <Pricing onSelectService={setService} />
        <WhyUs />
        <PromoSection />
        <Testimonials />
        <ToolsSection service={service} setService={setService} />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
