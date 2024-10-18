import { Router, Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const image_routes = Router();

const ASSETS_DIR = path.join(__dirname, '../../..', 'assets');
const FULL_DIR = path.join(ASSETS_DIR, 'full');
const THUMB_DIR = path.join(ASSETS_DIR, 'thumb');

image_routes.get('/resize', async (req: Request, res: Response) => {
  const { imageName, width, height } = req.query;

  if (!imageName || !width || !height) {
    return res.status(400).send('Missing imageName, width, or height');
  }

  const widthNum = parseInt(width as string, 10);
  const heightNum = parseInt(height as string, 10);

  if (isNaN(widthNum) || isNaN(heightNum)) {
    return res.status(400).send('Width and height must be valid numbers');
  }

//   const imageExtension = 'png' || 'jpeg'; 
  const fullImagePath = path.join(FULL_DIR, `${imageName}.jpg`);
  const thumbImageName = `${imageName}_${widthNum}_${heightNum}.jpg`; 
  const thumbImagePath = path.join(THUMB_DIR, thumbImageName);

  try {
    await fs.ensureDir(THUMB_DIR);

    if (!await fs.pathExists(fullImagePath)) {
      return res.status(404).send('Image not found');
    }

    if (await fs.pathExists(thumbImagePath)) {
      return res.sendFile(thumbImagePath);
    }

    await sharp(fullImagePath)
      .resize(widthNum, heightNum)
      .toFile(thumbImagePath);

    res.sendFile(thumbImagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

export default image_routes;
