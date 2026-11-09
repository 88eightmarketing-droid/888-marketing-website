import { closing, form } from "@/data/site";
import LeadForm from "./LeadForm";

/** The close: the line once more, big, and the form again — nobody should have to scroll back up. */
export default function Closing() {
  return (
    <section className="relative overflow-hidden bg-mist text-ink">
      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:grid-cols-12 md:items-center md:px-8 md:py-36">
        <div className="md:col-span-6" data-fade>
          <h2 className="text-[clamp(3rem,7vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.06em]">
            {closing.title[0]}<br /><span className="text-red">{closing.title[1]}</span>
          </h2>
          <p className="mt-6 text-[19px] text-steel">{closing.text}</p>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-[0_50px_100px_-60px_rgba(11,11,12,.4)] md:col-span-5 md:col-start-8 md:p-8" data-fade style={{ ["--d" as string]: "120ms" }}>
          <h3 className="text-[24px] font-extrabold tracking-[-0.035em]">{form.title}</h3>
          <p className="mb-5 mt-1.5 text-[15px] text-steel">{form.text}</p>
          <LeadForm id="proposal-close" />
        </div>
      </div>
    </section>
  );
}
