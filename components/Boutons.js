import styled, { css } from "styled-components";

export const StyleBtn = css`
  background-color: #3c2a21;
  display: inline-flex;
  align-items: center;
  font-size: small;
  color: #e5e5cb;
  padding: 3px 15px;
  border-radius: 5px;
  margin: 3px;
  border: solid 2px #3c2a21;
  transition: background-color 0.3s, color 0.3s, border 0.3s, transform 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: black;
    border: solid 1px #1a120b;
    transform: scale(1.05);
  }
  ${(props) =>
    props.secondary &&
    css`
      background-color: #faf0dc;
      color: #1a120b;
      padding: none;
      border: solid 1px #1a120b;
      text-decoration: none;
      svg {
        height: 1.6rem;
        margin-right: 0.3rem;
      }
    `}

  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props) =>
    props.big &&
    css`
      font-size: 1.1rem;
      padding: 10px 20px;
    `}

  ${(props) =>
    props.fixedwhite &&
    css`
      transform: none;
      transition: none;
      background-color: white;
      border: 1px solid #aaa;
      color: black;
    `}

  ${(props) =>
    props.signout &&
    css`
      background-color: darkred;
      border-color: darkred;
      color: white;
    `}

    ${(props) =>
    props.signin &&
    css`
      background-color: darkgreen;
      border-color: darkgreen;
      color: white;
    `}
`;

const StyledBtn = styled.button`
  ${StyleBtn}
`;

export default function PrimaryBtn({ children, ...rest }) {
  return <StyledBtn {...rest}>{children}</StyledBtn>;
}
