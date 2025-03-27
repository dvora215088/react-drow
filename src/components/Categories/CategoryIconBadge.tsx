import React from 'react';
import { Box, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CATEGORY_COLORS } from './COLORS';

// Helper function to get a color from our palette
const getColor = (index: number = 0) => {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
};

// Colorful category icon badge with colors from our palette
const IconBadge = styled(Box, {
  shouldForwardProp: (prop) => !['bgcolor', 'badgeIndex'].includes(String(prop))
})<{ bgcolor?: string; badgeIndex?: number }>(({ theme, bgcolor, badgeIndex = 0 }) => {
  const primaryColor = bgcolor || getColor(badgeIndex);
  const shadowColor = getColor(badgeIndex + 2);
  
  return {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: primaryColor,
    color: '#fff',
    borderRadius: '50%',
    padding: theme.spacing(1.2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 6px 16px ${alpha(shadowColor, 0.25)}`,
    zIndex: 3,
    transition: 'all 0.3s ease',
    border: `2px solid ${alpha('#FFFFFF', 0.8)}`,
    '& svg': {
      transition: 'transform 0.5s ease',
    },
    '&:hover': {
      transform: 'rotate(15deg) scale(1.05)',
      boxShadow: `0 8px 20px ${alpha(shadowColor, 0.4)}`,
    }
  };
});

interface CategoryIconBadgeProps {
  color?: string;
  children: React.ReactNode;
  index?: number;
}

const CategoryIconBadge: React.FC<CategoryIconBadgeProps> = ({
  color,
  children,
  index = 0
}) => {
  // If no specific color is provided, use one from our palette based on index
  const badgeColor = color || getColor(index);
  
  return (
    <IconBadge
      className="category-badge"
      bgcolor={badgeColor}
      badgeIndex={index}
    >
      {children}
    </IconBadge>
  );
};

export default CategoryIconBadge;