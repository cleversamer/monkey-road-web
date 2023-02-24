import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const SharedForm = ({ title, subtitle, imageURL, onSubmit, children }) => {
  const { lang } = useLocale();

  return (
    <Container onSubmit={onSubmit}>
      <Content lang={lang}>
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
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
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
