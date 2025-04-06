import { createTheme } from '@mui/material/styles';
import typography from './typography';

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
  cssVariables: true,
  typography,
});

export default theme;
