import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, ArrowRight, Activity } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Section, SectionHeading, EmptyState, SkeletonCard, Button } from '../../components/ui/Primitives';
import { api, fileUrl } from '../../lib/api';

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  date: string;
}

const IncubeInAction = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['events', 'in-action'],
    queryFn: async () => (await api.get('/events', { params: { limit: 6 } })).data.data as EventItem[],
  });

  return (
    <div>
      <PageHeader
        eyebrow="Stories"
        title="Incube in Action"
        description="The moments, activities and milestones from across the TISS Incube ecosystem."
      />

      <Section tone="default">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-1">
            <SectionHeading
              eyebrow="What this is"
              title="Where our work comes to life."
              description="From flagship programmes like National Startup Day to workshops, mentoring sessions and field activities — this is where we share what the ecosystem is doing."
            />
            <Button to="/national-startup-day" className="mt-6">
              National Startup Day <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (data ?? []).length === 0 ? (
              <EmptyState title="Stories coming soon" description="Recent activities and highlights will appear here." icon={<Activity className="h-8 w-8" />} />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {(data ?? []).map((e) => (
                  <Link key={e.id} to={`/events/${e.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="aspect-video overflow-hidden bg-surface-muted">
                      {e.imageUrl ? <img src={fileUrl(e.imageUrl)} alt={e.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-brand/40"><Activity className="h-9 w-9" /></div>}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500"><Calendar className="h-3.5 w-3.5" />{new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <h3 className="mt-2 font-heading text-base font-semibold text-ink">{e.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{e.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default IncubeInAction;
