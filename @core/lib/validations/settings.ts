import { z } from 'zod';

export const settingsSchema = z.object({
    pseudo: z.string().min(3),
    email: z.string().email(),
})