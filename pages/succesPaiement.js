import BoiteBlanche from "@/components/BoiteBlanche";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { PanierContext } from "@/components/PanierContext";

const ColonneWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top : 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.8fr;
  }

`;

export default function succesPaiement() {
  //contiennent seulement ids
  const { viderPanier } =
    useContext(PanierContext);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("succesPaiement")) {
      viderPanier();
    }
  }, []);
  return (
    <>
      <Header></Header>
      <Center>
        <ColonneWrapper>
          <BoiteBlanche paiementReussi="true">
            <h1>Merci pour votre achat !</h1>
            <p>Vous recevrez bientôt un courriel de confirmation.</p>
          </BoiteBlanche>
        </ColonneWrapper>
      </Center>
    </>
  );
}