import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Icons
import CategoryIcon from '@mui/icons-material/Category';
import BrushIcon from '@mui/icons-material/Brush';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Styled components for beautiful buttons
const NavButton = styled(Button)(({  }) => ({
  borderRadius: 12,
  padding: '12px 20px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    '&::after': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
}));

const NavigationMenu = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // הגדרת אייקונים וסטייל לכל כפתור
  const buttons = [
    {
      id: 'categories',
      label: 'עולם הציור',
      path: '/categories',
      icon: <CategoryIcon />,
      color: '#1976d2', // כחול
      hoverColor: '#0d47a1',
      lightColor: 'rgba(25, 118, 210, 0.08)',
    },
    {
      id: 'gallery',
      label: 'היצירות שלי',
      path: '/my-paintings',
      icon: <BrushIcon />,
      color: '#00897b', // טורקיז
      hoverColor: '#00695c',
      lightColor: 'rgba(0, 137, 123, 0.08)',
    },
    {
      id: 'favorites',
      label: 'אוסף השראה',
      path: '/favorites',
      icon: <FavoriteIcon />,
      color: '#e91e63', // ורוד
      hoverColor: '#c2185b',
      lightColor: 'rgba(233, 30, 99, 0.08)',
    },
  ];

  // אלמנט דקורטיבי - עיגולים קטנים
  const CircleDecoration = ({ index, color }: { index: number; color: string }) => (
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      sx={{
        position: 'absolute',
        width: 8 + index * 2,
        height: 8 + index * 2,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.6 - index * 0.15,
        top: 5 + index * 10,
        left: 5 + index * 8,
        zIndex: 0,
      }}
    />
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1976d2, #00897b, #e91e63)',
          opacity: 0.9,
        }
      }}
    >
      {/* אלמנטים דקורטיביים */}
      {buttons.map((button, i) => (
        [...Array(3)].map((_, j) => (
          <CircleDecoration key={`circle-${i}-${j}`} index={j} color={button.color} />
        ))
      ))}

      <Typography
        variant="h6"
        component="h2"
        sx={{ 
          textAlign: 'center', 
          mb: 3,
          fontWeight: 600,
          color: '#263238',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 2,
            background: 'linear-gradient(90deg, #1976d2, #00897b)',
            borderRadius: 2,
            opacity: 0.7,
          }
        }}
      >
        נווט באמנות
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {buttons.map((button, index) => (
          <Box
            key={button.id}
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <NavButton
              variant={hovered === button.id ? "contained" : "outlined"}
              startIcon={button.icon}
              onClick={() => handleNavigation(button.path)}
              onMouseEnter={() => setHovered(button.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                color: hovered === button.id ? 'white' : button.color,
                backgroundColor: hovered === button.id ? button.color : 'transparent',
                borderColor: button.color,
                '&:hover': {
                  backgroundColor: hovered === button.id ? button.hoverColor : button.lightColor,
                  borderColor: button.hoverColor,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: `linear-gradient(90deg, ${button.color}, transparent)`,
                  opacity: 0.5,
                  transition: 'opacity 0.3s',
                },
                '&:hover::before': {
                  opacity: 0,
                },
              }}
            >
              {button.label}
            </NavButton>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default NavigationMenu;