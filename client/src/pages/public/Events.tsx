import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EVENT_STORIES } from '../../data/events';
import { api, fileUrl } from '../../lib/api';

interface DbEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  date: string;
  time?: string | null;
  location?: string | null;
}

const Events = () => {
  const { data: dbEvents } = useQuery({
    queryKey: ['events'],
    queryFn: async () => (await api.get('/events')).data.data as DbEvent[],
  });
  const liveEvents = dbEvents ?? [];

  return (
    <div>
      {/* Header band */}
      <div className="relative overflow-hidden bg-foundation-green pt-28 pb-14 text-warm-ivory">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-ochre-light">Events &amp; Ventures</span>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">Events &amp; Incubatees</h1>
          <p className="mt-3 max-w-xl text-sm text-warm-sand font-sans">
            Conferences, annual general meetings, and the ventures supported by TISS Incube Foundation.
          </p>
        </div>
      </div>

      {/* Live events from the admin (DB) */}
      {liveEvents.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 lg:px-12 pt-14">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foundation-dark">Upcoming &amp; recent events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {liveEvents.map((e) => (
              <Link
                key={e.id}
                to={`/events/${e.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-subtle-border bg-white transition-all hover:-translate-y-0.5 hover:border-foundation-green hover:shadow-card"
              >
                <div className="aspect-video overflow-hidden bg-parchment">
                  {e.imageUrl ? (
                    <img src={fileUrl(e.imageUrl)} alt={e.title} className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-foundation-green/40">
                      <span className="material-symbols-outlined text-5xl">calendar_month</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl font-bold text-foundation-dark">{e.title}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-slate font-sans">
                    <span className="material-symbols-outlined text-[16px] text-brand-green">calendar_month</span>
                    {e.date ? e.date.slice(0, 10) : ''}{e.time ? ` · ${e.time}` : ''}
                  </div>
                  {e.location && (
                    <div className="mt-1 flex items-start gap-1.5 text-sm text-stone-slate font-sans">
                      <span className="material-symbols-outlined text-[16px] text-brand-green mt-0.5">location_on</span>
                      <span className="line-clamp-2">{e.location}</span>
                    </div>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-foundation-green">
                    View event
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Curated stories & ventures */}
      <div className="mx-auto max-w-5xl px-6 lg:px-12 py-14">
        {liveEvents.length > 0 && (
          <h2 className="mb-6 font-serif text-2xl font-bold text-foundation-dark">Stories &amp; ventures</h2>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {EVENT_STORIES.map((e) => (
            <Link
              key={e.slug}
              to={`/events/story/${e.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-subtle-border bg-white transition-all hover:-translate-y-0.5 hover:border-foundation-green hover:shadow-card"
            >
              <div className={`aspect-video overflow-hidden ${e.logo ? 'flex items-center justify-center bg-white p-8' : 'bg-parchment'}`}>
                <img src={e.image} alt={e.title} className={`transition-transform duration-300 group-hover:scale-105 ${e.logo ? 'max-h-full max-w-full object-contain' : 'h-full w-full object-cover object-top'}`} loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded bg-warm-sand px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-foundation-green">{t}</span>
                  ))}
                </div>
                <h3 className="font-serif text-xl font-bold text-foundation-dark">{e.title}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-slate font-sans">
                  <span className="material-symbols-outlined text-[16px] text-brand-green">calendar_month</span>
                  {e.date}{e.time ? ` · ${e.time}` : ''}
                </div>
                <div className="mt-1 flex items-start gap-1.5 text-sm text-stone-slate font-sans">
                  <span className="material-symbols-outlined text-[16px] text-brand-green mt-0.5">location_on</span>
                  <span className="line-clamp-2">{e.location}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-foundation-green">
                  View event
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
