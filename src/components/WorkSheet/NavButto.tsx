import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

// כפתור ניווט מעוצב
const StyledNavButton = styled(Button)(({}) => ({
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

interface NavButtonProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  lightColor: string;
  hovered: string | null;
  index: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  id,
  label,
  icon,
  color,
  hoverColor,
  lightColor,
  hovered,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <Box
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      sx={{ width: { xs: '100%', sm: 'auto' } }}
    >
      <StyledNavButton
        variant={hovered === id ? "contained" : "outlined"}
        startIcon={icon}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          color: hovered === id ? 'white' : color,
          backgroundColor: hovered === id ? color : 'transparent',
          borderColor: color,
          '&:hover': {
            backgroundColor: hovered === id ? hoverColor : lightColor,
            borderColor: hoverColor,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: `linear-gradient(90deg, ${color}, transparent)`,
            opacity: 0.5,
            transition: 'opacity 0.3s',
          },
          '&:hover::before': {
            opacity: 0,
          },
        }}
      >
        {label}
      </StyledNavButton>
    </Box>
  );
};
