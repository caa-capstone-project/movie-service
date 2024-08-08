import axios from 'axios';

async function getMovieRatings(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://127.0.0.1:4203/rating/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie ratings:', error.message);
    return null;
  }
}

export default { getMovieRatings };