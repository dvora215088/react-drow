import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PaletteIcon from '@mui/icons-material/Palette';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Extend the Palette interface to include custom properties
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    accent: {
      blue: string;
      teal: string;
      green: string;
      blueGray: string;
      darkGray: string;
      lightGray: string;
    };
  }
  
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    accent?: {
      blue?: string;
      teal?: string;
      green?: string;
      blueGray?: string;
      darkGray?: string;
      lightGray?: string;
    };
  }
}

// יצירת תמה עם רקע לבן וצבעים חזקים יותר
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // כחול חזק
      light: '#42a5f5',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00897b', // טורקיז חזק
      light: '#4db6ac',
      dark: '#00695c',
      contrastText: '#ffffff',
    },
    neutral: {
      main: '#455a64', // כחול-אפור כהה יותר
      light: '#78909c',
      dark: '#263238',
      contrastText: '#ffffff',
    },
    accent: {
      blue: '#2196f3', // כחול חזק
      teal: '#009688', // טורקיז חזק
      green: '#4caf50', // ירוק חזק
      blueGray: '#546e7a', // אפור כחלחל חזק
      darkGray: '#37474f', // אפור כהה
      lightGray: '#eceff1', // אפור בהיר
    },
    background: {
      default: '#ffffff', // רקע לבן
      paper: '#ffffff',
    },
    text: {
      primary: '#263238',
      secondary: '#455a64',
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

// אלמנט דקורטיבי עם צבעים חזקים יותר
interface SubtleElementProps {
  index: number;
}

const SubtleElement = ({ index }: SubtleElementProps) => {
  const colors = [
    theme.palette.accent.blue,
    theme.palette.accent.teal,
    theme.palette.accent.green,
    theme.palette.accent.blueGray,
    theme.palette.accent.lightGray,
  ];
  
  const opacity = 0.1 + (Math.random() * 0.12);
  const size = 60 + Math.random() * 100;
  const color = colors[index % colors.length];
  
  return (
    <Box
      sx={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'transparent',
        border: `2px solid ${color}`,
        borderRadius: '50%',
        opacity: opacity,
        filter: 'blur(1px)',
        transform: `scale(${0.5 + Math.random() * 0.5})`,
        zIndex: 0,
        animation: `float-${index} ${15 + Math.random() * 10}s infinite ease-in-out`,
        '@keyframes float-0': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -20px)' },
        },
        '@keyframes float-1': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-40px, -30px)' },
        },
        '@keyframes float-2': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 40px)' },
        },
        '@keyframes float-3': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-50px, 20px)' },
        },
        '@keyframes float-4': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(60px, 10px)' },
        },
      }}
    />
  );
};

const Auth = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // פונקציות ניתוב
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleRegister = () => {
    navigate('/register');
  };


  
  const handleJoinNow = () => {
    navigate('/register');
  };
  
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
        {/* רקע עדין אך עם צבעים חזקים יותר */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
          {[...Array(5)].map((_, i) => (
            <SubtleElement key={i} index={i} />
          ))}
        </Box>
        
        {/* נאבבר */}
        <AppBar 
          position="static" 
          elevation={0} 
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderBottom: '1px solid rgba(33, 150, 243, 0.2)',
            zIndex: 1,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PaletteIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '600',
                  color: 'primary.main',
                  letterSpacing: '0.3px',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #1976d2, #2196f3, #00897b, #4caf50)',
                    borderRadius: 10,
                    opacity: 0.8,
                  }
                }}
              >
                צבע בקליק
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2.5 }}>
              <Button 
                variant="outlined"
                color="primary"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
                onMouseEnter={() => setHoveredButton("login")}
                onMouseLeave={() => setHoveredButton(null)}
                sx={{ 
                  fontWeight: '500',
                  borderRadius: 8,
                  px: 2,
                  py: 0.8,
                  borderWidth: hoveredButton === 'login' ? 2 : 1,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(33, 150, 243, 0.04)',
                  },
                }}
              >
                התחברות
              </Button>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={handleRegister}
                onMouseEnter={() => setHoveredButton("register")}
                onMouseLeave={() => setHoveredButton(null)}
                sx={{ 
                  fontWeight: '500',
                  borderRadius: 8,
                  px: 2,
                  py: 0.8,
                  boxShadow: '0 3px 10px rgba(25, 118, 210, 0.25)',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 14px rgba(25, 118, 210, 0.35)',
                  },
                }}
              >
                הרשמה
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* קונטנט ראשי - החלפה בין הפאנלים */}
        <Grid container spacing={4} sx={{ flex: 1, zIndex: 1, p: { xs: 2, md: 4 }, pt: 6, maxWidth: '100%', m: 0 }}>
          {/* פאנל המידע - עכשיו בצד שמאל וקטן יותר */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <Paper 
              elevation={1} 
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 6px 20px rgba(33, 150, 243, 0.08)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(33, 150, 243, 0.15)',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: '600',
                  mb: 2,
                  color: 'text.primary',
                  textAlign: 'center',
                  fontSize: { xs: '1.7rem', md: '2rem' },
                }}
              >
                צבע בקליק
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  mb: 3.5,
                  color: 'text.secondary',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  fontSize: '0.95rem',
                }}
              >
                פלטפורמה שקטה ואלגנטית להעלאת והורדת ציורים ויצירות אמנות. הצטרפו לקהילת האמנים שלנו.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3.5 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <CloudUploadIcon sx={{ fontSize: 24, color: theme.palette.accent.teal, mb: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                    העלאת יצירות
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <ImageIcon sx={{ fontSize: 24, color: theme.palette.accent.blue, mb: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                    גלריות אישיות
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <CloudDownloadIcon sx={{ fontSize: 24, color: theme.palette.accent.green, mb: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                    הורדת יצירות
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
             
                
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleJoinNow}
                  sx={{
                    borderRadius: 8,
                    px: 2.5,
                    py: 0.8,
                    fontWeight: '500',
                    boxShadow: '0 2px 10px rgba(0, 137, 123, 0.2)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 14px rgba(0, 137, 123, 0.3)',
                    }
                  }}
                >
                  הצטרף עכשיו
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* פאנל התמונה - עכשיו בצד ימין וגדול יותר */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '100%', position: 'relative', width: '100%' }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(33, 150, 243, 0.15)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #1976d2, #00897b, #4caf50)',
                    opacity: 0.9,
                  }
                }}
              >
                <img 
                  src="src/assets/home.png" 
                  alt="דוגמא לאמנות" 
                  style={{
                    width: '100%',
                    maxHeight: '65vh',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '4px',
                    animation: 'float 8s infinite ease-in-out',
                  }}
                />
                <style>
                  {`
                    @keyframes float {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-8px); }
                    }
                  `}
                </style>
              </Paper>
              
              {/* אלמנטים עדינים מסביב לתמונה */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  right: -10,
                  width: 25,
                  height: 25,
                  backgroundColor: theme.palette.accent.green,
                  opacity: 0.7,
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -12,
                  left: -15,
                  width: 20,
                  height: 20,
                  backgroundColor: theme.palette.accent.blue,
                  opacity: 0.7,
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: -18,
                  width: 15,
                  height: 15,
                  backgroundColor: theme.palette.accent.teal,
                  opacity: 0.6,
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Auth;