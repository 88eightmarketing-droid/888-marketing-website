import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="20 November 2026">
      <p>This page says what 888 Marketing collects on 888marketing.net and what we do with it.</p>
      <h2>What we collect</h2>
      <p>Only what you type into the proposal form: your name, your business, your email, your phone number if you give it, and your message. The form sends it to us by email so we can reply.</p>
      <p>The site sets no advertising or tracking cookies. The opening animation remembers, for this browser tab only, that you have seen it. Our host, Vercel, keeps standard server logs (such as IP address and pages requested) to run and protect the site.</p>
      <h2>What we do with it</h2>
      <p>We use it to answer you and to write the proposal you asked for. We do not sell it, rent it, or add you to a mailing list.</p>
      <p>Services that handle it for us: Vercel (hosting) and Resend (delivering the form to our inbox).</p>
      <h2>Your choices</h2>
      <p>Ask us to see, correct or delete what you sent and we will do it. California residents have these rights under the CCPA; everyone gets them from us.</p>
      <h2>Contact</h2>
      <p>Use the form on the <Link href="/#proposal">home page</Link>, or message <a href="https://www.instagram.com/88eightmarketing/">@88eightmarketing</a> on Instagram.</p>
    </LegalPage>
  );
}
