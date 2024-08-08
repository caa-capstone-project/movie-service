import { Request, Response, NextFunction } from 'express';
import movieService from '../service/movie-service';

export const listMovie = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const message = await movieService.listTopRatedMovies(userId);
    res.send(message);
};
