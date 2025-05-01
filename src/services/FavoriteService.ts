// services/FavoriteService.ts

const API_BASE_URL = 'https://server-drow.onrender.com';

function getToken(): string | null {
    return localStorage.getItem('token');
}

async function getUserFavorites() {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch favorites');
    }

    return await response.json();
}

async function addToFavorites(worksheetId: number) {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ worksheetId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Failed to add favorite');
    }

    return await response.json();
}

async function removeFromFavorites(worksheetId: number) {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/favorites/${worksheetId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to remove favorite');
    }
}

async function checkIfFavorite(worksheetId: number): Promise<boolean> {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/favorites/check/${worksheetId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to check favorite status');
    }

    const data = await response.json();
    return data.isFavorite;
}

const FavoriteService = {
    getUserFavorites,
    addToFavorites,
    removeFromFavorites,
    checkIfFavorite
};

export default FavoriteService;
