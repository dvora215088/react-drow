// WorksheetGalleryHeader.tsx
import React from 'react';
import WorksheetSearchByCategory from './searchWorkSheets';
import { WorksheetGalleryHeaderProps } from '../../types/Worksheet';


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