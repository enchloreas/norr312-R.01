"use client";

import { Bot, Workflow, GraduationCap, TrendingUp, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/provider";

const icons: LucideIcon[] = [Bot, Workflow, GraduationCap, TrendingUp];

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={t.services.label} title={t.services.title} />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((item, i) => {
            const Icon = icons[i] ?? Bot;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition-colors hover:border-accent/40">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Process strip — «Как мы работаем» */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-heading text-xl font-bold md:text-2xl">
              {t.services.process.title}
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.process.steps.map((step, i) => (
              <Reveal key={step.no} delay={i * 0.06}>
                <div className="relative">
                  <div className="font-heading text-3xl font-extrabold text-accent/30">
                    {step.no}
                  </div>
                  <h4 className="mt-2 font-heading text-base font-bold">{step.title}</h4>
                  <p className="mt-1.5 text-sm text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
