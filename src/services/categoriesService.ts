import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// הגדרת ה-URL הבסיסי של השרת
const API_BASE_URL: string = 'https://server-drow.onrender.com';

// ייצוא הטיפוסים כדי שאפשר יהיה להשתמש בהם מחוץ לקובץ
export interface Category {
  description: any;
  color: string;
  ageGroup: string,

  categoryId :string,
  difficulty:string,
  fileCategory:string
  fileUrl :string , 
  id: string
  title:string

}

interface PendingPromise {
  resolve: (value: Category[] | PromiseLike<Category[]>) => void;
  reject: (reason?: any) => void;
}

// יצירת פונקציה לקבלת מופע axios עם ההגדרות המתאימות
const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // הוספת interceptor להוספת טוקן האימות לכל בקשה
  api.interceptors.request.use(
    config => {
      // השגת הטוקן מה-localStorage או מכל מקום אחר
      const token = localStorage.getItem('token');

      // הוספת הטוקן לכותרת האימות, אם קיים
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return api;
};

/**
 * שירות לניהול קטגוריות
 */
class CategoryService {
  private categoriesCache: Category[] | null = null;
  private isFetchingCategories: boolean = false;
  private pendingPromises: PendingPromise[] = [];
  private api: AxiosInstance;

  constructor() {
    this.api = createApiInstance();
  }

  /**
   * קבלת כל הקטגוריות - עם מטמון
   * @returns {Promise<Category[]>} מערך של קטגוריות
   */
  async getAllCategories(): Promise<Category[]> {
    // אם יש כבר קטגוריות במטמון, החזר אותן מיד
    if (this.categoriesCache) {
      return this.categoriesCache;
    }

    // אם כבר מתבצעת בקשה לקטגוריות, המתן לתוצאה שלה במקום לשלוח בקשה חדשה
    if (this.isFetchingCategories) {
      return new Promise<Category[]>((resolve, reject) => {
        this.pendingPromises.push({ resolve, reject });
      });
    }

    // סמן שמתבצעת בקשה
    this.isFetchingCategories = true;

    try {
      // שליחת הבקשה לשרת
      const response: AxiosResponse<Category[]> = await this.api.get('/api/categories');

      // שמירת התוצאה במטמון
      this.categoriesCache = response.data;

      // פתרון כל ההבטחות הממתינות עם הנתונים שהתקבלו
      this.pendingPromises.forEach(promise => promise.resolve(this.categoriesCache!));
      this.pendingPromises = [];

      return this.categoriesCache;
    } catch (error) {
      // דחיית כל ההבטחות הממתינות עם השגיאה
      this.pendingPromises.forEach(promise => promise.reject(error));
      this.pendingPromises = [];

      this._handleError(error as Error);
      throw error;
    } finally {
      // סימון שהבקשה הסתיימה
      this.isFetchingCategories = false;
    }
  }

  /**
   * @returns {Promise<Category[]>} מערך מעודכן של קטגוריות
   */
  async refreshCategories(): Promise<Category[]> {
    // איפוס המטמון
    this.categoriesCache = null;
    // קבלת הקטגוריות מחדש
    return this.getAllCategories();
  }

  /**
   * הוספת קטגוריה חדשה ועדכון המטמון
   * @param {Partial<Category>} categoryData - נתוני הקטגוריה החדשה
   * @returns {Promise<Category>} הקטגוריה שנוצרה
   */
  async addCategory(categoryData: Partial<Category>): Promise<Category> {
    try {
      const response: AxiosResponse<Category> = await this.api.post('/api/categories', categoryData);

      // עדכון המטמון אם הוא קיים
      if (this.categoriesCache) {
        this.categoriesCache.push(response.data);
      }

      return response.data;
    } catch (error) {
      this._handleError(error as Error);
      throw error;
    }
  }

  /**
   * עדכון קטגוריה ועדכון המטמון
   * @param {number} id - המזהה של הקטגוריה לעדכון
   * @param {Partial<Category>} categoryData - נתוני הקטגוריה המעודכנים
   * @returns {Promise<Category>} הקטגוריה המעודכנת


  /**
   * טיפול בשגיאות API
   * @private
   * @param {Error} error - אובייקט השגיאה
   */
  private _handleError(error: Error): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        // השרת הגיב עם קוד שגיאה
        console.error('שגיאת שרת:', axiosError.response.data);

        // טיפול בשגיאות אימות
        if (axiosError.response.status === 401) {
          console.error('שגיאת אימות: אנא התחבר מחדש');
          // כאן אפשר להפעיל לוגיקה של ניתוב חזרה לדף ההתחברות
          // למשל: window.location.href = '/login';
        }

        // טיפול בשגיאות הרשאה
        if (axiosError.response.status === 403) {
          console.error('אין לך הרשאות לבצע פעולה זו');
        }
      } else if (axiosError.request) {
        // הבקשה נשלחה אך לא התקבלה תשובה
        console.error('לא התקבלה תשובה מהשרת:', axiosError.request);
      } else {
        // שגיאה בהגדרת הבקשה
        console.error('שגיאה:', axiosError.message);
      }
    } else {
      // שגיאה כללית
      console.error('שגיאה לא מזוהה:', error.message);
    }
  }
}

// יצירת מופע סינגלטון
export const categoryService = new CategoryService();

// ייצוא ברירת מחדל
export default categoryService;