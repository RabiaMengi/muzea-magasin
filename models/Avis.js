import mongoose, { model, Schema, models } from "mongoose";

const AvisSchema = new Schema(
  {
    titre: { type: String },
    description: String,
    etoiles: Number,
    oeuvre: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

export const Avis = models.Avis || model("Avis", AvisSchema);