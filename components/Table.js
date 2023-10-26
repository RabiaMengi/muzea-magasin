import styled from "styled-components";

const TableStyle = styled.table`
  width: 100%;
  margin-top: 10px;

  th {
    text-align: left;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 600;
    font-size: 0.8rem;
    
  }
  

   td{
    border-top: 1px solid lightgray;
   }
`;

export default function Table(props) {
  return <TableStyle {...props}></TableStyle>;
}