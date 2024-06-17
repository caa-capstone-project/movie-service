import { Router, Request, Response } from 'express';
import { listMovie } from './controller/movie-controller';

const router = Router();

router.get('/listMovie', listMovie);

export default router;
