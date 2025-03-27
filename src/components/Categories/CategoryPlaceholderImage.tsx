import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CATEGORY_COLORS } from './COLORS';

// Helper function to get a color from our palette
const getColor = (index: number = 0) => {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
};

// Colorful placeholder with animation using our palette colors
const CategoryPlaceholder = styled(Box, {
  shouldForwardProp: (prop) => !['bgcolor', 'placeholderIndex'].includes(String(prop))
})<{ bgcolor: string; placeholderIndex?: number }>(({ bgcolor, placeholderIndex = 0 }) => {
  const secondaryColor = getColor(placeholderIndex + 1);
  const accentColor = getColor(placeholderIndex + 3);
  
  return {
    height: 280,
    backgroundColor: bgcolor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '200%',
      height: '200%',
      background: `radial-gradient(circle, ${alpha(bgcolor, 0.8)} 0%, ${alpha(secondaryColor, 0.4)} 40%, ${alpha(accentColor, 0.1)} 70%)`,
      top: '-50%',
      left: '-50%',
      animation: 'pulse 8s infinite ease-in-out',
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1) rotate(0deg)' },
      '50%': { transform: 'scale(1.1) rotate(5deg)' },
      '100%': { transform: 'scale(1) rotate(0deg)' },
    }
  };
});

// Styled letter for the placeholder
const PlaceholderLetter = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'textColor'
})<{ textColor?: string }>(({ textColor = '#FFFFFF' }) => ({
  color: textColor,
  fontWeight: 'bold',
  opacity: 0.9,
  textShadow: '0 4px 12px rgba(0,0,0,0.25)',
  fontSize: '5rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '80%',
    height: '8px',
    background: alpha('#FFFFFF', 0.5),
    borderRadius: '4px',
    bottom: '-10px',
    left: '10%',
    filter: 'blur(4px)',
  }
}));

interface CategoryPlaceholderImageProps {
  color?: string;
  letter: string;
  index?: number;
}

const CategoryPlaceholderImage: React.FC<CategoryPlaceholderImageProps> = ({ 
  color, 
  letter,
  index = 0
}) => {
  // If no specific color is provided, use one from our palette based on index
  const backgroundColor = color || getColor(index);
  
  return (
    <CategoryPlaceholder 
      bgcolor={backgroundColor}
      placeholderIndex={index}
    >
      <PlaceholderLetter variant="h1">
        {letter}
      </PlaceholderLetter>
    </CategoryPlaceholder>
  );
};

export default CategoryPlaceholderImage;