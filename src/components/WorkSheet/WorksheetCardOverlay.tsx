// WorksheetCardOverlay.tsx
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { 
  School as SchoolIcon, 
  Speed as SpeedIcon
} from '@mui/icons-material';
import WorksheetCardActions from './WorksheetCardActions';
import { getDifficultyColor } from './Theme';
import { WorksheetCardOverlayProps } from '../../types/Worksheet';
import { COLORS } from '../../COLORS';
import RatingWidget from './RatingControl';

const WorksheetCardOverlay: React.FC<WorksheetCardOverlayProps> = ({ 
  worksheet, 
  rating
}) => {
  return (
    <Box 
      className="worksheet-overlay"
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: `linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)`,
        p: 2,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: 'black'
      }}
    >
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ 
          fontWeight: 500, 
          mb: 1.5,
          fontSize: '1rem',
          color: 'black',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis'
        }}
      >
        {worksheet.title}
      </Typography>

      {/* Rating */}
      <RatingWidget 
        worksheetId={worksheet.id} 
        initialRating={rating} 
      />

      {/* Tags */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip 
          icon={<SchoolIcon sx={{ fontSize: '0.85rem', color: 'black' }} />} 
          label={worksheet.ageGroup}
          size="small"
          sx={{ 
            borderRadius: 1, 
            fontSize: '0.75rem',
            bgcolor: COLORS[9] + '50',
            color: 'black',
            '& .MuiChip-icon': {
              color: COLORS[2]
            }
          }}
        />
        <Chip 
          icon={<SpeedIcon sx={{ fontSize: '0.85rem', color: 'black' }} />} 
          label={worksheet.difficulty}
          size="small"
          sx={{ 
            borderRadius: 1, 
            fontSize: '0.75rem',
            bgcolor: getDifficultyColor(worksheet.difficulty),
            color: 'black',
            '& .MuiChip-icon': {
              color: 'black'
            }
          }}
        />
      </Box>

      <WorksheetCardActions worksheetId={worksheet.id} />
    </Box>
  );
};

export default WorksheetCardOverlay;
