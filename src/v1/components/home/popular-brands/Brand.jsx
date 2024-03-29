import styled from "styled-components";
import { serverURL } from "v1/api/client";

const Brand = ({ title = "", imageURL = "" }) => {
  return (
    <Container>
      <Image url={imageURL} />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.span`
  background-color: rgba(254, 119, 119, 0.2);
  box-shadow: 0px 1px 3px 3px rgba(254, 119, 119, 0.35);
  width: 100%;
  max-width: 150px;
  height: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  transition-duration: 176ms;
  margin: 0 20px;
  border-radius: 8px;
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
