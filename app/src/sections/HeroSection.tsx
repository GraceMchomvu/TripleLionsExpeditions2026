import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const headline3Ref = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade and scale
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline lines staggered rise
      tl.fromTo(
        headline1Ref.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.3
      );
      tl.fromTo(
        headline2Ref.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.38
      );
      tl.fromTo(
        headline3Ref.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.46
      );

      // Subheadline and CTAs
      tl.fromTo(
        subheadlineRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.55
      );

      tl.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.65
      );

      // Info card slide in
      tl.fromTo(
        infoCardRef.current,
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headline1Ref.current, headline2Ref.current, headline3Ref.current], {
              x: 0,
              opacity: 1,
            });
            gsap.set([subheadlineRef.current, ctaRef.current], {
              y: 0,
              opacity: 1,
            });
            gsap.set(infoCardRef.current, { x: 0, opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, opacity: 1 });
          },
        },
      });

      // Phase 1 (0%-30%): Hold - elements stay in place
      // Phase 2 (30%-70%): Hold - static reading

      // Phase 3 (70%-100%): Exit
      // Headline group exits left
      scrollTl.fromTo(
        [headline1Ref.current, headline2Ref.current, headline3Ref.current],
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline and CTAs exit down
      scrollTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Info card exits right
      scrollTl.fromTo(
        infoCardRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Background scales and fades slightly
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0.85, ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#0B0F0D]"
    >
      {/* Background image */}
      <img
        ref={bgRef}
        src="/images/hero_lion_night.jpg"
        alt="Lion in the night"
        className="bg-image"
      />
      
      {/* Dark overlay */}
      <div className="bg-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-[6vw]">
        {/* Headline */}
        <div className="max-w-[62vw] mt-[8vh]">
          <div ref={headline1Ref} className="headline-hero text-[#F4F1EA] text-[clamp(32px,5vw,72px)]">
            TANZANIA'S
          </div>
          <div ref={headline2Ref} className="headline-hero text-[#F4F1EA] text-[clamp(40px,6vw,96px)]">
            PREMIER
          </div>
          <div ref={headline3Ref} className="headline-hero text-[#F4F1EA] text-[clamp(28px,4vw,64px)]">
            SAFARI EXPERIENCE
          </div>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 max-w-[34vw] text-[#B7C0B3] text-base md:text-lg leading-relaxed"
        >
          Private guided journeys through the Serengeti, Ngorongoro, and beyond.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#bigfive" className="btn-primary group">
            Explore Trips
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="flex items-center gap-2 text-[#F4F1EA] hover:text-[#D4A23A] transition-colors">
            <span className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.3)] rounded-full hover:border-[#D4A23A] transition-colors">
              <Play size={14} fill="currentColor" />
            </span>
            <span className="text-sm font-medium">Watch Film</span>
          </button>
        </div>
      </div>

      {/* Info card - bottom right */}
      <div
        ref={infoCardRef}
        className="absolute right-[4vw] bottom-[6vh] w-[28vw] min-w-[280px] max-w-[420px] info-card p-6 z-10"
      >
        <div className="flex items-center gap-2 text-[#D4A23A] mb-3">
          <MapPin size={14} />
          <span className="label-mono">BASED IN ARUSHA</span>
        </div>
        <p className="text-[#B7C0B3] text-sm leading-relaxed mb-4">
          Operating across Tanzania's northern circuit & Zanzibar.
        </p>
        <a
          href="#destinations"
          className="link-underline text-[#F4F1EA] text-sm font-medium hover:text-[#D4A23A] transition-colors"
        >
          See regions
        </a>
      </div>
    </section>
  );
}
