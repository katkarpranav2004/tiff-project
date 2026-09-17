import { useEffect, useRef, useState } from 'react';

interface Member {
  name: string;
  short: string;
  role: string;
  detail: string;
  photo?: string;
  group: string;
}

const MEMBERS: Member[] = [
  {
    name: 'Prof. Satyajit Majumdar',
    short: 'Majumdar',
    role: 'Managing Director, TIF',
    detail: 'Ex-Professor & Dean, School of Management and Labour Studies, Tata Institute of Social Sciences, Mumbai.',
    photo: '/team/majumdar.jpg',
    group: 'Leadership',
  },
  {
    name: 'Sujay Dixit',
    short: 'Dixit',
    role: 'CEO, TIF',
    detail: 'Ex-Unilever, Glenmark Pharma, Hindustan Coca-Cola Beverages Pvt Ltd., Celio.',
    photo: '/team/dixit.jpg',
    group: 'Leadership',
  },
  {
    name: 'Dr. Vipin Kumar',
    short: 'Vipin Kumar',
    role: 'Board of Directors',
    detail: 'Chief Scientist, National Innovation Foundation – India.',
    photo: '/team/vipin.jpg',
    group: 'Board',
  },
  {
    name: 'Dr. Madhav Sathe',
    short: 'Sathe',
    role: 'Board of Directors',
    detail: 'Anaesthesiologist — Bombay Hospital & Breach Candy Hospital · Secretary, BMCWS · Visiting Faculty, TISS Mumbai & University of Mumbai.',
    photo: '/team/sathe.jpg',
    group: 'Board',
  },
  {
    name: 'Dr. Archana Singh',
    short: 'Archana Singh',
    role: 'Board of Directors',
    detail: 'Assistant Professor, Tata Institute of Social Sciences, Mumbai.',
    photo: '/team/singh.jpg',
    group: 'Board',
  },
];

function initials(name: string) {
  return name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.)\s*/i, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

const LeadershipTeam = () => {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const raf = useRef(0);
  const m = MEMBERS[active];

  // Active = the name nearest the vertical center of the scroll box (YC style).
  useEffect(() => {
    const c = listRef.current;
    if (!c) return;
    const compute = () => {
      const center = c.scrollTop + c.clientHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const mid = el.offsetTop + el.offsetHeight / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(compute);
    };
    c.addEventListener('scroll', onScroll, { passive: true });
    compute();
    return () => { c.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf.current); };
  }, []);

  const selectAt = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="w-full bg-warm-ivory border-b border-subtle-border">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-6 py-8 lg:px-12">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">Democratic Governance</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foundation-dark sm:text-4xl">
            Leadership Team &amp; Board of Directors
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left: photo + caption */}
          <div className="order-2 flex flex-col lg:order-1 lg:col-span-4">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl border border-subtle-border bg-white shadow-card lg:h-[62vh] lg:max-h-[640px] lg:w-auto">
              {m.photo ? (
                <img key={m.photo} src={m.photo} alt={m.name} className="h-full w-full object-cover animate-[fade-up_0.35s_ease-out]" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-foundation-green">
                  <span className="font-serif text-8xl font-bold text-ochre-light">{initials(m.name)}</span>
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-sm text-stone-slate font-sans">{m.name} · {m.role}</p>
          </div>

          {/* Center: scroll-snap name list */}
          <div className="relative order-1 lg:order-2 lg:col-span-4">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-warm-ivory to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-warm-ivory to-transparent" />
            <div
              ref={listRef}
              className="h-[54vh] overflow-y-auto overscroll-y-auto scroll-smooth text-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="h-[calc(27vh-1rem)]" />
              {MEMBERS.map((person, i) => (
                <button
                  key={person.name}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onClick={() => selectAt(i)}
                  className={`flex h-[9vh] w-full items-center justify-center px-3 text-center font-serif leading-tight tracking-tight transition-all duration-300 ease-out ${
                    i === active
                      ? 'scale-105 text-2xl font-bold text-foundation-dark sm:text-4xl'
                      : 'text-xl font-normal text-stone-slate/25 sm:text-2xl'
                  }`}
                >
                  {person.name}
                </button>
              ))}
              <div className="h-[calc(27vh-1rem)]" />
            </div>
          </div>

          {/* Right: details */}
          <div className="order-3 lg:col-span-4">
            <div className="rounded-3xl border border-subtle-border bg-parchment p-7 shadow-card">
              <span className="inline-block rounded-full bg-foundation-green px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-warm-ivory">{m.role}</span>
              <h3 className="mt-4 font-serif text-2xl font-bold text-foundation-dark">{m.name}</h3>
              <div className="mt-2 h-0.5 w-10 bg-ochre-gold"></div>
              <p className="mt-4 text-sm leading-relaxed text-stone-slate font-sans">{m.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
