import { createTheme } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { typography } from './typography';

export const theme = createTheme({
  breakpoints,
  /*
  palette: {
    primary: {},
    secondary: {},
    info: {},
  },
  */
  typography,
});
