import axios from 'axios';

async function getRecommendedMovies(ratings: any): Promise<any> {
  try {
    const response = await axios.post(`${process.env.RECOMMENDATION_SERVICE_URL}`, ratings);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recommended movies:', error.message);
    throw error;
  }
}

export default { getRecommendedMovies };