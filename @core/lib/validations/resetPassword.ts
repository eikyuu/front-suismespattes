import { z } from 'zod';

export const resetPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
})