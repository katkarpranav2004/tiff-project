import { motion } from 'framer-motion';
import {
  Rocket,
  HandCoins,
  GraduationCap,
  ClipboardList,
  BarChart3,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';

const scope = [
  { icon: Rocket, title: 'Self-designed incubation', desc: 'Incubation programmes with or without seed funding.' },
  { icon: HandCoins, title: 'Externally funded support', desc: 'Externally funded incubation support programmes.' },
  { icon: GraduationCap, title: 'Entrepreneurship training', desc: 'Training on entrepreneurship and related areas.' },
  { icon: ClipboardList, title: 'Field assignments', desc: 'Field-based assignments in impact assessment, CSR and more.' },
  { icon: BarChart3, title: 'Impact assessment', desc: 'Measuring outcomes and social impact of interventions.' },
  { icon: HeartHandshake, title: 'CSR & sponsored programmes', desc: 'External sponsored programmes in CSR and related areas.' },
];

const AboutPreview = () => {
  return (
    <Section tone="alt">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="About the Foundation"
            title="A Section 8 company built for rural and social innovation."
            description="TISS Incube Foundation is an independent Section 8 company jointly set up by the Tata Institute of Social Sciences (TISS) and the Bombay Mothers and Children Welfare Society (BMCWS), with its registered office in Rajgurunagar, Pune and operating offices at the TISS and BMCWS campuses in Mumbai."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/about">Learn more about us</Button>
            <Button to="/incubatees" variant="secondary">
              Meet our incubatees
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
            <Sparkles className="h-4 w-4" /> Scope of operation
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {scope.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-dark">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutPreview;
