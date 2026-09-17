import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { api, fileUrl } from '../lib/api';
import { SkeletonCard } from './ui/Primitives';

interface BoardMember {
  id: string;
  name: string;
  designation: string;
  bio?: string | null;
  imageUrl?: string | null;
}

// Static board of directors, used when the API returns none.
const FALLBACK: BoardMember[] = [
  {
    id: 'majumdar',
    name: 'Prof. Satyajit Majumdar',
    designation: 'Managing Director',
    imageUrl: null,
    bio: 'Ex-Professor and Dean of the School of Management and Labour Studies, Tata Institute of Social Sciences, Mumbai, and Managing Director of TIF. With more than 40 years of cumulative experience across corporate and academics, he is the driving force behind TIF.',
  },
  {
    id: 'sathe',
    name: 'Dr. Madhav Sathe',
    designation: 'Director',
    imageUrl: null,
    bio: 'A practicing anaesthesiologist with over 40 years of experience, currently Joint Honorary Secretary of the Bombay Mothers and Children Welfare Society (BMCWS). Visiting faculty at TISS Mumbai and the University of Mumbai.',
  },
  {
    id: 'vipin',
    name: 'Dr. Vipin Kumar',
    designation: 'Director',
    imageUrl: null,
    bio: 'Former Chief Scientist of the National Innovation Foundation – India, with deep experience in grassroots innovation and social entrepreneurship.',
  },
  {
    id: 'singh',
    name: 'Dr. Archana Singh',
    designation: 'Director',
    imageUrl: null,
    bio: 'Assistant Professor at the Tata Institute of Social Sciences, Mumbai, and an expert in social entrepreneurship.',
  },
];

// Local photos for known board members when the API has no imageUrl.
const LOCAL_PHOTOS: Record<string, string> = {
  'prof. satyajit majumdar': '/team/majumdar.jpg',
  'dr. madhav sathe': '/team/sathe.jpg',
  'dr. archana singh': '/team/singh.jpg',
  'dr. vipin kumar': '/team/vipin.jpg',
  'sujay dixit': '/team/dixit.jpg',
};

function photoFor(m: BoardMember): string | null {
  if (m.imageUrl) return fileUrl(m.imageUrl);
  return LOCAL_PHOTOS[m.name.trim().toLowerCase()] ?? null;
}

function initials(name: string) {
  return name
    .replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const BoardGrid = ({ limit }: { limit?: number }) => {
  const [selected, setSelected] = useState<BoardMember | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['boardMembers'],
    queryFn: async () => {
      const res = await api.get('/board-members');
      return res.data.data as BoardMember[];
    },
  });

  const source = data && data.length > 0 ? data : FALLBACK;
  const members = limit ? source.slice(0, limit) : source;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m, i) => (
          <motion.button
            key={m.id}
            type="button"
            onClick={() => setSelected(m)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
          >
            <div className="flex h-64 w-full shrink-0 items-center justify-center overflow-hidden bg-surface-muted">
              {photoFor(m) ? (
                <img
                  src={photoFor(m)!}
                  alt={m.name}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <span className="font-heading text-4xl font-bold text-brand/70">{initials(m.name)}</span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-base font-semibold text-ink">{m.name}</h3>
              <p className="mt-0.5 text-sm text-brand-dark">{m.designation}</p>
              {m.bio && (
                <span className="mt-3 text-xs font-semibold text-slate-400 group-hover:text-brand-dark">
                  View profile →
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 sm:p-8"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted">
                  {photoFor(selected) ? (
                    <img src={photoFor(selected)!} alt={selected.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    <span className="font-heading text-xl font-bold text-brand/70">{initials(selected.name)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-ink">{selected.name}</h3>
                  <p className="text-sm text-brand-dark">{selected.designation}</p>
                </div>
              </div>
              {selected.bio ? (
                <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-slate-600">{selected.bio}</p>
              ) : (
                <p className="mt-5 text-sm italic text-slate-400">Biography coming soon.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BoardGrid;
