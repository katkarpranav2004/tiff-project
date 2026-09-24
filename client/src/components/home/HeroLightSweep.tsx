// Purely decorative atmospheric light — a soft cinematic glow drifting down
// from the top-center of the hero toward the headline. Sits above the Vanta
// globe canvas (which paints its own opaque background) but behind all hero
// content, so text/logos/buttons stay perfectly crisp.
//
// Positioned with fixed pixel offsets (not percentages of the hero's full
// height) so it reliably lands behind the headline regardless of how much
// content sits below it in the hero.
const HeroLightSweep = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[640px] overflow-visible" aria-hidden="true">
      {/* Broader, softer atmospheric spread — sits behind the primary glow. */}
      <div
        className="hero-light-secondary absolute left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full sm:h-[820px] sm:w-[820px] lg:h-[1100px] lg:w-[1100px]"
        style={{
          top: '-260px',
          background:
            'radial-gradient(ellipse at center, rgba(185,167,255,0.09) 0%, rgba(255,90,145,0.06) 35%, rgba(255,90,145,0) 70%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Primary glow — brightest, widest point sits right behind the headline. */}
      <div
        className="hero-light-primary absolute left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full sm:h-[580px] sm:w-[580px] lg:h-[780px] lg:w-[780px]"
        style={{
          top: '-190px',
          background:
            'radial-gradient(ellipse at center, rgba(245,240,255,0.18) 0%, rgba(185,167,255,0.13) 22%, rgba(255,90,145,0.09) 42%, rgba(255,90,145,0) 72%)',
          filter: 'blur(55px)',
        }}
      />
    </div>
  );
};

export default HeroLightSweep;
