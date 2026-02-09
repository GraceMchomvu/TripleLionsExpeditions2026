import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tripType: '',
    travelMonth: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        contactRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      tripType: '',
      travelMonth: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#122C26] py-[10vh] px-[6vw]"
    >
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B0F0D] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="font-display font-bold text-[#F4F1EA] text-4xl md:text-5xl lg:text-6xl mb-4">
            Plan Your Expedition
          </h2>
          <p className="text-[#B7C0B3] text-base md:text-lg max-w-2xl leading-relaxed">
            Tell us what you want to see, how many days, and when. We'll design a private itinerary and confirm within 24 hours.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-mono text-[#B7C0B3] block mb-2">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="label-mono text-[#B7C0B3] block mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-mono text-[#B7C0B3] block mb-2">TRIP TYPE</label>
                <select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <option value="">Select trip type</option>
                  <option value="safari">Safari Only</option>
                  <option value="kilimanjaro">Kilimanjaro Climb</option>
                  <option value="safari-zanzibar">Safari + Zanzibar</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>
              <div>
                <label className="label-mono text-[#B7C0B3] block mb-2">TRAVEL MONTH</label>
                <select
                  name="travelMonth"
                  value={formData.travelMonth}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <option value="">Select month</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="mar">March</option>
                  <option value="apr">April</option>
                  <option value="may">May</option>
                  <option value="jun">June</option>
                  <option value="jul">July</option>
                  <option value="aug">August</option>
                  <option value="sep">September</option>
                  <option value="oct">October</option>
                  <option value="nov">November</option>
                  <option value="dec">December</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-mono text-[#B7C0B3] block mb-2">MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your dream trip..."
                rows={5}
                className="w-full resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-filled w-full sm:w-auto group"
            >
              <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
              Request an Itinerary
            </button>
          </form>

          {/* Contact info */}
          <div ref={contactRef} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#D4A23A]">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="label-mono text-[#B7C0B3] mb-1">EMAIL</h4>
                  <a href="mailto:info@triplelions.com" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors">
                    info@triplelions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#D4A23A]">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="label-mono text-[#B7C0B3] mb-1">PHONE</h4>
                  <a href="tel:+255756336142" className="text-[#F4F1EA] hover:text-[#D4A23A] transition-colors block">
                    +255 756 336 142
                  </a>
                  <a href="tel:+255765887182" className="text-[#B7C0B3] hover:text-[#D4A23A] transition-colors text-sm">
                    +255 765 887 182
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#D4A23A]">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="label-mono text-[#B7C0B3] mb-1">OFFICE</h4>
                  <p className="text-[#F4F1EA] text-sm leading-relaxed">
                    Mkabala na Chuo Cha Bishop Durning,<br />
                    Ilboru, Arusha, Tanzania<br />
                    P.O. Box 1187, Arusha 23227
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(244,241,234,0.2)] text-[#D4A23A]">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="label-mono text-[#B7C0B3] mb-1">HOURS</h4>
                  <p className="text-[#F4F1EA] text-sm">
                    Mon - Fri: 8:00 - 18:00
                  </p>
                  <p className="text-[#B7C0B3] text-sm">
                    Sat: 9:00 - 14:00
                  </p>
                </div>
              </div>
            </div>

            {/* Trust line */}
            <div className="pt-6 border-t border-[rgba(244,241,234,0.12)]">
              <p className="label-mono text-[#B7C0B3] text-center">
                LICENSED TALA TOUR OPERATOR · FULLY INSURED · 24/7 FIELD SUPPORT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-[#0B0F0D] border border-[rgba(244,241,234,0.18)] text-[#F4F1EA] max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-[#D4A23A]/20 rounded-full mb-4">
              <CheckCircle size={32} className="text-[#D4A23A]" />
            </div>
            <DialogTitle className="font-display font-bold text-2xl text-[#F4F1EA]">
              Inquiry Received!
            </DialogTitle>
            <DialogDescription className="text-[#B7C0B3] mt-2">
              Thank you for reaching out. Our safari experts will review your request and get back to you within 24 hours with a personalized itinerary.
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowSuccess(false)}
            className="btn-filled w-full mt-4"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
