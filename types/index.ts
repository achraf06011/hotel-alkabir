import { Room, RoomImage, Amenity, RoomAmenity, Booking, User, Review, GalleryImage, BlogPost, BlogCategory, Payment } from '@prisma/client'
import 'next-auth'

// ─── NextAuth Extensions ─────────────────────────────────────────────────────
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
    }
  }
  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}

// ─── Room Types ───────────────────────────────────────────────────────────────
export type RoomWithDetails = Room & {
  images: RoomImage[]
  amenities: (RoomAmenity & { amenity: Amenity })[]
  _count?: {
    bookings: number
    reviews: number
  }
}

export type RoomWithPrimaryImage = Room & {
  images: RoomImage[]
}

// ─── Booking Types ────────────────────────────────────────────────────────────
export type BookingWithDetails = Booking & {
  room: RoomWithPrimaryImage
  user?: User | null
  payment?: Payment | null
}

// ─── Review Types ─────────────────────────────────────────────────────────────
export type ReviewWithUser = Review & {
  user?: User | null
  room?: Room | null
}

// ─── Blog Types ───────────────────────────────────────────────────────────────
export type BlogPostWithDetails = BlogPost & {
  author?: User | null
  category?: BlogCategory | null
}

// ─── API Response Types ───────────────────────────────────────────────────────
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── Filter Types ─────────────────────────────────────────────────────────────
export type RoomFilters = {
  type?: string
  minPrice?: number
  maxPrice?: number
  capacity?: number
  checkIn?: string
  checkOut?: string
  adults?: number
  children?: number
}

export type BookingFilters = {
  status?: string
  startDate?: string
  endDate?: string
  search?: string
}

// ─── Stats Types ─────────────────────────────────────────────────────────────
export type DashboardStats = {
  totalRevenue: number
  totalBookings: number
  occupancyRate: number
  totalGuests: number
  revenueChange: number
  bookingsChange: number
  newGuests: number
  avgStayDuration: number
}

// ─── Navigation Types ─────────────────────────────────────────────────────────
export type NavLink = {
  label: string
  href: string
  children?: NavLink[]
}
