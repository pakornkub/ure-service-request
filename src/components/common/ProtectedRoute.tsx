import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
//* store
import { useAuthStore } from '@/stores/useAuthStore';
import { useRoleStore } from '@/stores/useRoleStore';
import { useShallow } from 'zustand/react/shallow';
//* components
import IdleTimerContainer from './IdleTimerContainer';
//* hooks
import { useRole } from '@/hooks/useMaster';

type Props = {
  children: React.ReactNode;
  redirectPath?: string;
};

const ProtectedRoute: React.FC<Props> = ({ children, redirectPath = `/${import.meta.env.VITE_BASE_URL}` }: Props) => {
  const { auth } = useAuthStore(useShallow((state) => state));
  const { setRole } = useRoleStore(useShallow((state) => state));

  const { data: roleData, isPending } = useRole(auth.data?.empcode);

  useEffect(() => {
    if (!isPending && roleData?.data?.success) {
      setRole(roleData?.data.data);
    }
  }, [isPending, roleData]);

  return (
    <>
      <IdleTimerContainer>{auth?.status ? children : <Navigate to={redirectPath} replace />}</IdleTimerContainer>
    </>
  );
};

export default ProtectedRoute;
