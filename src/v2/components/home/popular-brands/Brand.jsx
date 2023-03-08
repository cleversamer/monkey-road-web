import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const Brand = ({ title = "", imageURL = "" }) => {
  const { lang } = useLocale();

  return (
    <Container>
      <Image url={imageURL} />
      <Title>{title[lang]}</Title>
    </Container>
  );
};

const Container = styled.span`
  background: #fff;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  border-radius: 8px;
  width: 100%;
  max-width: 150px;
  height: 120px;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  transition-duration: 176ms;
  margin: 0 20px;
  cursor: pointer;

  :hover {
    transform: scale(1.03);
  }

  :active {
    transform: scale(1);
  }
`;

const Title = styled.h4`
  text-transform: capitalize;
`;

const Image = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 70px;
  height: 70px;
`;

export default Brand;
