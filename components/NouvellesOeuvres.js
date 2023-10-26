import styled from "styled-components"
import Center from "./Center"
import GrilleOeuvres from "./GrilleOeuvres";


const Nouveau = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  padding-bottom: 20px;
  font-weight: 600;
  font-style: italic;
  color: #3C2A21;
  text-align: center;
`;


export default function NouvellesOeuvres({oeuvres, oeuvresSouhaiter }){
    return (
        <Center>
            <Nouveau>Nouveaux Arrivages</Nouveau>
            <GrilleOeuvres oeuvres={oeuvres}
            oeuvresSouhaiter={oeuvresSouhaiter}
            />
        </Center>
        
    )
}