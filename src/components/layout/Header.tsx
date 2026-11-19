import { useEffect, useState } from "react";
import { LuMenu, LuMoon, LuSun, LuX } from "react-icons/lu";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/useTheme";
import { navLinks } from "../../lib/data";
import { BrandLogo } from "../ui/BrandLogo";
import { Button } from "../ui/Button";

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-6 px-6">
        <BrandLogo />

        <nav className="ml-2 hidden items-center gap-1 xl:flex" aria-label="Utama">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = `#${activeSection}` === href;
            return (
              <a
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition duration-200 ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-surface-soft hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" className="text-base" />
                {label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ganti ke tema terang" : "Ganti ke tema gelap"
            }
            aria-pressed={theme === "dark"}
            className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface text-muted transition duration-200 hover:bg-surface-soft hover:text-ink"
          >
            {theme === "dark" ? (
              <LuSun aria-hidden="true" className="text-base" />
            ) : (
              <LuMoon aria-hidden="true" className="text-base" />
            )}
          </button>
          <div className="hidden md:block">
            <Button href="#kontak" variant="ghost" size="sm">
              Hubungi kami
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button href="#booking" size="sm">
              Pesan sekarang
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface text-ink xl:hidden"
          >
            {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="mobile-menu-anim border-t border-hairline bg-surface px-6 py-4 xl:hidden"
        >
          <nav className="grid gap-1" aria-label="Menu seluler">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition duration-200 hover:bg-surface-soft hover:text-ink"
              >
                <Icon aria-hidden="true" className="text-base" />
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-3 grid gap-2 border-t border-hairline pt-3">
            <Button href="#kontak" variant="secondary" onClick={closeMenu}>
              Hubungi kami
            </Button>
            <Button href="#booking" onClick={closeMenu}>
              Pesan sekarang
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

