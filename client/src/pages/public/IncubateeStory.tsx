import { useParams, Link } from 'react-router-dom';
import { getIncubatee } from '../../data/incubatees';

const IncubateeStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const inc = getIncubatee(slug);

  if (!inc) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 pt-28 text-center">
        <h1 className="font-serif text-3xl font-bold text-foundation-dark">Incubatee not found</h1>
        <Link to="/incubatees" className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-foundation-green px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory hover:bg-foundation-dark">
          Back to incubatees
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero band */}
      <div className="relative overflow-hidden bg-foundation-green pt-28 pb-14 text-warm-ivory">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <Link to="/incubatees" className="inline-flex items-center gap-1 text-sm font-mono text-warm-sand hover:text-warm-ivory">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            All incubatees
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-ochre-gold/50 bg-foundation-dark/40 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-ochre-light">Incubatee</span>
            {inc.sector && (
              <span className="rounded-full border border-ochre-gold/50 bg-foundation-dark/40 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-ochre-light">{inc.sector}</span>
            )}
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{inc.name}</h1>
          {inc.location && (
            <div className="mt-6 flex flex-wrap gap-8 text-sm text-warm-sand">
              <span className="inline-flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-ochre-light">location_on</span>
                {inc.location}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {inc.image && (
              <div className="overflow-hidden rounded-2xl border border-subtle-border bg-parchment shadow-card">
                <img src={inc.image} alt={inc.name} className="w-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foundation-dark">About {inc.name}</h2>
              {inc.description.length > 0 ? (
                inc.description.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-stone-slate font-sans">{p}</p>
                ))
              ) : (
                <p className="text-base leading-relaxed text-stone-slate font-sans">
                  A venture incubated and supported by TISS Incube Foundation. Read the full profile on the official page.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-subtle-border bg-white p-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">Details</h3>
              <dl className="mt-4 space-y-4 text-sm">
                {inc.sector && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-stone-slate/70 font-mono">Sector</dt>
                    <dd className="mt-0.5 font-medium text-foundation-dark">{inc.sector}</dd>
                  </div>
                )}
                {inc.location && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-stone-slate/70 font-mono">Location</dt>
                    <dd className="mt-0.5 text-stone-slate">{inc.location}</dd>
                  </div>
                )}
              </dl>
              <a
                href={inc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-foundation-green px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory transition-colors hover:bg-foundation-dark"
              >
                Official page
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default IncubateeStory;
