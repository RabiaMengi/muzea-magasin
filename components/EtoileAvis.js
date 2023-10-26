import styled from "styled-components";
import EtoilePleine from "./icons/EtoilePleine";
import EtoileVide from "./icons/EtoileVide";
import { useState } from "react";

const WrapperEtoile = styled.div`
  display: inline-flex;
  gap: 5px;
  margin-bottom: 12px;
  margin-top: 5px;
  color: #3c2a21;
`;

const BoutonEtoile = styled.button`
  cursor: pointer;
  background-color: transparent;
  display: inline-block;
  padding: 0;
  border: 0;
  width: ${(props) => (props.size === "sm" ? "16px" : "20px")};

  ${(props) =>
    props.disabled &&
    `
   cursor:default;
  `}
`;

export default function EtoileAvis({
  defaultNbClick = 0,
  onChange,
  disabled,
  size = "",
}) {
  const [nbClick, setNbClick] = useState(defaultNbClick);
  const cinqEtoile = [1, 2, 3, 4, 5]; // loop sur 5 elmt

  function gestionClickEtoile(n) {
    if (disabled) {
      return;
    }
    setNbClick(n);
    onChange(n);
  }

  return (
    <WrapperEtoile>
      {cinqEtoile.map((n) => (
        <>
          <BoutonEtoile
            size={size} // Utilisez la taille ici
            disabled={disabled}
            onClick={() => gestionClickEtoile(n)}
          >
            {nbClick >= n ? <EtoilePleine /> : <EtoileVide />}
          </BoutonEtoile>
        </>
      ))}
    </WrapperEtoile>
  );
}
