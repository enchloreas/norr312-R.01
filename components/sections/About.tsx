"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/lib/i18n/provider";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="max-w-xl">
              <span className="label-mono text-accent">{t.about.label}</span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] md:text-4xl lg:text-[2.9rem]">
                {t.about.title}
              </h2>
              <p className="mt-6 text-base text-muted md:text-lg">{t.about.text}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {t.about.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur"
                >
                  <div className="font-heading text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                    {m.value}
                  </div>
                  <div className="mt-2 text-sm text-muted">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
