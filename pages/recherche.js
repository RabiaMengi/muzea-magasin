import Center from "@/components/Center";
import Chatbot from "@/components/Chatbot";
import GrilleOeuvres from "@/components/GrilleOeuvres";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";

const InputRecherche = styled(Input)`
  padding: 10px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
`;
const AucuneOeuvre = styled.div`
  font-size: large;
  margin-top: 40px;
  font-weight: 500;
  font-style: italic;
`;
const InputWrapper = styled.div`
  position: sticky;
  top: 80px;
  margin: 25px 0;
  padding: 5px 0;
  
`;
export default function PageRecherche() {
  const [phrase, setPhrase] = useState("");
  const [oeuvres, setOeuvres] = useState([]);
  const attenteRecherche = useCallback(debounce(rechercheOeuvres, 500), []);
  const [chargement, setChargement] = useState(false);
  useEffect(() => {
    if (phrase.length > 0) {
      setChargement(true);
      attenteRecherche(phrase);
    } else {
      setOeuvres([]);
    }
  }, [phrase]);

  function rechercheOeuvres(phrase) {
    axios
      .get("/api/oeuvres?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setOeuvres(response.data);
        setChargement(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <InputRecherche
            autoFocus
            value={phrase}
            onChange={(ev) => setPhrase(ev.target.value)}
            placeholder="Rechercher des oeuvres... "
          />
        </InputWrapper>

        {!chargement && phrase !== "" && oeuvres.length === 0 && (
          <AucuneOeuvre>Aucune oeuvre "{phrase}" trouvée!</AucuneOeuvre>
        )}
        {chargement && <Spinner fullWidth={true} />}
        {!chargement && oeuvres.length > 0 && (
          <GrilleOeuvres oeuvres={oeuvres} />
        )}
        <Chatbot />
      </Center>
    </>
  );
}
