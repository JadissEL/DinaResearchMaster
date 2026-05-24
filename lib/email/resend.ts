import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

let resend: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  const client = getResend();
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.links.email;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!client) {
    console.info("[contact] Email skipped — RESEND_API_KEY not set", input);
    return { sent: false };
  }

  await client.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `[DinaResearch] ${input.topic} — ${input.name}`,
    text: `Name: ${input.name}\nEmail: ${input.email}\nTopic: ${input.topic}\n\n${input.message}`,
  });

  return { sent: true };
}
