import { authOptions } from "@/libs/authOption";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL);
  }
}

export async function PUT(req) {
  await connectToDB()
  const data = await req.json();
  console.log(data)
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email) return Response.json({error:"User not found"},{status: 404})
    filter = { email };
  }

  const user = await User.findOne(filter);
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });
  console.log("User =>>>",user)

  const newUser = await User.updateOne(filter, { name, image });
  console.log("New User ===> : " ,newUser)

  const newUserInfo = await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });
  console.log("New User Info ===> : " ,newUserInfo)


  return Response.json(true);
}

export async function GET(req) {
  await connectToDB()

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  const user = await User.findOne(filterUser).select("-password").lean();
  if (!user) {
    return Response.json({ message: "User not found." }, { status: 404 });
  }
  const userInfo = await UserInfo.findOne({ email: user.email }).lean()
  if (!userInfo) {
    return Response.json({ message: "User info not found." }, { status: 404 });
  }
  console.log("GET User Infp ===>>>>", userInfo)

  return Response.json({ ...user, ...userInfo });
}
