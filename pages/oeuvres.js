import Center from "@/components/Center";
import GrilleOeuvres from "@/components/GrilleOeuvres";
import Header from "@/components/Header";
import Titre from "@/components/Titre";
import { connect } from "@/lib/dataBaseManager";
import { Oeuvre } from "@/models/Oeuvre";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { ListeDeSouhait } from "@/models/ListeDeSouhait";

export default function pageOeuvres({ oeuvres, oeuvresSouhaiter }) {
  return (
    <>
      <Header />
      <Center>
        <Titre>Toutes les Œuvres</Titre>

        <GrilleOeuvres 
          oeuvres={oeuvres}
          oeuvresSouhaiter={oeuvresSouhaiter} 
        />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await connect();
  const oeuvres = await Oeuvre.find({}, null, { sort: { _id: -1 } });

  const session = await getServerSession(context.req, context.res, authOptions)
  const oeuvresSouhaiter = session?.user
    ? await ListeDeSouhait.find({
        emailClient: session?.user.email,
        oeuvre: oeuvres.map((o) => o._id.toString()),
      })
    : [];
  return {
    props: {
      oeuvres: JSON.parse(JSON.stringify(oeuvres)),
      oeuvresSouhaiter: oeuvresSouhaiter.map(item => item.oeuvre.toString())
    },
  };
}
