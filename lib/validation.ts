import { z } from "zod";

export type ContactMessages = {
  name: string;
  email: string;
  message: string;
};

// Schema factory so client validation messages can be localized,
// while the server can call it with no args for default messages.
export function contactSchema(m?: Partial<ContactMessages>) {
  return z.object({
    name: z.string().trim().min(2, m?.name ?? "Enter your name"),
    email: z.string().trim().email(m?.email ?? "Enter a valid email"),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().min(10, m?.message ?? "Describe your task (min 10 characters)"),
    // Honeypot — real users never fill this; bots often do.
    website: z.string().max(0).optional().or(z.literal("")),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;
