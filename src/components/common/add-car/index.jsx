import styled from "styled-components";
import Location from "../search-page/Location";
import LevelsTracker from "../levels-tracker";
import useLocale from "hooks/useLocale";

const AddCar = ({
  noOfLevels,
  activeLevel,
  pageTitles,
  onSelectLevel,
  children,
}) => {
  const { lang } = useLocale();

  return (
    <Container>
      <Location pageTitles={pageTitles} />
      <LevelsTracker
        onSelectLevel={onSelectLevel}
        noOfLevels={noOfLevels}
        activeLevel={activeLevel}
      />
      <FormContainer lang={lang}>
        <CarClip lang={lang} src="/assets/images/car-clip.svg" alt="" />
        {children}
      </FormContainer>
    </Container>
  );
};

const Container = styled.main`
  background-color: #fafafa;
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

const CarClip = styled.img`
  position: absolute;
  top: 0;
  ${({ lang }) => (lang === "en" ? "right: -60px;" : "left: -60px;")}
  ${({ lang }) =>
    lang === "ar" ? "transform: rotate(360deg) scaleX(-1);" : ""}
  width: 35vw;
  max-width: 478px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default AddCar;
