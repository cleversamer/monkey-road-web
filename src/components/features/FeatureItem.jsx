import styled from "styled-components";

const FeatureItem = ({ iconPath, title, description }) => {
  return (
    <Container>
      <FeatureIcon src={iconPath} alt={title} />

      <FeatureRight>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureRight>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  min-width: 400px;
`;

const FeatureIcon = styled.img`
  margin-top: 5px;
  width: 40px;
`;

const FeatureRight = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeatureTitle = styled.h4`
  font-size: 22px;
  font-weight: 600;
  color: #fff;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  width: 350px;
`;

export default FeatureItem;
