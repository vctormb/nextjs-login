import { JWT } from 'next-auth/jwt'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    role?: string
    expiresAt: number
  }

  interface Session {
    error?: 'InvalidTokenError'
    user: {
      role?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    expiresAt: number
    error?: 'InvalidTokenError'
  }
}
