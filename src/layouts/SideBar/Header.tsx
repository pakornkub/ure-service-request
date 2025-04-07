import React, { useEffect, useCallback } from 'react';
//* mui
import { useTheme, styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
//* configs
import { headerHight, drawerWidth, drawerMiniWidth } from '@/constants/config';
//* components
import Profile from '@/components/common/Profile';
import ColorModeIconDropdown from '@/components/common/ColorModeIconDropdown';

interface IHeaderProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
  setCollapsed(x: boolean): void;
  collapsed: boolean;
  setToggled(x: boolean): void;
  toggled: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  collapsed?: boolean;
  isResponsiveTheme?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'collapsed' && prop !== 'isResponsiveTheme',
})<AppBarProps>(({ theme, collapsed, isResponsiveTheme }) => ({
  width: `calc(100% - ${drawerMiniWidth}px)`,
  //! Code for Test
  //backgroundColor: 'darkred',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(collapsed && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${!isResponsiveTheme ? drawerWidth : 0}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ElevationScroll = (props: IHeaderProps) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children as any, {
    elevation: trigger ? 4 : 0,
  });
};

const Header: React.FC<IHeaderProps> = (props) => {
  const { setCollapsed, collapsed, setToggled, toggled } = props;

  const { mode, systemMode } = useColorScheme();

  const theme = useTheme();
  const isResponsiveTheme = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawer = useCallback((): void => {
    if (isResponsiveTheme) {
      setToggled(!toggled);
      setCollapsed(false);
    } else {
      setCollapsed(!collapsed);
    }
  }, [isResponsiveTheme, toggled, collapsed]);

  useEffect(() => {
    if (isResponsiveTheme) {
      setToggled(false);
      setCollapsed(false);
    } else {
      setCollapsed(collapsed);
    }
  }, [isResponsiveTheme]);

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          collapsed={!collapsed}
          isResponsiveTheme={isResponsiveTheme}
          color={mode === 'dark' || systemMode === 'dark' ? 'default' : 'primary'}
          enableColorOnDark
          sx={{ height: headerHight }}
          className="flex justify-center"
        >
          <Toolbar variant="dense">
            <IconButton onClick={handleDrawer} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" className="w-full line-clamp-1">
              {import.meta.env.VITE_TITLE.toUpperCase()}
            </Typography>
            <Box component={'div'} className="flex justify-end items-center gap-6">
              <ColorModeIconDropdown />
              <Profile />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
