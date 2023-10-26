import { connect } from "@/lib/dataBaseManager"
import { Oeuvre } from "@/models/Oeuvre"

export default async function handle(req, res) {
    await connect()
    const ids = req.body.ids
    res.json(await Oeuvre.find({_id:ids}))

}