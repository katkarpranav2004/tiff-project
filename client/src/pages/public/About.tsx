import { Building2, Target, Users2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import BoardGrid from '../../components/BoardGrid';
import CountUp from '../../components/CountUp';
import { Section, SectionHeading } from '../../components/ui/Primitives';

const scope = [
  'Self-designed incubation programme with or without seed fund',
  'External funded incubation support programmes',
  'Training on entrepreneurship and related areas',
  'Field-based assignments in areas like Impact Assessment, CSR etc.',
  'External sponsored programmes in related areas like CSR and impact assessment',
];

const About = () => {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="About TISS Incube Foundation"
        description="An independent non-profit company driving inclusive innovation and entrepreneurship, with a focus on rural and difficult areas."
      />

      <Section tone="default">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="space-y-5 text-base leading-relaxed text-slate-700">
              <p>
                TISS Incube Foundation is an independent non-profit entity jointly
                set up by the Tata Institute of Social Sciences (TISS) and the Bombay Mothers and
                Children Welfare Society (BMCWS), with its registered office at Rajgurunagar
                (District Pune, Maharashtra) and operating offices in Mumbai at the TISS and
                BMCWS campuses.
              </p>
              <p>
                The Incubation Centre focuses on rural and difficult areas, undertaking projects
                across self-designed and externally funded incubation programmes, entrepreneurship
                training, field-based assignments, impact assessment and CSR-related work.
              </p>
            </div>

            <h3 className="mt-10 font-heading text-xl font-semibold text-ink">Scope of operation</h3>
            <ul className="mt-4 space-y-3">
              {scope.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            {[
              { icon: Building2, label: 'Structure', value: 'Non-Profit Company (TISS + BMCWS)' },
              { icon: Target, label: 'Focus', value: 'Rural & difficult areas, social impact' },
              { icon: Users2, label: 'Backed by', value: '80+ years of TISS research' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-surface-alt p-5">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-dark">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{item.label}</p>
                <p className="mt-1 font-medium text-ink"><CountUp>{item.value}</CountUp></p>
              </div>
            ))}
          </aside>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="Our impact"
          title="Reach across our portfolio."
          description="Latest available figures for the ventures we support. Several values are estimates."
        />

        {/* Headline banner */}
        <div className="mt-10 flex flex-col gap-8 rounded-2xl bg-foundation-dark p-8 text-warm-ivory sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-green">Estimated cumulative lives impacted</p>
            <p className="mt-2 font-serif text-5xl font-bold leading-none sm:text-6xl"><CountUp>10M+</CountUp></p>
            <p className="mt-2 text-sm text-warm-sand/70"><CountUp>1,02,51,000</CountUp> lives reached across the portfolio.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-8">
            {[
              ['400+', 'Founders'],
              ['400', 'Enterprises'],
              ['1.6L', 'Value-chain partners'],
            ].map(([n, l]) => (
              <div key={l} className="text-center sm:text-right">
                <p className="font-serif text-2xl font-bold text-ochre-light sm:text-3xl"><CountUp>{n}</CountUp></p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-warm-sand/60">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact layers */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-subtle-border bg-white shadow-card">
          <div className="flex items-center justify-between bg-foundation-green px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-warm-ivory">
            <span>Impact layer</span>
            <span>Estimate</span>
          </div>
          <div className="divide-y divide-subtle-border">
            {[
              ['Entrepreneurs / founders', '400+'],
              ['Immediate families of entrepreneurs', '1,200–2,000'],
              ['Employees / workers of supported enterprises', '2,000–4,000'],
              ['Employee families & dependents', '10,000–20,000'],
              ['Suppliers, producers, artisans, farmers & value-chain partners', '80,000–1,60,000'],
              ['Customers / community members directly reached*', '1,00,67,000'],
            ].map(([layer, est]) => (
              <div key={layer} className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-parchment">
                <span className="flex items-center gap-3 text-sm text-stone-slate">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {layer}
                </span>
                <span className="shrink-0 font-mono text-sm font-semibold text-foundation-dark"><CountUp>{est}</CountUp></span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 bg-foundation-green/10 px-5 py-4">
              <span className="font-serif text-base font-bold text-foundation-dark">Estimated cumulative lives impacted</span>
              <span className="shrink-0 font-mono text-base font-bold text-foundation-green"><CountUp>1,02,51,000</CountUp> <span className="text-stone-slate">(&gt;10M)</span></span>
            </div>
          </div>
        </div>

        {/* Tier breakdown */}
        <h3 className="mt-12 font-heading text-xl font-semibold text-ink">Portfolio by enterprise tier</h3>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-subtle-border bg-white shadow-card">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="bg-foundation-green font-mono text-[11px] uppercase tracking-wider text-warm-ivory">
                <th className="px-5 py-3 font-bold">Enterprise tier</th>
                <th className="px-5 py-3 font-bold">Split</th>
                <th className="px-5 py-3 font-bold text-right">Count</th>
                <th className="px-5 py-3 font-bold text-right">Avg. reach / enterprise</th>
                <th className="px-5 py-3 font-bold text-right">Avg. lifespan</th>
                <th className="px-5 py-3 font-bold text-right">Cumulative reach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle-border text-stone-slate">
              {[
                { tier: 'Nano enterprises', pct: 42.11, count: '168', reach: '250', life: '7 years', cum: '294,000' },
                { tier: 'Micro enterprises', pct: 36.84, count: '148', reach: '1,500', life: '7 years', cum: '1,554,000' },
                { tier: 'Small enterprises', pct: 21.05, count: '84', reach: '15,000', life: '7 years', cum: '8,820,000' },
              ].map((r) => (
                <tr key={r.tier} className="transition-colors hover:bg-parchment">
                  <td className="px-5 py-4 font-medium text-foundation-dark">{r.tier}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-warm-sand">
                        <div className="h-full rounded-full bg-brand-green" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="font-mono text-xs"><CountUp>{`${r.pct}%`}</CountUp></span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-mono"><CountUp>{r.count}</CountUp></td>
                  <td className="px-5 py-4 text-right font-mono"><CountUp>{r.reach}</CountUp></td>
                  <td className="px-5 py-4 text-right">{r.life}</td>
                  <td className="px-5 py-4 text-right font-mono font-semibold text-foundation-dark"><CountUp>{r.cum}</CountUp></td>
                </tr>
              ))}
              <tr className="bg-foundation-green/10 font-semibold text-foundation-dark">
                <td className="px-5 py-4 font-serif">Total portfolio</td>
                <td className="px-5 py-4 font-mono"><CountUp>100%</CountUp></td>
                <td className="px-5 py-4 text-right font-mono"><CountUp>400</CountUp></td>
                <td className="px-5 py-4 text-right">—</td>
                <td className="px-5 py-4 text-right">—</td>
                <td className="px-5 py-4 text-right font-mono text-foundation-green"><CountUp>~10.67M</CountUp></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-stone-slate">
          * Estimated impact reach of customers / users / community members directly reached by enterprises.
        </p>
      </Section>

      <Section tone="default">
        <SectionHeading
          eyebrow="The TISS connection"
          title="Rooted in a Deemed University with more than 80 years of impact."
          description="The Tata Institute of Social Sciences was set up under the UGC Act, 1956. It plays a critical role in policy design, advocacy and action across social welfare and rural development — the foundation on which TISS Incube builds entrepreneurial action."
        />
      </Section>

      <Section tone="default">
        <SectionHeading
          align="center"
          eyebrow="Leadership"
          title="Our Board of Directors"
          description="Click any profile to read their full biography."
        />
        <div className="mt-12">
          <BoardGrid />
        </div>
      </Section>
    </div>
  );
};

export default About;
