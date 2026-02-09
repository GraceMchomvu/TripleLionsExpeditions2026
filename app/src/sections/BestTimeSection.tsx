import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, CloudRain, Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const drySeasonPros = [
  'Vegetation is thinner, enhancing game viewing',
  'Animals congregate near water sources',
  'Perfect for Great Migration viewing (June-September)',
  'Clear skies for climbing and balloon safaris',
  'Fewer mosquitoes',
  'Pleasant temperatures',
];

const drySeasonCons = [
  'Peak season with more tourists',
  'Higher prices due to demand',
  'Shared wildlife sightings',
];

const wetSeasonPros = [
  'Fewer crowds, more secluded experience',
  'Lush, green landscapes',
  'Excellent bird watching with migratory species',
  'Lower prices and discounts',
  'Beautiful scenery for photography',
  'Calving season (Jan-Feb)',
];

const wetSeasonCons = [
  'Some roads may be difficult to access',
  'Some lodges close temporarily',
  'Animals dispersed in dense vegetation',
];

export default function BestTimeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="best-time"
      className="relative bg-[#122C26] py-24 px-[6vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="label-mono text-[#D4A23A] mb-4 block">PLAN YOUR TRIP</span>
          <h2 className="font-display font-bold text-[#F4F1EA] text-4xl md:text-5xl lg:text-6xl mb-6">
            Best Time to Visit Tanzania
          </h2>
          <p className="text-[#B7C0B3] text-lg max-w-3xl mx-auto leading-relaxed">
            Tanzania is a year-round safari destination. Understanding the seasons helps you plan 
            the perfect safari based on your travel goals, budget, and interests.
          </p>
        </div>

        {/* Season Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dry Season */}
          <div className="bg-[#0B0F0D] border border-[rgba(244,241,234,0.12)] p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-[#D4A23A]/10 border border-[#D4A23A]/30 text-[#D4A23A]">
                <Sun size={28} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#F4F1EA] text-2xl">Dry Season</h3>
                <p className="text-[#D4A23A] label-mono">JUNE - OCTOBER</p>
              </div>
            </div>

            <p className="text-[#B7C0B3] text-sm leading-relaxed mb-6">
              Widely considered the best time for a Tanzania safari. Rainfall is minimal, 
              vegetation is less dense, and wildlife congregates near water sources.
            </p>

            <div className="mb-6">
              <h4 className="text-[#F4F1EA] font-medium mb-3 flex items-center gap-2">
                <Check size={16} className="text-green-400" /> Advantages
              </h4>
              <ul className="space-y-2">
                {drySeasonPros.map((item, index) => (
                  <li key={index} className="text-[#B7C0B3] text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#F4F1EA] font-medium mb-3 flex items-center gap-2">
                <X size={16} className="text-red-400" /> Considerations
              </h4>
              <ul className="space-y-2">
                {drySeasonCons.map((item, index) => (
                  <li key={index} className="text-[#B7C0B3] text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Wet Season */}
          <div className="bg-[#0B0F0D] border border-[rgba(244,241,234,0.12)] p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <CloudRain size={28} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#F4F1EA] text-2xl">Wet Season</h3>
                <p className="text-blue-400 label-mono">NOVEMBER - MAY</p>
              </div>
            </div>

            <p className="text-[#B7C0B3] text-sm leading-relaxed mb-6">
              Also known as the green season, offers a different but equally rewarding experience. 
              Perfect for travelers who prefer fewer crowds and lush landscapes.
            </p>

            <div className="mb-6">
              <h4 className="text-[#F4F1EA] font-medium mb-3 flex items-center gap-2">
                <Check size={16} className="text-green-400" /> Advantages
              </h4>
              <ul className="space-y-2">
                {wetSeasonPros.map((item, index) => (
                  <li key={index} className="text-[#B7C0B3] text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#F4F1EA] font-medium mb-3 flex items-center gap-2">
                <X size={16} className="text-red-400" /> Considerations
              </h4>
              <ul className="space-y-2">
                {wetSeasonCons.map((item, index) => (
                  <li key={index} className="text-[#B7C0B3] text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-[#B7C0B3] text-sm max-w-2xl mx-auto">
            Whether you visit during the dry season or the rainy season, Tanzania offers outstanding 
            safari experiences throughout the year. Your ideal travel time depends on your priorities.
          </p>
        </div>
      </div>
    </section>
  );
}
