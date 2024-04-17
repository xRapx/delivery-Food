import { model, models, Schema } from "mongoose";

const MenuSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const Menu = models?.Menu || model("Menu", MenuSchema);
