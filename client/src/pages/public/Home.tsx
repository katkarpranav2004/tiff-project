
import { Link, useNavigate } from 'react-router-dom';
import LeadershipTeam from '../../components/LeadershipTeam';
import CollapsingCards from '../../components/CollapsingCards';
import CountUp from '../../components/CountUp';
import WorldMapExplorer from '../../components/home/WorldMapExplorer';
import RotatingPartners from '../../components/home/RotatingPartners';
import VantaGlobeBackground from '../../components/home/VantaGlobeBackground';
import HeroLightSweep from '../../components/home/HeroLightSweep';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      
{/**/}
<section className="relative w-full border-b border-white/10 overflow-hidden bg-[#23153c]">{/**/}

{/**/}
<div className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 px-6 lg:px-12 overflow-hidden border-b border-white/10">
  <VantaGlobeBackground />
  <HeroLightSweep />
  {/**/}
  <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
    {/**/}
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-warm-ivory tracking-tight leading-[1.1] max-w-4xl">
      Empowering startups for the <span className="italic font-normal text-[#ff6fa3]">next wave of innovations</span>.
    </h1>

    {/**/}
    <p className="text-warm-sand/80 text-base sm:text-lg mt-6 leading-relaxed font-sans max-w-3xl">
      An independent non-profit company jointly established by the <strong className="text-warm-ivory font-semibold">Tata Institute of Social Sciences</strong> and the <strong className="text-warm-ivory font-semibold">Bombay Mothers and Children Welfare Society</strong>, we support rural and social entrepreneurs with incubation, mentorship, and access to resources.
    </p>

    {/**/}
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full">
      <a className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-foundation-green hover:bg-brand-green text-warm-ivory font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all" href="https://docs.google.com/forms/d/e/1FAIpQLSdh6Y12LkpMjNVRetQnPYi8HPBeGmgis8siEsYx5dMCSUPyPA/viewform" rel="noopener noreferrer" target="_blank">
        <span className="material-symbols-outlined text-[18px] text-ochre-light">add_task</span>
        <span className="">Apply for Incubation</span>
      </a>
      <a className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-warm-alabaster border border-transparent text-foundation-dark font-mono text-xs font-semibold uppercase tracking-wider shadow-sm transition-all" href="/certificates">
        <span className="material-symbols-outlined text-[18px] text-brand-green">verified</span>
        <span className="">Verify a Certificate</span>
      </a>
      <a className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-warm-sand/70 hover:text-warm-ivory hover:bg-white/10 font-mono text-xs font-semibold uppercase tracking-wider transition-colors border border-transparent hover:border-white/20" href="/annual-reports">
        <span className="material-symbols-outlined text-[18px]">menu_book</span>
        <span className="">Annual Reports</span>
      </a>
    </div>

    {/**/}
    <div className="w-full max-w-4xl mt-12 pt-8 border-t border-white/10 text-left">
      <WorldMapExplorer />
    </div>

    {/**/}
    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-warm-sand/70">
      <span className="flex items-center gap-1.5 font-medium">
        <span className="w-2 h-2 rounded-full bg-status-verified"></span>
        Focus on rural &amp; difficult areas
      </span>
      <span className="text-white/20 hidden sm:inline">•</span>
      <span className="">Offices in Mumbai &amp; Pune</span>
      <span className="text-white/20 hidden sm:inline">•</span>
      <span className="text-brand-green font-semibold">TISS &amp; BMCWS</span>
    </div>
  </div>
</div></section>
{/**/}
<section className="w-full bg-foundation-dark text-warm-ivory py-10 border-b border-white/10" id="verify">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
{/**/}
<div className="flex items-start gap-4">
<div className="w-14 h-14 rounded-xl border border-brand-green/40 bg-foundation-green flex items-center justify-center shrink-0 text-brand-green shadow-inner">
<span className="material-symbols-outlined text-[30px]">how_to_reg</span>
</div>
<div>
<div className="flex items-center gap-3 flex-wrap">
<h2 className="text-2xl font-serif font-bold text-warm-ivory tracking-wide">Verify a Certificate</h2>
<span className="px-2.5 py-0.5 rounded bg-brand-green/20 text-brand-green text-[10px] font-mono font-bold tracking-widest uppercase border border-brand-green/40">
                CAIE Lookup
              </span>
