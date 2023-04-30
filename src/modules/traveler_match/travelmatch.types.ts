import { z } from 'zod';

export const MatchedTravelerSchema = z.object({
  id: z.number(),
  userId: z.number(),
  recommendedTravelersId: z.number(),
});


export type MatchedTravelerType = z.infer<typeof MatchedTravelerSchema>;