import React, { useState } from 'react';
import { Box, Rating, Snackbar, Alert } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { COLORS } from '../../COLORS';
import { createOrUpdateRating } from '../../services/ratingService';

interface RatingWidgetProps {
  worksheetId: number;
  initialRating?: number;
}

const RatingWidget: React.FC<RatingWidgetProps> = ({ worksheetId, initialRating = 0 }) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleRatingChange = async (_event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);

    try {
      await createOrUpdateRating({
        worksheetId,
        ratingValue: newValue ?? 0,
      });

      setSnackbar({
        open: true,
        message: 'הדירוג נשמר בהצלחה!',
        severity: 'success',
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || 'אירעה שגיאה בעת שליחת הדירוג',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating
        name={`rating-${worksheetId}`}
        value={rating}
        precision={1}
        max={5}
        icon={<Star sx={{ color: COLORS[12] }} fontSize="small" />}
        emptyIcon={<StarBorder sx={{ color: 'rgba(0,0,0,0.3)' }} fontSize="small" />}
        onChange={handleRatingChange}
        size="small"
        sx={{
          '& .MuiRating-iconFilled': {
            transition: 'all 0.3s ease',
            transform: 'scale(1.1)',
          },
          '& .MuiRating-iconHover': {
            color: 'black !important',
          },
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RatingWidget;