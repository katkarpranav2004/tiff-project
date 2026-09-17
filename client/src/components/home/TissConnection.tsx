import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Primitives';

const TissConnection = () => {
  return (
    <Section tone="default">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Academic foundation"
          title="A strong academic foundation behind entrepreneurial action."
          description="The Tata Institute of Social Sciences is a Deemed University with more than 80 years of teaching, research and outreach in rural and community development. That depth in policy, advocacy and social change is the bedrock TISS Incube Foundation builds on."
        />

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex h-36 w-36 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-surface-alt p-4 text-center sm:h-44 sm:w-44"
          >
            <span className="font-heading text-3xl font-bold text-ink sm:text-4xl">TISS</span>
            <span className="mt-2 text-xs text-slate-500">Tata Institute of Social Sciences</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white"
          >
            <Plus className="h-6 w-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex h-36 w-36 flex-col items-center justify-center rounded-2xl border border-brand/30 bg-brand/5 p-4 text-center sm:h-44 sm:w-44"
          >
            <span className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">Incube</span>
            <span className="mt-2 text-xs text-slate-500">TISS Incube Foundation</span>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default TissConnection;
