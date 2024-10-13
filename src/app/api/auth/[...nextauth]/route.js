import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User.js";
import connect from "@/utils/db.js";

// Configure NextAuth options
export const authOptions = {
  providers: [
    // Credentials Provider for Email and Password authentication
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();

        try {
          // Find the user in the database by email
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            // Check if the password matches the hashed password in the database
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              // Return the user object if authentication is successful
              return user;
            } else {
              // Return null if password is incorrect
              return null;
            }
          } else {
            // Return null if user not found
            return null;
          }
        } catch (err) {
          console.error("Error during authorization:", err);
          throw new Error("Authorization failed.");
        }
      },
    }),

    // GitHub Provider for OAuth Login
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

// Define the NextAuth handler and export it for both GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };