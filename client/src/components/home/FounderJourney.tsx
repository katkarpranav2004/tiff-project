import { motion } from 'framer-motion';
import { Lightbulb, Compass, Rocket, Users, TrendingUp, Award } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Primitives';

const stages = [
  { icon: Lightbulb, title: 'Idea', desc: 'A problem worth solving.' },
  { icon: Compass, title: 'Discovery', desc: 'Validate and refine.' },
  { icon: Rocket, title: 'Incubation', desc: 'Structured support.' },
  { icon: Users, title: 'Mentorship', desc: 'Guidance from experts.' },
  { icon: TrendingUp, title: 'Growth', desc: 'Scale the venture.' },
  { icon: Award, title: 'Impact', desc: 'Sustainable outcomes.' },
];

const FounderJourney = () => {
  return (
    <Section tone="navy">
      <SectionHeading
        onDark
        align="center"
        eyebrow="The founder journey"
        title="From a first idea to lasting impact."
        description="Every venture we support moves through a clear, supported path — never alone."
      />

      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/15 md:block" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
          {stages.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-navy-light text-brand-secondary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-white/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FounderJourney;
