import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
//* mui
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
//* pages
import Header from './Header';
import Drawer from './Drawer';
//* constants
import { headerHight, drawerMiniWidth, drawerWidth } from '@/constants/config';
//* store
import { useSettingStore } from '@/stores/useSettingStore';
import { useShallow } from 'zustand/react/shallow';

const SideBar: React.FC = () => {
  const { setting, setSetting } = useSettingStore(useShallow((state) => state));
  const theme = useTheme();
  const isResponsiveTheme = useMediaQuery(theme.breakpoints.down('md'));

  const [collapsed, setCollapsed] = useState(setting?.theme?.collapsed);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setSetting({ theme: { ...setting?.theme, collapsed } });
  }, [collapsed]);

  return (
    <Box component={'div'} className="flex">
      <CssBaseline />
      <Header setCollapsed={setCollapsed} collapsed={collapsed} setToggled={setToggled} toggled={toggled} />
      <Drawer collapsed={collapsed} toggled={toggled} setToggled={setToggled} />
      <Box
        component={'div'}
        sx={{ marginLeft: isResponsiveTheme ? 0 : !collapsed ? `${drawerWidth}px` : `${drawerMiniWidth}px`, paddingTop: `${headerHight}px` }}
        className="h-screen w-full relative"
      >
        <Box component={'main'} className="p-4">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
