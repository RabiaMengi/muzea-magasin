import { connect } from "@/lib/dataBaseManager";
import { Avis } from "@/models/Avis";

export default async function handle(req, res) {
  await connect();

  const { method } = req;

  if (method === "POST") {
    const { titre, description, etoiles, oeuvre } = req.body;
    res.json(await Avis.create({ titre, description, etoiles, oeuvre }));
  }

  if (method === "GET") {
    const { oeuvre } = req.query;
    res.json(await Avis.find({ oeuvre }, null, {sort:{createdAt: -1}}));
  }
}