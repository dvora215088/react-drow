import axios from 'axios';

export interface RatingRequest {
  worksheetId: number;
  ratingValue: number;
}

export interface RatingResponse {
  id: number;
  worksheetId: number;
  userId: number;
  ratingValue: number;
  createdAt: string;
}

// הגדרת אינסטנס של axios עם טוקן מה-localStorage
const api = axios.create({
  baseURL: 'https://server-drow.onrender.com',
  withCredentials: true,
});

// מוסיפים interceptor שמוסיף את הטוקן לכל בקשה
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // שים לב ששם המפתח תואם למה שאתה שומר
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export async function createOrUpdateRating(rating: RatingRequest): Promise<RatingResponse> {
  try {
    const response = await api.post<RatingResponse>('/api/ratings', rating);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting rating:', error.response?.data || error.message);
      throw new Error(error.response?.data || 'Failed to submit rating');
    }
    throw error;
  }
}
