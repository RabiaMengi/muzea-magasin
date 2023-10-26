import BoiteBlanche from "@/components/BoiteBlanche";
import PrimaryBtn from "@/components/Boutons";
import Center from "@/components/Center";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { PanierContext } from "@/components/PanierContext";
import Table from "@/components/Table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const PageWrapper = styled.div``;

const ColonneWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.8fr;
  }
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }
  table tr.subtotal td{
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2){
    color: #1a120b;
    font-style: italic;
  }
  tr.total td{
    font-size: 1.2rem;
  }
  
`;


const InfoOeuvreCell = styled.td`
  padding: 10px 0;
  border-top: 1px solid lightgray;
`;

const TotalCell = styled.td`
  font-weight: bold;
`;

const BoiteImg = styled.div`
  width: 80px;
  height: 90px;
  background-color: #fff;
  box-shadow: 0 0 10px #aaa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  img {
    max-height: 80px;
    border-radius: 10px;
  }
`;
const WrapperQuantite = styled.span`
  display: flex;
  align-items: center;
  
  gap: 3px;
`;

const WrapperVillePostal = styled.div`
  display: flex;
  gap: 5px;
`;

const PanierVide = styled.div`
  color: #3c2a21;
  font-weight: 600;
  font-size: large;
`;

const H2S =styled.h3`
font-size: 25px;
color: #3C2A21;
` 
const Promotion = styled.td`
 color:#900C3F ;
 text-align: center;
 font-size: large;
 font-weight: 800;
 padding: 10px;
 
`

export default function PagePanier() {
  const {data:session} = useSession()
  //states formulaire livraison
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [pays, setPays] = useState("");

  
  //contiennent seulement ids
  const { oeuvresPanier, ajouterOeuvre, enleverOeuvre, } =
    useContext(PanierContext);
    //contient les objets au complet
  const [oeuvres, setOeuvres] = useState([]);

  const [fraisLivraison, setFraisLivraison] = useState(null)

  function augQuantite(id) {
    ajouterOeuvre(id);
  }
  function dimQuantite(id) {
    enleverOeuvre(id);
  }
  async function paiementClient() {
    const response = await axios.post("/api/paiement", {
      nom,
      courriel,
      ville,
      codePostal,
      adresse,
      pays,
      oeuvresPanier,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let prixTotalOeuvres = 0;
  for (const oeuvreId of oeuvresPanier) {
    const prix = oeuvres.find((o) => o._id === oeuvreId)?.price || 0;
    prixTotalOeuvres += prix;
  }

  let prixTotal = (prixTotalOeuvres + parseInt(fraisLivraison || '0'))

  useEffect(() => {
    if (oeuvresPanier.length > 0) {
      axios.post("/api/panier", { ids: oeuvresPanier }).then((response) => {
        setOeuvres(response.data);
      });
    } else {
      setOeuvres([]);
    }
  }, [oeuvresPanier]);

  useEffect(() => {
   
    axios.get('/api/configurations?name=fraisLivraison').then(res => {
      setFraisLivraison(res.data.value)
    })
  }, []);

  useEffect(() => {
    if (!session) {
      return
    }
    axios.get('/api/adresse').then(response => {
      setNom(response.data.nom);
      setCourriel(response.data.courriel);
      setAdresse(response.data.adresse);
      setVille(response.data.ville);
      setCodePostal(response.data.codePostal);
      setPays(response.data.pays);
})
  },[session])
   

  return (
    <>
      <PageWrapper>
        <Header />
        <Center>
          <ColonneWrapper>
            <BoiteBlanche>
              {!oeuvresPanier?.length && (
                <PanierVide>Votre panier est vide</PanierVide>
              )}
              {oeuvres?.length > 0 && (
                <>
                  <H2S>Panier</H2S>

                  <Table>
                    <thead>
                      <tr>
                        <th>ŒUVRE</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                      </tr>
                    </thead>

                    <tbody>
                      {oeuvres.map((oeuvre) => {
                        const quantite = oeuvresPanier.filter(
                          (id) => id === oeuvre._id
                        ).length;
                        const prixParOeuvre = quantite * oeuvre.price;

                        return (
                          <tr key={oeuvre}>
                            <InfoOeuvreCell>
                              <BoiteImg>
                                <img src={oeuvre.images[0]} alt="img-oeuvre" />
                              </BoiteImg>
                            </InfoOeuvreCell>
                            <td>
                              <WrapperQuantite>
                                <PrimaryBtn
                                  fixedWhite
                                  onClick={() => dimQuantite(oeuvre._id)}
                                >
                                  -
                                </PrimaryBtn>
                                {quantite}
                                <PrimaryBtn
                                  fixedWhite
                                  onClick={() => augQuantite(oeuvre._id)}
                                >
                                  +
                                </PrimaryBtn>
                              </WrapperQuantite>
                            </td>
                            <td>{prixParOeuvre.toLocaleString()} $</td>
                          </tr>
                        );
                      })}
                      <tr className="subtotal">
                        <TotalCell colSpan={2}>Oeuvres</TotalCell>
                        <TotalCell>{prixTotalOeuvres.toLocaleString()}$</TotalCell>
                      </tr>
                      <tr className="subtotal">
                        <TotalCell colSpan={2}>Livraison</TotalCell>
                        <TotalCell>{fraisLivraison}$</TotalCell>
                      </tr>
                      <tr className="subtotal total">
                        <TotalCell colSpan={2}>Total</TotalCell>
                        <TotalCell>{prixTotal.toLocaleString()}$</TotalCell>
                      </tr>
                      {prixTotal > 1000 && (
                        <tr>
                          <Promotion colSpan={3}>Utilisez le code promotionnel "MUZEA" et bénéficiez d'une réduction de 20% sur votre achat.</Promotion>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </>
              )}
            </BoiteBlanche>
            {!!oeuvresPanier?.length && (
              <BoiteBlanche coord='true'>
                <H2S>Coordonnées</H2S>

                <Input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  name={nom}
                  onChange={(ev) => setNom(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Courriel"
                  value={courriel}
                  name={courriel}
                  onChange={(ev) => setCourriel(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Adresse"
                  value={adresse}
                  name={adresse}
                  onChange={(ev) => setAdresse(ev.target.value)}
                />
                <WrapperVillePostal>
                  <Input
                    type="text"
                    placeholder="Ville"
                    value={ville}
                    name={ville}
                    onChange={(ev) => setVille(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Code Postal"
                    value={codePostal}
                    name={codePostal}
                    onChange={(ev) => setCodePostal(ev.target.value)}
                  />
                </WrapperVillePostal>
                <Input
                  type="text"
                  placeholder="Pays"
                  value={pays}
                  name={pays}
                  onChange={(ev) => setPays(ev.target.value)}
                />
                {/* Input cacher qui prend en valeur les id des produits dans le panier !! wow wow wow */}
                {/* <input
                  type="hidden"
                  value={oeuvresPanier.join(",")}
                  name="oeuvres"
                /> */}

                <PrimaryBtn block="true" big="true" onClick={paiementClient}>
                  Passer au paiement
                </PrimaryBtn>
              </BoiteBlanche>
            )}
          </ColonneWrapper>
          <Chatbot />
        </Center>
      </PageWrapper>
    </>
  );
}
