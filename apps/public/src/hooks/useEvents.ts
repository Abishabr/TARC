import { useQuery } from '@tanstack/react-query';

export function useEvents(params?: { limit?: number; upcoming?: boolean }) {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.upcoming) searchParams.set('upcoming', 'true');

  return useQuery({
    queryKey: ['events', params],
    queryFn: async () => {
      const res = await fetch(`/api/v1/communication/events?${searchParams}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to fetch events');
      return json.data;
    },
  });
}
