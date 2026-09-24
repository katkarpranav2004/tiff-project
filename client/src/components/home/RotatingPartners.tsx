const partners = [
  { src: '/partners/british-council.png', name: 'British Council' },
  { src: '/partners/british-high-commission.png', name: 'British High Commission' },
  { src: '/partners/unctad.png', name: 'UN UNCTAD' },
  { src: '/partners/unesco.png', name: 'UNESCO' },
  { src: '/partners/birac.png', name: 'BIRAC' },
  { src: '/partners/dst.png', name: 'Department of Science & Technology' },
  { src: '/partners/dbt.png', name: 'Department of Biotechnology' },
  { src: '/partners/msde.png', name: 'Ministry of Skill Development & Entrepreneurship' },
];

const track = [...partners, ...partners];

const RotatingPartners = () => {
  return (
    <section className="w-full overflow-hidden border-b border-subtle-border bg-warm-alabaster py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-12">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">Partners &amp; Funders</p>
        <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foundation-dark sm:text-5xl">
          A National &amp; Global Network
        </h2>
        <p className="mt-3 max-w-md font-serif text-lg italic text-stone-slate">
          of institutional partners and funders
        </p>
      </div>

      {/* Full-bleed marquee strip: white band fades into the section
          background on all four edges, no visible container line. */}
      <div
        className="marquee-stage relative mt-14 h-40 w-full sm:h-44"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, #ffffff 25%, #ffffff 75%, transparent 100%)',
        }}
      >
        <div
          className="h-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <div className="marquee-track flex h-full w-max items-center gap-16 sm:gap-20">
            {track.map((p, i) => (
              <div key={`${p.name}-${i}`} className="flex h-16 w-32 shrink-0 items-center justify-center sm:h-20 sm:w-40">
                <img src={p.src} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RotatingPartners;
