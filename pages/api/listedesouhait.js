import { connect } from "@/lib/dataBaseManager";
import { ListeDeSouhait } from "@/models/ListeDeSouhait";
import { getServerSession } from "next-auth";
import {  authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  connect();
  const {user}  = await getServerSession(req, res, authOptions); // nous donne le user qui save dans la wishlist
  const { method } = req;
  if (method === "POST") {
    const { oeuvre } = req.body; // nous donne l'id de l'oeuvre
    const souhaitDoc = await ListeDeSouhait.findOne({
      emailClient: user.email,
      oeuvre,
    });

    if (souhaitDoc) {
      await ListeDeSouhait.findByIdAndDelete(souhaitDoc._id);
      res.json({souhaitDoc}); // si on trouve deja le id dans wishlist + quon envois un post = ENLEVE DE LA LISTE
    } else {
      await ListeDeSouhait.create({ emailClient: user.email, oeuvre });
    }
    res.json(true);
  }

  if (method === "GET") {
    res.json(
      await ListeDeSouhait.find({ emailClient: user.email }).populate("oeuvre")
    );
    // en faisant populate on obtient lobjet au complet de loeuvre dans la wishlist et non juste le id,
  }
}