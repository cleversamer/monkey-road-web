import styled from "styled-components";
import useLocale from "v1/hooks/useLocale";

const LevelsTracker = ({ noOfLevels, activeLevel, onSelectLevel }) => {
  const { lang } = useLocale();

  const levels = [];
  for (let i = 1; i <= noOfLevels; i++) {
    const isActive = i <= activeLevel;

    const item = () => (
      <>
        <Level active={isActive} onClick={() => onSelectLevel(i)}>
          {i}
        </Level>
        {i < noOfLevels && <BreakLine />}
      </>
    );

    levels.push(item);
  }

  return (
    <Container lang={lang}>
      {levels.map((Item, index) => (
        <Item key={index} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin: 0 auto;
`;

const Level = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#fe7777" : "#ccc")};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 420px) {
    width: 35px;
    height: 35px;
  }
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 80px;
  height: 0px;
  border: 1px solid #aaa;

  @media screen and (max-width: 480px) {
    width: 40px;
  }

  @media screen and (max-width: 420px) {
    width: 30px;
  }
`;

export default LevelsTracker;
