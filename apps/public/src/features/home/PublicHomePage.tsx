import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedPublicationSection } from './FeaturedPublicationSection';
import { HeroBanner } from './HeroBanner';
import { LatestNewsSection } from './LatestNewsSection';
import { QuickLinksSection } from './QuickLinksSection';
import { StatsSection } from './StatsSection';
import { UpcomingEventsSection } from './UpcomingEventsSection';

function FieldImageSection() {
  return (
    <section className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80"
        alt="Agricultural research field in Ethiopian highlands"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#101712]/60" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 mx-auto max-w-[1440px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
          Research in the Field
        </p>
        <h2 className="font-heading text-[36px] lg:text-[64px] xl:text-[80px] font-bold uppercase tracking-tight text-white leading-[0.9]">
          From Soil
          <br />
          To Society.
        </h2>
        <Link
          to="/research"
          className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-white/80 hover:text-white transition-colors self-start"
        >
          Explore Research
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-40 bg-[#F5F5F0]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <h2 className="font-heading text-[36px] lg:text-[64px] xl:text-[80px] font-bold uppercase tracking-tight text-foreground leading-[0.9]">
          Want To
          <br />
          Know More?
        </h2>
        <div className="mt-12 flex flex-col sm:flex-row items-start gap-6">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-[14px] font-medium uppercase tracking-widest text-primary hover:text-primary/80 transition-colors group"
          >
            Explore Research
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
          >
            Contact TARC
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PublicHomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroBanner />
      <StatsSection />
      <LatestNewsSection />
      <UpcomingEventsSection />
      <FeaturedPublicationSection />
      <FieldImageSection />
      <QuickLinksSection />
      <CTASection />
    </div>
  );
}
