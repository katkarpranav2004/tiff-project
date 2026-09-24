import { Link } from 'react-router-dom';
import logoImage from '../../assets/image.png';

const REPORT_BASE = 'https://tissincubefoundation.com/wp-content/uploads/2025/12';

const Footer = () => {
  return (
    <footer className="w-full bg-foundation-dark text-warm-sand/90 pt-16 pb-12 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Entity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded inline-block">
                <img alt="TISS Incube Foundation" className="h-8 w-auto object-contain" src={logoImage} />
              </div>
              <div>
                <span className="font-serif font-bold text-warm-ivory text-base block leading-tight">TISS Incube Foundation</span>
                <span className="text-[11px] font-mono text-brand-green">Non-Profit Entity | CIN: U85300PN2021NPL199994</span>
              </div>
            </div>
            <p className="text-xs text-warm-sand/70 leading-relaxed max-w-sm font-sans">
              An independent incubation centre established by Tata Institute of Social Sciences (TISS) and Bombay Mothers and Children Welfare Society (BMCWS) to support rural and social entrepreneurs.
            </p>
            <div className="pt-2 space-y-2 text-xs text-warm-sand/80 font-sans">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[16px] text-brand-green shrink-0 mt-0.5">account_balance</span>
                <span className=""><strong>Operating Office:</strong> TISS Campus, Deonar Farm Road, Deonar, Mumbai 400 088.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[16px] text-brand-green shrink-0 mt-0.5">home_work</span>
                <span className=""><strong>Registered Office:</strong> The Mumbai Bala Mata Sangopan Kendra, 1929 Wada Road, Tal Khed, Rajgurunagar, Pune 410 505.</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1 font-mono text-xs">
                <span className="material-symbols-outlined text-[16px] text-brand-green shrink-0">mail</span>
                <a className="hover:text-warm-ivory transition-colors underline underline-offset-2" href="mailto:tif@tissincubefoundation.com">
                  tif@tissincubefoundation.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Incubation Support Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-warm-ivory tracking-widest uppercase mb-4 pb-2 border-b border-white/10">What We Offer</h4>
            <ul className="space-y-2.5 text-xs text-warm-sand/70 font-sans">
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/courses">Self-Designed Incubation</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/courses">External Funded Support</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/courses">Entrepreneurship Training</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/courses">Field-Based Assignments</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/courses">Impact Assessment &amp; SROI</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/courses">CSR &amp; Sponsored Projects</Link></li>
            </ul>
          </div>

          {/* Governance & Reports */}
          <div>
            <h4 className="text-xs font-mono font-bold text-warm-ivory tracking-widest uppercase mb-4 pb-2 border-b border-white/10">Governance &amp; Reports</h4>
            <ul className="space-y-2.5 text-xs text-warm-sand/70 font-sans">
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/about">Board of Directors</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/partnerships">Partnerships</Link></li>
              <li className=""><a className="hover:text-warm-ivory transition-colors" href={`${REPORT_BASE}/Incubation-Centre-Annual-Report-2024-25.pdf`} target="_blank" rel="noopener noreferrer">Annual Report 2024–25</a></li>
              <li className=""><a className="hover:text-warm-ivory transition-colors" href={`${REPORT_BASE}/TIF-Annual-Report-2023-24.pdf`} target="_blank" rel="noopener noreferrer">Annual Report 2023–24</a></li>
              <li className=""><a className="hover:text-warm-ivory transition-colors" href={`${REPORT_BASE}/TIF-Annual-Report-2022-23.pdf`} target="_blank" rel="noopener noreferrer">Annual Report 2022–23</a></li>
              <li className=""><a className="hover:text-warm-ivory transition-colors" href={`${REPORT_BASE}/TIF-Annual-Report-2021-22.pdf`} target="_blank" rel="noopener noreferrer">Annual Report 2021–22</a></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/events">Annual General Meetings</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-warm-ivory tracking-widest uppercase mb-4 pb-2 border-b border-white/10">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-warm-sand/70 font-sans">
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/certificates/verify">Verify a Certificate</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/incubatees">Incubatees</Link></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/national-startup-day">National Startup Day</Link></li>
              <li className=""><a className="hover:text-warm-ivory transition-colors" href="https://docs.google.com/forms/d/e/1FAIpQLSdh6Y12LkpMjNVRetQnPYi8HPBeGmgis8siEsYx5dMCSUPyPA/viewform" rel="noopener noreferrer" target="_blank">Apply for Incubation</a></li>
              <li className=""><Link className="hover:text-warm-ivory transition-colors" to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Declarations */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-warm-sand/50">
          <p className="">© 2025 TISS Incube Foundation. A non-profit company incorporated under the Companies Act, 2013.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-warm-sand/70">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              Supporting rural &amp; social entrepreneurs
            </span>
            <Link className="hover:text-warm-ivory transition-colors" to="/about">About &amp; Terms</Link>
            <Link className="inline-flex items-center gap-1.5 rounded-md bg-brand-green px-4 py-2 text-sm font-bold uppercase tracking-wider text-foundation-dark hover:bg-status-verified transition-colors" to="/admin/login">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
