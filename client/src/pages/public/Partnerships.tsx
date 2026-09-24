import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';
import { Section, SectionHeading } from '../../components/ui/Primitives';

interface LogoPartner {
  src: string;
  name: string;
  description: string;
}

interface AcademicPartner {
  name: string;
  place: string;
  description: string;
}

interface FieldPartnership {
  year: string;
  title: string;
  place?: string;
  description: string;
  logo?: string;
}

const INSTITUTIONAL_PARTNERS: LogoPartner[] = [
  {
    src: '/partners/british-council.png',
    name: 'British Council',
    description:
      "The UK's international organisation for cultural relations and educational opportunities. Partnered with TIF on a Certificate Programme in Technology-Based Social Entrepreneurship (2023), training women in tribal districts of West Bengal and Maharashtra.",
  },
  {
    src: '/partners/british-high-commission.png',
    name: 'British High Commission, New Delhi',
    description:
      "The United Kingdom's diplomatic mission in India, part of TIF's international institutional network supporting cross-border knowledge exchange.",
  },
  {
    src: '/partners/unctad.png',
    name: 'UN UNCTAD',
    description: "The United Nations Conference on Trade and Development — part of TIF's global network of institutional partners and funders.",
  },
  {
    src: '/partners/unesco.png',
    name: 'UNESCO',
    description: "The United Nations Educational, Scientific and Cultural Organization — part of TIF's global network of institutional partners and funders.",
  },
  {
    src: '/partners/birac.png',
    name: 'BIRAC',
    description:
      'Biotechnology Industry Research Assistance Council, Government of India. Official Knowledge Partner to the SPARSH SIIP Programme (2018), later scaled to support 70 tech innovators across two cohorts (2019).',
  },
  {
    src: '/partners/dst.png',
    name: 'Department of Science & Technology',
    description: 'Government of India department behind several national innovation and entrepreneurship initiatives TIF has partnered with, including the National Innovation Foundation.',
  },
  {
    src: '/partners/dbt.png',
    name: 'Department of Biotechnology',
    description: 'Government of India department and institutional partner supporting biotechnology-linked incubation and innovation work.',
  },
  {
    src: '/partners/msde.png',
    name: 'Ministry of Skill Development & Entrepreneurship',
    description: 'Lead Partner for the National Entrepreneurship Award (2017), which TIF helped organise and administer with a managed budget of ₹3 crore.',
  },
];

const ACADEMIC_PARTNERS: AcademicPartner[] = [
  { name: 'University of Strathclyde', place: 'Glasgow, United Kingdom', description: "Institutional partner in TIF's international academic network." },
  { name: 'Kennesaw State University', place: 'Georgia, United States', description: "Institutional partner in TIF's international academic network." },
  { name: "King's College", place: 'Kathmandu, Nepal', description: "Institutional partner in TIF's international academic network." },
  { name: 'University of Colombia', place: 'Colombia', description: "Institutional partner in TIF's international academic network." },
  { name: 'Omsk Incubation Center', place: 'Siberia Region, Russian Federation', description: "Institutional partner in TIF's international academic network." },
];

