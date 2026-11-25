import type { Metadata } from "next";
import { TopBar } from "@/site/home/Top";
import { Faq, Footer } from "@/site/home/Sections";

export const metadata: Metadata = { title: "Questions", alternates: { canonical: "/faq" } };

/** The questions, on their own page since the home page became one film (25 Nov 2026). */
export default function FaqPage() {
  return (
    <>
      <TopBar />
      <main className="pt-16">
        <Faq />
      </main>
      <Footer />
    </>
  );
}
