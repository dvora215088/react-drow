import React from 'react';
import { 
  Typography, 
  Paper, 
  Box,
  
  useTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';
// Styled components
const ImagePlaceholder = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(5),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
  borderRadius: 16,
  color: theme.palette.text.secondary,
  border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
}));

interface EmptyCategoriesViewProps {
  onCreateNewCategory?: () => void;
}

const EmptyCategoriesView: React.FC<EmptyCategoriesViewProps> = ({ 
}) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 8, 
        textAlign: 'center',
        bgcolor: 'rgba(255,255,255,0.8)', 
        backdropFilter: 'blur(10px)',
        borderRadius: 6,
        border: `2px dashed ${alpha(theme.palette.primary.main, 0.15)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          borderColor: alpha(theme.palette.primary.main, 0.25),
        }
      }}
    >

      <ImagePlaceholder>
        <PaletteIcon sx={{ 
          fontSize: 80, 
          mb: 3, 
          opacity: 0.8,
          color: theme.palette.primary.main,
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          אין קטגוריות להצגה
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
          הקטגוריות שיתווספו יופיעו כאן בעיצוב מרהיב
        </Typography>
       
      </ImagePlaceholder>
    </Paper>
  );
};

export default EmptyCategoriesView;