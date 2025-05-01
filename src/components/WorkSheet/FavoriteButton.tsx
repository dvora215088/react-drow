import React from 'react';
import { IconButton } from '@mui/material';
import { 
  Favorite as FavoriteIcon, 
  FavoriteBorder as FavoriteBorderIcon 
} from '@mui/icons-material';
import { Worksheet } from '../../types/Worksheet';
import { useFavorites } from '../../context/FavoriteContext';

interface FavoriteButtonProps {
  worksheet: Worksheet;
  disabled?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  worksheet,
  disabled = false
}) => {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const isFavorite = favoriteIds.includes(worksheet.id);

  const handleToggle = async () => {
    await toggleFavorite(worksheet);
  };

  return (
    <IconButton 
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        bgcolor: 'rgba(255,255,255,0.9)',
        width: 35,
        height: 35,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,1)',
        }
      }}
      onClick={handleToggle}
      disabled={disabled}
      aria-label={isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
    >
      {isFavorite ? (
        <FavoriteIcon sx={{ color: 'red', fontSize: '1.3rem' }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: '#777', fontSize: '1.3rem' }} />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
