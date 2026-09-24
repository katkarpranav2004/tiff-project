import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import logoImage from '../../assets/image.png';
import EyeFollowButton from '../EyeFollowButton';

const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdh6Y12LkpMjNVRetQnPYi8HPBeGmgis8siEsYx5dMCSUPyPA/viewform';

type MenuLink = { name: string; to?: string; href?: string };
const RB = 'https://tissincubefoundation.com/wp-content/uploads/2025/12';
type Promo = { badge: string; title: string; desc: string; cta: string; to?: string; href?: string };
type NavItem = { name: string; to?: string; mega?: { columns: { heading: string; links: MenuLink[] }[]; promo: Promo } };

const NAV: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Incubatees', to: '/incubatees' },
  { name: 'Courses', to: '/courses' },
  { name: 'Partnerships', to: '/partnerships' },
  {
    name: 'Annual Reports',
    mega: {
      columns: [
        {
          heading: 'Reports',
          links: [
            { name: 'Annual Report 2024–25', href: `${RB}/Incubation-Centre-Annual-Report-2024-25.pdf` },
            { name: 'Annual Report 2023–24', href: `${RB}/TIF-Annual-Report-2023-24.pdf` },
          ],
        },
        {
          heading: 'Archive',
          links: [
            { name: 'Annual Report 2022–23', href: `${RB}/TIF-Annual-Report-2022-23.pdf` },
            { name: 'Annual Report 2021–22', href: `${RB}/TIF-Annual-Report-2021-22.pdf` },
          ],
        },
      ],
      promo: {
        badge: 'Transparency',
        title: 'All Annual Reports',
        desc: 'Audited disclosures and yearly impact portfolios.',
        cta: 'View all reports',
        to: '/annual-reports',
      },
    },
  },
  {
    name: 'Incube in Action',
    mega: {
      columns: [
        {
          heading: 'Highlights',
          links: [
            { name: 'Incube in Action', to: '/incube-in-action' },
            { name: 'National Startup Day', to: '/national-startup-day' },
            { name: 'Events', to: '/events' },
          ],
        },
        {
          heading: 'More',
          links: [
            { name: 'Verify a Certificate', to: '/certificates' },
            { name: 'Contact', to: '/contact' },
            { name: 'About Us', to: '/about' },
          ],
        },
      ],
      promo: {
        badge: 'Admissions Open',
        title: 'Apply for Incubation',
        desc: 'Submit your enterprise petition to the current cohort.',
        cta: 'Apply now',
        href: APPLY_URL,
      },
    },
  },
];

const linkHover =
  'py-1 transition-colors hover:text-[#E84D91] hover:underline underline-offset-[6px] decoration-[#E84D91] decoration-2';

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const activeItem = NAV.find((n) => n.name === active && n.mega);

  return (
    <header
      className="sticky top-0 z-40 border-b border-[#EADFF2]/70 backdrop-blur-md shadow-[0_1px_24px_-8px_rgba(232,77,145,0.18)]"
      style={{
        background:
          'linear-gradient(110deg, rgba(248,239,255,0.94) 0%, rgba(247,243,250,0.94) 45%, rgba(255,247,247,0.94) 100%)',
      }}
    >
      <div className="relative" onMouseLeave={() => setActive(null)}>
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo left */}
          <Link aria-label="TISS Incube Foundation Home" className="group shrink-0" to="/" onClick={scrollTop}>
            <img alt="TISS Incube Foundation Logo" className="h-16 w-auto object-contain transition-transform group-hover:scale-105" src={logoImage} />
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#2A2540] font-sans">
            {NAV.map((item) =>
              item.mega ? (
                <button
                  key={item.name}
                  onMouseEnter={() => setActive(item.name)}
                  className={clsx('flex items-center gap-1', linkHover, active === item.name && 'text-[#E84D91] underline')}
                >
                  {item.name}
                  <ChevronDown className={clsx('h-4 w-4 transition-transform', active === item.name && 'rotate-180')} />
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.to!}
                  onMouseEnter={() => setActive(null)}
                  className={clsx(linkHover, location.pathname === item.to && 'text-[#E84D91] underline')}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Actions right */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <Link className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-[#2A2540] hover:text-foundation-green transition-colors" to="/certificates/verify">
              <span className="material-symbols-outlined text-[16px] text-brand-green">verified</span>
              <span>Verify CAIE</span>
            </Link>
            <EyeFollowButton text="Apply Now" href={APPLY_URL} className="hidden sm:inline-flex" />
            <button className="lg:hidden p-2 text-foundation-green" aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Floating mega panel (BARKK style) */}
        <AnimatePresence>
          {activeItem?.mega && (
            <motion.div
              key={activeItem.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full mx-auto hidden w-full max-w-4xl px-4 pt-4 pb-6 lg:block"
              onMouseEnter={() => setActive(activeItem.name)}
            >
              <div className="flex gap-4">
                {/* Links card */}
                <div className="flex-[1.6] rounded-2xl border border-subtle-border bg-white p-7 shadow-xl">
                  <div className="grid grid-cols-2 gap-8">
                    {activeItem.mega.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="mb-3 text-sm font-bold text-foundation-dark">{col.heading}</p>
                        <ul className="flex flex-col gap-2.5">
                          {col.links.map((l) => (
                            <li key={l.name}>
                              {l.href ? (
                                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-slate transition-colors hover:text-foundation-green">
                                  {l.name}
                                </a>
                              ) : (
                                <Link to={l.to!} className="text-sm text-stone-slate transition-colors hover:text-foundation-green">
                                  {l.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo card */}
                <div className="flex-1 rounded-2xl border border-subtle-border bg-warm-alabaster p-7 shadow-xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-foundation-green px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-warm-ivory">
                    <span className="material-symbols-outlined text-[13px] text-warm-ivory">verified</span>
                    {activeItem.mega.promo.badge}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-foundation-dark">{activeItem.mega.promo.title}</h3>
                  <p className="mt-2 text-sm text-stone-slate">{activeItem.mega.promo.desc}</p>
                  {activeItem.mega.promo.to ? (
                    <Link to={activeItem.mega.promo.to} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-foundation-green px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory transition-colors hover:bg-foundation-dark">
                      {activeItem.mega.promo.cta}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  ) : (
                    <a href={activeItem.mega.promo.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-foundation-green px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory transition-colors hover:bg-foundation-dark">
                      {activeItem.mega.promo.cta}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-[#EADFF2]/70"
            style={{
              background: 'linear-gradient(180deg, #FBF6FF 0%, #FAF8FC 50%, #FFFBFB 100%)',
            }}
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV.map((item) =>
                item.mega ? (
                  <div key={item.name} className="py-2">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-foundation-green">{item.name}</p>
                    <div className="mt-2 flex flex-col gap-2 pl-1">
                      {item.mega.columns.flatMap((c) => c.links).map((l) =>
                        l.href ? (
                          <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-slate">{l.name}</a>
                        ) : (
                          <Link key={l.name} to={l.to!} className="text-sm text-stone-slate">{l.name}</Link>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to!}
                    className={clsx(
                      'border-b border-subtle-border py-2 font-serif text-base font-semibold',
                      location.pathname === item.to ? 'text-[#E84D91]' : 'text-foundation-dark'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-foundation-green px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory">
                Apply Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
