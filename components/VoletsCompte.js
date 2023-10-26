import styled from "styled-components";

const WrapperVolets = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  span {
    font-size: 1.2rem;
  }
`;
const Volet = styled.span`
cursor: pointer;
  ${(props) =>
    props.active
      ? `
  color:#3C2A21;
  border-bottom: 2px solid #3C2A21`
      : `color:#C9B29A;`}
`;

export default function VoletCompte({ volets, active, onChange }) {
  return (
    <WrapperVolets>
      {volets.map((nomVolet) => (
        <Volet
        active={nomVolet === active} 
        onClick= {()=> {onChange(nomVolet)}}
        key={nomVolet}>
          {nomVolet}
        </Volet>
      ))} 
    </WrapperVolets>
  );
}