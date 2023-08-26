
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticate } from '@/@core/services/authService'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = await authenticate(credentials.email, credentials.password)
          if (typeof res !== "undefined") {
            return { ...res.user, token: res.token }
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
        session.token = token.token
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

