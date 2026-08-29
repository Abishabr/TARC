import { usePublications } from '@/api/hooks/usePublications';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturedPublicationSection() {
  const { data: publications, isLoading } = usePublications();

  const items = (publications || []).slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Our Contributions
            </p>
            <h2 className="font-heading text-[32px] lg:text-[48px] font-bold text-foreground leading-[1.05]">
              Featured Publications
            </h2>
          </div>
          <Link
            to="/publications"
            className="hidden sm:flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            All Publications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-0 divide-y divide-border border-t border-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="py-6">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground py-12">No publications available.</p>
        ) : (
          <div>
            {items.map((pub) => (
              <div
                key={pub.id}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-6 border-t border-border"
              >
                <div className="sm:w-32 flex-shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                    {pub.publicationYear}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] lg:text-[22px] font-semibold text-foreground leading-snug">
                    {pub.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[12px] text-muted-foreground">
                    {pub.authors && (
                      <span>
                        {Array.isArray(pub.authors)
                          ? pub.authors.slice(0, 3).join(', ')
                          : pub.authors}
                      </span>
                    )}
                    {pub.publicationType && (
                      <>
                        <span className="text-border">&middot;</span>
                        <span className="uppercase tracking-widest">{pub.publicationType}</span>
                      </>
                    )}
                  </div>
                  {pub.abstract && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                      {pub.abstract}
                    </p>
                  )}
                </div>
                {pub.doiUrl && (
                  <a
                    href={`https://doi.org/${pub.doiUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1 text-[12px] font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex-shrink-0 self-center"
                  >
                    DOI
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <Link
          to="/publications"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-[13px] font-medium uppercase tracking-widest text-primary"
        >
          View All Publications
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
