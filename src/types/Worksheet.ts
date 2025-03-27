

export interface WorksheetGalleryProps {
  categoryId: string;
}

export interface WorksheetCardProps {
  worksheet: Worksheet;
  isFavorite: boolean;
  rating: number;
  toggleFavorite: (id: number) => void;
  handleRatingChange: (id: number, newValue: number | null) => void;
}
// types.ts
export interface Worksheet {
  id: number;
  title: string;
  fileUrl: string;
  categoryId: number;
  ageGroup: string;
  difficulty: string;
  userId: number;
  fileCategory: number;
  user: string;
  rating?: number;
}

export interface WorksheetGalleryProps {
  categoryId: string;
}

export interface WorksheetCardProps {
  worksheet: Worksheet;
  isFavorite: boolean;
  rating: number;
  onToggleFavorite: (id: number) => void;
  onRatingChange: (id: number, rating: number | null) => void;
  isLoaded: boolean;
}

export interface WorksheetCardImageProps {
  worksheet: Worksheet;
  isLoaded: boolean;
}

export interface WorksheetCardOverlayProps {
  worksheet: Worksheet;
  rating: number;
  onRatingChange: (id: number, rating: number | null) => void;
}

export interface WorksheetCardActionsProps {
  worksheetId: number;
}

export interface WorksheetGalleryHeaderProps {
  categoryId: number;
}

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}