import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { PanierContext } from "./PanierContext";
import BarsIcon from "./icons/Bars";
import IconeRecherche from "./icons/IconeRecherche";
import LogoMuzea from "./LogoMuzea";


const StyledHeader = styled.header`
  background-color: #1a120b;
  position:sticky;
  top:0;
  z-index:10;
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: x-large;
  position: relative; 
  z-index: 3; 
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  gap: 15px;
  position: fixed;
  top: 0; 
  bottom: 0;
  right: 0;
  left: 0;
  padding: 70px 20px 20px;
  background-color: #1a120b;
  
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }

  ${(props) => (props.navActiveTel ? `display:block` : `display:none`)}
`;

const NavLink = styled(Link)`
  display: block;
  color: #faf0dc;
  min-width: 20px;
  font-family: "Arimo", sans-serif;
  font-size: small;
  padding: 15px 0;
  text-decoration: none;
   @media screen and (min-width: 768px) {
    padding:0;
  }
`;

const BoutonNav = styled.button`
   background-color: transparent;
  width: 40px;
  height: 20px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  
  }
`;

const IconesCotes = styled.div`
display: flex;
align-items: center;
a {
  display: inline-block;
  min-width: 20px;
  color: #faf0dc;
  svg {
    width: 50px;
    height: 25px;
    margin-top: 10px;
  }

  @media screen and (min-width: 768px) {
    svg {
      margin-top: 5px;
      width: 30px;
      height: 20px;
    }
  }

}


`


export default function Header() {
  const { oeuvresPanier } = useContext(PanierContext);
  const [navActiveTel, setNavActiveTel] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
          <LogoMuzea />
          </Logo>
          <StyledNav navActiveTel={navActiveTel}>
            <NavLink href={"/"}>ACCUEIL</NavLink>
            <NavLink href={"/oeuvres"}>ŒUVRES</NavLink>
            <NavLink href={"/categories"}>CATÉGORIES</NavLink>
            <NavLink href={"/compte"}>COMPTE</NavLink>
            <NavLink href={"/panier"}>PANIER ({oeuvresPanier.length})</NavLink>
          </StyledNav>
          <IconesCotes>
          <Link href={"/recherche"}>
            <IconeRecherche />
          </Link>
          <BoutonNav onClick={() => setNavActiveTel((prev) => !prev)}>
            <BarsIcon />
          </BoutonNav>
          </IconesCotes>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
