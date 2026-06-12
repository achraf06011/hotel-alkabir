import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const bookingSchema = z.object({
  roomId: z.string().min(1, 'Chambre requise'),
  checkIn: z.coerce.date({ required_error: 'Date d\'arrivée requise' }),
  checkOut: z.coerce.date({ required_error: 'Date de départ requise' }),
  adults: z.number().min(1, 'Au moins 1 adulte').max(10),
  children: z.number().min(0).max(10),
  guestName: z.string().min(2, 'Nom requis'),
  guestEmail: z.string().email('Email invalide'),
  guestPhone: z.string().optional(),
  guestCountry: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
}).refine(
  (data) => data.checkOut > data.checkIn,
  { message: 'La date de départ doit être après la date d\'arrivée', path: ['checkOut'] }
)

export const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Sujet requis'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(1000),
})

export const roomSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  slug: z.string().min(2, 'Slug requis'),
  description: z.string().min(10, 'Description requise'),
  type: z.enum(['STANDARD', 'DELUXE', 'SUITE', 'PRESIDENTIAL', 'FAMILY', 'HONEYMOON']),
  price: z.number().min(1, 'Prix requis'),
  capacity: z.number().min(1),
  adults: z.number().min(1),
  children: z.number().min(0),
  size: z.number().optional(),
  floor: z.number().optional(),
  bedType: z.string().optional(),
  view: z.string().optional(),
  featured: z.boolean().default(false),
})

export const profileSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type RoomInput = z.infer<typeof roomSchema>
export type ProfileInput = z.infer<typeof profileSchema>
