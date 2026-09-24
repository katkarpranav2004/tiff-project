import { useEffect, useRef, useState } from 'react';

const VantaGlobeBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduceMotion || !ref.current) return;

    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    Promise.all([import('three'), import('vanta/dist/vanta.globe.min')]).then(([THREE, { default: vantaModule }]) => {
      if (cancelled || !ref.current) return;
      effect = vantaModule.default({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 0.7,
        color: 0xff3f81,
        color2: 0xffffff,
        backgroundColor: 0x23153c,
        size: 0.65,
      });
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 top-0 z-0 h-screen max-h-[900px]"
      style={{ backgroundColor: '#23153c' }}
      aria-hidden="true"
    />
  );
};

export default VantaGlobeBackground;
