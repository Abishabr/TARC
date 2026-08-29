import { useQuery } from '@tanstack/react-query';

export function usePublications(params?: { year?: string; type?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.year) searchParams.set('year', params.year);
  if (params?.type) searchParams.set('type', params.type);

  return useQuery({
    queryKey: ['publications', params],
    queryFn: async () => {
      const res = await fetch(`/api/v1/publications?${searchParams}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to fetch publications');
      return json.data;
    },
  });
}
