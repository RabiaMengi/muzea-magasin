import mongoose, {model, models, Schema} from "mongoose";

const CategorieSchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Categorie" },
  proprietes:[{type:Object}],
});

export const Categorie =
  models?.Categorie || model("Categorie", CategorieSchema);
