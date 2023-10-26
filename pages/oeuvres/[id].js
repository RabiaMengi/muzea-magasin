import OeuvreAvis from "@/components/AvisOeuvre";
import BoiteBlanche from "@/components/BoiteBlanche";
import Center from "@/components/Center";
import Chatbot from "@/components/Chatbot";
import FlyingButton from "@/components/FlyingButton";
import Header from "@/components/Header";
import ImagesOeuvre from "@/components/ImagesOeuvre";
import Titre from "@/components/Titre";
import IconPanier from "@/components/icons/IconPanier";
import { connect } from "@/lib/dataBaseManager";
import { Oeuvre } from "@/models/Oeuvre";
import styled from "styled-components";

const Desc = styled.p`
  text-align: justify;
  color: #1a120b;
  font-style: oblique;
  font-size: 17px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const WrapperColonne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 20px 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 30px;
    
  }
`;

const WrapperPrix = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

const PrixOeuvre = styled.div`
  font-size: 1.3em;
  font-weight: bold;
`;

export default function PageOeuvre({ oeuvre }) {
  return (
    <>
      <Header />
      <Center>
        <WrapperColonne>
          <BoiteBlanche phone={true}>
            <ImagesOeuvre images={oeuvre.images} />
          </BoiteBlanche>
          <div>
            <Titre>{oeuvre?.name}</Titre>
            <Desc>{oeuvre?.description}</Desc>
            <WrapperPrix>
              <PrixOeuvre>{oeuvre?.price}$</PrixOeuvre>
              <FlyingButton _id={oeuvre._id} src={oeuvre.images?.[0]}>
                <IconPanier />
                Ajouter au panier
              </FlyingButton>
            </WrapperPrix>
          </div>
        </WrapperColonne>
        <OeuvreAvis oeuvre={oeuvre} />
        <Chatbot />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await connect();
  const { id } = context.query; // context donne acces aux parametres de l'url
  const oeuvre = await Oeuvre.findById(id);
  return {
    props: {
      oeuvre: JSON.parse(JSON.stringify(oeuvre)),
    },
  };
}
