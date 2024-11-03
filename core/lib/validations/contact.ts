import { z } from 'zod';

export const contactSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  subject: z
    .string()
    .min(3, { message: "Le sujet doit contenir au moins 3 caractères" }),
  message: z
    .string()
    .min(10, {
      message: "Le message doit contenir au moins 10 caractères.",
    })
    .max(500, {
      message: "Le message doit contenir au plus 500 caractères.",
    }),
})