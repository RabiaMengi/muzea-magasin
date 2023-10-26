import { connect } from "@/lib/dataBaseManager";
import { Commande } from "@/models/Commande";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret =
  "whsec_b7548e80880791f8769fdffc809ee2bb71edad96683a78c48d95ed5034884731";

export default async function handle(req, res) {
  await connect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
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
  res.status(200).send('ok')
}

export const config = {
  api: { bodyParser: false },
};

//noble-zeal-unity-mercy
//acct_1O1k5yD32SDL3Xed
