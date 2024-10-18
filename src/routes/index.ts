import { Router, Request, Response } from 'express';
import image_routes from './api/image';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to image resizeing API');
});

routes.use('/img', image_routes);

export default routes;