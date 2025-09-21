import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { auth as firebaseAuth } from "@/shared/firebase-auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
} from "@/shared/router/router-paths";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email,
            credentials.password
          );

          if (userCredential.user) {
            const idToken = await userCredential.user.getIdToken();
            const user: User = {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName || null,
              displayName: userCredential.user.displayName || null,
              idToken,
            };

            return user;
          }
          return null;
        } catch (error) {
          console.error("Error signing in:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.idToken = user.idToken;
        //token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //session.user.id = token.uid as string;
        session.idToken = token.idToken as string;
        //session.uid = token.uid as string;
      }
      return session;
    },
  },
  pages: {
    signIn: SIGN_IN_PAGE_PATH,
    signOut: SIGN_UP_PAGE_PATH,
  },
});

export { handler as GET, handler as POST };
