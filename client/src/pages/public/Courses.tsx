import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Search, Clock, BarChart2, ArrowRight, GraduationCap } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Container, SkeletonCard, EmptyState, Pill } from '../../components/ui/Primitives';
import ThemedSelect from '../../components/ui/ThemedSelect';
import { api, fileUrl } from '../../lib/api';

interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  duration?: string | null;
  level?: string | null;
  instructorName?: string | null;
  thumbnailUrl?: string | null;
  createdAt: string;
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Sample catalogue shown when the API has no published courses yet.
// Fully client-filterable so search / category / level / sort all work.
const STATIC_COURSES: Course[] = [
  { id: 's1', title: 'Foundations of Social Entrepreneurship', slug: 'foundations-social-entrepreneurship', shortDescription: 'Turn a social problem into a viable venture: opportunity, model and theory of change.', category: 'Entrepreneurship', duration: '6 weeks', level: 'Beginner', instructorName: null, thumbnailUrl: null, createdAt: '2025-01-10' },
  { id: 's2', title: 'Incubation Essentials for Founders', slug: 'incubation-essentials', shortDescription: 'How incubation works at TIF — mentorship, milestones, funding and field support.', category: 'Incubation', duration: '4 weeks', level: 'Beginner', instructorName: null, thumbnailUrl: null, createdAt: '2025-02-05' },
  { id: 's3', title: 'Building & Managing Field Teams', slug: 'field-teams', shortDescription: 'Recruit, train and lead field teams for rural and difficult-area operations.', category: 'Capacity Building', duration: '5 weeks', level: 'Intermediate', instructorName: null, thumbnailUrl: null, createdAt: '2025-03-01' },
  { id: 's4', title: 'Impact Assessment & SROI', slug: 'impact-assessment-sroi', shortDescription: 'Measure outcomes with Social Return on Investment and Theory of Change methods.', category: 'Impact & CSR', duration: '6 weeks', level: 'Advanced', instructorName: null, thumbnailUrl: null, createdAt: '2025-03-20' },
  { id: 's5', title: 'CSR & Sponsored Projects', slug: 'csr-sponsored-projects', shortDescription: 'Design and run CSR-linked projects under Section 135 with clear reporting.', category: 'Impact & CSR', duration: '4 weeks', level: 'Intermediate', instructorName: null, thumbnailUrl: null, createdAt: '2025-04-10' },
  { id: 's6', title: 'Fundraising for Social Ventures', slug: 'fundraising-social-ventures', shortDescription: 'Grants, seed capital and philanthropic funding: pipeline, pitch and compliance.', category: 'Entrepreneurship', duration: '5 weeks', level: 'Advanced', instructorName: null, thumbnailUrl: null, createdAt: '2025-05-01' },
];

const STATIC_CATEGORIES = Array.from(new Set(STATIC_COURSES.map((c) => c.category)));

const Courses = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const { data: categories } = useQuery({
    queryKey: ['courseCategories'],
    queryFn: async () => (await api.get('/courses/categories')).data.data as string[],
  });

  const { data, isLoading } = useQuery({
    queryKey: ['courses', query, category, level, sort, page],
    queryFn: async () => {
      const res = await api.get('/courses', {
        params: { search: query || undefined, category: category || undefined, level: level || undefined, sort, page, limit: 9 },
      });
      return res.data as { data: Course[]; pagination: { totalPages: number; total: number } };
    },
    placeholderData: keepPreviousData,
  });

  const apiCourses = data?.data ?? [];
  const usingStatic = !isLoading && apiCourses.length === 0;

  // Client-side filter/sort for the static catalogue.
  const q = search.trim().toLowerCase();
  const staticCourses = STATIC_COURSES
    .filter((c) => {
      const matchesSearch = !q ||
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      const matchesCategory = !category || c.category === category;
      const matchesLevel = !level || c.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'oldest') return a.createdAt.localeCompare(b.createdAt);
      return b.createdAt.localeCompare(a.createdAt); // newest
    });

  const courses = usingStatic ? staticCourses : apiCourses;
  const totalPages = usingStatic ? 1 : (data?.pagination?.totalPages ?? 1);
  const categoryOptions = categories && categories.length > 0 ? categories : STATIC_CATEGORIES;

  return (
    <div>
      <PageHeader
        eyebrow="Learn"
        title="Courses & Training"
        description="Practical programmes on entrepreneurship, incubation and capacity building — designed for founders and changemakers."
      />

      <Container className="py-10">
        {/* Controls */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(search);
              setPage(1);
            }}
            className="relative flex-grow"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="h-11 w-full rounded-md border border-slate-200 pl-10 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </form>
          <div className="flex flex-wrap gap-3">
            <ThemedSelect
              ariaLabel="Filter by category"
              value={category}
              onChange={(v) => { setCategory(v); setPage(1); }}
              options={[{ value: '', label: 'All categories' }, ...categoryOptions.map((c) => ({ value: c, label: c }))]}
            />
            <ThemedSelect
              ariaLabel="Filter by level"
              value={level}
              onChange={(v) => { setLevel(v); setPage(1); }}
              options={[{ value: '', label: 'All levels' }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
            />
            <ThemedSelect
              ariaLabel="Sort courses"
              value={sort}
              onChange={(v) => { setSort(v); setPage(1); }}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'title', label: 'Title A–Z' },
              ]}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : courses.length === 0 ? (
            <EmptyState
              title="No courses available yet"
              description="Our team is preparing the next set of learning opportunities. Please check back soon."
              icon={<GraduationCap className="h-8 w-8" />}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => {
                const cardClass = "group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md";
                const inner = (
                  <>
                    <div className="aspect-video overflow-hidden bg-surface-muted">
                      {c.thumbnailUrl ? (
                        <img src={fileUrl(c.thumbnailUrl)} alt={c.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      ) : (
                        <div className="flex h-full items-center justify-center text-brand/40">
                          <GraduationCap className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <Pill className="self-start">{c.category}</Pill>
                      <h3 className="mt-3 font-heading text-lg font-semibold text-ink">{c.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">{c.shortDescription}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        {c.duration && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.duration}</span>}
                        {c.level && <span className="inline-flex items-center gap-1"><BarChart2 className="h-3.5 w-3.5" />{c.level}</span>}
                      </div>
                      {!usingStatic && (
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark">
                          View course <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </div>
                  </>
                );
                return usingStatic ? (
                  <div key={c.id} className={cardClass}>{inner}</div>
                ) : (
                  <Link key={c.id} to={`/courses/${c.slug}`} className={cardClass}>{inner}</Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-10 rounded-md border border-slate-200 px-4 text-sm font-medium disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-2 text-sm text-slate-500">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-10 rounded-md border border-slate-200 px-4 text-sm font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Courses;
