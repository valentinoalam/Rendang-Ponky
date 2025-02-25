'use client';
import { useRef, useEffect } from 'react';
import { MagicText } from '@/components/ui/magic-text';
import { MagicButton } from '@/components/ui/magic-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send } from 'lucide-react';
import gsap from 'gsap';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const email = 'ichikyube@gmail.com';
  const whatsappNumber = '1234567890'; // Replace with actual WhatsApp number
  
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };
  
  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 100%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-muted/50">
      <div className="container relative px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center contact-content">
            <MagicText className="mb-4 text-3xl font-bold md:text-4xl">
              Let&apos;s Work Together
            </MagicText>
            <p className="text-lg text-muted-foreground">
              Ready to start your next project? Get in touch with us today.
            </p>
          </div>

          <form className="space-y-6 contact-content">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Input placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Input type="email" placeholder="Your Email" />
              </div>
            </div>
            <div className="space-y-2">
              <Textarea placeholder="Your Message" className="min-h-[150px]" />
            </div>
            <div className="flex justify-center">
              <MagicButton size="lg" className="group">
                Send Message
                <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </MagicButton>
            </div>
          </form>

          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 contact-content">
            <button 
              onClick={handleEmailClick}
              className="flex items-center space-x-4 transition-opacity hover:opacity-80"
            >
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold text-left">Email Us</h3>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </button>
            
            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-4 transition-opacity hover:opacity-80"
            >
              <MessageSquare className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold text-left">Chat with Us</h3>
                <p className="text-muted-foreground">Open WhatsApp chat</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}