import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const { name, email, company, message, website } = parsed.data;

  // Honeypot hit → silently accept and drop.
  if (website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  // No credentials yet → keep the form functional for previews, log instead.
  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not configured — submission logged, not emailed:",
      { name, email, company, message },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Новая заявка с сайта — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Имя: ${name}`,
        `Email: ${email}`,
        `Компания: ${company || "—"}`,
        "",
        "Задача:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