</div>
<p className="text-xs sm:text-sm text-warm-sand/80 mt-1.5 max-w-xl font-sans">
              Check the authenticity of a certificate issued by TISS Incube Foundation using its CAIE number.
            </p>
</div>
</div>
{/**/}
<form className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto" onSubmit={(e) => {
  e.preventDefault();
  const el = document.getElementById('hero-caie-input') as HTMLInputElement | null;
  const v = el?.value?.trim().toUpperCase();
  if (v) navigate(`/certificates/verify?caie=CAIE-${encodeURIComponent(v)}`);
}}>
<div className="relative w-full sm:w-80">
<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-green text-xs font-mono font-bold">CAIE-</span>
<input className="w-full pl-16 pr-3 py-3 bg-foundation-green/80 border border-white/20 rounded-lg text-xs font-mono text-warm-ivory placeholder-warm-sand/40 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green uppercase tracking-wider" id="hero-caie-input" placeholder="e.g. 2024-8842" required type="text" />
</div>
<button className="w-full sm:w-auto px-5 py-3 rounded-lg bg-brand-green hover:bg-status-verified text-foundation-dark font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 shadow-md" type="submit">
<span className="material-symbols-outlined text-[18px]">search</span>
<span className="">Verify Certificate</span>
</button>
</form>
</div>
{/**/}
<div className="hidden mt-6 pt-5 border-t border-white/10" id="quick-verify-result">
<div className="p-5 bg-foundation-green rounded-xl border border-brand-green/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
<div className="flex items-center gap-3.5">
<div className="w-9 h-9 rounded-full bg-status-verified text-warm-ivory flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">verified</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">Citizen Builder Verified</span>
<span className="text-[10px] bg-black/40 text-warm-sand px-2 py-0.5 rounded font-mono border border-white/10">Registry ID Valid</span>
</div>
<p className="text-xs text-warm-sand mt-0.5 font-sans" id="quick-verify-details">
                Authenticating against TISS Incube Foundation Official Register...
              </p>
</div>
</div>
<button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-warm-sand hover:text-white flex items-center gap-1.5 uppercase tracking-wider transition-colors" >
<span className="material-symbols-outlined text-[16px]">print</span>
<span className="">Print Public Attestation</span>
</button>
</div>
</div>
</div>
</section>
{/**/}
      <RotatingPartners />
{/**/}
      <LeadershipTeam />
{/**/}
<section className="w-full bg-white py-16 border-b border-subtle-border" id="about">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/**/}
<div className="flex items-center justify-between border-b border-subtle-border pb-4 mb-10">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 bg-brand-green rounded-full"></span>
<span className="text-xs font-mono font-bold text-foundation-green tracking-widest uppercase">About the Foundation</span>
</div>
<span className="text-xs font-mono text-stone-slate uppercase tracking-wider">Non-Profit Company • Established 2021</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
{/**/}
<div className="lg:col-span-7 flex flex-col items-start">
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foundation-dark tracking-tight leading-[1.15] mb-6">
            Supporting rural and social entrepreneurs from the ground up.
          </h2>
<p className="text-stone-slate text-sm sm:text-base leading-relaxed mb-4 font-sans">
            The <strong>TISS Incube Foundation</strong> is an independent incubation centre set up as a non-profit company by the <strong>Tata Institute of Social Sciences (TISS)</strong> and the <strong>Bombay Mothers and Children Welfare Society (BMCWS)</strong>.
          </p>
