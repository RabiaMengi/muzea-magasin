import { connect } from "@/lib/dataBaseManager";
import { Configuration } from "@/models/Configuration";

export default async function handle(req, res) {
  await connect();

  const { method } = req;

  if(method === 'GET') {
    const {name} = req.query
    res.json( await Configuration.findOne({name}))
  }
}
