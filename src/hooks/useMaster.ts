import { useQuery } from '@tanstack/react-query';
//* services
import { httpClient } from '@/services/api';

export const useRole = (empCode: string) => {
  const getRole = async (empCode: string) => {
    return await httpClient.get(`/${import.meta.env.VITE_API_NAME}/master/role?EmpCode=${empCode}`);
  };

  return useQuery({
    queryKey: ['Role', empCode],
    queryFn: () => getRole(empCode),
    enabled: !!empCode,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 30000, // not to refresh the data from API is 30 seconds
  });
};


