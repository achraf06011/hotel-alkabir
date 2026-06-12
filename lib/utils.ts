import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, differenceInDays, addDays } from 'date-fns'
import { fr } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'MAD'): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string, formatStr = 'dd MMMM yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, formatStr, { locale: fr })
}

export function formatDateRange(checkIn: Date, checkOut: Date): string {
  return `${format(checkIn, 'd MMM', { locale: fr })} – ${format(checkOut, 'd MMM yyyy', { locale: fr })}`
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  return differenceInDays(checkOut, checkIn)
}

export function calculateBookingTotal(pricePerNight: number, nights: number, taxRate = 0.10): {
  subtotal: number
  taxes: number
  total: number
} {
  const subtotal = pricePerNight * nights
  const taxes = subtotal * taxRate
  return {
    subtotal,
    taxes,
    total: subtotal + taxes,
  }
}

export function generateBookingRef(): string {
  const date = new Date()
  const year = date.getFullYear()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `ALK-${year}-${random}`
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getRoomTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    STANDARD: 'Standard',
    DELUXE: 'Deluxe',
    SUITE: 'Suite',
    PRESIDENTIAL: 'Présidentielle',
    FAMILY: 'Familiale',
    HONEYMOON: 'Lune de miel',
  }
  return labels[type] || type
}

export function getBookingStatusLabel(status: string): { label: string; color: string } {
  const statuses: Record<string, { label: string; color: string }> = {
    PENDING: { label: 'En attente', color: 'yellow' },
    CONFIRMED: { label: 'Confirmée', color: 'blue' },
    CHECKED_IN: { label: 'Arrivé', color: 'green' },
    CHECKED_OUT: { label: 'Départ effectué', color: 'gray' },
    CANCELLED: { label: 'Annulée', color: 'red' },
  }
  return statuses[status] || { label: status, color: 'gray' }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const ROOM_TYPES = [
  { value: 'STANDARD', label: 'Standard' },
  { value: 'DELUXE', label: 'Deluxe' },
  { value: 'SUITE', label: 'Suite' },
  { value: 'PRESIDENTIAL', label: 'Présidentielle' },
  { value: 'FAMILY', label: 'Familiale' },
  { value: 'HONEYMOON', label: 'Lune de miel' },
]

export const BOOKING_STATUSES = [
  { value: 'PENDING', label: 'En attente' },
  { value: 'CONFIRMED', label: 'Confirmée' },
  { value: 'CHECKED_IN', label: 'Arrivé' },
  { value: 'CHECKED_OUT', label: 'Départ effectué' },
  { value: 'CANCELLED', label: 'Annulée' },
]
