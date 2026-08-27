"use client";

import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLang } from "@/lib/i18n/provider";

export function Footer() {
  const { t } = useLang();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#solutions", label: t.nav.solutions },
    { href: "#cases", label: t.nav.cases },
    { href: "#clients", label: t.nav.clients },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative z-10 border-t border-line bg-bg-soft">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-muted">{t.footer.tagline}</p>
            <a
              href={`mailto:${t.contact.email}`}
              className="mt-4 inline-block text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {t.contact.email}
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              {t.footer.backTop}
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
