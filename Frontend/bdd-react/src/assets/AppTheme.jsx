import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { TemaUcu } from './TemaUcu';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ TemaUcu }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
