import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const ASSETS_DIR = path.join(__dirname, '../..', 'assets');
const FULL_DIR = path.join(ASSETS_DIR, 'full');
const THUMB_DIR = path.join(ASSETS_DIR, 'thumb');

export const resizeImage = async (imageName: string, width: number, height: number) => {
  const fullImagePath = path.join(FULL_DIR, `${imageName}.jpg`);
  const thumbImageName = `${imageName}_${width}_${height}.jpg`; 
  const thumbImagePath = path.join(THUMB_DIR, thumbImageName);

  await fs.ensureDir(THUMB_DIR);

  if (!await fs.pathExists(fullImagePath)) {
    throw new Error('Image not found');
  }

  if (await fs.pathExists(thumbImagePath)) {
    return thumbImagePath; 
  }

  await sharp(fullImagePath)
    .resize(width, height)
    .toFile(thumbImagePath);

  return thumbImagePath; 
};

export default resizeImage;