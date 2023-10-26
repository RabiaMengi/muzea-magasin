import BoiteOeuvre from "@/components/BoiteOeuvre";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Titre from "@/components/Titre";
import { connect } from "@/lib/dataBaseManager";
import { Categorie } from "@/models/Categories";
import { Oeuvre } from "@/models/Oeuvre";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styled from "styled-components";
import { authOptions } from "./api/auth/[...nextauth]";
import { ListeDeSouhait } from "@/models/ListeDeSouhait";
import Chatbot from "@/components/Chatbot";

const GrilleCategorie = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
  }
`;

const TitreCategorie = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #3c2a21;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0;
  h2 {
    margin-bottom: 5px;
    margin-top: 5px ;
  }
  a{
    color: #3c2a21;
    font-style: italic;
    font-size: 15px;
    display: inline-block;
  }
`;

const WrapperCategorie = styled.div`
  margin-bottom: 40px;
`;

const AfficherToutCarre = styled(Link)`
    background-color: #BFB29E ;
    height: 50px;
    width: 150px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #472D2D;
    text-decoration: none;
    &:hover {
    background-color: #1a120b;
    color: #fff;
    transform: scale(1.04);
  }

    
`
export default function PageCategories({ mainCategories, categoriesOeuvres, oeuvresSouhaiter=[] }) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((cat) => (
          <WrapperCategorie>
            <TitreCategorie>
              <h2>{cat.name}</h2>
              {/* <div>
                <Link href={"/categorie/" + cat._id}>Afficher tout </Link>
              </div> */}
            </TitreCategorie>

            <GrilleCategorie key={cat._id}>
              {categoriesOeuvres[cat._id].map((o) => (
                <BoiteOeuvre {...o} souhait={oeuvresSouhaiter.includes(o._id)} />
              ))}
              <AfficherToutCarre href={'/categorie/'+cat._id}>Afficher tout &rarr;</AfficherToutCarre>
            </GrilleCategorie>
          </WrapperCategorie>
        ))}
        <Chatbot />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await connect();
  const categories = await Categorie.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesOeuvres = {}; // catId => [oeuvres]
  const allFetchedOeuvresId =[]
  
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const oeuvres = await Oeuvre.find({ categorie: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });

    allFetchedOeuvresId.push(...oeuvres.map(o => o._id.toString()))
    categoriesOeuvres[mainCat._id] = oeuvres;
  }

    const session = await getServerSession(context.req, context.res, authOptions)
    const oeuvresSouhaiter = session?.user
      ? await ListeDeSouhait.find({
          emailClient: session?.user.email,
          oeuvre: allFetchedOeuvresId,
        })
        : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesOeuvres: JSON.parse(JSON.stringify(categoriesOeuvres)),
      oeuvresSouhaiter: oeuvresSouhaiter.map(item => item.oeuvre.toString()),
    },
  };
}
