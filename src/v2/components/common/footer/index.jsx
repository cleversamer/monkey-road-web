import styled from "styled-components";
import Newsletter from "./Newsletter";
import ColumnsList from "./ColumnsList";

const Footer = () => {
  return (
    <Container>
      <ColumnsList />
      <Newsletter />
    </Container>
  );
};

const Container = styled.footer`
  background-color: #222;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 70px;

  @media screen and (max-width: 1280px) {
    flex-direction: column;
    padding: 40px 20px;
    gap: 20px;
  }

  @media screen and (max-width: 1080px) {
    margin-bottom: 55px;
  }
`;

export default Footer;
