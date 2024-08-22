import { Listing, User } from '@prisma/client'

export type safeListing = Omit<Listing, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type safeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type countrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}
