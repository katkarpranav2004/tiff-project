import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * CollapsingCards — native port of the Framer "CollapsingCards" component.
 * Horizontal accordion: hovering a card expands it while the others collapse
 * to narrow strips. The active card grows left-to-right; no vertical motion.
 * No Framer runtime dependency.
 */
export interface CollapsingCard {
  number: string;
  title: string;
  desc: string;
  image: string;
  logo?: boolean;
  tag: string;
  loc: string;
  slug: string;
}

const CollapsingCards = ({ cards }: { cards: CollapsingCard[] }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4 lg:h-[68vh] lg:max-h-[620px] lg:flex-row">
      {cards.map((c, i) => {
        const open = i === active;
        return (
          <div
            key={c.slug}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-foundation-dark shadow-card transition-all duration-500 ease-out ${
              open ? 'lg:flex-[5]' : 'lg:flex-[1]'
            } min-h-[420px] lg:min-h-0`}
          >
            {/* Background image */}
            <div className={`absolute inset-0 ${c.logo ? 'flex items-center justify-center bg-white' : ''}`}>
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className={c.logo ? 'max-h-[60%] max-w-[70%] object-contain' : 'h-full w-full object-cover object-top'}
              />
            </div>
            {/* Dark gradient for legibility */}
            {!c.logo && (
              <div className="absolute inset-0 bg-gradient-to-t from-foundation-dark via-foundation-dark/40 to-transparent" />
            )}

            {/* Collapsed label: vertical title (desktop, inactive only) */}
            <span
              className={`pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 font-serif text-xl font-bold tracking-tight text-warm-ivory transition-opacity duration-300 lg:block ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ writingMode: 'vertical-rl', transform: 'translateX(-50%) rotate(180deg)' }}
            >
              {c.title}
            </span>

            {/* Expanded content */}
            <div
              className={`absolute inset-x-0 bottom-0 z-10 flex flex-col p-8 transition-opacity duration-300 ${
                open ? 'opacity-100 delay-150' : 'opacity-100 lg:opacity-0'
              } ${c.logo ? 'bg-gradient-to-t from-foundation-dark via-foundation-dark/70 to-transparent pt-16' : ''}`}
            >
              <span className="inline-block self-start rounded bg-brand-green/20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-green">
                {c.tag}
              </span>
              <h3 className="mt-3 whitespace-nowrap font-serif text-2xl font-bold text-warm-ivory sm:text-3xl">{c.title}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-warm-sand/80 font-sans">
                <span className="material-symbols-outlined text-[16px] text-brand-green">location_on</span>
                {c.loc}
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-warm-sand/80 font-sans">{c.desc}</p>
              <Link
                to={`/events/story/${c.slug}`}
                className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-brand-green px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-foundation-dark transition-colors hover:bg-status-verified"
              >
                Read story
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollapsingCards;
