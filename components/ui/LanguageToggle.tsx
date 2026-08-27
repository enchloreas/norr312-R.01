"use client";

import { useLang } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/i18n/content";

const langs: Lang[] = ["ru", "en"];

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface/70 p-0.5 backdrop-blur",
        className,
      )}
    >
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            lang === l ? "bg-ink text-bg" : "text-muted hover:text-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
