import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Building2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Container, SkeletonCard, Pill } from '../../components/ui/Primitives';
import { api, fileUrl } from '../../lib/api';
import { INCUBATEE_STORIES } from '../../data/incubatees';
import ThemedSelect from '../../components/ui/ThemedSelect';

interface Incubatee {
  id: string;
  name: string;
  logo?: string | null;
  founder?: string | null;
  sector?: string | null;
  description?: string | null;
  website?: string | null;
  featured: boolean;
}

// Map incubatee name to its /events/story/:slug route.
const STORY_SLUGS: Record<string, string> = {
  'sampurn(e)arth': 'sampurnearth',
  'sampurnearth': 'sampurnearth',
  'xen farms': 'xen-farms',
  'even cargo': 'even-cargo',
  'sahayatha healthcare': 'sahayatha-healthcare',
  'unexplored bastar': 'unexplored-bastar',
  "zahida's boutique": 'zahida-boutique',
  'forschmedx': 'forschmedx-trachease',
};

const storyPath = (name: string): string | null => {
  const slug = STORY_SLUGS[name.trim().toLowerCase()];
  return slug ? `/events/story/${slug}` : null;
};

const Incubatees = () => {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['incubatees'],
    queryFn: async () => (await api.get('/incubatees')).data.data as Incubatee[],
  });

  const sectors = useMemo(
    () => Array.from(new Set((data ?? []).map((i) => i.sector).filter(Boolean))) as string[],
    [data]
  );

  const filtered = (data ?? []).filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
      (i.description ?? '').toLowerCase().includes(search.toLowerCase());
    const matchesSector = !sector || i.sector === sector;
    return matchesSearch && matchesSector;
  });

  // Static incubatee list (shown when the API has none), filtered by search.
  const q = search.trim().toLowerCase();
  const staticFiltered = INCUBATEE_STORIES.filter((c) =>
    !q ||
    c.name.toLowerCase().includes(q) ||
    (c.sector ?? '').toLowerCase().includes(q) ||
    (c.location ?? '').toLowerCase().includes(q) ||
    c.description.some((p) => p.toLowerCase().includes(q))
  );

  return (
    <div>
      <PageHeader eyebrow="Portfolio" title="Our Incubatees" description="The startups and social ventures we support across sectors." />

      <Container className="py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-grow">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incubatees…"
              className="h-11 w-full rounded-md border border-slate-200 pl-10 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          {sectors.length > 0 && (
            <ThemedSelect
              ariaLabel="Filter by sector"
              value={sector}
              onChange={setSector}
              options={[{ value: '', label: 'All sectors' }, ...sectors.map((s) => ({ value: s, label: s }))]}
            />
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          staticFiltered.length === 0 ? (
            <p className="py-12 text-center text-sm text-stone-slate">No incubatees match “{search}”.</p>
          ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {staticFiltered.map((c) => (
              <Link
                key={c.slug}
                to={`/incubatees/${c.slug}`}
                className="group flex min-h-[190px] flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
                  <span className="font-serif text-2xl font-bold text-brand/50">{c.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()}</span>
                </div>
                <h3 className="font-serif text-sm font-bold leading-snug text-foundation-dark">{c.name}</h3>
                {c.sector && <p className="text-[11px] text-stone-slate font-sans">{c.sector.split(' / ')[0]}</p>}
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand/50 group-hover:text-brand-dark">
                  View <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((i) => {
              const to = storyPath(i.name);
              const inner = (
                <>
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-surface-muted">
                    {i.logo ? <img src={fileUrl(i.logo)} alt={i.name} className="h-full w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : <Building2 className="h-6 w-6 text-brand/50" />}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{i.name}</h3>
                  {i.sector && <Pill className="mt-2 self-start">{i.sector}</Pill>}
                  {i.description && <p className="mt-3 line-clamp-3 text-sm text-slate-600">{i.description}</p>}
                </>
              );
              const cls = "group flex flex-col rounded-xl border border-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md";
              return to ? (
                <Link key={i.id} to={to} className={cls}>{inner}</Link>
              ) : i.website ? (
                <a key={i.id} href={i.website} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={i.id} className={cls}>{inner}</div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Incubatees;
