// uploadService.ts
const API_BASE_URL = 'https://server-drow.onrender.com';

interface WorksheetData {
  title: string;
  fileUrl: string;
  ageGroup: string;
  difficulty: string;
}

export const uploadService = {
  getPresignedUrl: async (fileName: string): Promise<{ url: string; key: string }> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/upload/presigned-url?fileName=${encodeURIComponent(fileName)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('שגיאה בקבלת presigned URL');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      throw error;
    }
  },

  uploadFileToS3: async (url: string, file: File): Promise<void> => {
    try {
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error('שגיאה בהעלאת הקובץ');
      }
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  },

  saveWorksheet: async (worksheetData: WorksheetData): Promise<void> => {
    try {
      const saveResponse = await fetch(`${API_BASE_URL}/api/worksheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(worksheetData),
      });

      if (!saveResponse.ok) {
        throw new Error('שגיאה בהוספת הקובץ לדאטה-בס');
      }
    } catch (error) {
      console.error('Error saving worksheet:', error);
      throw error;
    }
  },

  handleError: (error: unknown): string => {
    console.error('Upload error:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return 'שגיאת רשת: לא ניתן להתחבר לשרת. בדוק את החיבור לאינטרנט שלך.';
    }
    
    if (error instanceof Error) {
      switch (error.message) {
        case 'שגיאה בקבלת presigned URL':
          return 'שגיאה בהכנת ההעלאה. אנא נסה שוב מאוחר יותר.';
        case 'שגיאה בהעלאת הקובץ':
          return 'לא הצלחנו להעלות את הקובץ. אנא ודא שהקובץ תקין ונסה שוב.';
        case 'שגיאה בהוספת הקובץ לדאטה-בס':
          return 'הקובץ הועלה אך לא הצלחנו לשמור את הפרטים. אנא נסה שוב.';
        default:
          return `שגיאה בהעלאת הקובץ: ${error.message}`;
      }
    }
    
    return 'אירעה שגיאה לא צפויה. אנא נסה שוב מאוחר יותר.';
  }
};