import styled from "styled-components";
import BoiteBlanche from "./BoiteBlanche";
import Input from "./Input";
import EtoileAvis from "./EtoileAvis";
import TextArea from "./TextArea";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryBtn from "./Boutons";

//ECRIRE UN AVIS
const Titre = styled.h2`
  margin-top: 40px;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;
const Soustitre = styled.h2`
  font-size: 1rem;
  margin-bottom: 5px;
`;
const WrapperAvis = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 40px;
  // RESPONSIVE
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// AVIS EXISTANTS
const HeaderAvis = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: #aaa;
  }
`;
const WrapperAvisExistant = styled.div`
  border: solid 1px #d5cea3;
  box-shadow: 1px 1px 4px #aaa;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  h3 {
    font-weight: bold;
    color: #3c2a21;
  }
  p {
    font-size: small;
  }
`;

export default function AvisOeuvre({ oeuvre }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [etoiles, setEtoiles] = useState(0);
  const [avis, setAvis] = useState([]);

  async function soumettreAvis() {
    const data = { titre, description, etoiles, oeuvre: oeuvre._id };
    axios.post("/api/avis", data).then((res) => {
      setDescription("");
      setEtoiles(0);
      setTitre("");
      afficherAvisExistant();
    });
  }
  //aficher les avis precedent
  useEffect(() => {
    afficherAvisExistant();
  }, []);

  function afficherAvisExistant() {
    axios.get("/api/avis?oeuvre=" + oeuvre._id).then((res) => {
      setAvis(res.data);
    });
  }

  return (
    <>
      <Titre>Avis récents</Titre>
      <WrapperAvis>
        <div>
          <BoiteBlanche>
            <Soustitre>Écrire un avis</Soustitre>
            <EtoileAvis onChange={(n) => setEtoiles(n)}></EtoileAvis>
            <Input
              value={titre}
              onChange={(ev) => setTitre(ev.target.value)}
              placeholder="Titre"
            ></Input>
            <TextArea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Partagez votre expérience ici..."
            ></TextArea>
            <div>
              <PrimaryBtn onClick={soumettreAvis}>Soumettre</PrimaryBtn>
            </div>
          </BoiteBlanche>
        </div>
        <div>
          <BoiteBlanche>
            <Soustitre>Tous les avis</Soustitre>
            {avis.length === 0 && (
              <p>
                Aucun avis pour le moment
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{ width: '16px', height: '16px', verticalAlign: 'middle', margin: '0 4px' }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </p>
            )}

            {avis.length > 0 &&
              avis.map((a) => (
                <WrapperAvisExistant key="a">
                  <HeaderAvis>
                    <EtoileAvis
                      size={"sm"}
                      disabled={true}
                      defaultNbClick={a.etoiles}
                    />

                    <p>{new Date(a.createdAt).toLocaleDateString("ca-EN")}</p>
                  </HeaderAvis>
                  <h3>{a.titre}</h3>
                  <p> {a.description}</p>
                </WrapperAvisExistant>
              ))}
          </BoiteBlanche>
        </div>
      </WrapperAvis>
    </>
  );
}
