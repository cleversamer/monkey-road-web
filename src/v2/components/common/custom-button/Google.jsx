import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const Google = ({ title, onClick, ...props }) => {
  const { i18n, lang } = useLocale();

  return (
    <Container onClick={onClick} {...props} lang={lang}>
      <Icon src="/assets/icons/social/google.svg" alt="Google logo" />
      <Title>{i18n("continueWithGoogle")}</Title>
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.97);
  }
`;

const Icon = styled.img`
  width: 20px;
`;

const Title = styled.span`
  text-transform: capitalize;
  color: rgba(255, 0, 0, 0.8);
  font-weight: 600;
  font-size: 14px;
`;

export default Google;
