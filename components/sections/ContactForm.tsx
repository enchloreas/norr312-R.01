"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { useLang } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-xl border border-line bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const { t } = useLang();
  const f = t.contact.form;
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const schema = useMemo(
    () => contactSchema({ name: f.errName, email: f.errEmail, message: f.errMessage }),
    [f.errName, f.errEmail, f.errMessage],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "", website: "" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (isSubmitSuccessful && status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/30 bg-accent/5 px-6 py-14 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
          <Check size={22} />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold">{f.successTitle}</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">{f.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {f.name}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={f.namePh}
            className={fieldClasses}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {f.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={f.emailPh}
            className={fieldClasses}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
          {f.company}
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder={f.companyPh}
          className={fieldClasses}
          {...register("company")}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {f.message}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={f.messagePh}
          className={cn(fieldClasses, "resize-none")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {/* Honeypot — visually hidden, off the tab order. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} />
          {f.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full sm:w-auto">
        {isSubmitting ? f.sending : f.submit}
      </Button>
    </form>
  );
}
