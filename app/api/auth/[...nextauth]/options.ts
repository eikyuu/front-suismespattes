import type { AuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticate } from '@/@core/services/authService'
import { JWT } from 'next-auth/jwt'

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
            if (res && res.token) {
              return res
            }
            return null
          }
        }
      }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
      redirect: async ({ url, baseUrl }) => {
        return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
      },
      jwt: async ({ token, user }: { token: JWT, user?: User }) => {
        if (user) {
          return { ...token, ...user };
        }    
        return token
      },
      session: async ({ session, token } : { session: Session, token: JWT }) => {
        if (token) {
          session.token = token.token
          session.user = token.user as User
        }
        return session
      }
    },
    pages: {
      signIn: '/login',
    }
  }