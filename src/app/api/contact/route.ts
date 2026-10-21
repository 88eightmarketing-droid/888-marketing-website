import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Enquiries from the homepage form.
 *
 * Same discipline as the previews project's lead route, for the same reason:
 * this is the only contact route on the site, so a swallowed failure is a lost
 * customer with no record anywhere. Every failure path logs the complete
 * submission under `LOST ENQUIRY`, and the visitor is told it failed rather
 * than shown a false success.
 */

export const runtime = 'nodejs';

interface Payload {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

function logLostEnquiry(reason: string, enquiry: Record<string, unknown>) {
  console.error(`LOST ENQUIRY (${reason}): ${JSON.stringify(enquiry)}`);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const name = text(body.name, 200);
  const business = text(body.business, 300);
  const email = text(body.email, 320);
  const message = text(body.message, 5000);
  const phone = text(body.phone, 50) ?? '';

  if (!name || !business || !email || !message) {
    return NextResponse.json(
      { error: 'Name, business, email, and a description are all required.' },
      { status: 400 },
    );
  }

  const enquiry = { name, business, email, phone, message, at: new Date().toISOString() };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL;

  if (!apiKey || !from || !to) {
    logLostEnquiry('mail not configured — RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_TO_EMAIL', enquiry);
    return NextResponse.json({ error: 'This form cannot send right now.' }, { status: 503 });
  }

  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New enquiry — ${business}`,
      text: [
        `Business: ${business}`,
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Phone:    ${phone || '—'}`,
        '',
        message,
      ].join('\n'),
    });

    if (error) {
      logLostEnquiry(`resend rejected: ${error.message}`, enquiry);
      return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 });
    }

    console.log(`ENQUIRY SENT (resend id ${data?.id ?? 'unknown'}): ${business} <${email}>`);
    return NextResponse.json({ ok: true });
  } catch (cause) {
    logLostEnquiry(`send threw: ${cause instanceof Error ? cause.message : cause}`, enquiry);
    return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 });
  }
}
