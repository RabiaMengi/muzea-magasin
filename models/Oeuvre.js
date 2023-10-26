import mongoose from "mongoose";

const OeuvreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  categorie: { type: mongoose.Types.ObjectId, ref: "Categorie" },
  proprietes: { type: Object },
}, { timestamps: true });

export const Oeuvre = mongoose.models.Oeuvre || mongoose.model("Oeuvre", OeuvreSchema);
