import { useNews } from '@/api/hooks/useNews';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function LatestNewsSection() {
  const { data: newsItems, isLoading } = useNews({ limit: 4 });

  const items = newsItems || [];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Latest Updates
            </p>
            <h2 className="font-heading text-[32px] lg:text-[48px] font-bold text-foreground leading-[1.05]">
              News & Announcements
            </h2>
          </div>
          <Link
            to="/news"
            className="hidden sm:flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-0 divide-y divide-border border-t border-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="py-6">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground py-12">No news available yet.</p>
        ) : (
          <div>
            {items.map((item, index) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-6 border-t border-border transition-colors hover:bg-muted/30 -mx-6 px-6 lg:-mx-16 lg:px-16"
              >
                <div className="sm:w-32 flex-shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {formatDate(item.publishedAt || item.createdAt)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {item.category && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[18px] lg:text-[22px] font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                      {item.summary}
                    </p>
                  )}
                </div>
                <div className="hidden sm:flex items-center self-center">
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link
          to="/news"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-[13px] font-medium uppercase tracking-widest text-primary"
        >
          View All News
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
