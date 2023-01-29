import styled from "styled-components";

const TableHeadings = ({ headings }) => {
  return (
    <Container>
      {headings.map((heading, index) => (
        <TableHeading key={index}>{heading}</TableHeading>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  @media screen and (max-width: 620px) {
    display: none;
  }
`;

const TableHeading = styled.li`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
`;

export default TableHeadings;
