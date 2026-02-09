import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import WhyChooseSection from './sections/WhyChooseSection';
import BigFiveSection from './sections/BigFiveSection';
import MigrationSection from './sections/MigrationSection';
import SafariExperiencesSection from './sections/SafariExperiencesSection';
import CraterSection from './sections/CraterSection';
import KilimanjaroSection from './sections/KilimanjaroSection';
import ZanzibarSection from './sections/ZanzibarSection';
import BestTimeSection from './sections/BestTimeSection';
import ContactSection from './sections/ContactSection';
import MenuOverlay from './sections/MenuOverlay';
import { useMenuStore } from './store/menuStore';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useMenuStore();

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from actual ScrollTrigger positions
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Menu Overlay */}
      <MenuOverlay />
      
      {/* Main content */}
      <main className={`relative transition-opacity duration-300 ${isOpen ? 'opacity-30' : 'opacity-100'}`}>
        {/* Section 1: Hero - z-10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: Why Choose Tanzania - flowing */}
        <div className="relative z-20">
          <WhyChooseSection />
        </div>
        
        {/* Section 3: Big Five - z-30 */}
        <div className="relative z-30">
          <BigFiveSection />
        </div>
        
        {/* Section 4: Great Migration - z-40 */}
        <div className="relative z-40">
          <MigrationSection />
        </div>
        
        {/* Section 5: Safari Experiences - flowing */}
        <div className="relative z-50">
          <SafariExperiencesSection />
        </div>
        
        {/* Section 6: Ngorongoro Crater - z-[60] */}
        <div className="relative z-[60]">
          <CraterSection />
        </div>
        
        {/* Section 7: Kilimanjaro - z-[70] */}
        <div className="relative z-[70]">
          <KilimanjaroSection />
        </div>
        
        {/* Section 8: Zanzibar - z-[80] */}
        <div className="relative z-[80]">
          <ZanzibarSection />
        </div>
        
        {/* Section 9: Best Time to Visit - flowing */}
        <div className="relative z-[90]">
          <BestTimeSection />
        </div>
        
        {/* Section 10: Contact - flowing */}
        <div className="relative z-[100]">
          <ContactSection />
        </div>
        
        {/* Footer */}
        <footer className="relative z-[100] bg-[#0B0F0D] border-t border-[rgba(244,241,234,0.08)] py-12 px-[6vw]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/logo.png" alt="Triple Lions" className="w-16 h-16" />
                  <h3 className="font-display font-bold text-[#F4F1EA] text-xl">
                    Triple Lions Expeditions
                  </h3>
                </div>
                <p className="text-[#B7C0B3] text-sm leading-relaxed max-w-md mb-6">
                  Your trusted partner for unforgettable safari and travel experiences in Tanzania and East Africa. 
                  Private guided journeys through the wild. Licensed TALA tour operator, fully insured with 24/7 field support.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#B7C0B3] hover:text-[#D4A23A] hover:border-[#D4A23A] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#B7C0B3] hover:text-[#D4A23A] hover:border-[#D4A23A] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#B7C0B3] hover:text-[#D4A23A] hover:border-[#D4A23A] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="label-mono text-[#B7C0B3] mb-4">QUICK LINKS</h4>
                <ul className="space-y-2">
                  <li><a href="#hero" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Home</a></li>
                  <li><a href="#why-tanzania" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Why Tanzania</a></li>
                  <li><a href="#bigfive" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Safaris</a></li>
                  <li><a href="#experiences" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Experiences</a></li>
                  <li><a href="#kilimanjaro" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Kilimanjaro</a></li>
                  <li><a href="#zanzibar" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Zanzibar</a></li>
                  <li><a href="#contact" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors text-sm">Contact</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="label-mono text-[#B7C0B3] mb-4">CONTACT</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-[#F4F1EA]">+255 756 336 142</li>
                  <li className="text-[#F4F1EA]">+255 765 887 182</li>
                  <li className="text-[#B7C0B3]">info@triplelions.com</li>
                  <li className="text-[#B7C0B3] mt-4">
                    Mkabala na Chuo Cha Bishop Durning,<br />
                    Ilboru, Arusha, Tanzania<br />
                    P.O. Box 1187
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-[rgba(244,241,234,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#B7C0B3] text-sm">
                © 2025 Triple Lions Expeditions. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="/admin" className="text-[#B7C0B3] hover:text-[#D4A23A] transition-colors text-sm">
                  Admin Login
                </a>
                <a href="#" className="text-[#B7C0B3] hover:text-[#D4A23A] transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-[#B7C0B3] hover:text-[#D4A23A] transition-colors text-sm">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
