import { useQuery } from '@tanstack/react-query';

export function useStaff(params?: { departmentId?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.departmentId) searchParams.set('departmentId', params.departmentId);

  return useQuery({
    queryKey: ['staff', params],
    queryFn: async () => {
      const res = await fetch(`/api/v1/staff?${searchParams}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to fetch staff');
      return json.data;
    },
  });
}
