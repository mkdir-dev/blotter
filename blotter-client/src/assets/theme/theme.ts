import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 600,
      sm: 767,
      md: 900,
      lg: 1080,
      xl: 1300,
    },
  },
  /*
  palette: {
    primary: {},
    secondary: {},
    info: {},
  },
  */
  typography: {
    // fontFamily: ,
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  },
});
