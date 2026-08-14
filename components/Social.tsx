/**
 * Where to find us.
 *
 * One definition, used in the header and the footer, so the two can never drift
 * apart — a dead social link on the site of a company selling websites is the
 * cheapest possible way to lose an argument.
 *
 * Rendered as icons rather than the words "Instagram" and "Facebook". At this
 * size the glyphs are more recognisable than the labels, and they stay out of
 * the way of the thing the header is actually for, which is the call to action.
 */

export const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/88eightmarketing/',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61592828743883',
    path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z',
  },
] as const;

export default function Social({
  tone = 'ink',
  size = 18,
  className = '',
}: {
  /** `paper` for use on the dark footer band. */
  tone?: 'ink' | 'paper';
  size?: number;
  className?: string;
}) {
  const colour = tone === 'paper' ? 'text-paper/60 hover:text-paper' : 'text-ink-faint hover:text-accent';

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`888 Marketing on ${social.name}`}
            className={`inline-flex h-9 w-9 items-center justify-center transition-colors ${colour}`}
          >
            <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
              <path d={social.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
