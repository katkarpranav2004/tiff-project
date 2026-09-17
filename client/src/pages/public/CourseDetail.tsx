import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, BarChart2, User, Download, ArrowLeft, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Container, Spinner, Pill, Button } from '../../components/ui/Primitives';
import { api, fileUrl } from '../../lib/api';
import { APPLY_URL } from '../../lib/site';

interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  duration?: string | null;
  level?: string | null;
  instructorName?: string | null;
  instructorBio?: string | null;
  thumbnailUrl?: string | null;
  brochureUrl?: string | null;
  eligibility?: string | null;
  learningOutcomes?: string | null;
  syllabus?: unknown;
}

function toList(value?: string | null): string[] {
  if (!value) return [];
  return value.split(/\r?\n|•|;/).map((s) => s.trim()).filter(Boolean);
}

function renderSyllabus(syllabus: unknown): { title: string; items?: string[] }[] {
  if (!syllabus) return [];
  if (Array.isArray(syllabus)) {
    return syllabus.map((s: any) =>
      typeof s === 'string' ? { title: s } : { title: s.title ?? '', items: s.items }
    );
  }
  if (typeof syllabus === 'string') return toList(syllabus).map((t) => ({ title: t }));
  return [];
}

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', slug],
    queryFn: async () => (await api.get(`/courses/${slug}`)).data.data as Course,
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-24">
        <Spinner className="h-8 w-8 text-brand" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-ink">Course unavailable</h1>
        <p className="mt-2 text-slate-600">We couldn't find that course. It may have been unpublished.</p>
        <Button to="/courses" variant="secondary" className="mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Button>
      </Container>
    );
  }

  const outcomes = toList(data.learningOutcomes);
  const syllabus = renderSyllabus(data.syllabus);

  return (
    <div>
      <div className="border-b border-slate-200 bg-surface-alt pt-28 pb-12 md:pt-32">
        <Container>
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-dark">
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <Pill>{data.category}</Pill>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">{data.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">{data.shortDescription}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                {data.duration && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand" />{data.duration}</span>}
                {data.level && <span className="inline-flex items-center gap-1.5"><BarChart2 className="h-4 w-4 text-brand" />{data.level}</span>}
                {data.instructorName && <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4 text-brand" />{data.instructorName}</span>}
              </div>
            </div>
            {data.thumbnailUrl && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <img src={fileUrl(data.thumbnailUrl)} alt={data.title} className="aspect-video w-full object-cover" />
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-3 lg:gap-16">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="font-heading text-xl font-semibold text-ink">About this course</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">{data.description}</p>
          </section>

          {outcomes.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">What you'll learn</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {syllabus.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">Syllabus</h2>
              <div className="mt-4 space-y-3">
                {syllabus.map((s, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="font-medium text-ink">{i + 1}. {s.title}</p>
                    {s.items && s.items.length > 0 && (
                      <ul className="mt-2 list-disc pl-6 text-sm text-slate-600">
                        {s.items.map((it, j) => <li key={j}>{it}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.instructorBio && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">Instructor</h2>
              <div className="mt-3 rounded-xl border border-slate-200 bg-surface-alt p-5">
                <p className="font-semibold text-ink">{data.instructorName}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.instructorBio}</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-heading text-lg font-semibold text-ink">Interested in this course?</h3>
            <p className="mt-2 text-sm text-slate-600">Apply through our admissions form to get started.</p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Apply Now <ArrowUpRight className="h-4 w-4" />
            </a>
            {data.brochureUrl && (
              <a
                href={fileUrl(data.brochureUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md border border-slate-200 px-5 text-sm font-semibold text-ink hover:bg-slate-50"
              >
                <Download className="h-4 w-4" /> Download brochure
              </a>
            )}
            {data.eligibility && (
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Eligibility</p>
                <p className="mt-2 text-sm text-slate-600">{data.eligibility}</p>
              </div>
            )}
          </div>
        </aside>
      </Container>
    </div>
  );
};

export default CourseDetail;
