import { z } from 'zod';

export const MeiliSearchSchema = z.object({});

export type MeiliSearchType = z.infer<typeof MeiliSearchSchema>;

export type ProductSizeHashType = {
  [key: string]: {
    sizeName: string,
    sizeOrder: number;
  }
};