<p className="text-stone-slate text-sm sm:text-base leading-relaxed mb-8 font-sans">
            We support potential rural and social entrepreneurs, with a focus on rural and difficult areas. Founders receive mentorship, networking with industry leaders and investors, business and growth support, and access to resources.
          </p>
{/**/}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
<div className="p-5 rounded-xl bg-parchment border border-subtle-border">
<div className="flex items-center gap-2.5 mb-2 text-foundation-green">
<span className="material-symbols-outlined text-[22px] text-brand-green">supervised_user_circle</span>
<h3 className="text-xs font-mono font-bold uppercase tracking-wider">Expert Mentorship</h3>
</div>
<p className="text-xs text-stone-slate leading-relaxed font-sans">
                Founders get guidance from experienced mentors and a supportive startup community.
              </p>
</div>
<div className="p-5 rounded-xl bg-parchment border border-subtle-border">
<div className="flex items-center gap-2.5 mb-2 text-foundation-green">
<span className="material-symbols-outlined text-[22px] text-brand-green">policy</span>
<h3 className="text-xs font-mono font-bold uppercase tracking-wider">Networks &amp; Resources</h3>
</div>
<p className="text-xs text-stone-slate leading-relaxed font-sans">
                Access to industry leaders, investors, and the resources needed to grow a venture.
              </p>
</div>
</div>
</div>
{/**/}
<div className="lg:col-span-5">
<div className="bg-warm-alabaster p-5 rounded-2xl border border-subtle-border shadow-sm">
<div className="rounded-xl overflow-hidden aspect-[4/3] bg-warm-sand mb-4 relative">
<img alt="Grassroots social workers in open field dialogue" className="w-full h-full object-cover" src="/about-field.jpeg" />
<div className="absolute bottom-3 left-3 bg-foundation-dark/90 text-warm-ivory px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border border-white/20">
                Field Work in Rural Areas
              </div>
</div>
<div className="space-y-1.5 pt-2 border-t border-subtle-border">
<h4 className="text-sm font-serif font-bold text-foundation-dark">
                Rooted in the Field
              </h4>
<p className="text-xs text-stone-slate leading-relaxed font-sans">
                Programmes include field-based assignments in rural and difficult areas, so enterprise models fit real community needs.
              </p>
</div>
</div>
</div>
</div>
</div>
</section>
{/**/}
{/* Events */}
<section className="w-full bg-white py-16 border-b border-subtle-border">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-subtle-border pb-6 mb-8 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
          <span className="text-xs font-mono font-bold text-foundation-green tracking-widest uppercase">Incubation Stories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foundation-dark tracking-tight">Featured Ventures</h2>
      </div>
      <a href="/events" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-foundation-green hover:text-brand-green transition-colors">
        View all events
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
    </div>

    <CollapsingCards
      cards={[
        { number: '01', slug: 'sahayatha-healthcare', image: '/ventures/sahayatha.jpg', title: 'Sahayatha Healthcare', loc: 'Coimbatore', tag: 'HealthTech', logo: false, desc: 'Affordable, community-focused healthcare bringing quality medical services to underserved patients.' },
        { number: '02', slug: 'forschmedx-trachease', image: '/ventures/forschmedx.jpg', title: 'ForschMedX — TrachEase', loc: 'Punjab / Mumbai', tag: 'MedTech', logo: false, desc: 'A medical device venture improving tracheostomy care for patients and clinicians.' },
        { number: '03', slug: 'even-cargo', image: '/ventures/evencargo.jpg', title: 'Even Cargo', loc: 'Delhi', tag: 'Logistics', logo: false, desc: 'India’s first women-only e-commerce logistics company, training women from marginalised communities as delivery professionals.' },
      ]}
    />
  </div>
</section>
{/**/}
<section className="w-full bg-parchment py-16 border-b border-subtle-border" id="programs">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/**/}
<div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-subtle-border mb-8 gap-6">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
<span className="text-xs font-mono font-bold text-foundation-green tracking-widest uppercase">What We Offer</span>
</div>
<h2 className="text-3xl sm:text-4xl font-serif font-bold text-foundation-dark tracking-tight">
            Six Areas of Incubation Support
          </h2>
