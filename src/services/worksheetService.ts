import axios from 'axios';
const API_URL = 'https://server-drow.onrender.com';

interface WorksheetCache {
  worksheets: {
    [categoryId: string]: any[];
  };
}

class WorksheetService {
  private cache: WorksheetCache;

  constructor() {
    // Initialize cache storage
    this.cache = {
      worksheets: {}
    };
  }

  /**
   * מקבל רשימת דפי עבודה לפי קטגוריה
   * @param {string} categoryId - מזהה הקטגוריה
   * @returns {Promise} - חזרה של הדפים
   */
  async getWorksheetsByCategory(categoryId: number) {
    try {
      // Check if we already have this data in cache
      if (this.cache.worksheets[categoryId]) {
        console.log('Returning cached worksheets for category:', categoryId);
        return this.cache.worksheets[categoryId];
      }

      // If not in cache, fetch from API
      console.log('Fetching worksheets for category:', categoryId);
      const response = await axios.get(`${API_URL}/api/worksheets/category/${categoryId}`);
      
      // Store in cache
      this.cache.worksheets[categoryId] = response.data;
      
      return response.data;
    } catch (error) {
      console.error('שגיאה בקבלת דפי עבודה לפי קטגוריה:', error);
      throw error;
    }
  }

  /**
   * מוריד דף עבודה לפי מזהה
   * @param {number} worksheetId - מזהה דף העבודה
   * @returns {Promise<Blob>} - חזרה של הקובץ כ-Blob
   */
  async downloadWorksheet(worksheetId: number) {
    try {
      console.log('Downloading worksheet:', worksheetId);
      const response = await axios.get(`${API_URL}/api/worksheets/${worksheetId}/download`, {
        responseType: 'blob',
        headers: {
          'Authorization':"Bearer "+localStorage.getItem('token')
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('שגיאה בהורדת דף עבודה:', error);
      throw error;
    }
  }

  
 
  /**
   * מנקה את המטמון (cache) עבור קטגוריה מסוימת
   * @param {string | null} categoryId - מזהה הקטגוריה (אופציונלי)
   */
  clearCache(categoryId: string | null = null) {
    if (categoryId) {
      // Clear specific category cache
      if (this.cache.worksheets[categoryId]) {
        delete this.cache.worksheets[categoryId];
      }
    } else {
      // Clear all cache
      this.cache.worksheets = {};
    }
  }

   /**
   * Search worksheets by category with optional filters
   * 
   * @param {Object} params - Search parameters
   * @param {number|null} params.categoryId - Optional category ID to filter by
   * @param {string|null} params.startsWith - Optional letter/string that worksheet titles should start with
   * @param {boolean} params.ascending - Sort order (true for ascending alphabetical, false for descending)
   * @returns {Promise<Array>} - Promise resolving to array of worksheet objects
   */
   async searchByCategory({ categoryId = null, startsWith = null, ascending = true }) {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (categoryId) {
        params.append('categoryId', categoryId);
      }
      
      if (startsWith) {
        params.append('startsWith', startsWith);
      }
      
      params.append('ascending',  ascending.toString());
      
      // Make the API request
      const response = await axios.get(`${API_URL}/api/worksheets/search/category`, { params });
      
      return response.data;
    } catch (error) {
      console.error('Error searching worksheets by category:', error);
      throw error;
    }
  }
  
  /**
   * Get all available categories for worksheets
   * 
   * @returns {Promise<Array>} - Promise resolving to array of category objects
   */
  async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

  }
}

// Create a singleton instance
const worksheetServiceInstance = new WorksheetService();

export default worksheetServiceInstance;