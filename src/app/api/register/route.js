import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  mongoose.connect(
    "mongodb+srv://huynhminhquan2706:8dn4KAuLbd6CyTcQ@huynhminhquan.zdbqu9w.mongodb.net/foodDelivery"
  );
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }
  //hash password
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
    image: body.image,
  });

  return Response.json(createdUser);
}
