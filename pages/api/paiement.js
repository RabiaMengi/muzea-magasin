import { connect } from "@/lib/dataBaseManager";
import { Oeuvre } from "@/models/Oeuvre";
import { Commande } from "@/models/Commande";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Configuration } from "@/models/Configuration";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { nom, courriel, ville, codePostal, adresse, pays, oeuvresPanier } =
    req.body;
  await connect();

  const idOeuvres = oeuvresPanier;
  const idUnique = [...new Set(idOeuvres)];

  const infoOeuvres = await Oeuvre.find({ _id: idUnique });
  let line_items = [];
  for (const idOeuvre of idUnique) {
    const infoOeuvre = infoOeuvres.find((o) => o._id.toString() === idOeuvre);

    const quantity = idOeuvres.filter((id) => id === idOeuvre).length;
    if (quantity > 0 && infoOeuvre) {
      line_items.push({
        quantity,
        price_data: {
          currency: "CAD",
          product_data: { name: infoOeuvre.name },
          unit_amount: infoOeuvre.price * 100,
        },
      });
    }
  }
  const session = await getServerSession(req, res, authOptions);

  const commandeDoc = await Commande.create({
    line_items,
    nom,
    courriel,
    adresse,
    ville,
    codePostal,
    pays,
    payer: false,
    emailClient: session?.user?.email,
  });
  const fraisLivraisonConfig = await Configuration.findOne({
    name: "fraisLivraison",
  });
  const fraislivraisonCents = parseInt(fraisLivraisonConfig.value || '0') * 100

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: courriel,
    success_url: process.env.PUBLIC_URL + "/succesPaiement",
    metadata: { commandeId: commandeDoc._id.toString() },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "frais de livraison",
          type: "fixed_amount",
          fixed_amount: { amount: fraislivraisonCents, currency: "CAD" },
        },
      },
    ],
  });

  res.json({
    url: stripeSession.url,
  });
}
