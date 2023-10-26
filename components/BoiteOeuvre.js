import Link from "next/link";
import styled from "styled-components";
import IconPanier from "./icons/IconPanier";
import { useState } from "react";
import FlyingButton from "./FlyingButton";
import CoeurVide from "./icons/CoeurVide";
import axios from "axios";
import CoeurPlein from "./icons/CoeurPlein";
import { useSession } from "next-auth/react";

const OeuvreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoiteBlanche = styled(Link)`
  background-color: #fff;
  border-radius: 10px;
  height: 200px;
  width: 150px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.2s, color 0.2s, transform 0.3s;
  img {
    max-width: 150%;
    max-height: 150px;
    border-radius: 10px;
  }

  &:hover {
    background-color: #fff;
    color: black;
    transform: scale(1.04);
  }
`;

const TitreOeuvre = styled(Link)`
  font-weight: bold;
  font-size: 0.9rem;
  text-decoration: none;
  color: black;
`;

const BoiteInfo = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

const RangeePrix = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Prix = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 10px;
`;

const BoutonCoeur = styled.button`
  background-color: transparent;
  position: absolute;
  padding: px;
  border: 0;
  top: 0;
  right: 0;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    margin: 2px;
  }

  ${(props) => (props.dansListe ? `color:red;` : `color:black;`)}
`;

export default function BoiteOeuvre({
  _id,
  name,
  description,
  price,
  images,
  souhait = false,
  enleverDeLaListe = () => {},
}) {
  const url = "/oeuvres/" + _id;
  const [dansListeSouhait, setDansListeSouhait] = useState(souhait);

  const { data: session } = useSession();

  function ajouterSouhait(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const nextValue = !dansListeSouhait;
    if (nextValue === false && enleverDeLaListe) {
      enleverDeLaListe(_id);
    }
    axios
      .post("/api/listedesouhait", {
        oeuvre: _id,
      })
      .then(() => {});
    setDansListeSouhait(nextValue);
  }

  return (
    <OeuvreWrapper>
      <BoiteBlanche href={url}>
        {session && (
          <BoutonCoeur dansListe={dansListeSouhait} onClick={ajouterSouhait}>
            {dansListeSouhait ? <CoeurPlein /> : <CoeurVide />}
          </BoutonCoeur>
        )}

        <img src={images?.[0]} alt="img-oeuvre" />
      </BoiteBlanche>
      <BoiteInfo>
        <TitreOeuvre href={url}>{name}</TitreOeuvre>
        <RangeePrix>
          <Prix>{price}$</Prix>
          <FlyingButton _id={_id} src={images?.[0]}>
            <IconPanier />
          </FlyingButton>
        </RangeePrix>
      </BoiteInfo>
    </OeuvreWrapper>
  );
}
