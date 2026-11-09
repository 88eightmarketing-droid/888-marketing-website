import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Splits a string into masked words that rise into place.
 *
 * `mode="view"` reveals when scrolled into view (the IntersectionObserver in
 * Home adds `is-in`); `mode="load"` plays on page load, after the opener.
 * The words are real text in the markup, so the line reads the same to search
 * engines, screen readers and anyone without JavaScript.
 */
export function Reveal({
  text,
  as: Tag = "span",
  mode = "view",
  delay = 0,
  start = 0,
  className,
  children,
}: {
  text: string;
  as?: ElementType;
  mode?: "view" | "load";
  delay?: number;
  /** Index offset, so several lines can stagger as one sentence. */
  start?: number;
  className?: string;
  children?: ReactNode;
}) {
  const words = text.split(" ");
  const props = mode === "view" ? { "data-split": "" } : {};
  return (
    <Tag className={[mode === "load" ? "hero-in" : "", className].join(" ")} style={{ "--d": `${delay}ms` } as CSSProperties} {...props}>
      {words.map((w, i) => (
        // The space sits outside the masked span: whitespace at the end of an
        // inline-block collapses, which ran the words together.
        <Fragment key={i}>
          <span className="w" style={{ "--wi": start + i } as CSSProperties}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
      {children}
    </Tag>
  );
}
