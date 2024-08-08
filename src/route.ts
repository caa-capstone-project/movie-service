import { Router, Request, Response } from 'express';
import { listMovie } from './controller/movie-controller';

const router = Router();

router.get('/listMovie/:userId', listMovie);

export default router;