const FIELD_PARTNERSHIPS: FieldPartnership[] = [
  // Entries with a matching logo asset are listed first.
  { year: '2017', title: 'National Entrepreneurship Award', place: 'with Ministry of Skill Development & Entrepreneurship', description: 'Led the award process nationally, streamlined its administration and managed a budget of ₹3 crore.', logo: '/partners/msde.png' },
  { year: '2019', title: 'SGSITS Incubation Forum', description: 'Joint programme design, idea conceptualisation and mentoring of the core team.', logo: '/leadership/sgsits.png' },
  { year: '2023', title: 'Grassroot to Global: NIF', description: 'Brought budding entrepreneurs and National Innovation Foundation innovators together for mentoring and business development.', logo: '/leadership/nif.png' },
  // Remaining programme and district partnerships, chronological.
  { year: '2012', title: 'DBS', description: 'Supported 41 enterprises with 36 months of mentoring and funding support; managed total funds of ₹5 crore.' },
  { year: '2012', title: 'SRREOSHI', place: 'Durgapur', description: 'Incubating the incubator — training and mentoring focused on marginalised tribal women entrepreneurs.' },
  { year: '2014', title: 'Shivganga Samgra Grameen Vikas Parishad', place: 'Jhabua', description: 'Entrepreneurship as a means of social reform, leading to Jhabua Naturals (organic produce) and Jhabua Craft (bamboo artefacts).' },
  { year: '2014', title: 'Small Business Support Programme', place: 'Kathmandu & Janakpur, Nepal', description: 'Capacity building of NGO partners; training and mentoring young entrepreneurs running micro-enterprises.' },
  { year: '2016', title: 'Small Business Support Programme', place: 'Kashmir Valley', description: 'Training and mentoring young, marginalised entrepreneurs — supporting 100+ micro-enterprises.' },
  { year: '2017', title: 'Impact Assessment Study: BORL', place: 'Bina region', description: 'Studied BORL’s CSR initiatives across 22 villages, informing a strategic CSR framework for future action.' },
  { year: '2019–20', title: 'Government of Arunachal Pradesh', description: 'Programme design support, mentoring and incubation calls in partnership with the state government.' },
  { year: '2020', title: 'Impact Assessment Study: NCST', description: 'Assessed the effectiveness of a government initiative during COVID in tribal districts of Madhya Pradesh, Chhattisgarh and Maharashtra.' },
  { year: '2020', title: 'PMVDY-ESDP', place: 'Maharashtra', description: 'Training and mentoring of the tribal population, and mentoring VDVKs for enterprise creation.' },
  { year: '2021', title: 'Samanvay Mandapam', place: 'Bina', description: 'Agri-entrepreneurship programme for rural youth, formalising agri-related occupations into professions.' },
  { year: '2021', title: 'Knowledge Partner: THINK-B', place: 'Jagdalpur, Bastar', description: 'District Administration partnership supporting 20+ enterprises and Bastar’s first Entrepreneurship Conclave.' },
  { year: '2021', title: 'Nidhi Accelerator: Maker Village', place: 'Kerala', description: 'Knowledge partner supporting 15 enterprises with venture planning, marketing and investment-pitch workshops.' },
  { year: '2022', title: 'Transformation Fellowship Programme', description: 'Supported 14 transgender youth through academic learning, professional development and career readiness.' },
  { year: '2024', title: 'District Incubation Hub', place: 'Durg', description: 'With the District Administration of Durg — 50+ enterprises incubated, anchoring the region’s entrepreneurship ecosystem.' },
];

const Partnerships = () => {
  return (
    <div>
      <PageHeader
        eyebrow="Partnerships"
        title="Our Partners & Funders"
        description="A national and global network of institutions, government bodies, universities and district administrations that TIF has worked alongside since 2012."
      />

      <Section tone="default">
        <SectionHeading
          eyebrow="Industry & Innovation"
          title="TIF × Azisly.ai — Advancing AI-enabled entrepreneurship education"
          description="A new partnership bringing applied AI into TIF's entrepreneurship education."
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-10 max-w-xl overflow-hidden rounded-2xl border border-slate-200 shadow-md"
        >
          <img
            src="/partnerships/azisly-mou-signing.png"
            alt="TIF and Azisly.ai signing the MoU"
            className="h-auto w-full object-contain"
            loading="lazy"
          />
        </motion.div>
        <div className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">Gurugram, Haryana · 2025</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            TISS Incube Foundation (TIF) has entered into an MoU with Azisly.ai to launch an online course on
            entrepreneurship and the applied use of AI for young graduates and professionals. The partnership pairs
            TIF's decade of grassroots entrepreneurship experience — having trained and mentored 400+ enterprises as
            an incubation centre under TISS Mumbai's Centre for Social Entrepreneurship — with Azisly.ai's
            AI-enabled, industry-relevant approach to learning and employability. It marks a new step for TIF
            Gurukul, extending credible entrepreneurship education beyond institutional boundaries.
          </p>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="Institutional & Government"
          title="National & Global Network"
          description="Organisations whose logos appear across TIF's programmes and public communications."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INSTITUTIONAL_PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <div className="flex h-16 items-center justify-center">
                <img src={p.src} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
              <h3 className="mt-4 font-heading text-sm font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="default">
        <SectionHeading
          eyebrow="Academic Network"
          title="International Institutional Partners"
          description="Universities and incubation centres abroad that TIF is connected to."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMIC_PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <h3 className="font-heading text-base font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">{p.place}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="On the Ground"
          title="State & District Partnerships"
          description="A chronology of programme, government and district-level partnerships since 2012."
        />
        <div className="mt-10 space-y-4">
          {FIELD_PARTNERSHIPS.map((f, i) => (
            <motion.div
              key={`${f.year}-${f.title}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-start sm:gap-6"
            >
              <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-2">
                {f.logo && (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5">
                    <img src={f.logo} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                )}
                <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
                  {f.year}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-ink">
                  {f.title}
                  {f.place && <span className="font-normal text-slate-500"> — {f.place}</span>}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Partnerships;
