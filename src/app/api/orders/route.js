import { isAdmin } from "@/libs/authOption";
import { Menu } from "@/models/Menu";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await Menu.create(data);
    return Response.json(menuItemDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await Menu.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  return Response.json(await Menu.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Menu.deleteOne({ _id });
  }
  return Response.json(true);
}
