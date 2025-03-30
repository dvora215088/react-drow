
interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }
  
  interface LoginResponse {
    token: string;
    user: User;
  }
  
  interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  interface LoginData {
    email: string;
    password: string;
  }
  
  const API_BASE_URL = 'https://server-drow.onrender.com';
  
  export const authService = {
    async register(userData: RegisterData): Promise<User> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || 'Registration failed');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
  
    async login(credentials: LoginData): Promise<LoginResponse> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || 'Login failed');
        }
  
        const data = await response.json();
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
  
    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  
    getCurrentUser(): User | null {
      try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
      } catch (error) {
        console.error('Error getting current user:', error);
        return null;
      }
    },
  
    getToken(): string | null {
      return localStorage.getItem('token');
    },
  
    isAuthenticated(): boolean {
      return !!this.getToken();
    }
  };