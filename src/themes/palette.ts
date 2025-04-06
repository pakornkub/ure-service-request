import { PaletteOptions } from '@mui/material/styles';

/**
 * example of how to use css variables in MUI theme
 * https://mui.com/material-ui/customization/theming/#css-variables
 */

const palette: PaletteOptions = {
  primary: {
    main: 'rgb(var(--color-primary))',
  },
  secondary: {
    main: 'rgb(var(--color-secondary))',
  },
};

export default palette;
