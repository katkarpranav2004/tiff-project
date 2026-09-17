import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, FileText, Download, ShieldCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/PageHeader';
import { Container, Spinner } from '../../components/ui/Primitives';
import { api, fileUrl } from '../../lib/api';

interface VerifyResult {
  verified: boolean;
  certificate: {
    caieNumber: string;
    candidateName: string;
    courseName: string;
    issueDate: string;
    certificateFileUrl?: string | null;
  };
}

const Certificates = () => {
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState(params.get('caie') ?? '');
  const [searchCaie, setSearchCaie] = useState(params.get('caie') ?? '');

  // Support QR deep-link: /certificates/verify?caie=CAIE-XXXX-XXXX
  useEffect(() => {
    const q = params.get('caie');
    if (q) {
      setInput(q.toUpperCase());
      setSearchCaie(q.toUpperCase());
    }
  }, [params]);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['verifyCertificate', searchCaie],
    queryFn: async () => (await api.get(`/certificates/verify/${searchCaie}`)).data.data as VerifyResult,
    enabled: !!searchCaie,
    retry: false,
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim().toUpperCase();
    if (v) {
      setSearchCaie(v);
      setParams({ caie: v });
    }
  };

  const cert = data?.certificate;

  return (
    <div>
      <PageHeader
        eyebrow="Verify"
        title="Verify a Certificate"
        description="Enter the unique CAIE number printed on your certificate to confirm its authenticity."
      />

      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleVerify} className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
            <label htmlFor="caie" className="mb-2 block text-sm font-medium text-slate-700">
              CAIE Number
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-grow">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="caie"
                  value={input}
                  onChange={(e) => setInput(e.target.value.toUpperCase())}
                  placeholder="CAIE-XXXX-XXXX"
                  className="h-12 w-full rounded-md border border-slate-200 py-3.5 pl-11 pr-4 font-medium tracking-wide focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <button
                type="submit"
                disabled={isFetching || !input.trim()}
                className="inline-flex h-12 min-w-[130px] items-center justify-center gap-2 rounded-md bg-brand px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
              >
                {isFetching ? <Spinner className="h-5 w-5" /> : 'Verify'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {isFetching && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-12 text-center"
                >
                  <div className="relative mb-5 h-14 w-14">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-brand border-t-transparent" />
                    <Search className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-brand" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-ink">Verifying…</h3>
                  <p className="mt-1 text-sm text-slate-500">Checking {searchCaie}</p>
                </motion.div>
              )}

              {!isFetching && isSuccess && cert && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-xl border border-brand/30 bg-white shadow-card"
                >
                  <div className="flex items-center gap-4 border-b border-brand/20 bg-brand/5 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-lg font-bold text-brand-dark">Verified Certificate</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                          <ShieldCheck className="h-3 w-3" /> Authentic
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">Officially issued by TISS Incube Foundation.</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Candidate</dt>
                        <dd className="mt-1 font-heading text-lg font-bold text-ink">{cert.candidateName}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Certificate ID</dt>
                        <dd className="mt-1 font-mono text-base text-slate-700">{cert.caieNumber}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Course / Programme</dt>
                        <dd className="mt-1 text-base font-semibold text-slate-800">{cert.courseName}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Issue Date</dt>
                        <dd className="mt-1 text-slate-700">
                          {new Date(cert.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </dd>
                      </div>
                    </dl>
                    {cert.certificateFileUrl && (
                      <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                        <a href={fileUrl(cert.certificateFileUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 px-5 text-sm font-semibold text-ink hover:bg-slate-50">
                          <FileText className="h-4 w-4" /> View original
                        </a>
                        <a href={fileUrl(cert.certificateFileUrl)} download className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-light">
                          <Download className="h-4 w-4" /> Download
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {!isFetching && isError && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-100 bg-white p-10 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <XCircle className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink">Certificate Not Found</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
                    We could not find a certificate matching this CAIE number. Please check the number and try again.
                  </p>
                  <button
                    onClick={() => { setSearchCaie(''); setInput(''); setParams({}); }}
                    className="mt-5 text-sm font-medium text-brand-dark underline underline-offset-4"
                  >
                    Clear and try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Certificates;
