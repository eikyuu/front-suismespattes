import { z } from 'zod';

export const confirmCodeSchema = z.object({
  resetToken: z.string(),
})