<p className="text-xs sm:text-sm text-stone-slate mt-1 max-w-2xl font-sans">
            The ways rural and social entrepreneurs work with TISS Incube Foundation to build and grow their ventures.
          </p>
</div>
<a className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-foundation-green hover:text-brand-green border-b-2 border-foundation-green pb-0.5 transition-colors" href="https://docs.google.com/forms/d/e/1FAIpQLSdh6Y12LkpMjNVRetQnPYi8HPBeGmgis8siEsYx5dMCSUPyPA/viewform" rel="noopener noreferrer" target="_blank">
<span className="">Apply for Incubation</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
{/**/}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/**/}
<div className="p-7 rounded-xl bg-white border border-subtle-border hover:border-foundation-green hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">01</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">groups_3</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark mb-2">
              Self-Designed Incubation Programmes
            </h3>
<p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">
              Incubation programmes designed in-house for early-stage social founders, with mentorship from TISS faculty.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs text-foundation-green font-semibold">
<span className="">Cohort Incubation</span>
</div>
</div>
{/**/}
<div className="p-7 rounded-xl bg-white border border-subtle-border hover:border-foundation-green hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">02</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">savings</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark mb-2">
              External Funded Incubation Support
            </h3>
<p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">
              Support for ventures backed by external grants and seed funding from government and philanthropic sources.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs text-foundation-green font-semibold">
<span className="">Philanthropic Grants</span>
</div>
</div>
{/**/}
<div className="p-7 rounded-xl bg-white border border-subtle-border hover:border-foundation-green hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">03</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">school</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark mb-2">
              Entrepreneurship Training
            </h3>
<p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">
              Training and capacity building for social entrepreneurs, including certificate (CAIE) learning modules.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs text-foundation-green font-semibold">
<span className="">CAIE Accredited</span>
</div>
</div>
{/**/}
<div className="p-7 rounded-xl bg-white border border-subtle-border hover:border-foundation-green hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">04</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">travel_explore</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark mb-2">
              Field-Based Assignments
            </h3>
<p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">
              Field work in rural and difficult areas, so founders build solutions with the communities they serve.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs text-foundation-green font-semibold">
<span className="">Field Assignments</span>
</div>
</div>
{/**/}
<div className="p-7 rounded-xl bg-white border border-subtle-border hover:border-foundation-green hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">05</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">fact_check</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark mb-2">
              Impact Assessment
            </h3>
<p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">
              Assessment of each venture's impact, including Social Return on Investment (SROI) and Theory of Change review.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs text-foundation-green font-semibold">
<span className="">SROI Impact Audits</span>
</div>
</div>
{/**/}
<div className="p-7 rounded-xl bg-white border border-subtle-border hover:border-foundation-green hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">06</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">volunteer_activism</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark mb-2">
              CSR &amp; Sponsored Projects
            </h3>
<p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">
              CSR-linked work that channels corporate Section 135 CSR funds into social welfare ventures.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs text-foundation-green font-semibold">
<span className="">Statutory CSR Compacts</span>
</div>
</div>
</div>
</div>
</section>
{/**/}
<section className="w-full bg-parchment py-16 border-b border-subtle-border" id="portfolio">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="flex flex-col md:flex-row md:items-end justify-between border-b border-subtle-border pb-6 mb-8 gap-6">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
<span className="text-xs font-mono font-bold text-foundation-green tracking-widest uppercase">Our Portfolio</span>
</div>
<h2 className="text-3xl sm:text-4xl font-serif font-bold text-foundation-dark tracking-tight">
            Ventures We Support
          </h2>
