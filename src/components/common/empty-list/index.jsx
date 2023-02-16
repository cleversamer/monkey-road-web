import styled from "styled-components";
import CustomButton from "../custom-button";

const EmptyList = ({ title, imageURL, buttonTitle, onClick }) => {
  return (
    <Container>
      <Image src={imageURL} alt="Not found image" />
      <Title>{title}</Title>
      {!!buttonTitle && (
        <CustomButton type="primary" title={buttonTitle} onClick={onClick} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;

  button {
    max-width: 200px;
  }
`;

const Title = styled.h3`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Image = styled.img`
  width: 200px;
  object-fit: cover;
`;

export default EmptyList;
