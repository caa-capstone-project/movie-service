import movieDb from '../database/movie-db';
import linkDb from '../database/link-db';
import ratingApi from '../api/rating-api';
import movieRecommendApi from '../api/movie-recommend-api';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';

const listTopRatedMovies = async (userId: string): Promise<any> => {
    console.log('User ID: ', userId);
    try {
        const result = [];
        const movieList = await movieDb.listTopRatedMovies();
        let sortedMovies: any[] = [];
        if(movieList){
            sortedMovies = movieList.sort((a: AttributeMap, b: AttributeMap) => Number(b.vote_average) - Number(a.vote_average));
        }
        
        const top200Movies = sortedMovies.slice(0, 200);
        const ratings = await ratingApi.getMovieRatings(userId) || { ratings: []};

        const pickedMovieIds: number[] = [];
        while(result.length < 10){
            const movie = top200Movies[Math.floor(Math.random() * top200Movies.length)];
            if(!ratings.ratings.find((rating: any) => rating.movieId === movie.id) && !pickedMovieIds.includes(movie.id)){
                result.push({ id: movie.id, poster_path: movie.poster_path });
            }
        }
        return result;
    } catch (err: any) {
        console.log(err.message);
    }
}

const listMovie = async (userId: string): Promise<any> => {
    try {
        const ratings = await ratingApi.getMovieRatings(userId) || { ratings: []};
        // convert to number
        const convertedRating = {
            ratings: ratings.ratings.map((rating: any) => ({
                movieId: Number(rating.movieId),
                rating: Number(rating.rating),
            })),
        };
        const { recommendations } = await movieRecommendApi.getRecommendedMovies(convertedRating);

        const result: any[] = [];
        for (const movieId of recommendations) {
            // Get TMDB ID
            const link = await linkDb.getLink(movieId);
            if(link?.length){
                const movie = await movieDb.getMovie(link[0].tmdbId);
                result.push({ id: movieId, poster_path: movie && movie[0].poster_path });
            }
        }
        return result;
    } catch (err: any) {
        console.log(err.message);
    }
};

export default { listMovie, listTopRatedMovies }