</div>
{/**/}
<a className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-foundation-green hover:text-brand-green border-b-2 border-foundation-green pb-0.5 transition-colors" href="/incubatees">
<span className="">View all incubatees</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
{/**/}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{[
  { slug: 'sampurnearth', title: 'Sampurn(e)arth Environment Solutions', sector: 'Waste & Environment', loc: 'Mumbai', image: '/ventures/sampurnearth-logo.png', logo: true, note: 'Decentralised waste management that turns waste into livelihoods for informal waste workers.' },
  { slug: 'even-cargo', title: 'Even Cargo', sector: 'Women & Logistics', loc: 'Delhi', image: '/ventures/evencargo-logo.png', logo: true, note: 'India’s first women-only e-commerce logistics company, training women from marginalised communities as delivery professionals.' },
  { slug: 'unexplored-bastar', title: 'Unexplored Bastar', sector: 'Sustainable Tourism', loc: 'Bastar, Chhattisgarh', image: '/ventures/bastar-logo.png', logo: true, note: 'Community-based, sustainable tourism that makes tribal and rural youth participants and beneficiaries.' },
].map((v) => (
  <Link key={v.slug} to={`/events/story/${v.slug}`} className="group bg-white rounded-xl border border-subtle-border p-7 flex flex-col justify-between hover:border-brand-green hover:shadow-lg transition-all">
    <div>
      <div className="flex items-center justify-between pb-3 border-b border-subtle-border mb-4 font-mono text-xs">
        <span className="text-foundation-green font-bold uppercase tracking-wider">{v.sector}</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-green/10 text-foundation-green font-semibold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
          Incubatee
        </span>
      </div>
      {v.logo && (
        <div className="mb-4 flex h-20 w-full items-center justify-center">
          <img src={v.image} alt={v.title} className="max-h-full max-w-[180px] object-contain" loading="lazy" />
        </div>
      )}
      <h3 className="text-2xl font-serif font-bold text-foundation-dark mb-2">{v.title}</h3>
      <p className="text-xs sm:text-sm text-stone-slate leading-relaxed font-sans">{v.note}</p>
    </div>
    <div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between text-xs font-mono">
      <span className="inline-flex items-center gap-1.5 text-stone-slate">
        <span className="material-symbols-outlined text-brand-green text-[16px]">location_on</span>
        {v.loc}
      </span>
      <span className="material-symbols-outlined text-brand-green text-[22px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </div>
  </Link>
))}
</div>
</div>
</section>
{/**/}
{/* Impact */}
<section className="w-full bg-parchment py-16 border-b border-subtle-border">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-subtle-border pb-6 mb-8 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
          <span className="text-xs font-mono font-bold text-foundation-green tracking-widest uppercase">Our Impact</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foundation-dark tracking-tight">Reach across our portfolio</h2>
      </div>
      <span className="text-xs font-mono text-stone-slate max-w-xs md:text-right font-sans">Latest available figures. Several values are estimates.</span>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { value: '400+', label: 'Entrepreneurs & founders supported' },
        { value: '400', label: 'Enterprises incubated (Nano · Micro · Small)' },
        { value: '10M+', label: 'Estimated lives impacted' },
        { value: '2,000–4,000', label: 'Jobs at supported enterprises' },
      ].map((s) => (
        <div key={s.label} className="p-6 bg-white rounded-xl border border-subtle-border text-center flex flex-col items-center justify-center shadow-sm">
          <span className="text-3xl sm:text-4xl font-serif font-bold text-foundation-dark"><CountUp>{s.value}</CountUp></span>
          <p className="text-[11px] sm:text-xs text-stone-slate mt-2 leading-snug font-sans">{s.label}</p>
        </div>
      ))}
    </div>

    <p className="mt-6 text-xs text-stone-slate font-sans">
      Estimated cumulative lives impacted: <strong className="text-foundation-dark"><CountUp>1,02,51,000</CountUp> (over 10 million)</strong>, including up to <CountUp>1,60,000</CountUp> suppliers, producers, artisans and farmers across venture value chains.
    </p>
  </div>
