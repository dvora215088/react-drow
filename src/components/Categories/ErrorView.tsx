import React from 'react';
import { 
  Typography, 
  Paper, 
  Box,
  Button,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';
import CategoryIcon from '@mui/icons-material/Category';
import { COLORS } from '../../COLORS';

// Constants from our color palette
const PRIMARY_BLUE = COLORS[2]; // darker blue
const LIGHT_BLUE = COLORS[0]; // light blue
const MEDIUM_GREEN = COLORS[4]; // medium green
const MEDIUM_GRAY = COLORS[7]; // medium gray

// Styled components with our palette
const EmptyPaper = styled(Paper)(() => ({
  padding: 64, // 8 * 8
  textAlign: 'center',
  backgroundColor: alpha('#FFFFFF', 0.8),
  backdropFilter: 'blur(10px)',
  borderRadius: 24,
  border: `2px dashed ${alpha(LIGHT_BLUE, 0.25)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha('#FFFFFF', 0.9),
    boxShadow: `0 10px 30px ${alpha(MEDIUM_GRAY, 0.15)}`,
    borderColor: alpha(PRIMARY_BLUE, 0.3),
  }
}));

const ImagePlaceholder = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 40, // 5 * 8
  background: `linear-gradient(135deg, ${alpha(LIGHT_BLUE, 0.1)} 0%, ${alpha(MEDIUM_GREEN, 0.1)} 100%)`,
  borderRadius: 16,
  color: MEDIUM_GRAY,
  border: `2px dashed ${alpha(LIGHT_BLUE, 0.25)}`,
}));

const CreateButton = styled(Button)(() => ({
  borderRadius: 12,
  padding: '9.6px 24px', // equivalent to py: 1.2, px: 3
  backgroundColor: PRIMARY_BLUE,
  color: '#FFFFFF',
  boxShadow: `0 6px 15px ${alpha(PRIMARY_BLUE, 0.25)}`,
  '&:hover': {
    backgroundColor:COLORS[1], // medium blue
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 20px ${alpha(PRIMARY_BLUE, 0.3)}`
  },
  transition: 'all 0.3s ease'
}));

interface EmptyCategoriesViewProps {
  onCreateNewCategory?: () => void;
}

const EmptyCategoriesView: React.FC<EmptyCategoriesViewProps> = ({ 
  onCreateNewCategory 
}) => {
  return (
    <EmptyPaper elevation={0}>
      <ImagePlaceholder>
        <PaletteIcon sx={{ 
          fontSize: 80, 
          mb: 3, 
          opacity: 0.8,
          color: MEDIUM_GREEN,
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        }} />
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: PRIMARY_BLUE
          }}
        >
          אין קטגוריות להצגה
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: MEDIUM_GRAY,
            maxWidth: 500, 
            mx: 'auto', 
            mb: 3 
          }}
        >
          הקטגוריות שיתווספו יופיעו כאן בעיצוב מרהיב
        </Typography>
        <CreateButton
          variant="contained"
          size="large"
          startIcon={<CategoryIcon />}
          onClick={onCreateNewCategory}
        >
          צור קטגוריה חדשה
        </CreateButton>
      </ImagePlaceholder>
    </EmptyPaper>
  );
};

export default EmptyCategoriesView;