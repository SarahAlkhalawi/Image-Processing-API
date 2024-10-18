// // Create a mock Express app
// const app = express();
// app.use('/img', image_routes);

import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing the img endpoint', () => {
  it('Using the endpoint without providing the imageName parameter returns 400', async () => {
    await request.get('/img/resize').expect(400);
  });

  it('Using the endpoint with a non-existent image returns 404', async () => {
    await request.get('/img/resize?imageName=TestNotFound&width=200&height=200').expect(404);
  });

  it('Using the endpoint with a valid image returns 200', async () => {
    await request.get('/img/resize?imageName=fjord&width=200&height=200').expect(200);
  });
});