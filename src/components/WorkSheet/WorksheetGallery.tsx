// WorksheetGallery.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Container, CircularProgress, Alert, Snackbar } from '@mui/material';
import { theme } from './Theme';
import WorksheetCard from './WorksheetCard';
import WorksheetGalleryHeader from './WorksheetGalleryHeader';
import { Worksheet, WorksheetGalleryProps } from '../../types/Worksheet';
import worksheetServiceInstance from '../../services/worksheetService';
import NavigationMenu from '../NavigationMenu';

const WorksheetGallery: React.FC<WorksheetGalleryProps> = ({ categoryId }) => {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchWorksheets = async () => {
      try {
        setLoading(true);
        const data = await worksheetServiceInstance.getWorksheetsByCategory((categoryId));
        setWorksheets(data);
        
        if (isFirstRender.current) {
          const initialLoadState: Record<number, boolean> = {};
          const initialFavorites: Record<number, boolean> = {};
          const initialRatings: Record<number, number> = {};
          
          const savedFavorites = localStorage.getItem('worksheet_favorites');
          const savedRatings = localStorage.getItem('worksheet_ratings');
          
          if (savedFavorites) {
            try {
              const parsedFavorites = JSON.parse(savedFavorites);
              Object.assign(initialFavorites, parsedFavorites);
            } catch (e) {
              console.error('Error parsing saved favorites', e);
            }
          }
          
          if (savedRatings) {
            try {
              const parsedRatings = JSON.parse(savedRatings);
              Object.assign(initialRatings, parsedRatings);
            } catch (e) {
              console.error('Error parsing saved ratings', e);
            }
          }
          
          data.forEach((worksheet: { id: any; rating: number; }) => {
            initialLoadState[worksheet.id] = true;
            // If not in saved favorites, initialize to false
            if (!(worksheet.id in initialFavorites)) {
              initialFavorites[worksheet.id] = false;
            }
            // If not in saved ratings, initialize to 0
            if (!(worksheet.id in initialRatings)) {
              initialRatings[worksheet.id] = worksheet.rating || 0;
            }
          });
          
          setLoadedImages(initialLoadState);
          setFavorites(initialFavorites);
          setRatings(initialRatings);
          isFirstRender.current = false;
        }
        
        setError(null);
      } catch (err) {
        setError('שגיאה בטעינת דפי העבודה. אנא נסה שוב מאוחר יותר.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorksheets();
  }, []);

  // Function to toggle favorite
  const toggleFavorite = (id: number) => {
    const newFavorites = { ...favorites, [id]: !favorites[id] };
    setFavorites(newFavorites);
    
    // Save to localStorage
    localStorage.setItem('worksheet_favorites', JSON.stringify(newFavorites));
    
    // Show snackbar notification
    setSnackbarMessage(newFavorites[id] ? 'דף עבודה נוסף למועדפים' : 'דף עבודה הוסר מהמועדפים');
    setSnackbarOpen(true);
  };

  // Function to handle rating change
  const handleRatingChange = (id: number, newValue: number | null) => {
    if (newValue === null) return;
    
    const newRatings = { ...ratings, [id]: newValue };
    setRatings(newRatings);
    
    // Save to localStorage
    localStorage.setItem('worksheet_ratings', JSON.stringify(newRatings));
    
    // Show snackbar notification
    setSnackbarMessage('הדירוג נשמר בהצלחה');
    setSnackbarOpen(true);
  };

  // Function to close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
      </ThemeProvider>
    );
  }

  if (worksheets.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Alert severity="info" sx={{ m: 2 }}>לא נמצאו דפי עבודה בקטגוריה זו</Alert>
      </ThemeProvider>
    );
  }

  return (
    <><NavigationMenu></NavigationMenu>
    <ThemeProvider theme={theme}>
      <>
        <WorksheetGalleryHeader categoryId={parseInt(categoryId)} />
        
        <Container sx={{ py: 6, direction: 'rtl' }} maxWidth="lg">
          <Grid container spacing={5}>
            {worksheets.map((worksheet) => (
              <Grid item xs={12} sm={6} md={4} key={worksheet.id}>
                <WorksheetCard
                        worksheet={worksheet}
                        isFavorite={favorites[worksheet.id]}
                        rating={ratings[worksheet.id]}
                        onToggleFavorite={toggleFavorite}
                        onRatingChange={handleRatingChange}
                        isLoaded={loadedImages[worksheet.id]} toggleFavorite={function (): void {
                            throw new Error('Function not implemented.');
                        } } handleRatingChange={function (_id: number, _newValue: number | null): void {
                            throw new Error('Function not implemented.');
                        } }                />
              </Grid>
            ))}
          </Grid>
          
          {/* Snackbar for notifications */}
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </Container>
      </>
    </ThemeProvider></>
  );
};

export default WorksheetGallery;