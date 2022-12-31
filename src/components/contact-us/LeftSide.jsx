import styled from "styled-components";
import SocialIconsList from "./SocialIconsList";

const LeftSide = () => {
  return (
    <Container>
      <Title>Contact us</Title>
      <Description>Need Help? Call Us. (+971) 58 564 1444</Description>
      <SocialIconsList />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
`;

export default LeftSide;
