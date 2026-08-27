"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/i18n/provider";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center pt-28 pb-20">
      <Container>
        {/* Block sits left of center → bold headline "чуть левее центра". */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={item}>
            <Badge>{t.hero.badge}</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#contact" size="lg">
              {t.hero.primaryCta}
              <ArrowRight size={18} />
            </Button>
            <Button href="#cases" variant="outline" size="lg">
              {t.hero.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="label-mono text-muted">{t.hero.scroll}</span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-accent"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
