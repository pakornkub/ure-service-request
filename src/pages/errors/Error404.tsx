import React from 'react';
import { useNavigate } from 'react-router-dom';
//* mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
//* mui icon
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import HomeIcon from '@mui/icons-material/Home';
//* assets
import logo from '@/assets/images/dx.svg';
//* components
import PageMotion from '@/components/common/PageMotion';
import Credit from '@/components/common/Credit';

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageMotion>
      <Box
        sx={{
          minHeight: '100vh',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{
            minHeight: '100vh',
          }}
        >
          <Grid size={12} sx={{ pl: 3 }}>
            <Box className="w-10" component={'img'} src={logo}></Box>
          </Grid>
          <Grid
            size={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 112px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid size={12} className="-mt-10 md:-mt-20">
              <Stack direction={'column'} spacing={2} className="text-center">
                <Box component={'div'} className="text-center">
                  <WebAssetOffIcon sx={{ fontSize: 200, color: 'gray' }} />
                </Box>
                <Typography variant="h1">404</Typography>
                <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
                <Box component={'div'}>
                  <Button variant="text" startIcon={<HomeIcon className="-mt-1" />} size="medium" onClick={() => navigate(`/${import.meta.env.VITE_BASE_URL}`)}>
                    <Typography className="pt-[0.12rem]">Back Home</Typography>
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
         <Credit/>
        </Grid>
      </Box>
    </PageMotion>
  );
};

export default Error404;
