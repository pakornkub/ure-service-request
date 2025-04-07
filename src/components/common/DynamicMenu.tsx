import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
//* components
import Loadable from './Loadable';
//* constants
import layout from '@/constants/config';
//* store
import { useAuthStore } from '@/stores/useAuthStore';
import { useShallow } from 'zustand/react/shallow';
//* pages
const Login = Loadable(lazy(() => import('@/pages/auth/Login')));
const ComingSoon = Loadable(lazy(() => import('@/pages/errors/ComingSoon')));

type Props = {
  page: string;
};

const DynamicMenu: React.FC<Props> = ({ page }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { auth } = useAuthStore(useShallow((state) => state));

  const menu: any = {
    login: auth?.status ? <Navigate to={`/${baseURL}/${layout.home}`} replace /> : <Login />,
  };

  return menu?.[`${page}`] || <ComingSoon />;
};

export default DynamicMenu;

// Note : set menu name to dynamic menu
