
import { createTheme } from '@mui/material/styles';
import { CATEGORY_COLORS } from '../Categories/COLORS';

// ייבוא פלטת הצבעים המוכנה

// יצירת פלטת צבעים מותאמת מתוך הצבעים הקיימים
export const colorPalette = {
  primary: {
    main: CATEGORY_COLORS[5],    // ירוק כהה
    light: CATEGORY_COLORS[3],   // ירוק בהיר
    dark: CATEGORY_COLORS[6]     // ירוק עמוק יותר
  },
  secondary: {
    main: CATEGORY_COLORS[2],    // כחול כהה
    light: CATEGORY_COLORS[0],   // כחול בהיר
    dark: CATEGORY_COLORS[14]    // כחול-אפור
  },
  neutral: {
    main: CATEGORY_COLORS[7],    // אפור בינוני
    light: CATEGORY_COLORS[6],   // אפור בהיר
    dark: CATEGORY_COLORS[8]     // אפור כהה
  }
};

// יצירת תימה עם פלטת הצבעים
export const theme = createTheme({
  palette: {
    primary: {
      main: colorPalette.primary.main,
      light: colorPalette.primary.light,
      dark: colorPalette.primary.dark,
    },
    secondary: {
      main: colorPalette.secondary.main,
      light: colorPalette.secondary.light,
      dark: colorPalette.secondary.dark,
    },
    neutral: {
      main: colorPalette.neutral.main,
      light: colorPalette.neutral.light,
      dark: colorPalette.neutral.dark,
    },
  },
});

// פונקציית עזר לקבלת צבע על פי רמת קושי
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'קל':
    case 'קלה':
    case 'easy':
      return CATEGORY_COLORS[3]; // ירוק בהיר
    case 'בינוני':
    case 'בינונית':
    case 'medium':
      return CATEGORY_COLORS[0]; // כחול בהיר
    case 'קשה':
    case 'hard':
      return 'rgba(244, 67, 54, 0.3)'; // אדום שקוף
    default:
      return 'rgba(255,255,255,0.15)'; // לבן שקוף
  }
};