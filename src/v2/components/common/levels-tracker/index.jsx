import { Fragment } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const LevelsTracker = ({ levels, onSelectLevel, activeLevel }) => {
  const { i18n, lang } = useLocale();

  return (
    <Container lang={lang}>
      {levels.map((level, index) => (
        <Fragment key={index}>
          <LevelContainer onClick={() => onSelectLevel(index)}>
            <LevelCircle active={index < activeLevel}>{index + 1}</LevelCircle>
            <LevelTitle>{i18n(level.title)}</LevelTitle>
          </LevelContainer>

          {index + 1 < levels.length && <BreakLine />}
        </Fragment>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: flex-start;
  gap: 10px;
  width: fit-content;
  margin: 0 auto;
  text-align: center;
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.97);
  }
`;

const LevelCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#fe7777" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#303030")};
  ${({ active }) =>
    active ? "" : "box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);"};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 500;

  @media screen and (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 420px) {
    width: 35px;
    height: 35px;
  }
`;

const LevelTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

const BreakLine = styled.span`
  align-self: center;
  display: inline-block;
  width: 80px;
  height: 0px;
  border: 1px solid #aaa;
  margin-top: -10px;

  @media screen and (max-width: 550px) {
    width: 40px;
  }

  @media screen and (max-width: 420px) {
    width: 0px;
    display: none;
  }
`;

export default LevelsTracker;
