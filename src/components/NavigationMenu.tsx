
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CategoryIcon from '@mui/icons-material/Category';
import BrushIcon from '@mui/icons-material/Brush';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Tooltip from '@mui/material/Tooltip';

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

// כפתור צדדי עדין עם אפקט מגניב
const SideButton = styled(Button)(({ }) => ({
  borderRadius: 8,
  padding: '8px 12px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.85rem',
  position: 'relative',
  minWidth: '0',
  boxShadow: 'none',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)',
    transform: 'translateX(-100%)',
  },
  '&:hover::before': {
    animation: 'shimmer 1.5s infinite',
  },
  '@keyframes shimmer': {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));

const NavigationMenu = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedSideButton, setExpandedSideButton] = useState<string | null>(null);

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
      label: 'משלכם',
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

  // כפתורים צדדיים
  const sideButtons = [
    {
      id: 'upload',
      label: 'העלאת ציור',
      path: '/upload-painting',
      icon: <CloudUploadIcon fontSize="small" />,
      color: '#9e9e9e', // אפור עדין
      hoverColor: '#616161',
      accent: '#4db6ac', // טורקיז בהיר - אקסנט צבע לאפקט המגניב
    },
    {
      id: 'ai-create',
      label: 'יצירה בבינה מלאכותית',
      path: '/ai-creation',
      icon: <AutoFixHighIcon fontSize="small" />,
      color: '#9e9e9e', // אפור עדין
      hoverColor: '#616161',
      accent: '#ba68c8', // סגול - אקסנט צבע לאפקט המגניב
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

  // טיפול בהרחבת כפתורי צד בעת hover
  const handleSideButtonHover = (id: string) => {
    setHovered(id);
    setExpandedSideButton(id);
  };

  const handleSideButtonLeave = () => {
    setHovered(null);
    // כאן אנחנו לא מאפסים את ה-expandedSideButton מיד לאפקט "סגירה" איטי יותר
    setTimeout(() => setExpandedSideButton(null), 600);
  };

  return (<>
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        // הסרת אפקט הצל
        boxShadow: 'none',
        // הסרת הגרדיאנט העליון
        '&::before': {
          content: '""',
          display: 'none', // מבטל את הגרדיאנט העליון
        }
      }}
    >
      {/* אלמנטים דקורטיביים */}
      {buttons.map((button, i) => (
        [...Array(3)].map((_, j) => (
          <CircleDecoration key={`circle-${i}-${j}`} index={j} color={button.color} />
        ))
      ))}

      {/* כפתורים צדדיים במיקום מוחלט */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          zIndex: 3,
        }}
      >
        {sideButtons.map((button) => {
          const isExpanded = expandedSideButton === button.id;
          
          return (
            <Tooltip
              key={button.id}
              title={button.label}
              placement="left"
              arrow
              disableHoverListener={isExpanded}
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              }}
            >
              <Box
                component={motion.div}
                initial={{ x: 20, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  width: isExpanded ? 'auto' : '40px',
                  transition: { duration: 0.3 }
                }}
                style={{
                  overflow: 'hidden',
                  display: 'flex'
                }}
              >
                <SideButton
                  size="small"
                  startIcon={
                    <Box
                      component={motion.div}
                      animate={{ 
                        rotate: isExpanded ? [0, 15, 0, -5, 0] : 0,
                      }}
                      transition={{ 
                        duration: 0.5,
                        repeat: isExpanded ? 0 : 0
                      }}
                      sx={{
                        color: isExpanded ? button.accent : button.color,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {button.icon}
                    </Box>
                  }
                  onClick={() => handleNavigation(button.path)}
                  onMouseEnter={() => handleSideButtonHover(button.id)}
                  onMouseLeave={handleSideButtonLeave}
                  sx={{
                    color: isExpanded ? button.accent : button.color,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: `1px solid ${isExpanded ? button.accent : 'rgba(0, 0, 0, 0.08)'}`,
                    '&:hover': {
                      backgroundColor: 'rgba(250, 250, 250, 1)',
                    },
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    minWidth: '40px',
                    transition: 'all 0.3s ease',
                    px: isExpanded ? 2 : 1,
                    width: '100%',
                  }}
                >
                  <Box
                    component={motion.span}
                    animate={{ 
                      opacity: isExpanded ? 1 : 0,
                      x: isExpanded ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                    sx={{ 
                      marginLeft: '4px',
                      display: 'inline-block',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {button.label}
                  </Box>
                </SideButton>
              </Box>
            </Tooltip>
          );
        })}
      </Box>

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
</>
  );
};

export default NavigationMenu;