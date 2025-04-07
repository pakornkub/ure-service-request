import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
//* components
import Loadable from '@/components/common/Loadable';
import DynamicMenu from '@/components/common/DynamicMenu';
//* layouts
import Minimal from '@/layouts/Minimal';
//* errors
const Error404 = Loadable(lazy(() => import('@/pages/errors/Error404')));

const baseURL = import.meta.env.VITE_BASE_URL;

const AuthRoutes = {
  path: '/',
  element: <Minimal />,
  children: [
    {
      index: true,
      replace: true,
      element: <Navigate to={`/${baseURL}`} replace />,
    },
    {
      path: `/${baseURL}`,
      element: <DynamicMenu page={'login'} />,
    },
    {
      path: '/*',
      element: <Error404 />,
    },
    {
      path: `/${baseURL}/*`,
      element: <Error404 />,
    },
  ],
};

export default AuthRoutes;