</section>
{/**/}
<section className="w-full bg-white py-16 border-b border-subtle-border">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="bg-foundation-dark text-warm-ivory rounded-xl border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-foundation-green text-brand-green flex items-center justify-center shrink-0 border border-brand-green/30">
<span className="material-symbols-outlined text-[26px]">celebration</span>
</div>
<div>
<h3 className="text-xl font-serif font-bold text-warm-ivory">National Startup Day</h3>
<p className="text-xs sm:text-sm text-warm-sand/80 mt-0.5 font-sans">
              Highlights from TISS Incube Foundation's National Startup Day, celebrating the founders and student entrepreneurs it supports.
            </p>
</div>
</div>
<a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-green hover:bg-status-verified text-foundation-dark text-xs font-mono font-bold tracking-wider uppercase shrink-0 transition-all shadow-md" href="/national-startup-day">
<span className="">View Archive Gallery</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</section>
{/**/}
<section className="w-full bg-white py-16 border-b border-subtle-border" id="annual-reports">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/**/}
<div className="flex flex-col md:flex-row md:items-end justify-between border-b border-subtle-border pb-6 mb-8 gap-6">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
<span className="text-xs font-mono font-bold text-foundation-green tracking-widest uppercase">Transparency &amp; Reports</span>
</div>
<h2 className="text-3xl sm:text-4xl font-serif font-bold text-foundation-dark tracking-tight">
            Annual Reports
          </h2>
<p className="text-xs sm:text-sm text-stone-slate mt-1 max-w-2xl font-sans">
            As a registered non-profit company, we publish our annual reports for each financial year for public review.
          </p>
</div>
<span className="text-xs font-mono text-stone-slate bg-parchment px-3.5 py-2 rounded-lg border border-subtle-border uppercase tracking-wider">
          Public Records: 2021 — 2025
        </span>
</div>
{/**/}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/**/}
<div className="bg-parchment/50 p-6 rounded-xl border border-subtle-border flex flex-col justify-between hover:border-brand-green hover:shadow-md transition-all">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2 py-0.5 rounded bg-brand-green/20 text-foundation-green text-[11px] font-mono font-bold uppercase tracking-wider">Latest Ledger</span>
<span className="material-symbols-outlined text-brand-green text-[24px]">description</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark">Annual Report 2024–25</h3>
<p className="text-xs text-stone-slate mt-2 leading-relaxed font-sans">
              Operations Audit, Fellowship Accounts &amp; SROI Outcome Assessment.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs">
<span className="text-stone-slate text-[11px]">PDF • 3.2 MB</span>
<a className="inline-flex items-center gap-1 font-bold text-foundation-green hover:text-brand-green uppercase tracking-wider transition-colors" href="https://tissincubefoundation.com/wp-content/uploads/2025/12/Incubation-Centre-Annual-Report-2024-25.pdf" target="_blank" rel="noopener noreferrer">
<span className="">Download</span>
<span className="material-symbols-outlined text-[16px]">file_download</span>
</a>
</div>
</div>
{/**/}
<div className="bg-parchment/50 p-6 rounded-xl border border-subtle-border flex flex-col justify-between hover:border-brand-green hover:shadow-md transition-all">
<div>
<div className="flex items-center justify-between mb-4">
<span className="text-[11px] font-mono text-stone-slate uppercase tracking-wider font-semibold">Audit Certified</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">description</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark">Annual Report 2023–24</h3>
<p className="text-xs text-stone-slate mt-2 leading-relaxed font-sans">
              Audited Balance Sheets, CSR Disclosures &amp; Grant Utilization.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs">
