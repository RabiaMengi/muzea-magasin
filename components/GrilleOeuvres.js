import styled from "styled-components";
import BoiteOeuvre from "./BoiteOeuvre";
import Chatbot from "./Chatbot";

const GrilleOeuvresStyle = styled.div`
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

export default function GrilleOeuvres({ oeuvres, oeuvresSouhaiter=[] }) {
  return (
    <GrilleOeuvresStyle>
      {oeuvres?.length > 0 &&
        oeuvres.map((oeuvre) => 
          <BoiteOeuvre 
            key={oeuvre._id} 
            {...oeuvre}
            souhait={oeuvresSouhaiter.includes(oeuvre._id)} 
          />)}
      <Chatbot />
    </GrilleOeuvresStyle>
  );
}
