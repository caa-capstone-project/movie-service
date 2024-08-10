import axios from 'axios';

async function getMovieRatings(userId: string): Promise<any> {
  try {
    const url = process.env.RATING_SERVICE_URL + userId
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie ratings:', error.message);
    return null;
  }
}

export default { getMovieRatings };