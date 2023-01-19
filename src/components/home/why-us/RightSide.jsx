import styled from "styled-components";
import FeaturesList from "./FeaturesList";

const RightSide = () => {
  return (
    <Container>
      <Title>why us?</Title>

      <Description>
        Lorem ipsum dolor sit amet consectetur. Arcu pellentesque sit in nisi
        nunc justo vel nascetur. Id massa commodo diam eget in arcu faucibus. So
      </Description>

      <FeaturesList />
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (max-width: 1080px) {
    width: 100%;
    max-width: 800px;
    padding: 0 30px;
  }
`;

const Title = styled.h3`
  text-transform: capitalize;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
  color: #fff;

  @media screen and (max-width: 1080px) {
    font-size: 14px;
    max-width: 500px;
  }
`;

export default RightSide;
