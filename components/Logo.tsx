import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      fill="none"
      aria-hidden="true"
    >
      {/* faint outer orbit */}
      <circle cx="16" cy="16" r="13" stroke="var(--color-ink)" strokeOpacity="0.16" strokeWidth="1.3" />
      {/* accent orbit */}
      <circle cx="16" cy="16" r="9" stroke="var(--color-accent)" strokeOpacity="0.4" strokeWidth="1.4" />
      {/* core node */}
      <circle cx="16" cy="16" r="5.2" fill="var(--color-accent)" />
      {/* satellite particle */}
      <circle cx="25.4" cy="9.6" r="2.5" fill="var(--color-accent-cyan)" />
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showText && (
        <span className="font-heading text-[1.05rem] font-extrabold leading-none tracking-tight text-ink">
          Vels<span className="font-semibold text-muted"> Industries</span>
        </span>
      )}
    </span>
  );
}
