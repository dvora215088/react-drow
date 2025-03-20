import React, { useState } from 'react';
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
import { blueGrey } from '@mui/material/colors';

// יצירת תמה בצבעי אפור-כחול-ירוק
const theme = createTheme({
  palette: {
    primary: {
      main: '#546E7A', // כחול-אפור
      light: '#78909C',
      dark: '#37474F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4DB6AC', // טורקיז-ירוק בהיר
      light: '#80CBC4',
      dark: '#00897B',
      contrastText: '#ffffff',
    },
    neutral: {
      main: '#607D8B', // אפור כחלחל
      light: '#B0BEC5',
      dark: '#455A64',
      contrastText: '#ffffff',
    },
    accent: {
      blue: '#42A5F5', // כחול בהיר
      teal: '#26A69A', // טורקיז
      green: '#66BB6A', // ירוק
      blueGray: '#78909C', // אפור כחלחל
      darkGray: '#455A64', // אפור כהה
      lightGray: '#CFD8DC', // אפור בהיר
    },
    background: {
      default: '#ECEFF1', // אפור בהיר מאוד
      paper: '#ffffff',
    },
  },
  direction: 'rtl', // הגדרת כיוון טקסט מימין לשמאל
  typography: {
    fontFamily: '"Rubik", "Assistant", "Heebo", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
});

// אלמנט דקורטיבי עדין
const SubtleElement = ({ index }) => {
  const colors = [
    theme.palette.accent.blue,
    theme.palette.accent.teal,
    theme.palette.accent.green,
    theme.palette.accent.blueGray,
    theme.palette.accent.lightGray,
  ];
  
  const opacity = 0.1 + (Math.random() * 0.15);
  const size = 60 + Math.random() * 100;
  const color = colors[index % colors.length];
  
  return (
    <Box
      sx={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'transparent',
        border: `1px solid ${color}`,
        borderRadius: '50%',
        opacity: opacity,
        filter: 'blur(2px)',
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
  const [hoveredButton, setHoveredButton] = useState(null);
  
  return (
    <ThemeProvider theme={theme}>
      {/* קונטיינר ראשי */}
      <Box 
        sx={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(145deg, #ECEFF1 0%, #CFD8DC 100%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* רקע עדין */}
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
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            zIndex: 1,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PaletteIcon sx={{ fontSize: 28, color: 'primary.main', mr: 2 }} />
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
                    bottom: -5,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #546E7A, #78909C, #4DB6AC, #66BB6A)',
                    borderRadius: 10,
                    opacity: 0.8,
                  }
                }}
              >
צבע בקליק              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button 
                variant="outlined"
                color="primary"
                startIcon={<LoginIcon />}
                onMouseEnter={() => setHoveredButton('login')}
                onMouseLeave={() => setHoveredButton(null)}
                sx={{ 
                  fontWeight: '500',
                  borderRadius: 6,
                  px: 2.5,
                  py: 1,
                  borderWidth: hoveredButton === 'login' ? 2 : 1,
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(84, 110, 122, 0.05)',
                  },
                }}
              >
                התחברות
              </Button>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<PersonAddIcon />}
                onMouseEnter={() => setHoveredButton('register')}
                onMouseLeave={() => setHoveredButton(null)}
                sx={{ 
                  fontWeight: '500',
                  borderRadius: 6,
                  px: 2.5,
                  py: 1,
                  boxShadow: '0 2px 8px rgba(84, 110, 122, 0.2)',
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(84, 110, 122, 0.3)',
                  },
                }}
              >
                הרשמה
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* קונטנט ראשי */}
        <Grid container spacing={4} sx={{ flex: 1, zIndex: 1, p: 4, pt: 6 }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '100%', position: 'relative' }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(55, 71, 79, 0.12)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #546E7A, #4DB6AC, #66BB6A)',
                    opacity: 0.8,
                  }
                }}
              >
                <img 
                  src="src/assets/home.png" 
                  alt="דוגמא לאמנות" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '4px',
                    animation: 'float 8s infinite ease-in-out',
                  }}
                />
                <style jsx>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                  }
                `}</style>
              </Paper>
              
              {/* אלמנטים עדינים מסביב לתמונה */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  right: -10,
                  width: 20,
                  height: 20,
                  backgroundColor: theme.palette.accent.green,
                  opacity: 0.6,
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  left: -15,
                  width: 16,
                  height: 16,
                  backgroundColor: blueGrey,
                  opacity: 0.6,
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Paper 
              elevation={2} 
              sx={{
                p: 5,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 6px 20px rgba(55, 71, 79, 0.08)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(207, 216, 220, 0.7)',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'primary.dark',
                  textAlign: 'center',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
צבע בקליק              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: 'neutral.dark',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                פלטפורמה שקטה ואלגנטית להעלאת והורדת ציורים ויצירות אמנות. הצטרפו לקהילת האמנים שלנו והתחילו לשתף את היצירות שלכם.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mb: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <CloudUploadIcon sx={{ fontSize: 32, color: theme.palette.accent.teal, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: 'neutral.main' }}>
                    העלאת יצירות
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <ImageIcon sx={{ fontSize: 32, color: theme.palette.accent.blue, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: 'neutral.main' }}>
                    גלריות אישיות
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <CloudDownloadIcon sx={{ fontSize: 32, color: theme.palette.accent.green, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: 'neutral.main' }}>
                    הורדת יצירות
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 5 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: 6,
                    px: 3.5,
                    py: 1.2,
                    borderWidth: 1.5,
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    color: 'primary.main',
                    '&:hover': {
                      borderWidth: 1.5,
                      backgroundColor: 'rgba(84, 110, 122, 0.05)',
                    }
                  }}
                >
                  גלה עוד
                </Button>
                
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    borderRadius: 6,
                    px: 3.5,
                    py: 1.2,
                    fontWeight: '500',
                    boxShadow: '0 2px 10px rgba(77, 182, 172, 0.2)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 14px rgba(77, 182, 172, 0.3)',
                    }
                  }}
                >
                  הצטרף עכשיו
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Auth;