
import { createTheme } from '@mui/material/styles';
import { COLORS } from '../../COLORS';

// ייבוא פלטת הצבעים המוכנה

// יצירת פלטת צבעים מותאמת מתוך הצבעים הקיימים
export const colorPalette = {
  primary: {
    main: COLORS[5],    // ירוק כהה
    light: COLORS[3],   // ירוק בהיר
    dark: COLORS[6]     // ירוק עמוק יותר
  },
  secondary: {
    main: COLORS[2],    // כחול כהה
    light: COLORS[0],   // כחול בהיר
    dark: COLORS[14]    // כחול-אפור
  },
  neutral: {
    main: COLORS[7],    // אפור בינוני
    light: COLORS[6],   // אפור בהיר
    dark: COLORS[8]     // אפור כהה
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
    }
  },
});

// פונקציית עזר לקבלת צבע על פי רמת קושי
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'קל':
    case 'קלה':
    case 'easy':
      return COLORS[3]; // ירוק בהיר
    case 'בינוני':
    case 'בינונית':
    case 'medium':
      return COLORS[0]; // כחול בהיר
    case 'קשה':
    case 'hard':
      return 'rgba(244, 67, 54, 0.3)'; // אדום שקוף
    default:
      return 'rgba(255,255,255,0.15)'; // לבן שקוף
  }
};