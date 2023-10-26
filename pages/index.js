import React from 'react';
import Header from '@/components/Header';
import Vedette from '@/components/Vedette';
import { Oeuvre } from '@/models/Oeuvre';
import { connect } from '@/lib/dataBaseManager';
import NouvellesOeuvres from '@/components/NouvellesOeuvres';
import { ListeDeSouhait } from '@/models/ListeDeSouhait';
import { getServerSession } from 'next-auth';
import { authOptions } from "./api/auth/[...nextauth]";
import { Configuration } from '@/models/Configuration';

export default function HomePage({ oeuvreVedette, nouvellesOeuvres, nouvellesOeuvresSouhait }) {
  return (
    <div>
      <Header />
      <Vedette oeuvre={oeuvreVedette} />
      <NouvellesOeuvres oeuvres={nouvellesOeuvres}
      oeuvresSouhaiter={nouvellesOeuvresSouhait}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  await connect();
  const vedetteOeuvreConfig = await Configuration.findOne({name:'vedetteId' })
  const vedetteId = vedetteOeuvreConfig.value;
  const oeuvreVedette = await Oeuvre.findById(vedetteId);
  const nouvellesOeuvres = await Oeuvre.find({}, null, { sort: { _id: -1 }, limit: 15 });
  //Verification #1 on va trouver le user connecter
  const session = await getServerSession(context.req, context.res, authOptions);
  //Verification #2 on va trouver la liste de souhait relier a ce client
  const nouvellesOeuvresSouhait = session?.user
    ? await ListeDeSouhait.find({
        emailClient: session?.user.email,
        oeuvre: nouvellesOeuvres.map((o) => o._id.toString()),
      })
    : [];
  return {
    props: {
      oeuvreVedette: JSON.parse(JSON.stringify(oeuvreVedette)),
      nouvellesOeuvres: JSON.parse(JSON.stringify(nouvellesOeuvres)),
      nouvellesOeuvresSouhait: nouvellesOeuvresSouhait.map(i => i.oeuvre.toString()),
    },
  };
}
