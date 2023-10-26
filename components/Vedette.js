import styled from "styled-components";
import Center from "./Center";
import BtnLink from "./BtnLink";
import IconPanier from "./icons/IconPanier";
import FlyingButton from "./FlyingButton";


const Bg = styled.div`
  background-color: #faf0dc;
  color: #1a120b;
  padding: 40px 0;
`;

const Titre = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 2rem;
  color: #3c2a21;

  @media screen and (min-width: 768px) {
    font-size: 2.7rem;
  }
`;

const Desc = styled.p`
  text-align: justify;
  color: #1a120b;
  font-style: oblique;
  margin-bottom: 20px;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  div:nth-child(1) {
    order: 2;
  }
  img {
    max-width: 100%;
    max-height: 300px;
    display: block;
    margin: 0 auto;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 2.4fr 2fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 80%;
      max-height: max-content;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export default function Vedette({ oeuvre }) {
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <div>
            <Column>
              <Titre>{oeuvre.name}</Titre>
              <Desc>{oeuvre.description}</Desc>
            </Column>
            <BtnWrapper>
               <BtnLink href={"/oeuvres/" + oeuvre._id} secondary={true}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                En savoir plus
              </BtnLink>
              <FlyingButton _id={oeuvre._id} src={oeuvre.images?.[0]}>
                <IconPanier />
                Ajouter au panier
              </FlyingButton>
            </BtnWrapper>
          </div>

          <div>
            
            <img
              src={oeuvre.images?.[0]}
              alt="img-oeuvre-vedette"
            />
            
            
          </div>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
