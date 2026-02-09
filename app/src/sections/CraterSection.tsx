import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CraterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
        },
      });

      // Phase 1 (0%-30%): Entrance
      // Background
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.1, y: '6vh', opacity: 0.7 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Label from top
      scrollTl.fromTo(
        labelRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Headline line 1 from bottom
      scrollTl.fromTo(
        headline1Ref.current,
        { y: '70vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out' },
        0.05
      );

      // Headline line 2 from bottom
      scrollTl.fromTo(
        headline2Ref.current,
        { y: '80vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out' },
        0.1
      );

      // Body from left
      scrollTl.fromTo(
        bodyRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.15
      );

      // CTA from right
      scrollTl.fromTo(
        ctaRef.current,
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.15
      );

      // Phase 2 (30%-70%): Settle

      // Phase 3 (70%-100%): Exit
      scrollTl.fromTo(
        [headline1Ref.current, headline2Ref.current],
        { y: 0, opacity: 1 },
        { y: '-30vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0.8, ease: 'none' },
        0.7
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="crater"
      className="section-pinned bg-[#0B0F0D]"
    >
      {/* Background image */}
      <img
        ref={bgRef}
        src="/images/crater_landscape.jpg"
        alt="Ngorongoro Crater"
        className="bg-image"
      />
      
      {/* Dark overlay */}
      <div className="bg-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center">
        {/* Category label - top center */}
        <div
          ref={labelRef}
          className="absolute top-[7vh] left-1/2 -translate-x-1/2"
        >
          <span className="label-mono text-[#B7C0B3]">UNESCO WORLD HERITAGE</span>
        </div>

        {/* Center headline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[92vw]">
          <div ref={headline1Ref} className="headline-section text-[#F4F1EA] text-[clamp(36px,9vw,130px)]">
            NGORONGORO
          </div>
          <div ref={headline2Ref} className="headline-section text-[#F4F1EA] text-[clamp(48px,11vw,150px)]">
            CRATER
          </div>
        </div>

        {/* Bottom left body */}
        <p
          ref={bodyRef}
          className="absolute left-[6vw] bottom-[10vh] max-w-[34vw] text-[#B7C0B3] text-sm md:text-base leading-relaxed"
        >
          Descend into the world's largest inactive volcanic caldera—an Eden of predator and prey in a single bowl.
        </p>

        {/* Bottom right CTA */}
        <a
          ref={ctaRef}
          href="#packages"
          className="absolute right-[6vw] bottom-[10vh] flex items-center gap-2 text-[#F4F1EA] hover:text-[#D4A23A] transition-colors group"
        >
          <span className="text-sm font-medium">Plan a crater safari</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
