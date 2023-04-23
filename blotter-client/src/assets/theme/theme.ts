import { createTheme } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { typography } from './typography';
import { palette } from './palette';

export const theme = createTheme({
  breakpoints,
  palette,
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `body { background-color: rgba(247, 221, 185, 0.2) }`,
    },
  },
});
