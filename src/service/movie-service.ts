import movieDb from '../database/movie';

const listMovie = async (): Promise<any> => {
    try {
        const movieList = await movieDb.listMovie();
        return movieList;
    } catch (err: any) {
        throw err;
    }
};

export default { listMovie }
