import styled from "styled-components";
import Location from "../search-page/Location";
import LevelsTracker from "../levels-tracker";
import useLocale from "v2/hooks/useLocale";

const AddCar = ({
  levels,
  activeLevel,
  onSelectLevel,
  pageTitles,
  children,
}) => {
  const { lang } = useLocale();

  return (
    <Container>
      <Location pageTitles={pageTitles} />
      <LevelsTracker
        onSelectLevel={onSelectLevel}
        levels={levels}
        activeLevel={activeLevel}
      />
      <FormContainer lang={lang}>{children}</FormContainer>
    </Container>
  );
};

const Container = styled.main`
  background-color: #fff;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 30px;
    align-items: center;
  }
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

export default AddCar;
