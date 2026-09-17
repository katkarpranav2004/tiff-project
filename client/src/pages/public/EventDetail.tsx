import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container, Spinner, Button } from '../../components/ui/Primitives';
import { api, fileUrl } from '../../lib/api';

interface EventItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  date: string;
  time?: string | null;
  location?: string | null;
  registrationUrl?: string | null;
}

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => (await api.get(`/events/${slug}`)).data.data as EventItem,
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center pt-24"><Spinner className="h-8 w-8 text-brand" /></div>;
  }

  if (isError || !data) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-ink">Event not found</h1>
        <p className="mt-2 text-slate-600">This event may have been removed or unpublished.</p>
        <Button to="/events" variant="secondary" className="mt-6"><ArrowLeft className="h-4 w-4" /> Back to events</Button>
      </Container>
    );
  }

  return (
    <div>
      <div className="border-b border-slate-200 bg-surface-alt pt-28 pb-12 md:pt-32">
        <Container>
          <Link to="/events" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-dark">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <h1 className="mt-6 max-w-3xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">{data.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-brand" />{new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {data.time && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand" />{data.time}</span>}
            {data.location && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand" />{data.location}</span>}
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          {data.imageUrl && (
            <img src={fileUrl(data.imageUrl)} alt={data.title} className="mb-8 w-full rounded-xl border border-slate-200 object-cover" />
          )}
          <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">{data.description}</p>
          {data.registrationUrl && (
            <a
              href={data.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-1.5 rounded-md bg-brand px-7 font-semibold text-white hover:bg-brand-dark"
            >
              Register <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </Container>
    </div>
  );
};

export default EventDetail;