<span className="text-stone-slate text-[11px]">PDF • 2.8 MB</span>
<a className="inline-flex items-center gap-1 font-bold text-foundation-green hover:text-brand-green uppercase tracking-wider transition-colors" href="https://tissincubefoundation.com/wp-content/uploads/2025/12/TIF-Annual-Report-2023-24.pdf" target="_blank" rel="noopener noreferrer">
<span className="">Download</span>
<span className="material-symbols-outlined text-[16px]">file_download</span>
</a>
</div>
</div>
{/**/}
<div className="bg-parchment/50 p-6 rounded-xl border border-subtle-border flex flex-col justify-between hover:border-brand-green hover:shadow-md transition-all">
<div>
<div className="flex items-center justify-between mb-4">
<span className="text-[11px] font-mono text-stone-slate uppercase tracking-wider font-semibold">Audit Certified</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">description</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark">Annual Report 2022–23</h3>
<p className="text-xs text-stone-slate mt-2 leading-relaxed font-sans">
              Field Execution Report &amp; Grassroots Beneficiary Verification.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs">
<span className="text-stone-slate text-[11px]">PDF • 2.4 MB</span>
<a className="inline-flex items-center gap-1 font-bold text-foundation-green hover:text-brand-green uppercase tracking-wider transition-colors" href="https://tissincubefoundation.com/wp-content/uploads/2025/12/TIF-Annual-Report-2022-23.pdf" target="_blank" rel="noopener noreferrer">
<span className="">Download</span>
<span className="material-symbols-outlined text-[16px]">file_download</span>
</a>
</div>
</div>
{/**/}
<div className="bg-parchment/50 p-6 rounded-xl border border-subtle-border flex flex-col justify-between hover:border-brand-green hover:shadow-md transition-all">
<div>
<div className="flex items-center justify-between mb-4">
<span className="text-[11px] font-mono text-stone-slate uppercase tracking-wider font-semibold">Foundational Audit</span>
<span className="material-symbols-outlined text-foundation-green text-[24px]">description</span>
</div>
<h3 className="text-xl font-serif font-bold text-foundation-dark">Annual Report 2021–22</h3>
<p className="text-xs text-stone-slate mt-2 leading-relaxed font-sans">
              Inaugural Financial Statements &amp; MCA Statutory Incorporation.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-subtle-border flex items-center justify-between font-mono text-xs">
<span className="text-stone-slate text-[11px]">PDF • 1.9 MB</span>
<a className="inline-flex items-center gap-1 font-bold text-foundation-green hover:text-brand-green uppercase tracking-wider transition-colors" href="https://tissincubefoundation.com/wp-content/uploads/2025/12/TIF-Annual-Report-2021-22.pdf" target="_blank" rel="noopener noreferrer">
<span className="">Download</span>
<span className="material-symbols-outlined text-[16px]">file_download</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/**/}
<section className="w-full bg-foundation-green text-warm-ivory py-16">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="border border-brand-green/30 bg-foundation-dark/60 p-8 sm:p-12 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
<div className="max-w-2xl">
<div className="inline-flex items-center gap-2 mb-3 text-brand-green text-xs font-mono font-semibold tracking-widest uppercase">
<span className="w-2 h-2 rounded-full bg-status-verified"></span>
            Applications Open
          </div>
<h2 className="text-3xl sm:text-4xl font-serif font-bold text-warm-ivory leading-tight">
            Ready to build your social enterprise?
          </h2>
<p className="text-warm-sand/80 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
            We invite rural and social entrepreneurs to apply for incubation, mentorship, and support from TISS Incube Foundation.
          </p>
</div>
<div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0 font-mono text-xs">
<a className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-brand-green hover:bg-status-verified text-foundation-dark font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md" href="https://docs.google.com/forms/d/e/1FAIpQLSdh6Y12LkpMjNVRetQnPYi8HPBeGmgis8siEsYx5dMCSUPyPA/viewform" rel="noopener noreferrer" target="_blank">
<span className="">Apply for Incubation</span>
<span className="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
<a className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-warm-ivory font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/15" href="#contact">
<span className="">Contact Us</span>
<span className="material-symbols-outlined text-[16px]">mail</span>
</a>
</div>
</div>
</div>
</section>

    </div>
  );
};

export default Home;
