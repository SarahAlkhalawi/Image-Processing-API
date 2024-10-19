import { resizeImage } from '../utils/imageResize';
import fs from 'fs-extra';
import path from 'path';

const ASSETS_DIR = path.join(__dirname, '../..', 'assets');
const FULL_DIR = path.join(ASSETS_DIR, 'full');
const THUMB_DIR = path.join(ASSETS_DIR, 'thumb');

describe("Image Resizing", () => {
  const imageName = "testImage"; 
  const height = 300;
  const width = 300;
  const thumbImagePath = path.join(THUMB_DIR, `${imageName}_${width}_${height}.jpg`);

  it("should create a resized image", async () => {
    const resultPath = await resizeImage(imageName, width, height);
    expect(resultPath).toEqual(thumbImagePath);
    const exists = await fs.pathExists(thumbImagePath);
    expect(exists).toBe(true);
  });

  it("should return the existing thumbnail path if it already exists", async () => {
    await resizeImage(imageName, width, height);
    const resultPath = await resizeImage(imageName, width, height);
    
    expect(resultPath).toEqual(thumbImagePath);
  });
});
