import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "quan@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await getUserByEmail(credentials.username);

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
