import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    image: '/images/cultural_safari.jpg',
    title: 'Cultural Safaris',
    description: 'Tanzania welcomes you to its vibrant tribes. Visit authentic Maasai villages and meet the Hadzabe Bushmen, the last remaining primitive tribe who still live by hunting and gathering on the shores of Lake Eyasi. Experience traditions passed down for over three centuries.',
    highlights: ['Maasai Village Tours', 'Hadzabe Bushmen Experience', 'Datoga Tribe Visits', 'Traditional Ceremonies'],
  },
  {
    image: '/images/balloon_safari.jpg',
    title: 'Balloon Safaris',
    description: 'A hot air balloon safari is an authentic way to explore wildlife, vegetation, and landscapes. Float above the savanna plains while viewing wildlife dispersed below. Available in Serengeti, Tarangire, Mikumi, and Ruaha.',
    highlights: ['Sunrise Flights', 'Champagne Breakfast', 'Aerial Wildlife Viewing', 'Professional Pilots'],
  },
  {
    image: '/images/game_drive.jpg',
    title: 'Game Drives',
    description: 'Driving is the most traditional way to view wildlife. Book a day game drive to see the Big Five and birds, or experience a night game drive to discover the world of nocturnal animals active in the dark.',
    highlights: ['Day Game Drives', 'Night Game Drives', 'Expert Guides', '4x4 Safari Vehicles'],
  },
  {
    image: '/images/bird_watching.jpg',
    title: 'Bird Watching',
    description: 'With over 1,000 bird species, Tanzania is a perfect destination for birding safaris. Home to 33 endemic birds including Ashy starling and Rufous-tailed weaver. The rainy season brings hundreds of migratory birds for breeding.',
    highlights: ['1,000+ Bird Species', '33 Endemic Birds', 'Expert Bird Guides', 'All Year Round'],
  },
];

export default function SafariExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative bg-[#0B0F0D] py-24 px-[6vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="label-mono text-[#D4A23A] mb-4 block">SAFARI EXPERIENCES</span>
          <h2 className="font-display font-bold text-[#F4F1EA] text-4xl md:text-5xl lg:text-6xl mb-6">
            Top Safari Experiences
          </h2>
          <p className="text-[#B7C0B3] text-lg max-w-3xl mx-auto leading-relaxed">
            From cultural immersions to aerial adventures, discover the many ways to experience Tanzania's wild beauty.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/60 to-transparent" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h3 className="font-display font-bold text-[#F4F1EA] text-3xl md:text-4xl mb-4">
                  {experience.title}
                </h3>
                <p className="text-[#B7C0B3] text-base leading-relaxed mb-6">
                  {experience.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {experience.highlights.map((highlight, hIndex) => (
                    <span
                      key={hIndex}
                      className="text-xs bg-[#122C26] text-[#D4A23A] border border-[#D4A23A]/30 px-3 py-1.5"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary group inline-flex"
                >
                  Book This Experience
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
