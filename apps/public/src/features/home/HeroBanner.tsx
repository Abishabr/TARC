import { useSettings } from '@/api/hooks/useSettings';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroBanner() {
  const { data: settings } = useSettings();

  const tagline =
    settings?.tagline || 'Pioneering Agricultural Excellence in the Southwest Highlands';
  const description =
    settings?.aboutText ||
    'Advancing sustainable farming practices, discovering high-yield cultivars, and empowering local communities through data-driven research.';

  return (
    <section className="relative bg-[#F5F5F0] pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Tepi Agricultural Research Center
            </p>

            <h1 className="font-heading text-[40px] leading-[1.05] font-bold text-foreground sm:text-[56px] lg:text-[68px] xl:text-[80px]">
              {tagline.split(' ').map((word: string, i: number) => {
                const keywords = ['Excellence', 'Southwest', 'Highlands'];
                const isKeyword = keywords.some((k) =>
                  word.toLowerCase().includes(k.toLowerCase())
                );
                return (
                  <span key={`word-${i}`} className={isKeyword ? 'text-primary' : ''}>
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed">
              {description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Button
                render={<Link to="/research" />}
                className="bg-primary text-white hover:bg-primary/90 text-[13px] uppercase tracking-widest px-8 py-3 rounded-none inline-flex items-center gap-2"
              >
                Explore Research
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                render={<Link to="/about" />}
                className="text-[13px] uppercase tracking-widest px-8 py-3 rounded-none inline-flex items-center gap-2"
              >
                About Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
              alt="Ethiopian agricultural researchers inspecting crops in a research field"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
