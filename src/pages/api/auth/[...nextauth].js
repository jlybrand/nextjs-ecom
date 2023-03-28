import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../dbModels/user";
import dbConnection from "../utils/dbConnection";

export default NextAuth({
  // Enable JSON Web Tokens since sessions not stored in DB
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      // This credentials object is used to generate next-auth's default login page
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        dbConnection();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("No user with a matching email was found.");
        }

        // Use the comparePassword method defined in dbModels/user.js file to authenticate
        const pwValid = await user.comparePassword(credentials.password);

        if (!pwValid) {
          throw new Error("Your password is invalid");
        }

        return user;
      },
    }),
  ],
  // Add user information to be accessible for our app in the token/session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    // To access any extra user info from sessions, pass it the token
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
