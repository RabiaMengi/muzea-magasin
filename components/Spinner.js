import { RingLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
      display: block;
      display: flex;
      justify-content: center;
      
        
    `
      : `
        border: 5px ;
      `};

    
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <RingLoader color={"#1a120b"} />
    </Wrapper>
  );
}
