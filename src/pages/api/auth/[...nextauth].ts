import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getSignInUserService } from 'mock/index'

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials): Promise<unknown> {
        const user = await getSignInUserService(credentials)

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'github') {
        return {
          ...token,
          expiresAt: account.expires_at! * 1000, // converting JWT seconds to milliseconds to compare with Date.now which is in ms
        }
      }

      if (user) {
        // Save the following attributes in the JWT on the initial login
        return {
          ...token,
          role: user?.role,
          expiresAt: user.expiresAt * 1000, // converting JWT seconds to milliseconds to compare with Date.now which is in ms
        }
      }

      if (Date.now() < token.expiresAt) {
        // If the token has not expired yet, return it
        return token
      }

      // If the token has expired, add an error attribute to be handled on the FE side (we could handle the refresh token here).
      return { ...token, error: 'InvalidTokenError' as const }
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.error = token.error
      return session
    },
  },
}

export default NextAuth(authOptions)
