import Center from "@/components/Center";
import Chatbot from "@/components/Chatbot";
import GrilleOeuvres from "@/components/GrilleOeuvres";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { connect } from "@/lib/dataBaseManager";
import { Categorie } from "@/models/Categories";
import { Oeuvre } from "@/models/Oeuvre";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CategorieHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 40px;
  h1 {
    font-size: 1.5em;
    color: #1a120b;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap; 
  @media screen and (min-width: 768px) {
    flex-wrap: nowrap; 
  }
`;
const Filter = styled.div`
  background-color: #bfb29e;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  select {
    background-color: transparent;
    border: 0;
    font-weight: 600;
    font-style: oblique;
    color: #3c2a21;
  }
  option {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

const AucuneOeuvre = styled.div`
  font-size: large;
  margin-top: 40px;
  font-weight: 500;
  font-style: italic;
`;

export default function PageCategorie({
  categorie,
  subCategories,
  oeuvres: oeuvresOriginales,
}) {
  const sortParDefaut = "_id_desc";
  const valeursFilresDef = categorie.proprietes.map((p) => ({
    name: p.name,
    value: "tout",
  }));
  const [oeuvres, setOeuvres] = useState(oeuvresOriginales);
  const [valeursFiltres, setValeursFiltres] = useState(valeursFilresDef);
  const [sort, setSort] = useState(sortParDefaut);
  const [chargementOeuvres, setChargementOeuvres] = useState(false);
  const [changeFiltres, setChangeFiltres] = useState(false);

  function handleFilterChange(nomFiltre, valeurFiltre) {
    setValeursFiltres((prev) => {
      return prev.map((propriete) => ({
        name: propriete.name,
        value: propriete.name === nomFiltre ? valeurFiltre : propriete.value,
      }));
    });
    setChangeFiltres(true);
  }
  useEffect(() => {
    if (!changeFiltres) {
      return;
    }
    setChargementOeuvres(true);
    const catIds = [categorie._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    valeursFiltres.forEach((f) => {
      if (f.value !== "tout") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/oeuvres?${params.toString()}`;
    axios.get(url).then((res) => {
      setOeuvres(res.data);
      setChargementOeuvres(false);
    });
  }, [valeursFiltres, sort, changeFiltres]);

  return (
    <>
      <Header />
      <Center>
        <CategorieHeader>
          <h1>{categorie.name}</h1>
          <FiltersWrapper>
            {categorie.proprietes.map((prop) => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>

                <select
                  onChange={(ev) => {
                    handleFilterChange(prop.name, ev.target.value);
                  }}
                  value={valeursFiltres.find((f) => f.name === prop.name).value}
                >
                  <option className="custom-select" value={"tout"}>
                    Tout
                  </option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Tri:</span>
              <select
                value={sort}
                onChange={(ev) => {
                  setSort(ev.target.value);
                  setChangeFiltres(true);
                }}
              >
                <option value="price-asc">Du moins cher au plus cher</option>
                <option value="price-desc">Du plus cher au moins cher</option>
                <option value="_id-desc">Les plus récents</option>
                <option value="_id-asc">Les plus anciens</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategorieHeader>
        {chargementOeuvres && <Spinner fullWidth />}
        {!chargementOeuvres && (
          <div>
            {oeuvres.length > 0 && <GrilleOeuvres oeuvres={oeuvres} />}
            {oeuvres.length === 0 && (
              <AucuneOeuvre>Désolé, aucune oeuvre trouvée</AucuneOeuvre>
            )}
          </div>
        )}
        <Chatbot />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await connect();
  const categorie = await Categorie.findById(context.query.id);
  const subCategories = await Categorie.find({ parent: categorie._id });
  const catIds = [categorie._id, ...subCategories.map((c) => c._id)];
  const oeuvres = await Oeuvre.find({ categorie: catIds });
  return {
    props: {
      categorie: JSON.parse(JSON.stringify(categorie)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      oeuvres: JSON.parse(JSON.stringify(oeuvres)),
    },
  };
}
