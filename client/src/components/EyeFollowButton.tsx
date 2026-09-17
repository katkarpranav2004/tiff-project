import { useEffect, useRef } from 'react';

/**
 * Eye-Follow Button — native port of the Framer "Eye Follow Button" component.
 * Renders a pill button whose googly eyes track the mouse cursor and blink.
 * No Framer runtime dependency.
 */
interface EyeFollowButtonProps {
  text?: string;
  href?: string;
  eyeCount?: number;
  eyeSize?: number;
  pupilSize?: number;
  eyeGap?: number;
  /** How far the pupil can travel inside the eye, as % of max. */
  range?: number;
  blinking?: boolean;
  /** Blink interval in ms. */
  blinkInterval?: number;
  className?: string;
}

const EyeFollowButton = ({
  text = 'Apply Now',
  href = '#',
  eyeCount = 2,
  eyeSize = 22,
  pupilSize = 9,
  eyeGap = 4,
  range = 90,
  blinking = true,
  blinkInterval = 4000,
  className = '',
}: EyeFollowButtonProps) => {
  const eyeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pupilRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Track cursor and move each pupil toward it.
  useEffect(() => {
    const maxTravel = ((eyeSize - pupilSize) / 2) * (range / 100);

    const onMove = (e: MouseEvent) => {
      eyeRefs.current.forEach((eye, i) => {
        const pupil = pupilRefs.current[i];
        if (!eye || !pupil) return;
        const r = eye.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(Math.hypot(e.clientX - cx, e.clientY - cy) / 40, 1);
        const tx = Math.cos(angle) * maxTravel * dist;
        const ty = Math.sin(angle) * maxTravel * dist;
        pupil.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [eyeSize, pupilSize, range]);

  // Blink loop.
  useEffect(() => {
    if (!blinking) return;
    const id = setInterval(() => {
      eyeRefs.current.forEach((eye) => {
        if (!eye) return;
        eye.style.transition = 'transform 0.09s ease';
        eye.style.transform = 'scaleY(0.1)';
        setTimeout(() => {
          if (eye) eye.style.transform = 'scaleY(1)';
        }, 110);
      });
    }, blinkInterval);
    return () => clearInterval(id);
  }, [blinking, blinkInterval]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full bg-foundation-green py-1.5 pl-5 pr-1.5 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory shadow-sm transition-all hover:bg-foundation-dark ${className}`}
    >
      <span>{text}</span>
      <span className="flex items-center rounded-full bg-warm-ivory/95 px-1.5 py-1.5" style={{ gap: eyeGap }}>
        {Array.from({ length: eyeCount }).map((_, i) => (
          <span
            key={i}
            ref={(el) => { eyeRefs.current[i] = el; }}
            className="relative inline-block rounded-full bg-white"
            style={{ width: eyeSize, height: eyeSize, willChange: 'transform' }}
          >
            <span
              ref={(el) => { pupilRefs.current[i] = el; }}
              className="absolute left-1/2 top-1/2 rounded-full bg-foundation-dark"
              style={{ width: pupilSize, height: pupilSize, transform: 'translate(-50%, -50%)' }}
            />
          </span>
        ))}
      </span>
    </a>
  );
};

export default EyeFollowButton;
