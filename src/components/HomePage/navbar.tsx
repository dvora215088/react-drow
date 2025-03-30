import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaletteIcon from '@mui/icons-material/Palette';
import { COLORS } from '../../COLORS';

const Navbar = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleRegister = () => {
    navigate('/register');
  };
  
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottom: `1px solid ${COLORS[0]}33`, // light blue with transparency
        zIndex: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PaletteIcon sx={{ fontSize: 28, color: COLORS[1], mr: 1.5 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              color: COLORS[1],
              letterSpacing: '0.3px',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -4,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${COLORS[2]}, ${COLORS[1]}, ${COLORS[4]}, ${COLORS[3]})`,
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
                backgroundColor: `${COLORS[0]}0a`, // very light blue with transparency
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
              backgroundColor: COLORS[1],
              boxShadow: `0 3px 10px ${COLORS[1]}40`, // medium blue with transparency
              textTransform: 'none',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                backgroundColor: COLORS[1],
                boxShadow: `0 5px 14px ${COLORS[1]}60`, // medium blue with more opacity
              },
            }}
          >
            הרשמה
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;