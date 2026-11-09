import type { ReactNode } from "react";

/**
 * The pieces every product tile is made of. Buttons are pills; the filled one
 * is the action, the outlined one the alternative — never two filled.
 */

export function Button({ href, children, variant = "fill", size = "md", dark = false }: {
  href: string;
  children: ReactNode;
  variant?: "fill" | "line";
  size?: "md" | "sm";
  dark?: boolean;
}) {
  const base = "inline-flex items-center justify-center rounded-full transition-colors duration-200 whitespace-nowrap";
  const sizes = { md: "min-h-11 px-[22px] text-[17px] tracking-[-0.022em]", sm: "min-h-7 px-3 text-[12px] tracking-[-0.01em]" };
  const variants = {
    fill: "bg-red text-white hover:bg-red-deep",
    line: dark ? "border border-white text-white hover:bg-white hover:text-black" : "border border-red text-red hover:bg-red hover:text-white",
  };
  return <a href={href} className={`${base} ${sizes[size]} ${variants[variant]}`}>{children}</a>;
}

/** Centred name, one line, actions: the head of every tile. */
export function TileHead({ name, line, dark = false, as: H = "h2", children }: {
  name: string;
  line: string;
  dark?: boolean;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 text-center" data-fade>
      <H className={`text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] md:text-[56px] md:leading-[1.07] ${dark ? "text-white" : "text-graphite"}`}>{name}</H>
      <p className={`mt-1.5 max-w-[34rem] text-[19px] leading-[1.25] tracking-[0.01em] md:text-[28px] md:leading-[1.15] ${dark ? "text-white" : "text-graphite"}`}>{line}</p>
      {children && <div className="mt-5 flex flex-wrap justify-center gap-3.5">{children}</div>}
    </div>
  );
}

/** A product tile. `wide` tiles run the full width; the rest sit two to a row. */
export function Tile({ id, dark = false, mist = false, wide = false, children }: {
  id?: string;
  dark?: boolean;
  mist?: boolean;
  wide?: boolean;
  children: ReactNode;
}) {
  const bg = dark ? "bg-black" : mist ? "bg-mist" : "bg-white";
  const shape = wide ? "min-h-[600px] md:min-h-[692px]" : "min-h-[540px] md:min-h-[580px]";
  return (
    <section id={id} className={`relative flex scroll-mt-14 flex-col items-center overflow-hidden pt-12 md:pt-14 ${bg} ${shape}`}>
      {children}
    </section>
  );
}
