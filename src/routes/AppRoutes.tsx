import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './RootRoutes';

const AppRoutes = () => {
  return useRoutes([AuthRoutes, MainRoutes]);
};

export default AppRoutes;
