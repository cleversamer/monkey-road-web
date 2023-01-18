import styled from "styled-components";

const Location = ({ pageTitles = [] }) => {
  pageTitles = pageTitles.map((pageTitle, index) => {
    return () =>
      pageTitle === ">" ? (
        <Separator>{pageTitle}</Separator>
      ) : (
        <PageTitle active={index === pageTitles.length - 1}>
          {pageTitle}
        </PageTitle>
      );
  });

  pageTitles.join(<Separator>&gt;</Separator>);

  return (
    <Container>
      {pageTitles.map((Item, index) => (
        <Item key={index} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const PageTitle = styled.span`
  color: ${({ active }) => (active ? "#fe7777" : "#000")};
  text-transform: capitalize;
`;

const Separator = styled.span`
  color: #fe7777;
  font-size: 17px;
  margin-top: 2px;
`;

export default Location;
