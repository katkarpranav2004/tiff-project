import { motion } from 'framer-motion';

interface Logo {
  src: string;
  name: string;
}

interface Person {
  name: string;
  role: string;
  detail: string;
  photo: string;
  logos: Logo[];
}

const LEADERSHIP: Person[] = [
  {
    name: 'Prof. Satyajit Majumdar',
    role: 'Managing Director, TIF',
    detail: 'Ex-Professor & Dean, School of Management and Labour Studies, Tata Institute of Social Sciences, Mumbai.',
    photo: '/team/majumdar.jpg',
    logos: [
      { src: '/leadership/tiss.png', name: 'Tata Institute of Social Sciences' },
      { src: '/leadership/coal-india.png', name: 'Coal India' },
      { src: '/leadership/isi.png', name: 'Indian Statistical Institute' },
      { src: '/leadership/tapmi.png', name: 'TAPMI' },
      { src: '/leadership/sgsits.png', name: 'SGSITS Indore' },
      { src: '/leadership/bits-pilani.png', name: 'BITS Pilani' },
    ],
  },
  {
    name: 'Sujay Dixit',
    role: 'CEO, TIF',
    detail: 'Ex-Unilever, Glenmark Pharma, Hindustan Coca-Cola Beverages Pvt Ltd., Celio.',
    photo: '/team/dixit.jpg',
    logos: [
      { src: '/leadership/tiss.png', name: 'Tata Institute of Social Sciences' },
      { src: '/leadership/unilever.png', name: 'Unilever' },
      { src: '/leadership/glenmark.png', name: 'Glenmark Pharmaceuticals' },
      { src: '/leadership/hindustan-coca-cola.png', name: 'Hindustan Coca-Cola Beverages' },
      { src: '/leadership/celio.png', name: 'Celio' },
      { src: '/leadership/acc.png', name: 'ACC' },
      { src: '/leadership/xlri.png', name: 'XLRI Xavier School of Management' },
      { src: '/leadership/nmims.png', name: 'NMIMS' },
    ],
  },
];

const BOARD: Person[] = [
  {
    name: 'Dr. Vipin Kumar',
    role: 'Board of Directors',
    detail: 'Chief Scientist, National Innovation Foundation – India.',
    photo: '/team/vipin.jpg',
    logos: [
      { src: '/leadership/nif.png', name: 'National Innovation Foundation' },
      { src: '/leadership/dst.png', name: 'Department of Science & Technology' },
      { src: '/leadership/iit-delhi.png', name: 'IIT Delhi' },
    ],
  },
  {
    name: 'Dr. Madhav Sathe',
    role: 'Board of Directors',
    detail: 'Anaesthesiologist — Bombay Hospital & Breach Candy Hospital · Secretary, BMCWS · Visiting Faculty, TISS Mumbai & University of Mumbai.',
    photo: '/team/sathe.jpg',
    logos: [
      { src: '/leadership/bombay-hospital.png', name: 'Bombay Hospital' },
      { src: '/leadership/breach-candy.png', name: 'Breach Candy Hospital Trust' },
      { src: '/leadership/bmcws.png', name: 'Bombay Mothers and Children Welfare Society' },
      { src: '/leadership/tiss.png', name: 'Tata Institute of Social Sciences' },
      { src: '/leadership/mumbai-university.png', name: 'University of Mumbai' },
    ],
  },
  {
    name: 'Dr. Archana Singh',
    role: 'Board of Directors',
    detail: 'Assistant Professor, Tata Institute of Social Sciences, Mumbai.',
    photo: '/team/singh.jpg',
    logos: [{ src: '/leadership/tiss.png', name: 'Tata Institute of Social Sciences' }],
  },
];

function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <div className="mt-5 border-t border-subtle-border pt-5">
      <p className="mb-3 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-slate/70">
        Associated With
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {logos.map((logo) => (
          <div
            key={logo.name}
            title={logo.name}
            className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl border border-subtle-border bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ochre-gold/50 hover:shadow-md"
          >
            <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderCard({ person, index }: { person: Person; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="grid grid-cols-1 gap-6 rounded-3xl border border-subtle-border bg-white p-6 shadow-card sm:grid-cols-[200px_1fr] sm:gap-8 sm:p-8"
    >
      <div className="mx-auto aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-2xl border border-subtle-border bg-warm-alabaster shadow-sm sm:mx-0">
        <img src={person.photo} alt={person.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="inline-block w-fit rounded-full bg-foundation-green px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-warm-ivory">
          {person.role}
        </span>
        <h3 className="mt-4 font-serif text-2xl font-bold text-foundation-dark sm:text-[28px]">{person.name}</h3>
        <div className="mt-2 h-0.5 w-10 bg-ochre-gold" />
        <p className="mt-4 text-sm leading-relaxed text-stone-slate font-sans">{person.detail}</p>
        <LogoRow logos={person.logos} />
      </div>
    </motion.div>
  );
}

function BoardCard({ person, index }: { person: Person; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center rounded-3xl border border-subtle-border bg-white p-7 text-center shadow-card"
    >
      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-ochre-gold/40 shadow-sm ring-4 ring-warm-alabaster">
        <img src={person.photo} alt={person.name} className="h-full w-full object-cover" />
      </div>
      <span className="mt-5 inline-block rounded-full bg-parchment px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-foundation-green">
        {person.role}
      </span>
      <h3 className="mt-3 font-serif text-xl font-bold text-foundation-dark">{person.name}</h3>
      <div className="mt-2 h-0.5 w-8 bg-ochre-gold" />
      <p className="mt-4 text-sm leading-relaxed text-stone-slate font-sans">{person.detail}</p>
      <LogoRow logos={person.logos} />
    </motion.div>
  );
}

const LeadershipTeam = () => {
  return (
    <section className="w-full border-b border-subtle-border bg-warm-ivory py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">Democratic Governance</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foundation-dark sm:text-4xl">
            Leadership Team &amp; Board of Directors
          </h2>
        </div>

        {/* Leadership Team */}
        <div className="mb-6 flex items-center gap-3">
          <h3 className="font-serif text-xl font-bold text-foundation-dark sm:text-2xl">Leadership Team</h3>
          <div className="h-px flex-1 bg-subtle-border" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {LEADERSHIP.map((person, i) => (
            <LeaderCard key={person.name} person={person} index={i} />
          ))}
        </div>

        {/* Board of Directors */}
        <div className="mb-6 mt-16 flex items-center gap-3">
          <h3 className="font-serif text-xl font-bold text-foundation-dark sm:text-2xl">Board of Directors</h3>
          <div className="h-px flex-1 bg-subtle-border" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOARD.map((person, i) => (
            <BoardCard key={person.name} person={person} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
