'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The enquiry form.
 *
 * The only contact route on the site, by design: hard rule #2 says never ship a
 * contact address that bounces, and `info@888marketing.net` does not exist yet.
 * A form that provably sends beats a mailto to a mailbox nobody is reading.
 *
 * Real autocomplete tokens here — unlike the internal admin, a visitor filling
 * this in wants their browser's help.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          business: form.get('business'),
          email: form.get('email'),
          phone: form.get('phone'),
          message: form.get('message'),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Something went wrong (${response.status}).`);
      }

      setStatus('sent');
    } catch (cause) {
      setStatus('error');
      setError(cause instanceof Error ? cause.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t-2 border-accent bg-paper-deep p-8">
        <p className="font-[family-name:var(--font-display)] text-2xl">Got it.</p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          We&rsquo;ll build your page and send you the link — usually the same day. Nothing
          else is needed from you in the meantime.
        </p>
      </div>
    );
  }

  const field =
    'w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-ink-faint/70 focus:border-accent';
  const label = 'block text-xs font-medium tracking-wide text-ink-faint';

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Your name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Jose Ramirez" />
        </label>
        <label className="block">
          <span className={label}>Business name</span>
          <input
            name="business"
            required
            autoComplete="organization"
            className={field}
            placeholder="Jose's Car Wash"
          />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className={label}>
            Phone <span className="font-normal normal-case">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="555 123 4567" />
        </label>
      </div>

      <label className="block">
        <span className={label}>What does your business do?</span>
        <textarea
          name="message"
          required
          rows={3}
          className={`${field} resize-none leading-relaxed`}
          placeholder="A sentence is plenty."
        />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send it over'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-accent-deep">
          {error} Please try again in a moment.
        </p>
      )}
    </form>
  );
}
