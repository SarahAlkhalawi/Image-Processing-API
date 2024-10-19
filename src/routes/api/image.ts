import { Router, Request, Response } from 'express';
import { resizeImage } from '../../utils/imageResize';

const image_routes = Router();

image_routes.get('/resize', async (req: Request, res: Response): Promise<void> => {
  const { imageName, width, height } = req.query;

  if (!imageName || !width || !height) {
     res.status(400).send('Missing imageName, width, or height');
     return;
  }

  const widthNum = parseInt(width as string, 10);
  const heightNum = parseInt(height as string, 10);

  if (isNaN(widthNum) || isNaN(heightNum)) {
     res.status(400).send('Width and height must be valid numbers');
     return;
  }

  try {
    const thumbnailPath = await resizeImage(imageName as string, widthNum, heightNum);
    res.sendFile(thumbnailPath);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === 'Image not found') {
         res.status(404).send('Image not found');
         return;
      }
    }
    res.status(500).send('Internal server error');
    return;
  }
});

export default image_routes;