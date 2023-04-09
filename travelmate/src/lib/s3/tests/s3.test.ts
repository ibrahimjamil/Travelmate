import { getFile } from '..';

describe('S3 lib', () => {
  test('When a file is requested, should return file data', async () => {
    const file = await getFile('seed-files/product_sizes.json');
    expect(file?.type).toBe('application/json');
    expect(file?.body).toBeTruthy();
  });
});
