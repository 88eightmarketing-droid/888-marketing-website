import { closing, form } from "@/data/site";
import LeadForm from "./LeadForm";

/** The close: the campaign phone again, and the form again — nobody should have to scroll back up. */
export default function Closing() {
  return (
    <section className="relative overflow-hidden bg-crimson text-white">
      <picture>
        <source srcSet="/brand/phone.avif" type="image/avif" />
        <img src="/brand/phone.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 md:object-[30%_50%]" />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(80,2,4,.2)_0%,rgba(80,2,4,.55)_55%,rgba(80,2,4,.85)_100%)]" />
      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-5 py-24 md:grid-cols-12 md:items-center md:px-8 md:py-32">
        <div className="md:col-span-6 md:col-start-1" data-fade>
          <h2 className="text-[clamp(3rem,7vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.055em]">
            {closing.title[0]}<br />{closing.title[1]}
          </h2>
          <p className="mt-5 text-[19px] text-white/85">{closing.text}</p>
        </div>
        <div className="rounded-[20px] bg-ink/85 p-6 backdrop-blur-md md:col-span-5 md:col-start-8 md:p-7" data-fade style={{ ["--d" as string]: "120ms" }}>
          <h3 className="text-[22px] font-extrabold tracking-[-0.03em]">{form.title}</h3>
          <p className="mb-5 mt-1.5 text-[14.5px] text-white/60">{form.text}</p>
          <LeadForm id="proposal-close" tone="dark" />
        </div>
      </div>
    </section>
  );
}
