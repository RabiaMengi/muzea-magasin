import { StyleBtn } from "./Boutons"
import styled from "styled-components"
import  FlyingButtonOtiginal  from "react-flying-item";
import { PanierContext } from "./PanierContext";
import { useContext } from "react";
import IconPanier from "./icons/IconPanier";

const FlyingButtonWrapper = styled.div`

  button{
    ${StyleBtn}
  }
`


export default function FlyingButton(props) {
const { ajouterOeuvre } = useContext(PanierContext);
 return (
    <FlyingButtonWrapper onClick={() => ajouterOeuvre(props._id)}>
        <FlyingButtonOtiginal 
            {...props}
            targetTop={"5%"}
            animationDuration= {0.7}
            flyingItemStyling={{
              width:'auto',
              height: 'auto',
              maxWidth: '60px',
              maxHeight: '60px',
              borderRadius: 0,
            }}
            targetLeft={"95%"}

        />
    </FlyingButtonWrapper>
 )

}