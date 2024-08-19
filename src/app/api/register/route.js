import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(req) {

  const body = await req.json()
  console.log(body)

  try{
    await mongoose.connect(process.env.MONGODB_CONNECT_URL)
    console.log("Connect to mongogDB")

    const {email,password} = body;

    // Check email
    const checkEmail = await User.findOne({email})
    if(checkEmail){
      return  Response.json({error: "Email already exists"},{status: 400})
    }

    // check Password
    if(!password || password.length < 5) {
      return  Response.json({error :" Password must be at least 5 characters "},{status: 400})
    }

    // hash Password 
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password , salt)

    // create new user
    const createdUser = await User.create({...body, password: hashPassword})
    console.log(createdUser)
    return  Response.json((createdUser),{status: 201})

  }catch(error){
    return  Response.json({error:"Internal Server Error"},{status:500})
  }
}


