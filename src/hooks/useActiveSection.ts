import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const marker = window.innerHeight * 0.36;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeSection;
}
