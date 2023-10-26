import { connect } from "@/lib/dataBaseManager";
import { getServerSession } from "next-auth";
import {  authOptions } from "./auth/[...nextauth]";
import { Adresse } from "@/models/Adresse";

export default async function handle(req, res) {
  await connect();
  const { method } = req;

  //On va chercher le user Google connecte
  const { user } = await getServerSession(req, res, authOptions);
  //On regarde si le client Google a deja sauvegarder Info Compte avec le meme courriel que Google
  const adresse = await Adresse.findOne({ emailClient: user.email });

  if (method === "PUT") {
    if (adresse) {
      res.json(await Adresse.findByIdAndUpdate(adresse._id, req.body));
    } else {
      res.json(await Adresse.create({ emailClient: user.email, ...req.body }));
    }
  }

  if (method === "GET") {
    res.json(adresse);
  }
}