import { useParams, Link } from 'react-router-dom';
import { EVENT_STORIES, getEventStory } from '../../data/events';

const EventStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const ev = getEventStory(slug);

  if (!ev) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 pt-28 text-center">
        <h1 className="font-serif text-3xl font-bold text-foundation-dark">Event not found</h1>
        <Link to="/events" className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-foundation-green px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory hover:bg-foundation-dark">
          Back to events
        </Link>
      </div>
    );
  }

  const others = EVENT_STORIES.filter((e) => e.slug !== ev.slug);

  return (
    <div>
      {/* Hero band */}
      <div className="relative overflow-hidden bg-foundation-green pt-28 pb-14 text-warm-ivory">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <Link to="/events" className="inline-flex items-center gap-1 text-sm font-mono text-warm-sand hover:text-warm-ivory">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            All events
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {ev.tags.map((t) => (
              <span key={t} className="rounded-full border border-ochre-gold/50 bg-foundation-dark/40 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-ochre-light">{t}</span>
            ))}
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{ev.title}</h1>
          <div className="mt-6 flex flex-col gap-3 text-sm text-warm-sand sm:flex-row sm:flex-wrap sm:gap-8">
            <span className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-ochre-light">calendar_month</span>
              {ev.date}{ev.time ? ` · ${ev.time}` : ''}
            </span>
            <span className="inline-flex items-start gap-2 max-w-xl">
              <span className="material-symbols-outlined text-[18px] text-ochre-light">location_on</span>
              {ev.location}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="overflow-hidden rounded-2xl border border-subtle-border bg-parchment shadow-card">
              <img src={ev.image} alt={ev.title} className="w-full object-contain" loading="lazy" />
            </div>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foundation-dark">About this event</h2>
              {ev.description.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-stone-slate font-sans">{p}</p>
              ))}
            </div>
            {ev.agenda && (
              <div className="rounded-2xl border border-subtle-border bg-parchment/50 p-6">
                <h2 className="font-serif text-xl font-bold text-foundation-dark">Agenda</h2>
                <ol className="mt-3 space-y-3">
                  {ev.agenda.map((a, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-slate font-sans">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foundation-green text-[11px] font-mono font-bold text-warm-ivory">{i + 1}</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-subtle-border bg-white p-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">Details</h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-stone-slate/70 font-mono">Date</dt>
                  <dd className="mt-0.5 font-medium text-foundation-dark">{ev.date}</dd>
                </div>
                {ev.time && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-stone-slate/70 font-mono">Time</dt>
                    <dd className="mt-0.5 font-medium text-foundation-dark">{ev.time}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-stone-slate/70 font-mono">Venue</dt>
                  <dd className="mt-0.5 text-stone-slate">{ev.location}</dd>
                </div>
              </dl>
            </div>

            {others.length > 0 && (
              <div className="rounded-2xl border border-subtle-border bg-white p-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">More events</h3>
                <div className="mt-4 space-y-3">
                  {others.map((o) => (
                    <Link key={o.slug} to={`/events/story/${o.slug}`} className="block rounded-lg border border-subtle-border p-3 transition-colors hover:border-foundation-green">
                      <p className="text-sm font-serif font-bold text-foundation-dark leading-snug">{o.title}</p>
                      <p className="mt-1 text-xs text-stone-slate font-sans">{o.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventStory;
