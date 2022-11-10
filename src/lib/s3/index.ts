import aws from 'aws-sdk';
import { logger } from '../../utils/logger';

const s3 = new aws.S3({
  endpoint: 'https://nyc3.digitaloceanspaces.com/',
  accessKeyId: process.env.SPACES_PUBLIC_KEY,
  secretAccessKey: process.env.SPACES_KEY,
});

/**
 * Get file from S3 file storage
 * @param key Path to the file (e.g. 'seed-file/productVariants.json')
 * @param bucket Bucket name. Defaults to 'merchflow'
 * @returns S3 file object. Body property contains a buffer of the file contents
 */
export const getFile = async (key: string, bucket = 'merchflow') => {
  if (!key) return null;
  const cleanKey = key[0] === '/' ? key.slice(1) : key;
  const params = {
    Bucket: bucket,
    Key: cleanKey,
  };
  const file = await s3
    .getObject(params)
    .promise()
    .catch((err) => {
      logger.error(err);
      return null;
    });
  if (!file) return null;
  const pathArray = key.split('/');
  const name = pathArray[pathArray.length - 1];
  return {
    body: file.Body,
    type: file.ContentType,
    name,
  };
};
