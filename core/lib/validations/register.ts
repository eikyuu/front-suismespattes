import { z } from 'zod';

export const registerSchema = z.object({
    pseudo: z.string().min(3),
    email: z.string().email(),
    password: z.string()
        .min(8)
        .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), {
            message: 'Le mot de passe doit contenir au moins huit caractères avec des chiffres, des lettres et des caractères spéciaux.',
        }),
})