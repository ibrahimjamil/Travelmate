// Nock is only used for tests so it belongs in dev dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import nock from 'nock';
import cron from 'node-cron';
import server from '../../src/server';
import { VendorProductStyle } from '../../src/modules/vendors/vendorProductStyles/vendorProductStyles.model';
import { VendorProductVariant } from '../../src/modules/vendors/vendorProductVariants/vendorProductVariants.model';
import { ProductVariant } from '../../src/modules/products/productVariant/productVariant.model';
import { ProductVariantDelta } from '../../src/modules/products/productVariantDelta/productVariantDelta.model';
import { ProductBrand } from '../../src/modules/products/productBrand/productBrand.model';
import { ProductStyle } from '../../src/modules/products/productStyle/productStyle.model';

/**
 * Shuts down and cleans up test server
 * @internal
 */
export const cleanupServer = async () => {
  const cronTasks = cron.getTasks();
  cronTasks.forEach((task) => {
    task.stop();
  });
  await server.stop();
  nock.enableNetConnect();
};

export const cleanupProducts = async () => {
  await VendorProductStyle.query().delete()
  await VendorProductVariant.query().delete()
  await ProductVariant.query().delete()
  await ProductVariantDelta.query().delete()
  await ProductStyle.query().delete()
  await ProductBrand.query().delete()
};

export default cleanupServer;
