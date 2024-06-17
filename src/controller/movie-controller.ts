import { Request, Response, NextFunction } from 'express';
import movieService from '../service/movie-service';

export const listMovie = async (req: Request, res: Response) => {
    const message = await movieService.listMovie();
    res.send(message);
};
