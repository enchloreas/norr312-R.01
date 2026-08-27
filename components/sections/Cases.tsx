"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/provider";

export function Cases() {
  const { t } = useLang();

  return (
    <section id="cases" className="relative py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3">
            <SectionHeading label={t.cases.label} title={t.cases.title} />
            <p className="label-mono text-muted/70">{t.cases.note}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.cases.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7 backdrop-blur">
                <span className="label-mono text-muted">{item.tag}</span>
                <div className="mt-5 font-heading text-5xl font-extrabold tracking-tight text-accent">
                  {item.result}
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
