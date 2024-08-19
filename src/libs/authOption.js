import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  secret: process.env.SECRET,
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
       try {
        await  mongoose.connect(process.env.MONGODB_CONNECT_URL);
        const email = credentials?.email;
        const password = credentials?.password;

        console.log("Email:", email);
        console.log("Password:", password);

        const user = await User.findOne({ email });
        console.log(" =>>>>> User found:", user);

        const passwordOk = user && bcrypt.compareSync(password, user.password);
        console.log("=>>>>> Password OK:", passwordOk);

        if (passwordOk) {
          return user; 
        }
        return null;
        
       } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
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
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
