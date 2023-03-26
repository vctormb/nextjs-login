import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getSignInUserService } from 'mock/getSignInUserService'

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
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}

export default NextAuth(authOptions)
