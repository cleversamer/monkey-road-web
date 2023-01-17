import styled from "styled-components";

const SharedForm = ({ title, subtitle, imageURL, onSubmit, children }) => {
  return (
    <Container onSubmit={onSubmit}>
      <Content>
        <Image src={imageURL} alt="" />
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Children>{children}</Children>
      </Content>
    </Container>
  );
};

const Container = styled.form`
  background: #fff;
  border-radius: 16px;
  max-width: 500px;
  margin: 0 auto;
  height: fit-content;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Image = styled.img`
  width: 250px;
  margin: 0 auto;
  padding: 15px;
`;

const Title = styled.h4`
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Children = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default SharedForm;
