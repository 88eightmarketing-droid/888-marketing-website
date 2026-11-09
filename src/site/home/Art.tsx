/**
 * The product pictures, drawn in code so they are sharp at any size, weigh
 * almost nothing, and never show a real business. Every name and line inside
 * them is a generic placeholder ("Your Business").
 *
 * All decorative: `aria-hidden` throughout, since every claim is in the tile
 * text beside them.
 */

/* ---------------------------------------------------------------- hero ---- */

export function Chrome888() {
  return (
    <div aria-hidden className="relative mt-auto flex w-full select-none justify-center">
      <p className="chrome px-[0.08em] text-[52vw] font-bold leading-[0.78] tracking-[-0.07em] md:text-[min(40vw,560px)]">888</p>
      {/* A floor reflection, faded out. */}
      <p
        className="chrome pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -scale-y-100 px-[0.08em] text-[52vw] font-bold leading-[0.78] tracking-[-0.07em] opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_45%)] md:text-[min(40vw,560px)]"
      >
        888
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- devices ---- */

function Screen({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#faf7f2] text-left">
      <div className={`flex items-center justify-between ${compact ? "px-3 py-2" : "px-5 py-3"}`}>
        <span className={`font-semibold tracking-[-0.02em] text-[#2b2118] ${compact ? "text-[9px]" : "text-[13px]"}`}>Your Business</span>
        {!compact && (
          <span className="flex gap-4 text-[9px] text-[#2b2118]/60">
            <span>Menu</span><span>About</span><span>Visit</span>
          </span>
        )}
        <span className={`rounded-full bg-red font-medium text-white ${compact ? "px-2 py-[3px] text-[7px]" : "px-3 py-1 text-[9px]"}`}>Call now</span>
      </div>
      <div className={`relative flex-1 overflow-hidden ${compact ? "mx-2 mb-2 rounded-[10px]" : "mx-4 mb-4 rounded-[10px]"}`}>
        {/* A warm "photograph" made of light. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_30%,#ffd9a8_0%,#f2a46b_35%,#a8573a_70%,#4a241a_100%)]" />
        <div className="absolute -bottom-6 right-[12%] size-[55%] rounded-full bg-[radial-gradient(circle,#fff3e0_0%,rgba(255,243,224,0)_70%)] blur-md" />
        <div className={`absolute ${compact ? "bottom-3 left-3" : "bottom-6 left-6"}`}>
          <p className={`font-semibold leading-[0.95] tracking-[-0.03em] text-white ${compact ? "text-[10px] md:text-[18px]" : "text-[22px] md:text-[34px]"}`}>Open today<br />until 7.</p>
          <p className={`mt-1 text-white/80 ${compact ? "text-[6px] md:text-[7px]" : "text-[8px] md:text-[10px]"}`}>Walk in, or call ahead.</p>
        </div>
      </div>
    </div>
  );
}

export function Devices() {
  return (
    <div aria-hidden className="relative mt-auto w-[min(92vw,820px)] translate-y-[6%]" data-fade style={{ ["--d" as string]: "120ms" }}>
      {/* Laptop */}
      <div className="mx-auto w-[86%]">
        <div className="rounded-t-[18px] bg-[#0d0d0f] p-[1.4%] pb-[1%] shadow-[0_40px_80px_-30px_rgba(0,0,0,.35)]">
          <div className="aspect-[16/10] overflow-hidden rounded-[6px]">
            <Screen />
          </div>
        </div>
        <div className="relative mx-[-7%] h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#e3e3e6] to-[#a9a9ae]">
          <div className="absolute left-1/2 top-0 h-[5px] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-[#c4c4c8]" />
        </div>
      </div>
      {/* Phone */}
      <div className="absolute bottom-[-4%] right-[2%] w-[24%] rounded-[16%/8%] bg-[#0d0d0f] p-[1.6%] shadow-[0_30px_60px_-20px_rgba(0,0,0,.45)]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[14%/6.5%]">
          <div className="absolute left-1/2 top-[1.6%] z-10 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          <div className="h-full pt-[9%] bg-[#faf7f2]"><Screen compact /></div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ identity ---- */

export function IdentityArt() {
  const cell = "flex items-center justify-center rounded-[22px] bg-[#161617]";
  return (
    <div aria-hidden className="mt-auto grid w-[min(88%,460px)] translate-y-[8%] grid-cols-3 gap-3" data-fade style={{ ["--d" as string]: "120ms" }}>
      <div className={`${cell} col-span-2 aspect-[2/1] flex-col items-start justify-end p-5`}>
        <span className="text-[11px] text-white/45">Display</span>
        <span className="font-serif text-[64px] italic leading-none text-white">Aa</span>
      </div>
      <div className={`${cell} aspect-square`}>
        <span className="flex size-16 items-center justify-center rounded-full border-2 border-white text-[26px] font-semibold text-white">Y</span>
      </div>
      <div className={`${cell} aspect-square gap-1.5`}>
        <span className="size-7 rounded-full bg-red" />
        <span className="size-7 rounded-full bg-[#f5e6cf]" />
        <span className="size-7 rounded-full bg-[#2c4a3e]" />
      </div>
      <div className={`${cell} col-span-2 aspect-[2/1]`}>
        <span className="text-[30px] font-semibold tracking-[0.18em] text-white">YOUR·CO</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- content ---- */

export function ContentArt() {
  return (
    <div aria-hidden className="relative mt-auto aspect-[4/3] w-[min(86%,480px)] translate-y-[6%] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)]" data-fade style={{ ["--d" as string]: "120ms" }}>
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_30%_25%,#ffe7c2_0%,#f0a868_30%,#7f3f2c_65%,#1f1210_100%)]" />
      <div className="absolute bottom-[18%] left-[18%] h-[46%] w-[34%] rounded-t-full bg-[#2a1712]/80 blur-[2px]" />
      {/* Viewfinder */}
      {["left-4 top-4 border-l-2 border-t-2", "right-4 top-4 border-r-2 border-t-2", "left-4 bottom-4 border-l-2 border-b-2", "right-4 bottom-4 border-r-2 border-b-2"].map((c) => (
        <span key={c} className={`absolute size-6 border-white/90 ${c}`} />
      ))}
      <span className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 border border-[#ffd60a]" />
      <span className="absolute left-12 top-5 flex items-center gap-1.5 text-[11px] font-medium text-white"><span className="size-2 rounded-full bg-red" />REC</span>
      <span className="absolute right-12 top-5 text-[11px] font-medium text-white">4K · 24</span>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-white">00:00:12:08</span>
    </div>
  );
}

/* ------------------------------------------------------------ presence ---- */

export function PresenceArt() {
  return (
    <div aria-hidden className="relative mt-auto w-[min(86%,440px)] translate-y-[6%]" data-fade style={{ ["--d" as string]: "120ms" }}>
      <div className="mx-auto flex w-[88%] items-center gap-2.5 rounded-full bg-white px-4 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,.25)]">
        <svg viewBox="0 0 24 24" className="size-4 text-steel" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <span className="text-[14px] text-graphite">your business near me</span>
      </div>
      <div className="mt-4 overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.35)]">
        <div className="relative h-[130px] bg-[#e8eef3] [background-image:linear-gradient(#d5dee6_1px,transparent_1px),linear-gradient(90deg,#d5dee6_1px,transparent_1px)] [background-size:28px_28px]">
          <div className="absolute left-[10%] top-[55%] h-3 w-[70%] -rotate-6 rounded-full bg-white" />
          <div className="absolute left-[45%] top-0 h-full w-3 rotate-12 bg-white" />
          <svg viewBox="0 0 24 24" className="absolute left-1/2 top-[38%] size-9 -translate-x-1/2 -translate-y-1/2 text-red drop-shadow" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
        </div>
        <div className="p-5 text-left">
          <p className="text-[19px] font-semibold tracking-[-0.02em] text-graphite">Your Business</p>
          <p className="mt-0.5 text-[13px] text-steel"><span className="text-[#1d8a3a]">Open</span> · Closes 7 pm</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px] font-medium text-red">
            {["Call", "Directions", "Website"].map((a) => <span key={a} className="rounded-full bg-mist py-2">{a}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- care ---- */

export function CareArt() {
  const rows = ["Site online", "SSL certificate", "Domain in your name", "Changes when you need them"];
  return (
    <div aria-hidden className="mt-auto w-[min(86%,420px)] translate-y-[6%] rounded-[22px] bg-[#1d1d1f] p-6 text-left" data-fade style={{ ["--d" as string]: "120ms" }}>
      <p className="text-[13px] text-white/50">yourbusiness.com</p>
      <ul className="mt-4 divide-y divide-white/10">
        {rows.map((r) => (
          <li key={r} className="flex items-center justify-between py-3.5">
            <span className="text-[16px] text-white">{r}</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#30d158]">
              <svg viewBox="0 0 24 24" className="size-3 text-black" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="m5 12 5 5 9-10" /></svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- icons ---- */

export function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    pencil: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
    key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l2 2M14 9l2 2" /></>,
  };
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-11 text-graphite" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
