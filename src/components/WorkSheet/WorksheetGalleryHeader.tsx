// WorksheetGalleryHeader.tsx
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import WorksheetSearchByCategory from '../searchDrowa';
import { WorksheetGalleryHeaderProps } from '../../types/Worksheet';
import { CATEGORY_COLORS } from '../Categories/COLORS';


const WorksheetGalleryHeader: React.FC<WorksheetGalleryHeaderProps> = ({ 
  categoryId 
}) => {
  return (
    <>
      <WorksheetSearchByCategory categoryId={categoryId} />
      <Container sx={{ pt: 6, direction: 'rtl' }} maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          fontWeight="300" 
          align="center"
          sx={{ 
            mb: 5, 
            color: CATEGORY_COLORS[2], // Darker blue
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          דפי עבודה
          <Box sx={{ 
            position: 'absolute', 
            width: '50px', 
            height: '3px', 
            bgcolor: CATEGORY_COLORS[5], // Darker green
            bottom: '-10px', 
            left: '50%', 
            transform: 'translateX(-50%)' 
          }} />
        </Typography>
      </Container>
    </>
  );
};

export default WorksheetGalleryHeader;