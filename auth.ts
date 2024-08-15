import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/lib/prismadb'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credntials) {
        if (!credntials?.email || !credntials?.password) {
          throw new Error('Invalid email or password')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credntials.email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid user credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credntials.password,
          user.hashedPassword,
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid password')
        }

        return user
      },
    }),
  ],
  pages: { signIn: '/' },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
