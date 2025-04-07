import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//* mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//* mui icon
import LogoutIcon from '@mui/icons-material/Logout';
//* store
import { useAuthStore } from '@/stores/useAuthStore';
import { useShallow } from 'zustand/react/shallow';

const Profile: React.FC = () => {
  const { auth, setAuth } = useAuthStore(useShallow((state) => state));

  const navigate = useNavigate();

  const settings = ['LOGOUT'];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleSignOut = (): void => {
    setAuth({});
    navigate(`/${import.meta.env.VITE_BASE_URL}`);
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: (theme: any) => (String(import.meta.env.VITE_BASE_URL).search('test') < 0 ? theme.palette.info.dark : theme.palette.error.dark),
        paddingTop: 0.3,
        fontSize: 12,
        '&:hover': {
          bgcolor: (theme: any) => (String(import.meta.env.VITE_BASE_URL).search('test') < 0 ? theme.palette.info.main : theme.palette.error.main),
        },
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open Profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar {...stringAvatar(auth?.data?.fullname)} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box className="pl-4 pr-4 pb-2 pt-2 w-[200px]">
          <Stack direction={'column'} spacing={0.5} className="mb-4">
            <Typography variant="body1" className="overflow-hidden text-ellipsis whitespace-nowrap text-primary-main">
              {auth?.data?.fullname}
            </Typography>
            <Typography variant="caption" className="overflow-hidden text-ellipsis whitespace-nowrap ">
              บริษัท : {auth?.data?.email?.search('ube') ? 'UBE' : '-'}
            </Typography>
            <Typography variant="caption" className="overflow-hidden text-ellipsis whitespace-nowrap ">
              แผนก : {auth?.data?.OrgTDesc3}
            </Typography>
            <Typography variant="caption" className="overflow-hidden text-ellipsis whitespace-nowrap ">
              ตำแหน่ง : {auth?.data?.position}
            </Typography>
          </Stack>
          <Divider />
        </Box>
        {settings?.map((setting) => (
          <MenuItem key={setting} onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">{setting}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
