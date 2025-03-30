// WorksheetCardActions.tsx
import React from 'react';
import { Box } from '@mui/material';
import WorksheetDownloadButton from './WorksheetDownloadButton';
import WorksheetPrintButton from './WorksheetPrintButton';
import { WorksheetCardActionsProps } from '../../types/Worksheet';
import { COLORS } from '../../COLORS';


const WorksheetCardActions: React.FC<WorksheetCardActionsProps> = ({ 
  worksheetId 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Box 
        sx={{ 
          bgcolor: `${COLORS[6]}50`, // אפור בהיר עם שקיפות
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex'
        }}
      >
        <WorksheetDownloadButton 
          worksheetId={worksheetId}
          buttonText=""
          className="download-button"
        />
        <WorksheetPrintButton
          worksheetId={worksheetId}
          buttonText=""
          className="print-button"
        />
      </Box>
    </Box>
  );
};

export default WorksheetCardActions;