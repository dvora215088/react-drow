import React, { useState } from 'react';
import worksheetService from '../../services/worksheetService';
import { Button, CircularProgress, Alert, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface WorksheetDownloadButtonProps {
  worksheetId: number;
  buttonText?: string;
  className?: string;
  fileName?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const WorksheetDownloadButton: React.FC<WorksheetDownloadButtonProps> = ({
  worksheetId,
  buttonText = 'הורד דף עבודה',
  className,
  fileName,
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // שימוש בשירות להורדת דף העבודה
      const blob = await worksheetService.downloadWorksheet(worksheetId);
      
      // יצירת URL עבור הקובץ
      const url = URL.createObjectURL(blob);
      
      // יצירת אלמנט קישור זמני
      const link = document.createElement('a');
      link.href = url;
      
      // וידוא שהקובץ מסתיים בסיומת .png
      const downloadName = fileName ? 
        (fileName.endsWith('.png') ? fileName : `${fileName.split('.')[0]}.png`) : 
        `worksheet-${worksheetId}.png`;
        
      link.setAttribute('download', downloadName);
      
      // הוספה למסמך, לחיצה, וניקוי
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('שגיאה בהורדת דף העבודה:', err);
      const errorMessage = err.message || 'אירעה שגיאה בהורדת דף העבודה';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl">
      <Button
        variant="contained"
        color="primary"
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
        onClick={handleDownload}
        disabled={isLoading}
        className={className}
        sx={{ 
          fontWeight: 'medium',
          borderRadius: 2,
          py: 1,
          px: 2
        }}
      >
        {isLoading ? 'מוריד...' : buttonText}
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mt: 1, width: 'fit-content' }}>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}
    </div>
  );
};

export default WorksheetDownloadButton;