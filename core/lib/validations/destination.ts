import * as z from "zod"

export const destinationSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Le nom de la destination doit contenir au moins 3 caractères",
    })
    .max(50, {
      message: "Le nom de la destination doit contenir au plus 50 caractères",
    })
    .trim(),
  description: z
    .string()
    .min(3, {
      message:
        "La description de la destination doit contenir au moins 3 caractères",
    })
    .max(5000, {
      message:
        "La description de la destination doit contenir au plus 500 caractères",
    })
    .trim(),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  waterPoint: z.enum(["YES", "NO"], {
    required_error: "You need to select a notification type.",
  }),
  processionaryCaterpillarAlert: z.enum(["YES", "NO"], {
    required_error: "You need to select a notification type.",
  }),
  cyanobacteriaAlert: z.enum(["YES", "NO"], {
    required_error: "You need to select a notification type.",
  }),
  obligatoryLeash: z.enum(["RECOMANDED", "YES", "NO"], {
    required_error: "You need to select a notification type.",
  }),
  note: z.enum(["0", "1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
  street: z.string(),
  postalCode: z
    .string()
    .min(5, {
      message: "Le code postal doit contenir au moins 5 caractères",
    })
    .max(5, {
      message: "Le code postal doit contenir au plus 5 caractères",
    })
    .regex(/^\d*$/, {
      message: "Le code postal doit contenir uniquement des chiffres",
    }),
  latitude: z.string(),
  longitude: z.string(),
  city: z.string({
    required_error: "Veuillez sélectionner une ville",
  }),
  user: z.string(),
  country: z.string(),
})