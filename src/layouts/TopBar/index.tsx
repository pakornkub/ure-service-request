import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
//* mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
//* pages
import Header from './Header';
import Drawer from './Drawer';
//* constants
import { headerHight } from '@/constants/config';
//* store
import { useSettingStore } from '@/stores/useSettingStore';
import { useShallow } from 'zustand/react/shallow';

const TopBar: React.FC = () => {
  const { setting, setSetting } = useSettingStore(useShallow((state) => state));

  const [collapsed, setCollapsed] = useState(setting?.theme?.collapsed);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setSetting({ theme: { ...setting?.theme, collapsed } });
  }, [collapsed]);

  return (
    <Box component={'div'} className="flex">
      <CssBaseline />
      <Header setCollapsed={setCollapsed} collapsed={false} setToggled={setToggled} toggled={toggled} />
      <Drawer collapsed={false} toggled={toggled} setToggled={setToggled} />
      <Box component={'div'} sx={{ paddingTop: `${headerHight}px` }} className="h-screen w-full relative">
        <Container maxWidth={'xl'} component={'main'} className="pt-4">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default TopBar;
