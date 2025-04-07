import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//* mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material';
//* data
import menus from '@/data/menu';
//* configs
import { drawerWidth, headerHight } from '@/constants/config';
//* components
import Logo from '@/components/common/Logo';
//* css
import './style.css';

interface IDrawerProps {
  setToggled(x: boolean): void;
  toggled: boolean;
  collapsed: boolean;
}

const baseURL = import.meta.env.VITE_BASE_URL;

const MenusRecursive: React.FC<React.PropsWithChildren<any>> = ({ menus, pathname }) => {
  return (
    <>
      {menus?.map((item: any, itemIndex: number) => {
        return (
          <React.Fragment key={itemIndex}>
            {item.type === 'item' ? (
              <MenuItem
                active={pathname?.replace(`/${baseURL}`, '')?.includes(item.url)}
                component={<Link to={`${baseURL}${item.url}`} />}
                icon={item.icon}
              >
                <Typography className="pt-[0.2rem] !text-xs">{item.title}</Typography>
              </MenuItem>
            ) : (
              <SubMenu
                active={pathname?.replace(`/${baseURL}`, '')?.includes(item.id)}
                defaultOpen={pathname?.replace(`/${baseURL}`, '')?.includes(item.id)}
                className={`bg-white dark:bg-gray-800 !text-xs`}
                icon={item.icon}
                label={item.title}
              >
                <MenusRecursive menus={item.children} pathname={pathname} />
              </SubMenu>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const Drawer: React.FC<IDrawerProps> = (props) => {
  const { toggled, collapsed, setToggled } = props;

  const { mode, systemMode } = useColorScheme();
  const isDarkTheme = mode === 'dark' || systemMode === 'dark';

  const { pathname } = useLocation();

  return (
    <Sidebar
      className={`sidebar`}
      width={`${drawerWidth}px`}
      toggled={toggled}
      collapsed={collapsed}
      breakPoint='all'
      onBackdropClick={() => setToggled(false)}
      rootStyles={{
        borderRightColor: !isDarkTheme ? undefined : 'rgb(51,65,85)',
      }}
    >
      <Box
        component={'div'}
        sx={{
          width: collapsed ? 80 : drawerWidth - 1,
          height: headerHight,
        }}
        className={`fixed p-4 border-b border-b-gray-100 dark:border-b-slate-700 flex justify-center z-10 bg-white dark:bg-gray-800`}
      >
        <Box component={'div'} className="w-full">
          <Logo />
        </Box>
      </Box>
      <Menu
        rootStyles={{ paddingTop: headerHight }}
        className={`h-screen bg-white dark:bg-gray-800`}
        menuItemStyles={{
          button: ({ active, disabled, open, level }) => {
            // only apply styles on first level elements of the tree
            if (active) {
              return {
                color: disabled ? undefined : !isDarkTheme ? '#1976D2' : '#29B6F6',
                backgroundColor: active && !open ? (!isDarkTheme ? '#D2E0FB' : '#535C91') : undefined,
                ':hover': {
                  backgroundColor: !isDarkTheme ? '#D2E0FB' : '#535C91',
                },
              };
            } else if (level > 0) {
              return {
                backgroundColor: !isDarkTheme ? '#EEF1FF' : '#51557E',
                ':hover': {
                  backgroundColor: !isDarkTheme ? '#D2E0FB' : '#535C91',
                },
              };
            } else {
              return {
                ':hover': {
                  backgroundColor: !isDarkTheme ? '#D2E0FB' : '#535C91',
                },
              };
            }
          },
        }}
      >
        {menus.items?.map((group: any, groupIndex: number) => {
          return (
            <React.Fragment key={groupIndex}>
              {!collapsed && (
                <Box component={'div'} className="p-4 h-[50px]">
                  <Typography variant="overline" className={`text-gray-500 dark:text-white`}>
                    {group.title}
                  </Typography>
                </Box>
              )}
              <MenusRecursive menus={group.children} pathname={pathname} />
            </React.Fragment>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default Drawer;
