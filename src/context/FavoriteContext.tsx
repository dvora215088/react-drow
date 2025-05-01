import React, { createContext, useContext, useEffect, useState } from 'react';
import FavoriteService from '../services/FavoriteService';
import { Worksheet } from '../types/Worksheet';

interface FavoriteContextType {
  favoriteIds: number[];
  favoriteWorksheets: Worksheet[];
  toggleFavorite: (worksheet: Worksheet) => Promise<void>;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteWorksheets, setFavoriteWorksheets] = useState<Worksheet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favorites = await FavoriteService.getUserFavorites();
        const ids = favorites.map((f: { worksheetId: number }) => f.worksheetId);
        const worksheets = favorites.map((f: { worksheet: Worksheet }) => f.worksheet);
        setFavoriteIds(ids);
        setFavoriteWorksheets(worksheets);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      } finally {
        setIsLoaded(true);
      }
    }

    if (!isLoaded) {
      fetchFavorites();
    }
  }, [isLoaded]);

  const toggleFavorite = async (worksheet: Worksheet) => {
    try {
      if (favoriteIds.includes(worksheet.id)) {
        await FavoriteService.removeFromFavorites(worksheet.id);
        setFavoriteIds(prev => prev.filter(id => id !== worksheet.id));
        setFavoriteWorksheets(prev => prev.filter(w => w.id !== worksheet.id));
      } else {
        await FavoriteService.addToFavorites(worksheet.id);
        setFavoriteIds(prev => [...prev, worksheet.id]);
        setFavoriteWorksheets(prev => [...prev, worksheet]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favoriteIds, favoriteWorksheets, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
}
