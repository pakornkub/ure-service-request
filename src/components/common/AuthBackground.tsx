import React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material';
//* assets
import backgroundDark from '@/assets/images/patternpad-dark.svg';
import backgroundLight from '@/assets/images/patternpad-light.svg';

const AuthBackground: React.FC = () => {
  const { mode, systemMode } = useColorScheme();

  return (
    <Box component={'div'} className="w-full h-full" sx={{ position: 'absolute', filter: 'blur(10px)', zIndex: -1, bottom: 0 }}>
      <Box
        component="img"
        src={mode === 'dark' || systemMode === 'dark' ? backgroundDark : backgroundLight}
        className="w-full h-full bg-center bg-no-repeat bg-cover"
      />
    </Box>
  );
};

export default AuthBackground;
