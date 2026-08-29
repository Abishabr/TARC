import { useQuery } from '@tanstack/react-query';

export function useProjects(params?: { programId?: string; status?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.programId) searchParams.set('programId', params.programId);
  if (params?.status) searchParams.set('status', params.status);

  return useQuery({
    queryKey: ['projects', params],
    queryFn: async () => {
      const res = await fetch(`/api/v1/research/projects?${searchParams}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to fetch projects');
      return json.data;
    },
  });
}
