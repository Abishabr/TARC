import { useQuery } from '@tanstack/react-query';

export function useNews(params?: { limit?: number; category?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.category) searchParams.set('category', params.category);

  return useQuery({
    queryKey: ['news', params],
    queryFn: async () => {
      const res = await fetch(`/api/v1/communication/news?${searchParams}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to fetch news');
      return json.data;
    },
  });
}
