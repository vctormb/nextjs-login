import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
  id: string;
  email: string;
  name: string;
  image?: string;
  role?: string;
};

async function getFakeUser({
  username,
  password,
}: Record<string, string> | undefined = {}): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === "admin@email.com" && password === "123123") {
        resolve({
          id: "1",
          name: "Admin",
          email: username,
          role: "admin",
        });
      } else if (username === "user@email.com" && password === "123123") {
        resolve({
          id: "2",
          name: "Victor Bezerra",
          email: username,
        });
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials): Promise<unknown> {
        const user = await getFakeUser(credentials);

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
