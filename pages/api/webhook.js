import { connect } from "@/lib/dataBaseManager";
import { Commande } from "@/models/Commande";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

export default async function handle(req, res) {
  await connect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      process.env.STRIPE_WEBH_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const commandeId = data.metadata.commandeId;
      const paid = data.payment_status === "paid";
      if (commandeId && paid) {
        await Commande.findByIdAndUpdate(commandeId, {
          payer: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};
