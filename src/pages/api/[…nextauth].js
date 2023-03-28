import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers";
import User from "./dbModels/user";
import dbConnection from "./utils/dbConnection";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        dbConnection();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        const passwordValid = await user.comparePassword(credentials.password);

        if (!passwordValid) {
          throw new Error("Invalid password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user.id,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
