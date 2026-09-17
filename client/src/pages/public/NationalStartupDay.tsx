import { Rocket, Users, Lightbulb, ArrowUpRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Section, SectionHeading } from '../../components/ui/Primitives';
import { APPLY_URL } from '../../lib/site';

const highlights = [
  { icon: Lightbulb, title: 'Ideas on stage', desc: 'Founders and student innovators share the problems they are solving.' },
  { icon: Users, title: 'Mentors & ecosystem', desc: 'Conversations with mentors, partners and the wider startup community.' },
  { icon: Rocket, title: 'Launch momentum', desc: 'A moment to celebrate entrepreneurship and spark new ventures.' },
];

const NationalStartupDay = () => {
  return (
    <div>
      <PageHeader
        eyebrow="Incube in Action"
        title="National Startup Day"
        description="India celebrates National Startup Day on 16 January. TISS Incube Foundation marks the occasion by bringing together founders, mentors and the community."
      />

      <Section tone="default">
        <SectionHeading
          eyebrow="The celebration"
          title="Celebrating entrepreneurship and innovation."
          description="National Startup Day is our moment to spotlight the ventures, ideas and people driving inclusive innovation across rural and social sectors."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand-dark">
                <h.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-navy">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="max-w-2xl font-heading text-2xl font-bold text-white sm:text-3xl">
            Want to be part of the next celebration?
          </h2>
          <p className="max-w-xl text-white/70">Apply to the incubation programme and join the community.</p>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-1.5 rounded-md bg-brand px-7 font-semibold text-white hover:bg-brand-dark">
            Apply Now <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default NationalStartupDay;
