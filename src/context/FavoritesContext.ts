// FavoritesContext.ts
import { createContext, ReactNode } from 'react';

// הגדרת טיפוסים התואמים את המודלים בשרת
export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: number;
  // שדות נוספים של המשתמש אם נדרשים
}

export interface Rating {
  id: number;
  // שדות נוספים של דירוג אם נדרשים
}

export interface Worksheet {
  id: number;
  title: string;
  fileUrl: string;
  ageGroup: string;
  difficulty: string;
  ratings: Rating[];
  categoryId: number;
  category: Category;
  userId: number;
  user: User;
}

export interface FavoriteWorksheet {
  id: number;
  userId: number;
  worksheetId: number;
  user: User;
  worksheet: Worksheet;
}

export interface FavoriteResponse {
  success: boolean;
  data?: FavoriteWorksheet;
  error?: string;
}

export interface FavoritesContextType {
  favorites: FavoriteWorksheet[];
  loading: boolean;
  error: string | null;
  isFavorite: (worksheetId: number) => boolean;
  addToFavorites: (worksheetId: number) => Promise<FavoriteResponse>;
  removeFromFavorites: (worksheetId: number) => Promise<FavoriteResponse>;
  toggleFavorite: (worksheetId: number) => Promise<FavoriteResponse>;
  refreshFavorites: () => Promise<void>;
}

export interface FavoritesProviderProps {
  children: ReactNode;
}

// יצירת קונטקסט למועדפים - שים לב שהערך ההתחלתי הוא undefined
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export default FavoritesContext;