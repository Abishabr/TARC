import { BookOpen, FlaskConical, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 2000): number {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return count;
}

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

function StatItem({ icon: Icon, value, suffix, label }: StatItemProps) {
  const count = useCountUp(value);

  return (
    <div ref={undefined} className="flex flex-col items-center text-center px-6 py-8">
      <Icon className="h-5 w-5 text-primary mb-4" />
      <div className="font-heading text-[40px] lg:text-[48px] font-bold text-foreground leading-none">
        {count}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-2 text-[11px] font-semibold text-muted-foreground tracking-[0.15em] uppercase">
        {label}
      </div>
    </div>
  );
}

const STATS = [
  { icon: FlaskConical, value: 45, suffix: '+', label: 'Research Projects' },
  { icon: Users, value: 30, suffix: '+', label: 'Staff Members' },
  { icon: BookOpen, value: 120, suffix: '+', label: 'Publications' },
];

export function StatsSection() {
  return (
    <section className="border-y border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
