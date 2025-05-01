// WorksheetCardImage.tsx
import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../../COLORS';
import { WorksheetCardImageProps } from '../../types/Worksheet';

const WorksheetCardImage: React.FC<WorksheetCardImageProps> = ({ 
  worksheet, 
  isLoaded 
}) => {
  return (
    <>
      {isLoaded ? (
        <Box
          component="img"
          className="worksheet-image"
          src={worksheet.fileUrl || '/placeholder-image.jpg'}
          alt={worksheet.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
            target.onerror = null;
          }}
          sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: 2,
            transition: 'all 0.3s ease',
            filter: 'brightness(0.9)', // Slightly darker by default
            '&:hover': {
              filter: 'brightness(1.2)', // White-like brightness on hover
            }
          }}
        />
      ) : (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: COLORS[9] // Using pale blue as background
          }}
        >
          <img 
            src="/placeholder-image.jpg" 
            alt={worksheet.title} 
            style={{ 
              maxHeight: '80%', 
              maxWidth: '80%', 
              objectFit: 'contain',
              transition: 'all 0.3s ease'
            }} 
          />
        </Box>
      )}
    </>
  );
};

export default WorksheetCardImage;