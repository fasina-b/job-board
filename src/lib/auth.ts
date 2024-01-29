
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
var bcrypt = require('bcryptjs');
 
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign in",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }
        return {
          id: user.id.toString(),
          userid: user.userid.toString(),
          email: user.email.toString(),
          password: user.password.toString(),
          role: user.role.toString(),
          firstname: user.firstname.toString(),
          lastname: user.lastname.toString(),
          dateCreated: user.dateCreated.toString(),
        };

      },
    })
  ],  
  callbacks: {
    session: ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          role: token.role,
          userid: token.userid,
          firstname: token.firstname

        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          role: u.role,
          userid: u.userid,
          firstname: u.firstname
        };
      }
      return token;
    },
  },
};

// Export the handler
export const handler = NextAuth(authOptions) as never;
export { handler as POST };