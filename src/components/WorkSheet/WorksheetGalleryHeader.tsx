// WorksheetGalleryHeader.tsx
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import WorksheetSearchByCategory from './searchWorkSheets';
import { WorksheetGalleryHeaderProps } from '../../types/Worksheet';
import { COLORS } from '../../COLORS';


const WorksheetGalleryHeader: React.FC<WorksheetGalleryHeaderProps> = ({ 
  categoryId 
}) => {
  return (
    <>
      <WorksheetSearchByCategory categoryId={categoryId} />
        
    </>
  );
};

export default WorksheetGalleryHeader;