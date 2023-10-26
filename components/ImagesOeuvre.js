import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const GrandeImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  @media screen and (min-width: 768px) {
    max-width: 100%;
    max-height: 100%;
  }
`;
const BoutonsImg = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const BoutonImage = styled.div`
  height: 90px;
  margin-top: 10px;
  padding: 5px;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `border: solid 1px #3C2A21; border-radius: 5px;`
      : `border-color:transparent;`}
`;

export default function ImagesOeuvre({ images }) {
  const [imgActive, setImgActive] = useState(images?.[0]);

  return (
    <>
      <GrandeImage src={imgActive} alt="img-sing" />
      <BoutonsImg>
        {images.map((image) => (
          <BoutonImage
            key="img"
            active={image === imgActive}
            onClick={() => setImgActive(image)}
          >
            <Image src={image} alt="img-sing1" />
          </BoutonImage>
        ))}
      </BoutonsImg>
    </>
  );
}
