import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {label && <span className="label-mono text-accent">{label}</span>}
      <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.05] md:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted md:text-lg">{subtitle}</p>}
    </div>
  );
}
