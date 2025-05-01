import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { COLORS } from '../../COLORS';
import Navbar from './navbar';
import InfoPanel from './InfoPanel';
import ImagePanel from './ImagePanel';


// הגדרת ערכת נושא ישירות בקובץ Auth
const theme = createTheme({
  palette: {
    primary: {
      main: COLORS[1], // medium blue
      light: COLORS[0],
      dark: COLORS[2],
      contrastText: '#ffffff',
    },
    secondary: {
      main: COLORS[4], // medium green
      light: COLORS[3],
      dark: COLORS[5],
      contrastText: '#ffffff',
    },
  },
  direction: 'rtl', // הגדרת כיוון טקסט מימין לשמאל
  typography: {
    fontFamily: '"Rubik", "Assistant", "Heebo", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
});

const Auth = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* קונטיינר ראשי - רקע לבן */}
      <Box 
        sx={{
          width: '100%',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          maxWidth: '100vw',
        }}
      >
        {/* נאבבר */}
        <Navbar />
        
        {/* קונטנט ראשי - החלפה בין הפאנלים */}
        <Grid container spacing={4} sx={{ flex: 1, zIndex: 1, p: { xs: 2, md: 4 }, pt: 6, maxWidth: '100%', m: 0 }}>
          {/* פאנל המידע - בצד שמאל וקטן יותר */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoPanel />
          </Grid>
          
          {/* פאנל התמונה - בצד ימין וגדול יותר */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImagePanel />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Auth;