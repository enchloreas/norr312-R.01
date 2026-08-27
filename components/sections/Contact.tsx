"use client";

import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { useLang } from "@/lib/i18n/provider";

export function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="max-w-md">
              <span className="label-mono text-accent">{t.contact.label}</span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] md:text-4xl lg:text-[2.9rem]">
                {t.contact.title}
              </h2>
              <p className="mt-5 text-base text-muted md:text-lg">{t.contact.subtitle}</p>

              <div className="mt-8">
                <span className="label-mono text-muted">{t.contact.directLabel}</span>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="mt-2 flex items-center gap-2.5 text-lg font-semibold text-ink transition-colors hover:text-accent"
                >
                  <Mail size={18} className="text-accent" />
                  {t.contact.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
