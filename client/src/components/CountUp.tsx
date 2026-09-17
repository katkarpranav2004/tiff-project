import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  children: string; // any string; every numeric token inside animates
  duration?: number;
  className?: string;
}

// Format one animated value to match the ORIGINAL token's style
// (decimals, and Indian vs Western digit grouping).
function fmt(current: number, original: string, decimals: number): string {
  if (decimals > 0) return current.toFixed(decimals);
  const n = Math.round(current);
  if (!original.includes(',')) return String(n);
  const indian = /\d,\d{2},/.test(original); // e.g. 1,00,67,000
  return n.toLocaleString(indian ? 'en-IN' : 'en-US');
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Animate every number in `children` from 0 to its value when it scrolls
 * into view. Non-numeric text (prefixes like "~", suffixes like "M+", "%",
 * "years") is preserved. Respects reduced-motion (shows final immediately).
 */
const CountUp = ({ children, duration = 1400, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(prefersReducedMotion() ? 1 : 0);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setProgress(1 - Math.pow(1 - p, 3)); // easeOutCubic
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [duration]);

  const rendered = children.replace(/\d[\d,]*\.?\d*/g, (token) => {
    const decimals = token.includes('.') ? (token.split('.')[1] || '').length : 0;
    const target = parseFloat(token.replace(/,/g, ''));
    if (!isFinite(target)) return token;
    return fmt(target * progress, token, decimals);
  });

  return <span ref={ref} className={className}>{rendered}</span>;
};

export default CountUp;
