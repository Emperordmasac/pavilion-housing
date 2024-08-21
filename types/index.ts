import { User } from '@prisma/client'

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
