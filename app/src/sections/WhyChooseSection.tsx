import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mountain, Users, Shield, Camera, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: MapPin,
    title: 'World-Class Destinations',
    description: 'Home to Serengeti, Ngorongoro Crater, and Mount Kilimanjaro - three of Africa\'s most iconic destinations.',
  },
  {
    icon: Users,
    title: 'Rich Cultural Diversity',
    description: 'Over 120 tribes speaking 130+ languages. Experience authentic Maasai villages and Hadzabe Bushmen culture.',
  },
  {
    icon: Camera,
    title: 'Greatest Wildlife Show',
    description: 'Witness the Great Migration with 2 million wildebeest, zebras, and gazelles crossing the plains.',
  },
  {
    icon: Mountain,
    title: 'Spectacular Landscapes',
    description: 'From snow-capped Kilimanjaro to endless Serengeti plains, riverine forests, and the Great Rift Valley.',
  },
  {
    icon: Shield,
    title: 'Safe & Stable',
    description: 'Tanzania is politically neutral with a peaceful atmosphere, making it one of Africa\'s safest destinations.',
  },
  {
    icon: Sun,
    title: 'Year-Round Safari',
    description: 'Favorable climate allows for exceptional safari experiences throughout the year.',
  },
];

export default function WhyChooseSection() {
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
            stagger: 0.1,
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
      id="why-tanzania"
      className="relative bg-[#0B0F0D] py-24 px-[6vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="label-mono text-[#D4A23A] mb-4 block">WHY TANZANIA</span>
          <h2 className="font-display font-bold text-[#F4F1EA] text-4xl md:text-5xl lg:text-6xl mb-6">
            Why Choose Tanzania?
          </h2>
          <p className="text-[#B7C0B3] text-lg max-w-3xl mx-auto leading-relaxed">
            Tanzania sets itself apart from the rest of the world. It is home to spectacular destinations, 
            world-class national parks, and the largest concentration of wildlife on Earth.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-[#122C26] border border-[rgba(244,241,234,0.08)] p-8 hover:border-[#D4A23A]/30 transition-colors group"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#D4A23A]/10 border border-[#D4A23A]/30 text-[#D4A23A] mb-6 group-hover:bg-[#D4A23A]/20 transition-colors">
                  <Icon size={28} />
                </div>
                <h3 className="font-display font-bold text-[#F4F1EA] text-xl mb-3">
                  {reason.title}
                </h3>
                <p className="text-[#B7C0B3] text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
