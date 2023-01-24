import styled from "styled-components";
import Location from "../search-page/Location";
import LevelsTracker from "../levels-tracker";

const AddCar = ({ noOfLevels, activeLevel, pageTitles, children }) => {
  return (
    <Container>
      <Location pageTitles={pageTitles} />
      <LevelsTracker noOfLevels={noOfLevels} activeLevel={activeLevel} />
      <FormContainer>
        <CarClip src="/assets/images/car-clip.svg" alt="" />
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
`;

const FormContainer = styled.div`
  position: relative;
`;

const CarClip = styled.img`
  position: absolute;
  top: 0;
  right: -60px;
  width: 35vw;
  max-width: 478px;
`;

export default AddCar;
