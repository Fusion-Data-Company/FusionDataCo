import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { CrmContact } from '@shared/schema';

export function useCrmContacts() {
  return useQuery({
    queryKey: ['/api/crm/contacts'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    staleTime: 30000, // 30 seconds
  });
}

export function useCrmContact(id: number | null) {
  return useQuery({
    queryKey: ['/api/crm/contacts', id],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    staleTime: 30000, // 30 seconds
    enabled: !!id, // Only run the query if id is provided
  });
}