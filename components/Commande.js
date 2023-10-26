import styled from "styled-components";

const WrapperCommande = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #3c2a21;
  time {
    font-weight: bold;
    font-size: 0.9rem;
    color: #351e10;
  }
  
`;

const LigneOeuvre = styled.div`
  span {
    color: #63462a;
  }
`;
const InfoClient = styled.div`
  margin-top: 5px;
  color: #63462a;
  font-size: small;
  line-height: 1rem;
 
`;

export default function Commande({ line_items, createdAt, ...info }) {
  var options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <WrapperCommande>
      <div>
        <time>{new Date(createdAt).toLocaleDateString("fr-FR", options)}</time>
        <InfoClient>
          {info.nom}
          <br />
          {info.courriel}
          <br />
          {info.adresse}
          <br />
          {info.ville} {info.codePostal}, {info.pays}
        </InfoClient>
      </div>
      <div>
        {line_items.map((item) => (
          <LigneOeuvre key="item">
            <span>{item.quantity} x</span> {item.price_data.product_data.name}
          </LigneOeuvre>
        ))}
      </div>
    </WrapperCommande>
  );
}