import { useEvents } from '@/api/hooks/useEvents';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function formatEventDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function formatTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function UpcomingEventsSection() {
  const { data: events, isLoading } = useEvents({ limit: 5, upcoming: true });

  const items = events || [];

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Mark Your Calendar
            </p>
            <h2 className="font-heading text-[32px] lg:text-[48px] font-bold text-foreground leading-[1.05]">
              Upcoming Events
            </h2>
          </div>
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-0 divide-y divide-border border-t border-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-6 py-6">
                <Skeleton className="h-14 w-14 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground py-12">No upcoming events at this time.</p>
        ) : (
          <div className="divide-y divide-border border-t border-border">
            {items.map((event) => (
              <div key={event.id} className="flex gap-6 py-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-primary text-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold leading-none">
                    {formatEventDate(event.startTime || '').split(' ')[1]}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider opacity-80">
                    {formatEventDate(event.startTime || '').split(' ')[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                    {event.startTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(event.startTime)}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 max-w-2xl">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/events"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-[13px] font-medium uppercase tracking-widest text-primary"
        >
          View All Events
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
