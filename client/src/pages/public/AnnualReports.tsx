import { useQuery } from '@tanstack/react-query';
import { FileText, Download, Eye } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Container, SkeletonCard, EmptyState } from '../../components/ui/Primitives';
import { api, fileUrl } from '../../lib/api';

interface Report {
  id: string;
  title: string;
  year: string;
  fileUrl?: string | null;
  coverImageUrl?: string | null;
}

const AnnualReports = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => (await api.get('/reports')).data.data as Report[],
  });

  return (
    <div>
      <PageHeader
        eyebrow="Transparency"
        title="Annual Reports"
        description="Our yearly performance and impact, published for the community and stakeholders."
      />

      <Container className="py-14">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (data ?? []).length === 0 ? (
          <EmptyState title="Reports coming soon" icon={<FileText className="h-8 w-8" />} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(data ?? []).map((r) => (
              <div key={r.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex aspect-[3/4] items-center justify-center bg-surface-muted">
                  {r.coverImageUrl ? (
                    <img src={fileUrl(r.coverImageUrl)} alt={r.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-brand/50">
                      <FileText className="h-12 w-12" />
                      <span className="mt-2 font-heading text-lg font-bold text-ink">{r.year}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark">Annual Report</p>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-ink">{r.year}</h3>
                  <div className="mt-4 flex gap-2">
                    {r.fileUrl ? (
                      <>
                        <a href={fileUrl(r.fileUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-sm font-medium text-ink hover:bg-slate-50">
                          <Eye className="h-4 w-4" /> Preview
                        </a>
                        <a href={fileUrl(r.fileUrl)} download className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-dark">
                          <Download className="h-4 w-4" /> PDF
                        </a>
                      </>
                    ) : (
                      <span className="text-sm text-slate-400">Document coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AnnualReports;
