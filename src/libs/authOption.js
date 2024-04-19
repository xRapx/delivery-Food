import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
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
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGODB_CONNECT_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return {
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }
        return null;
      },
    }),
  ],
};
