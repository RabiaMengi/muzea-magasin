import { connect } from "@/lib/dataBaseManager";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Commande } from "@/models/Commande";

export default async function handle (req,res){

    await connect();
    const {user} = await getServerSession(req,res,authOptions);
    res.json(
        await Commande.find({emailClient:user.email})
    )
}