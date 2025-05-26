import React from 'react';
import { Box } from '@mui/material';
import WorksheetCardImage from './WorksheetCardImage';
import WorksheetCardOverlay from './WorksheetCardOverlay';
import FavoriteButton from './FavoriteButton';
import { WorksheetCardProps } from '../../types/Worksheet';
import { COLORS } from '../../COLORS';

const WorksheetCard: React.FC<WorksheetCardProps> = ({ 
  worksheet, 
  rating, 
  onRatingChange,
  isLoaded
}) => {
 

  return (
    <Box 
      sx={{ 
        position: 'relative',
        transition: 'all 0.3s ease',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          '& .worksheet-overlay': {
            opacity: 1
          },
          '& .worksheet-image': {
            transform: 'scale(1.05)',
            filter: 'brightness(1.2)',
            transition: 'all 0.3s ease'
          }
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative', 
          paddingTop: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          bgcolor: COLORS[6], // Light gray color
          transition: 'all 0.3s ease'
        }}
      >
        {/* Worksheet Image */}
        <WorksheetCardImage 
          worksheet={worksheet} 
          isLoaded={isLoaded} 
        />

        {/* Favorite button */}
        <FavoriteButton 
                  worksheet={worksheet} 

        />
        
        <WorksheetCardOverlay 
          worksheet={worksheet} 
          rating={rating} 
          onRatingChange={onRatingChange} 
        />
      </Box>
    </Box>
  );
};

export default WorksheetCard;