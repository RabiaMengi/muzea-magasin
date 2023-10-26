import styled, {css} from "styled-components";


const BoiteBlanche = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;

  ${(props) =>
    props.coord &&
    css`
      max-height: 350px;
    `}

  ${(props) =>
    props.msgSuccesPaiement &&
    css`
      max-height: 400px;
      width: 600px;
    `}

    ${(props) =>
    props.phone &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

    
`;

export default BoiteBlanche;