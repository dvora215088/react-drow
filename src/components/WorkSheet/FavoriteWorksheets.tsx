import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WorksheetCard from './WorksheetCard';
import { useFavorites } from '../../context/FavoriteContext';
import NavigationMenu from '../NavigationMenu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// קומפוננטת לבבות עדינה לרקע
const ElegantBackgroundHearts = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {visible && (
        <>
          {/* לב בפינה ימנית עליונה */}
          <Box
            component={FavoriteBorderIcon}
            sx={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              fontSize: '18px',
              color: 'rgba(113, 128, 150, 0.6)', // אפור כהה
              opacity: 0,
              animation: 'fadeInOut 8s infinite',
              '@keyframes fadeInOut': {
                '0%': { opacity: 0 },
                '20%': { opacity: 0.6 },
                '80%': { opacity: 0.6 },
                '100%': { opacity: 0 }
              },
              zIndex: 0
            }}
          />
          
          {/* לב בפינה שמאלית תחתונה */}
          <Box
            component={FavoriteIcon}
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              fontSize: '14px',
              color: 'rgba(160, 174, 192, 0.5)', // אפור בהיר
              opacity: 0,
              animation: 'fadeInOutDelay 8s infinite 2s',
              '@keyframes fadeInOutDelay': {
                '0%': { opacity: 0 },
                '20%': { opacity: 0.5 },
                '80%': { opacity: 0.5 },
                '100%': { opacity: 0 }
              },
              zIndex: 0
            }}
          />
        </>
      )}
    </>
  );
};

const FavoriteWorksheets: React.FC = () => {
  const { favoriteWorksheets } = useFavorites();
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // הפעלת אנימציה בטעינה הראשונית
  useEffect(() => {
    setShowHeartAnimation(true);
    const timer = setTimeout(() => {
      setShowHeartAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (favoriteWorksheets.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', padding: 3, position: 'relative' }}>
        <Typography variant="h5" sx={{ color: '#4A5568' }}>
          אין דפים מועדפים עדיין.
        </Typography>
        <Box 
          component={FavoriteBorderIcon} 
          sx={{ 
            fontSize: 48, 
            mt: 2, 
            color: 'rgba(74, 85, 104, 0.4)',
            animation: 'pulse 3s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
              '50%': { opacity: 0.6, transform: 'scale(1.05)' }
            }
          }} 
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <NavigationMenu />
      
      {/* רקע לבבות עדין */}
      <ElegantBackgroundHearts />
      
      <Box sx={{ padding: 2 }}>
        {/* כותרת עם לב מרחף */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mb: 4,
            position: 'relative'
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold',
              color: '#4A5568',
              background: 'linear-gradient(90deg, #4A5568 0%, #718096 50%, #A0AEC0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' },
              textAlign: 'center',
              borderBottom: '2px solid #CBD5E0',
              paddingBottom: 1,
            }}
            gutterBottom
          >
            המועדפים שלי
            {/* לב קטן ליד הכותרת */}
            <Box
              component={FavoriteIcon}
              sx={{
                mr: 1,
                ml: 1,
                fontSize: '0.6em',
                verticalAlign: 'middle',
                color: '#A0AEC0',
                opacity: 0.8,
                display: 'inline-flex',
                animation: 'gentleHeartBeat 4s infinite ease-in-out',
                '@keyframes gentleHeartBeat': {
                  '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
                  '50%': { transform: 'scale(1.1)', opacity: 1 }
                }
              }}
            />
          </Typography>
          
          {/* לב מרחף מעל הכותרת */}
          {showHeartAnimation && (
            <Box
              component={FavoriteBorderIcon}
              sx={{
                position: 'absolute',
                top: '-20px',
                fontSize: '16px',
                color: 'rgba(160, 174, 192, 0.7)',
                animation: 'floatUp 3s forwards ease-out',
                '@keyframes floatUp': {
                  '0%': { transform: 'translateY(0)', opacity: 0 },
                  '20%': { opacity: 0.7 },
                  '80%': { opacity: 0.5 },
                  '100%': { transform: 'translateY(-30px)', opacity: 0 }
                }
              }}
            />
          )}
        </Box>

        <Grid 
          container 
          spacing={2} 
          sx={{ justifyContent: 'flex-end' }}
        >
          {favoriteWorksheets.map((worksheet) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={worksheet.id} sx={{ position: 'relative' }}>
              {/* מעטפת לכרטיס עם אפקט לב בהעברת עכבר */}
              <Box
                sx={{
                  position: 'relative',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)'
                  }
                }}
                className="card-container"
              >
                {/* לב שמופיע בהעברת עכבר */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    zIndex: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease, transform 0.2s ease',
                    '.card-container:hover &': { 
                      opacity: 1,
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <Box
                    component={FavoriteIcon}
                    sx={{
                      fontSize: '18px',
                      color: '#FF5A5F',
                      filter: 'drop-shadow(0 0 1px rgba(255,90,95,0.3))'
                    }}
                  />
                </Box>
                
                <WorksheetCard
                  worksheet={worksheet}
                  rating={worksheet.rating || 0}
                  onToggleFavorite={() => {}}
                  onRatingChange={() => {}}
                  isLoaded={true}
                  isFavorite={true}
                  toggleFavorite={() => {}}
                  handleRatingChange={() => {}}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FavoriteWorksheets;