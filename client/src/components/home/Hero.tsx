import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, GraduationCap, Landmark, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APPLY_URL } from '../../lib/site';

const InnovationNetwork = () => {
  const nodes = [
    { cx: 60, cy: 70 }, { cx: 190, cy: 40 }, { cx: 300, cy: 110 },
    { cx: 120, cy: 190 }, { cx: 250, cy: 220 }, { cx: 340, cy: 300 },
    { cx: 70, cy: 300 }, { cx: 200, cy: 330 }, { cx: 310, cy: 180 },
  ];
  const links = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [3, 6], [6, 7], [7, 4], [2, 8], [8, 5], [1, 3]];
  return (
    <svg viewBox="0 0 400 380" className="h-full w-full" fill="none" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke="#CBB279" strokeOpacity="0.4" strokeWidth="1" />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={i % 3 === 0 ? 6 : 4}
          fill={i % 3 === 0 ? '#CBB279' : '#DFC99E'}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
};

const seals = [
  { icon: GraduationCap, big: '80+ Years', label: 'Academic rigour (TISS)' },
  { icon: Landmark, big: 'Section 8', label: 'Registered non-profit' },
  { icon: Users2, big: 'TISS × BMCWS', label: 'Founding partnership' },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-surface-muted bg-surface pt-32 pb-16 md:pt-36 md:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md border border-gold/30 bg-surface-alt px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand">
              Tata Institute of Social Sciences × BMCWS
            </span>
            <span className="text-gold">/</span>
            <span className="font-heading text-[13px] italic tracking-wide text-ink/60">Section 8 Entity</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-heading text-5xl font-normal leading-[1.05] tracking-tight text-brand-dark sm:text-6xl md:text-[64px]"
          >
            Empowering startups for the{' '}
            <span className="italic font-medium text-brand underline decoration-gold decoration-1 underline-offset-8">
              next wave
            </span>{' '}
            of innovation.
          </motion.h1>

          <p className="mt-6 max-w-xl font-heading text-xl leading-relaxed text-ink/60 sm:text-2xl">
            An independent Section 8 company helping entrepreneurs transform ideas into meaningful,
            scalable ventures — through incubation, mentorship and training, backed by TISS.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-gold/40 bg-brand px-7 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-dark"
            >
              Apply for Incubation <ArrowUpRight className="h-4 w-4 text-gold" />
            </a>
            <Link
              to="/certificates"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-surface-muted bg-white px-6 text-[13px] font-semibold uppercase tracking-wider text-brand-dark transition-colors hover:border-gold hover:bg-surface-alt"
            >
              <ShieldCheck className="h-4 w-4 text-gold-mute" /> Verify CAIE Certificate
            </Link>
          </div>

          {/* Verified seals — facts only, no invented metrics */}
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-surface-muted pt-6 sm:grid-cols-3">
            {seals.map((s) => (
              <div key={s.big} className="flex items-center gap-3 rounded-md border border-surface-muted bg-white p-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-surface-muted bg-surface-alt text-brand">
                  <s.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-heading text-lg font-bold leading-none text-brand-dark">{s.big}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-wider text-ink/50">{s.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto aspect-square max-w-md rounded-md border border-surface-muted bg-white p-3 shadow-card"
          >
            <div className="relative h-full w-full rounded-md border border-brand/10 bg-surface-alt p-6">
              <InnovationNetwork />
              <div className="absolute bottom-6 left-6 right-6 rounded-md border border-surface-muted bg-white p-4">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold-mute">The ecosystem</p>
                <p className="mt-1 font-heading text-[15px] italic text-ink/70">
                  Founders, mentors, investors and community — connected through TISS Incube.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
