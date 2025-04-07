//* components
import ProtectedRoute from '@/components/common/ProtectedRoute';
import DynamicMenu from '@/components/common/DynamicMenu';
//* layouts
import TopBar from '@/layouts/TopBar';
//* data
import Main from '@/data/menu/root';

const baseURL = import.meta.env.VITE_BASE_URL;

const menusRecursive = (menus: any): any[] => {
  let menusList: any[] = [];

  menus?.forEach((value: any) => {
    if (value.type === 'item') {
      menusList.push({
        path: `/${baseURL}${value.url}`,
        element: (
          <ProtectedRoute>
            <DynamicMenu page={value.id} />
          </ProtectedRoute>
        ),
      });
    } else {
      menusList = [...menusList, ...menusRecursive(value.children)];
    }
  });

  return menusList;
};

const MainRoutes = {
  path: '/',
  element: <TopBar />,
  children: menusRecursive(Main.children),
};

export default MainRoutes;
