"use client";

import {
  Headphones,
  ShoppingCart,
  FileText,
  Users,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/provider";

const icons: LucideIcon[] = [Headphones, ShoppingCart, FileText, Users, BarChart3];

export function Solutions() {
  const { t } = useLang();

  return (
    <section id="solutions" className="relative py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            label={t.solutions.label}
            title={t.solutions.title}
            subtitle={t.solutions.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.solutions.items.map((item, i) => {
            const Icon = icons[i] ?? Headphones;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition-all hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/25">
                  <div className="flex items-center justify-between">
                    <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={20} />
                    </span>
                    <span className="label-mono text-muted/60">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
