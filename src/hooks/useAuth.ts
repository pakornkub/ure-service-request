import { useMutation } from '@tanstack/react-query';
//* services
import { httpClient } from '@/services/api';
//* store
import { useAuthStore } from '@/stores/useAuthStore';
import { useShallow } from 'zustand/react/shallow';
//* hooks
import Alert from '@/components/common/Alert';

export const useAuthLDAP = () => {
  const { setAuth } = useAuthStore(useShallow((state) => state));

  const getAuthLDAP = async (params: any): Promise<any> => {
    let data = new FormData();

    Object.keys(params).forEach((value) => {
      data.append(value, params[value] || '');
    });

    return await httpClient.post('/ICT/JWT_Authentication_API/AuthLDAP.php', data);
  };

  return useMutation({
    mutationKey: ['AuthLDAP'],
    mutationFn: (params: any) => getAuthLDAP(params),
    onSuccess: (response) => {
      setAuth(response.data);

      if (!response?.data?.status) {
        setAuth({});
      }
    },
    onError: (error: any) => {
      setAuth({});
      Alert({
        type: 'error',
        title: 'System error!',
        message: error?.response?.data?.error || error.message,
      });
    },
  });
};

export const useRefreshToken = () => {
  const { setAuth } = useAuthStore(useShallow((state) => state));

  const getRefreshToken = async (): Promise<any> => {
    return await httpClient.get('/ICT/JWT_Authentication_API/AuthLDAP.php');
  };

  return useMutation({
    mutationKey: ['RefreshToken'],
    mutationFn: getRefreshToken,
    onSuccess: (response) => {
      setAuth(response.data);

      if (!response?.data?.status) {
        setAuth({});
      }
    },
    onError: (error: any) => {
      setAuth({});
      Alert({
        type: 'error',
        title: 'System error!',
        message: error?.response?.data?.error || error.message,
      });
    },
  });
};
