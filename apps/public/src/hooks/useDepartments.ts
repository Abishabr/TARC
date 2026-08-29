import { useQuery } from '@tanstack/react-query';

export function useDepartments() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await fetch('/api/v1/departments');
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Failed to fetch departments');
      return json.data;
    },
  });
}
