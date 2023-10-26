import BoiteBlanche from "@/components/BoiteBlanche";
import BoiteOeuvre from "@/components/BoiteOeuvre";
import PrimaryBtn from "@/components/Boutons";
import Center from "@/components/Center";
import Chatbot from "@/components/Chatbot";
import Commande from "@/components/Commande";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import VoletCompte from "@/components/VoletsCompte";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const WrapperColonne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;
const WrapperVillePostal = styled.div`
  display: flex;
  gap: 5px;
`;

const MessageSucces = styled.span`
  color: green;
  font-weight: bold;
  justify-content: center;
  display: flex;
`;

const GridOeuvreSouhaiter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;
const WrapperListeVide = styled.div`
  display: flex;
  gap: 3px;
  margin-top: 5px;
`;

export default function PageCompte() {
  const { data: session } = useSession();
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [pays, setPays] = useState("");
  const [adresseCharger, setAdresseCharger] = useState(true);
  const [souhaitCharger, setSouhaitCharger] = useState(true);
  const [commandeCharger, setCommandeCharger] = useState(true);

  const [messageSucces, setMessageSucces] = useState("");

  const [oeuvresSouhaiter, setOeuvresSouhaiter] = useState([]);
  //Volet actif "Commande" vs "Wishlist"
  const [voletActif, setVoletActif] = useState("Commandes");
  //commandes clients
  const [commandeClient, setCommandeClient] = useState([]);

  async function deconnexion() {
    await signOut();
  }
  async function connexion() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  function sauvegarderInfoCompte() {
    const data = { nom, courriel, ville, adresse, codePostal, pays };
    axios.put("/api/adresse", data);
    setMessageSucces("Sauvegarde réussie!");
    setTimeout(() => {
      setMessageSucces("");
    }, 4000);
  }

  //Pour afficher les donnees si existante
  useEffect(() => {
    if (!session) {
      return;
    }

    setAdresseCharger(false);
    setSouhaitCharger(false);
    setCommandeCharger(false);
    axios.get("/api/adresse").then((response) => {
      setNom(response.data.nom);
      setCourriel(response.data.courriel);
      setAdresse(response.data.adresse);
      setVille(response.data.ville);
      setCodePostal(response.data.codePostal);
      setPays(response.data.pays);
      setAdresseCharger(true);
    });

    axios.get("/api/listedesouhait").then((responses) => {
      setOeuvresSouhaiter(responses.data.map((os) => os.oeuvre));
      setSouhaitCharger(true);
    });

    axios.get("/api/commandes").then((res) => {
      setCommandeClient(res.data);
      setCommandeCharger(true);
    });
  }, [session]);

  function oeuvreEnleverListeSouhait(idARetirer) {
    setOeuvresSouhaiter((oeuvres) => {
      return [...oeuvres.filter((o) => o._id.toString() !== idARetirer)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <WrapperColonne>
          <div>
            <BoiteBlanche>
              <VoletCompte
                volets={["Commandes", "Liste de souhait"]}
                active={voletActif}
                onChange={setVoletActif}
              />
              {voletActif === "Commandes" && (
                <>
                  {!commandeCharger && <Spinner fullWidth={true} />}
                  {commandeCharger && (
                    <div>
                      {commandeClient.length > 0 &&
                        commandeClient.map((o) => <Commande key={o._id} {...o} />)}
                      {commandeClient.lenght === 0 && (
                        <p>Aucune commande pour le moment</p>
                      )}
                      {commandeClient.lenght === 0 && (
                        <p>Aucune commande pour le moment</p>
                      )}
                      {!session && (
                        <>
                          <span>Connectez-vous pour voir vos commandes.</span>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
              {voletActif === "Liste de souhait" && (
                <>
                  {!souhaitCharger && <Spinner fullWidth={true} />}
                  {souhaitCharger && (
                    <>
                      <GridOeuvreSouhaiter>
                        {oeuvresSouhaiter.length > 0 &&
                          oeuvresSouhaiter.map((os) => (
                            <BoiteOeuvre
                              key={os._id}
                              {...os}
                              souhait={true}
                              enleverDeLaListe={oeuvreEnleverListeSouhait}
                            />
                          ))}
                      </GridOeuvreSouhaiter>
                     <WrapperListeVide>
                     {oeuvresSouhaiter.length === 0 && (
                        <>
                          {session && (
                            <p>
                              Votre liste est vide.
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  verticalAlign: "middle",
                                  margin: "0 4px",
                                }}
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                />
                              </svg>
                            </p>
                          )}
                          {!session && (
                            <>
                              <span>
                                Connectez-vous pour ajouter des articles à votre liste de souhaits.
                            </span>
                            </>
                            
                          )}
                        </>
                      )}
                     </WrapperListeVide>
                    </>
                  )}
                </>
              )}
            </BoiteBlanche>
          </div>

          <div>
            <BoiteBlanche>
              <h2> {session ? "Informations de compte" : " Compte"}</h2>
              

              {session && (
                <>
                  {" "}
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
                  <PrimaryBtn
                    block={true}
                    big={true}
                    onClick={sauvegarderInfoCompte}
                  >
                    Sauvegarder
                  </PrimaryBtn>
                  <MessageSucces>{messageSucces}</MessageSucces>
                </>
              )}

              <hr />
              {session ? (
                <PrimaryBtn
                  block={true}
                  big={true}
                  signout={true}
                  onClick={deconnexion}
                >
                  Déconnexion
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{
                      width: "16px",
                      height: "16px",
                      verticalAlign: "middle",
                      margin: "0 4px",
                    }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </PrimaryBtn>
              ) : (
                <PrimaryBtn
                  big={true}
                  block={true}
                  signin={true}
                  onClick={connexion}
                >
                  Connexion Google
                </PrimaryBtn>
              )}
            </BoiteBlanche>
          </div>
        </WrapperColonne>
        <Chatbot />
      </Center>
    </>
  );
}
