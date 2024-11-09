import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';


export const TemaUcu = createTheme({

  palette: {
    primary: {
      main: '#213761'
    },
    secondary: {
      main: '#767276'
    },
    error: {
      main: red.A400
    }
  }
});
