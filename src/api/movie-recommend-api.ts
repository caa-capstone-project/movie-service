import axios from 'axios';

async function getRecommendedMovies(ratings: any): Promise<any> {
  try {
    const response = await axios.post(`http://127.0.0.1:4201/recommend`, ratings);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recommended movies:', error.message);
    throw error;
  }
}

export default { getRecommendedMovies };