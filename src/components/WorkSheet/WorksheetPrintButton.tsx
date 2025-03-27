import React, { useState } from 'react';
import worksheetService from '../../services/worksheetService';
import { Button, CircularProgress, Alert, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

interface WorksheetPrintButtonProps {
  worksheetId: number;
  buttonText?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const WorksheetPrintButton: React.FC<WorksheetPrintButtonProps> = ({
  worksheetId,
  buttonText = 'הדפס דף עבודה',
  className,
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // שימוש בשירות להורדת דף העבודה
      const blob = await worksheetService.downloadWorksheet(worksheetId);
      
      // יצירת URL עבור הקובץ
      const url = URL.createObjectURL(blob);
      
      // פתיחת חלון חדש לתצוגה והדפסה
      const printWindow = window.open(url, '_blank');
      
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          // המתנה קצרה לטעינת התוכן
          setTimeout(() => {
            printWindow.print();
          }, 500);
        });
        
        // ניקוי משאבים כאשר החלון נסגר
        printWindow.addEventListener('beforeunload', () => {
          URL.revokeObjectURL(url);
        });
      } else {
        throw new Error('הדפדפן חסם את פתיחת החלון. אנא אפשר חלונות קופצים לאתר זה.');
      }
      
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('שגיאה בהדפסת דף העבודה:', err);
      const errorMessage = err.message || 'אירעה שגיאה בהדפסת דף העבודה';
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
        color="secondary"
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PrintIcon />}
        onClick={handlePrint}
        disabled={isLoading}
        className={className}
        sx={{ 
          fontWeight: 'medium',
          borderRadius: 2,
          py: 1,
          px: 2,
          bgcolor: 'grey.700',
          '&:hover': {
            bgcolor: 'grey.800',
          }
        }}
      >
        {isLoading ? 'טוען...' : buttonText}
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mt: 1, width: 'fit-content' }}>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}
    </div>
  );
};

export default WorksheetPrintButton;