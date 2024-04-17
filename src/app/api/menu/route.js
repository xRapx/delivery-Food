import mongoose from "mongoose";
import { Menu } from "../../../models/Menu";

export async function POST(req, res) {
  mongoose.connect(
    "mongodb+srv://huynhminhquan2706:8dn4KAuLbd6CyTcQ@huynhminhquan.zdbqu9w.mongodb.net/foodDelivery"
  );
  const data = await req.json();

  const menu = await Menu.create(data);
  return Response.json(menu);
}

export async function GET(req, res) {
  mongoose.connect(
    "mongodb+srv://huynhminhquan2706:8dn4KAuLbd6CyTcQ@huynhminhquan.zdbqu9w.mongodb.net/foodDelivery"
  );

  const menu = await Menu.find();
  return Response.json(menu);
}
