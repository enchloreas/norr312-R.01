"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/provider";

function LogoChip({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-surface/60 px-6 py-4 backdrop-blur">
      <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
      <span className="font-heading text-base font-bold text-muted">{name}</span>
    </div>
  );
}

export function Clients() {
  const { t } = useLang();
  const row = [...t.clients.logos, ...t.clients.logos];

  return (
    <section id="clients" className="relative py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3">
            <SectionHeading label={t.clients.label} title={t.clients.title} />
            <p className="label-mono text-muted/70">{t.clients.note}</p>
          </div>
        </Reveal>
      </Container>

      <Reveal>
        <div className="mask-fade-x relative mt-12 overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 pr-4">
            {row.map((name, i) => (
              <LogoChip key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
