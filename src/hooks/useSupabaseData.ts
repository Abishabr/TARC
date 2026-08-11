import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useSupabaseCollection<T>(key: string | Array<string | number | undefined>, queryFn: () => Promise<T[]>) {
  return useQuery<T[]>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export function useSupabaseMutation<TData, TVariables>(
  key: string | Array<string | number | undefined>,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onMutate?: (variables: TVariables) => Promise<unknown> | unknown
    onSuccessMessage?: string
  },
) {
  const queryClient = useQueryClient()

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onMutate: options?.onMutate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] })
    },
  })
}
