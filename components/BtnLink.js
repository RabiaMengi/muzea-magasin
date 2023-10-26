import Link from "next/link";
import styled from "styled-components";
import { StyleBtn } from "./Boutons";

const StyleLink = styled(Link)`
  ${StyleBtn}
  
  // le style provient de BtnPrimaire.js, on utilise le meme css pour button et Link
`;


export default function BtnLink(props) {
  return <StyleLink {...props} />;
}