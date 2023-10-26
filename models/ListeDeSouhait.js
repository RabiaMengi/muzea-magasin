import { model, models, Schema } from "mongoose";
import { Oeuvre } from "@/models/Oeuvre";

const ListeDeSouhaitSchema = new Schema({
  emailClient: { type: String, required: true },
  oeuvre: { type: Schema.Types.ObjectId, ref: Oeuvre },
});

export const ListeDeSouhait =
  models?.ListeDeSouhait || model("ListeDeSouhait", ListeDeSouhaitSchema);