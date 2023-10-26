import { connect } from "@/lib/dataBaseManager";
import { Oeuvre } from "@/models/Oeuvre";

export default async function handle(req, res) {
  await connect();

  const { categories, sort, phrase, ...filtres } = req.query;
  let [sortField, sortOrder] = (sort || '_id-desc').split("-");
  
  const oeuvresQuery = {}
if (categories) {
    oeuvresQuery.categorie = categories.split(",")
}


  if (Object.keys(filtres).length > 0) {
    Object.keys(filtres).forEach((filtreName) => {
      oeuvresQuery["proprietes." + filtreName] = filtres[filtreName];
    });
  }
  if (phrase) {
    oeuvresQuery['$or'] = [
        {name:{$regex:phrase,$options:'i'}},
        {description:{$regex:phrase,$options:'i'}},
    ]
  }

  res.json(
    await Oeuvre.find(oeuvresQuery, null, {
      sort: {
        [sortField]: sortOrder === 'asc' ? 1 : -1,
      },
    })
  );
  
}
