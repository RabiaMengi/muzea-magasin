import mongoose, {model, models, Schema} from "mongoose";

const AdresseSchema = new Schema({
  emailClient: {type:String, unique:true, required:true},
  nom: String,
  courriel: String,
  ville: String,
  codePostal: String,
  adresse: String,
  pays: String,
});

export const Adresse = models?.Adresse || model('Adresse', AdresseSchema);